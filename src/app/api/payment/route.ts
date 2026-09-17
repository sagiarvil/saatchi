import { NextResponse } from 'next/server';
import { verifyVipToken } from '@/lib/vip-token';
import { assertVipLinkActive } from '@/lib/vip-link-store';

export const dynamic = 'force-dynamic';

const BELGIN_CREATE_PAYMENT_URL = process.env.BELGIN_PAYMENT_CREATE_URL || 'https://us-central1-carbon-web-1265b.cloudfunctions.net/createPayment';

export async function POST(request: Request) {
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
      return NextResponse.json({ status: 'error', message: 'Ad soyad, telefon ve kimlik bilgisi zorunludur.' }, { status: 400 });
    }
    if (body.termsAccepted !== true || body.preInformationAccepted !== true || body.highValueDeliveryAccepted !== true) {
      return NextResponse.json({ status: 'error', message: 'Zorunlu sözleşme ve teslim koşulları onaylanmalıdır.' }, { status: 400 });
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

    const belginResponse = await fetch(BELGIN_CREATE_PAYMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        ...(forwardedFor ? { 'X-Forwarded-For': forwardedFor } : {})
      },
      cache: 'no-store',
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
      return NextResponse.json({
        status: 'error',
        code: data.code || 'BELGIN_PAYMENT_CREATE_FAILED',
        message: data.message || 'Ödeme oturumu oluşturulamadı.'
      }, { status: belginResponse.status >= 400 ? belginResponse.status : 502 });
    }

    return NextResponse.json({
      status: 'success',
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
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error: any) {
    console.error('[SAATCHI PAYMENT]', error?.message || error);
    return NextResponse.json({ status: 'error', message: error?.message || 'Ödeme oturumu oluşturulamadı.' }, { status: 400 });
  }
}
