import { NextResponse } from 'next/server';
import { verifyVipToken } from '@/lib/vip-token';
import { assertVipLinkActive, claimVipPaymentAttempt, finalizeVipPaymentAttempt } from '@/lib/vip-link-store';
import { assertSameOriginMutation } from '@/lib/vip-admin-session';
import { assertAllowedObjectKeys, assertNoCardholderData, assertPaymentHandoffConfiguration, normalizePaymentHandoff, readBoundedJsonBody, readBoundedResponseText } from '@/lib/payment-boundary';
import { LEGAL_DOCUMENT_VERSIONS } from '@/data/legal/legal-versions';
import { assertProviderSessionConsistency } from '@/lib/payment-session-consistency';
import { securityAudit } from '@/lib/security-audit-log';

export const dynamic = 'force-dynamic';

function configuredPaymentProvider() {
  const provider = safeText(process.env.SAATCHI_PAYMENT_PROVIDER, 64).toUpperCase();
  if (process.env.NODE_ENV === 'production' && process.env.SAATCHI_PAYMENT_ENABLED !== 'true') {
    throw new Error('SAATCHI ödeme sistemi production ortamında devre dışı.');
  }
  if (process.env.NODE_ENV === 'production' && !provider) {
    throw new Error('SAATCHI_PAYMENT_PROVIDER production ortamında yapılandırılmamış.');
  }
  if (provider && !/^[A-Z0-9_-]{2,64}$/.test(provider)) {
    throw new Error('SAATCHI_PAYMENT_PROVIDER değeri geçersiz.');
  }
  return provider;
}

function paymentCreateUrl() {
  const raw =
    process.env.SAATCHI_PAYMENT_CREATE_URL ||
    (process.env.NODE_ENV !== 'production' ? process.env.BELGIN_PAYMENT_CREATE_URL : '') ||
    '';

  if (!raw) {
    throw new Error('SAATCHI_PAYMENT_CREATE_URL production ortamında yapılandırılmamış.');
  }

  const url = new URL(raw);
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('Ödeme servis adresi güvenli değil.');
  }

  const allowedOrigins = new Set(
    String(process.env.SAATCHI_PAYMENT_API_ALLOWED_ORIGINS || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => new URL(value).origin)
  );

  if (process.env.NODE_ENV === 'production' && allowedOrigins.size === 0) {
    throw new Error('Ödeme API izin listesi production ortamında yapılandırılmamış.');
  }

  if (allowedOrigins.size > 0 && !allowedOrigins.has(url.origin)) {
    throw new Error('Ödeme API adresi izin verilen origin listesinde değil.');
  }

  return url;
}

function noStore(payload: unknown, init?: ResponseInit) {
  const response = NextResponse.json(payload, init);
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}

function safeText(value: unknown, maxLength: number) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function requestTextField(
  body: Record<string, unknown>,
  key: string,
  maxLength: number,
  required = false
) {
  const value = body[key];
  if (value === undefined || value === null || value === '') {
    if (required) throw new Error(`${key} alanı zorunludur.`);
    return '';
  }
  if (typeof value !== 'string') {
    throw new Error(`${key} alanı metin olmalıdır.`);
  }
  const normalized = safeText(value, maxLength);
  if (required && !normalized) throw new Error(`${key} alanı zorunludur.`);
  return normalized;
}

function assertOptionalBoolean(body: Record<string, unknown>, key: string) {
  const value = body[key];
  if (value !== undefined && typeof value !== 'boolean') {
    throw new Error(`${key} alanı boolean olmalıdır.`);
  }
}

