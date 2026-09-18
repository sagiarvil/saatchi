import { NextResponse } from 'next/server';
import { verifyVipToken } from '@/lib/vip-token';
import { assertVipLinkActive } from '@/lib/vip-link-store';

export const dynamic = 'force-dynamic';

const BELGIN_CREATE_PAYMENT_URL = process.env.BELGIN_PAYMENT_CREATE_URL || 'https://us-central1-carbon-web-1265b.cloudfunctions.net/createPayment';

function noStore(payload: unknown, init?: ResponseInit) {
  const response = NextResponse.json(payload, init);
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  return response;
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  try {
    const body = await request.json();
    const token = String(body.token || '');
    const vip = verifyVipToken(token);
    await assertVipLinkActive(vip, token);

    const customerName = String(body.custName || '').trim().slice(0, 150);
    const customerPhone = String(body.custPhone || '').trim().slice(0, 50);
    const customerIdentity = String(body.custIdentity || '').trim().slice(0, 50);
    const customerAddress = String(body.custAddress || '').trim().slice(0, 1000);
    const email = String(body.email || '').trim().slice(0, 200);

    if (!customerName || !customerPhone || !customerIdentity) {
      return noStore({ status: 'error', requestId, message: 'Ad soyad, telefon ve kimlik bilgisi zorunludur.' }, { status: 400 });
    }
    if (body.termsAccepted !== true || body.preInformationAccepted !== true || body.highValueDeliveryAccepted !== true) {
      return noStore({ status: 'error', requestId, message: 'Zorunlu sözleşme ve teslim koşulları onaylanmalıdır.' }, { status: 400 });
    }

    const configuredProvider = String(process.env.SAATCHI_PAYMENT_PROVIDER || '').trim().toUpperCase();
    const idempotencyKey = `SAATCHI:${vip.id}`;
    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const userAgent = request.headers.get('user-agent') || 'Saatchi VIP Checkout';

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
        presentedAt: String(body.presentedAt || new Date().toISOString()),
        acceptedAt: new Date().toISOString(),
        source: 'SAATCHI-VIP'
      }
    };

    if (configuredProvider) paymentPayload.provider = configuredProvider;

    
    // --- MOCK TEST BYPASS: Sanal POS onayları gelene kadar test modu ---
    // Eğer istek Belgin'den hata alırsa veya doğrudan test etmek istersek:
    return noStore({
      status: 'success',
      requestId,
      message: 'Güvenli ödeme oturumu oluşturuldu (TEST MODU).',
      orderId: 'TEST-' + crypto.randomUUID(),
      provider: 'TEST_POS',
      paymentType: 'CREDIT_CARD',
      redirectUrl: '/test-success?token=' + encodeURIComponent(token), // Fake success page
      gatewayUrl: null,
      iframeUrl: null,
      formHtml: null,
      formData: null,
      evidenceId: 'EVID-' + crypto.randomUUID(),
      deliveryMethod: 'showroom'
    });
    // ------------------------------------------------------------------

    const belginResponse = await fetch(BELGIN_CREATE_PAYMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'X-SAATCHI-Request-Id': requestId,
        ...(forwardedFor ? { 'X-Forwarded-For': forwardedFor } : {})
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(20_000),
      body: JSON.stringify(paymentPayload)
    });

    const text = await belginResponse.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: false, message: text || 'Belgin ödeme servisi geçersiz yanıt verdi.' };
    }

    if (!belginResponse.ok || data.success !== true) {
      return noStore({
        status: 'error',
        requestId,
        code: data.code || 'BELGIN_PAYMENT_CREATE_FAILED',
        message: data.message || 'Ödeme oturumu oluşturulamadı.'
      }, { status: belginResponse.status >= 400 ? belginResponse.status : 502 });
    }

    // Re-check durable state after the external call so a revoke racing with payment-session
    // creation cannot result in a usable redirect being returned to the customer.
    await assertVipLinkActive(vip, token);

    return noStore({
      status: 'success',
      requestId,
      message: 'Güvenli ödeme oturumu oluşturuldu.',
      orderId: data.merchant_oid,
      provider: data.provider,
      paymentType: data.paymentType,
      redirectUrl: data.redirectUrl || data.iframeUrl || data.gatewayUrl || null,
      gatewayUrl: data.gatewayUrl || null,
      iframeUrl: data.iframeUrl || null,
      formHtml: data.formHtml || null,
      formData: data.formData || data.postParams || null,
      evidenceId: data.evidenceId || null,
      deliveryMethod: data.deliveryMethod || 'showroom'
    });
  } catch (error: any) {
    console.error('[SAATCHI PAYMENT]', requestId, error?.message || error);
    return noStore({ status: 'error', requestId, message: error?.message || 'Ödeme oturumu oluşturulamadı.' }, { status: 400 });
  }
}
