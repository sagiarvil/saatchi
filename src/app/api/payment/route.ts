import { NextResponse } from 'next/server';
import { verifyVipToken } from '@/lib/vip-token';
import { assertVipLinkActive } from '@/lib/vip-link-store';
import { assertSameOriginMutation } from '@/lib/vip-admin-session';
import { assertRequestBodySize, normalizePaymentHandoff } from '@/lib/payment-boundary';

export const dynamic = 'force-dynamic';

const PAYMENT_CREATE_URL =
  process.env.SAATCHI_PAYMENT_CREATE_URL ||
  process.env.BELGIN_PAYMENT_CREATE_URL ||
  'https://us-central1-carbon-web-1265b.cloudfunctions.net/createPayment';

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

function statusForError(message: string) {
  if (message.includes('Çapraz kaynak') || message.includes('kaynak doğrulamasından')) return 403;
  if (message.includes('boyutu aşıyor')) return 413;
  if (message.includes('izin listesi') || message.includes('yönlendirme')) return 502;
  return 400;
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  try {
    assertRequestBodySize(request);
    assertSameOriginMutation(request);

    const body = await request.json();
    const token = safeText(body.token, 4096);
    const vip = verifyVipToken(token);
    await assertVipLinkActive(vip, token);

    const customerName = safeText(body.custName, 150);
    const customerPhone = safeText(body.custPhone, 50);
    const customerIdentity = safeText(body.custIdentity, 50);
    const customerAddress = safeText(body.custAddress, 1000);
    const email = safeText(body.email, 200);

    if (!customerName || !customerPhone || !customerIdentity) {
      return noStore(
        { status: 'error', requestId, message: 'Ad soyad, telefon ve kimlik bilgisi zorunludur.' },
        { status: 400 }
      );
    }

    if (body.termsAccepted !== true || body.preInformationAccepted !== true || body.highValueDeliveryAccepted !== true) {
      return noStore(
        { status: 'error', requestId, message: 'Zorunlu sözleşme ve teslim koşulları onaylanmalıdır.' },
        { status: 400 }
      );
    }

    const configuredProvider = safeText(process.env.SAATCHI_PAYMENT_PROVIDER, 64).toUpperCase();
    const idempotencyKey = `SAATCHI:${vip.id}`;
    const userAgent = safeText(request.headers.get('user-agent') || 'Saatchi VIP Checkout', 512);

    const paymentPayload: Record<string, unknown> = {
      source: 'SAATCHI',
      channel: 'saatchi.watch',
      idempotencyKey,
      isVipPayment: true,
      vipToken: token,
      vipTitle: vip.name,
      title: vip.name,
      productName: vip.name,
      items: [{ id: vip.id, name: vip.name, qty: 1, isVipCustom: true }],
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
        presentedAt: safeText(body.presentedAt || new Date().toISOString(), 50),
        acceptedAt: new Date().toISOString(),
        source: 'SAATCHI-VIP',
      },
    };

    if (configuredProvider) paymentPayload.provider = configuredProvider;

    const upstreamUrl = new URL(PAYMENT_CREATE_URL);
    if (upstreamUrl.protocol !== 'https:') {
      throw new Error('Ödeme servis adresi güvenli değil.');
    }

    const belginResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'X-SAATCHI-Request-Id': requestId,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(20_000),
      body: JSON.stringify(paymentPayload),
    });

    const text = await belginResponse.text();
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
      return noStore(
        {
          status: 'error',
          requestId,
          code: safeText(data.code, 80) || 'PAYMENT_CREATE_FAILED',
          message: 'Ödeme oturumu oluşturulamadı.',
        },
        { status: belginResponse.status >= 400 && belginResponse.status < 500 ? 400 : 502 }
      );
    }

    // A revoke racing with provider session creation must fail before handoff.
    await assertVipLinkActive(vip, token);

    const handoff = normalizePaymentHandoff(data);

    return noStore({
      status: 'success',
      requestId,
      message: 'Güvenli ödeme oturumu oluşturuldu.',
      orderId: safeText(data.merchant_oid, 160) || null,
      provider: safeText(data.provider, 80) || null,
      paymentType: safeText(data.paymentType, 80) || null,
      redirectUrl: handoff.redirectUrl,
      gatewayUrl: handoff.gatewayUrl,
      formData: handoff.formData,
      evidenceId: safeText(data.evidenceId, 160) || null,
      deliveryMethod: safeText(data.deliveryMethod, 80) || 'showroom',
    });
  } catch (error: any) {
    const message = String(error?.message || 'Ödeme oturumu oluşturulamadı.');
    console.error('[SAATCHI PAYMENT]', requestId, message);
    return noStore(
      {
        status: 'error',
        requestId,
        message:
          statusForError(message) === 502
            ? 'Ödeme kuruluşu yönlendirmesi güvenlik doğrulamasından geçemedi.'
            : message,
      },
      { status: statusForError(message) }
    );
  }
}