function publicPaymentError(message: string) {
  if (message.includes('Çapraz kaynak') || message.includes('kaynak doğrulamasından')) {
    return { status: 403, message: 'İstek kaynağı doğrulanamadı.' };
  }
  if (message.includes('boyutu aşıyor')) {
    return { status: 413, message: 'İstek boyutu izin verilen sınırı aşıyor.' };
  }
  if (
    message.includes('Geçerli bir telefon') ||
    message.includes('Geçerli bir e-posta') ||
    message.includes('Ad soyad') ||
    message.includes('Zorunlu sözleşme') ||
    message.includes('Content-Type') ||
    message.includes('Geçersiz JSON') ||
    message.includes('JSON nesnesi') ||
    message.includes('Kart numarası') ||
    message.includes('alanı zorunludur') ||
    message.includes('alanı metin olmalıdır') ||
    message.includes('alanı boolean olmalıdır') ||
    message.includes('beklenmeyen alan')
  ) {
    return { status: 400, message };
  }
  if (
    message.includes('zaten oluşturuluyor') ||
    message.includes('daha önce oluşturuldu') ||
    message.includes('mutabakatı gerekir') ||
    message.includes('eşzamanlı başka')
  ) {
    return { status: 409, message };
  }
  if (
    message.includes('VIP ödeme tokenı') ||
    message.includes('VIP ödeme linki') ||
    message.includes('süresi dolmuş')
  ) {
    return { status: 400, message: 'VIP ödeme bağlantısı geçersiz, kullanılmış, iptal edilmiş veya süresi dolmuş.' };
  }
  if (message.includes('yönlendirme') || message.includes('Ödeme sağlayıcısı')) {
    return { status: 502, message: 'Ödeme kuruluşu ile güvenli oturum oluşturulamadı.' };
  }
  return { status: 503, message: 'Ödeme hizmeti şu anda kullanılamıyor. İşlem referansı ile destek ekibine başvurun.' };
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  try {
    assertSameOriginMutation(request);

    const body = await readBoundedJsonBody(request);
    // Card data is rejected explicitly before the generic schema gate so runtime evidence
    // proves the merchant boundary refuses PAN/CVV/expiry rather than merely unknown keys.
    assertNoCardholderData(body);
    assertAllowedObjectKeys(body, [
      'token',
      'custName',
      'custPhone',
      'custIdentity',
      'email',
      'custAddress',
      'termsAccepted',
      'preInformationAccepted',
      'highValueDeliveryAccepted',
      'marketingConsent',
    ], 'Ödeme isteği');
    assertOptionalBoolean(body, 'termsAccepted');
    assertOptionalBoolean(body, 'preInformationAccepted');
    assertOptionalBoolean(body, 'highValueDeliveryAccepted');
    assertOptionalBoolean(body, 'marketingConsent');

    const token = requestTextField(body, 'token', 4096, true);
    const vip = verifyVipToken(token);
    await assertVipLinkActive(vip, token);

    const customerName = requestTextField(body, 'custName', 150, true);
    const customerPhone = requestTextField(body, 'custPhone', 50, true);
    const customerIdentity = requestTextField(body, 'custIdentity', 50, true);
    const customerAddress = requestTextField(body, 'custAddress', 1000);
    const email = requestTextField(body, 'email', 200);
    const phoneDigits = customerPhone.replace(/\D/g, '');

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return noStore({ status: 'error', requestId, message: 'Geçerli bir telefon numarası girin.' }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return noStore({ status: 'error', requestId, message: 'Geçerli bir e-posta adresi girin.' }, { status: 400 });
    }

    if (body.termsAccepted !== true || body.preInformationAccepted !== true || body.highValueDeliveryAccepted !== true) {
      return noStore(
        { status: 'error', requestId, message: 'Zorunlu sözleşme ve teslim koşulları onaylanmalıdır.' },
        { status: 400 }
      );
    }

    const configuredProvider = configuredPaymentProvider();
    assertPaymentHandoffConfiguration();
    const idempotencyKey = `SAATCHI:${vip.id}`;
    const userAgent = safeText(request.headers.get('user-agent') || 'Saatchi VIP Checkout', 512);

    const legalAcceptedAt = new Date().toISOString();

    const paymentPayload: Record<string, unknown> = {
      source: 'SAATCHI',
      channel: 'saatchi.watch',
      idempotencyKey,
      isVipPayment: true,
      vipTitle: vip.name,
      title: vip.name,
      productName: vip.name,
      amount: vip.price,
      totalAmount: vip.price,
      currency: 'TRY',
      items: [{ id: vip.id, name: vip.name, qty: 1, price: vip.price, isVipCustom: true }],
      user_name: customerName,
      user_phone: customerPhone,
      email,
      customerIdentity,
      customerAddress,
      deliveryMethod: 'showroom',
      termsAccepted: true,
      preInformationAccepted: true,
      highValueDeliveryAccepted: true,
      marketingConsent: body.marketingConsent === true,
      legalPresentation: {
        presentedAt: legalAcceptedAt,
        acceptedAt: legalAcceptedAt,
        source: 'SAATCHI-VIP',
        documentVersions: LEGAL_DOCUMENT_VERSIONS,
      },
    };

    if (configuredProvider) paymentPayload.provider = configuredProvider;

    const upstreamUrl = paymentCreateUrl();

    await claimVipPaymentAttempt(vip, token, requestId, LEGAL_DOCUMENT_VERSIONS);
    securityAudit('payment.session.claimed', { requestId, vipId: vip.id, provider: configuredProvider || 'UNSET' });

    let upstreamCompleted = false;
    try {
      const belginResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'X-SAATCHI-Request-Id': requestId,
        'Idempotency-Key': idempotencyKey,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(20_000),
      redirect: 'error',
      body: JSON.stringify(paymentPayload),
    });

      const text = await readBoundedResponseText(belginResponse);
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(text) as Record<string, unknown>;
      } catch {
        data = {};
      }

      if (!belginResponse.ok || data.success !== true) {
        console.error('[SAATCHI PAYMENT UPSTREAM]', requestId, {
          status: belginResponse.status,
          code: safeText(data.code, 80),
        });
        throw new Error('Ödeme sağlayıcısı oturum oluşturma isteğini onaylamadı.');
      }

      upstreamCompleted = true;

      const verifiedProviderOrderId = assertProviderSessionConsistency(data, {
        amount: vip.price,
        currency: 'TRY',
        provider: configuredProvider || undefined,
      });

      // A revoke racing with provider session creation must fail before handoff.
      await assertVipLinkActive(vip, token);

      const handoff = normalizePaymentHandoff(data);
      await finalizeVipPaymentAttempt(vip.id, requestId, 'ready', {
        providerOrderId: verifiedProviderOrderId,
        evidenceId: safeText(data.evidenceId, 160),
      });
      securityAudit('payment.session.ready', { requestId, vipId: vip.id, provider: configuredProvider || 'UNSET' });

      return noStore({
        status: 'success',
        requestId,
        message: 'Güvenli ödeme oturumu oluşturuldu.',
        orderId: verifiedProviderOrderId,
        provider: safeText(data.provider, 80) || null,
        paymentType: safeText(data.paymentType, 80) || null,
        redirectUrl: handoff.redirectUrl,
        gatewayUrl: handoff.gatewayUrl,
        formData: handoff.formData,
        evidenceId: safeText(data.evidenceId, 160) || null,
        deliveryMethod: safeText(data.deliveryMethod, 80) || 'showroom',
      });
    } catch (error) {
      try {
        await finalizeVipPaymentAttempt(vip.id, requestId, 'uncertain', {
          lastError: errorMessage(error, 'Ödeme sağlayıcısı sonucu doğrulanamadı.'),
        });
        securityAudit('payment.session.uncertain', { requestId, vipId: vip.id, provider: configuredProvider || 'UNSET' });
      } catch (finalizeError) {
        console.error('[SAATCHI PAYMENT ATTEMPT FINALIZE]', requestId, errorMessage(finalizeError, 'unknown'));
      }
      if (upstreamCompleted) {
        throw new Error('Ödeme sağlayıcısı yanıt verdi ancak oturum sonucu güvenle tamamlanamadı. Yeni deneme öncesi mutabakat gerekir.');
      }
      throw error;
    }
  } catch (error: unknown) {
    const internalMessage = errorMessage(error, 'Ödeme oturumu oluşturulamadı.');
    const publicError = publicPaymentError(internalMessage);
    console.error('[SAATCHI PAYMENT]', requestId, internalMessage);
    return noStore(
      { status: 'error', requestId, message: publicError.message },
      { status: publicError.status }
    );
  }
}
