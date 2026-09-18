import { NextResponse } from 'next/server';
import { verifyVipToken } from '@/lib/vip-token';
import { assertVipLinkActive, assertVipPaymentStatePayable } from '@/lib/vip-link-store';
import { assertSameOriginMutation } from '@/lib/vip-admin-session';
import { readBoundedJsonBody } from '@/lib/payment-boundary';

export const dynamic = 'force-dynamic';

function noStore(payload: unknown, init?: ResponseInit) {
  const response = NextResponse.json(payload, init);
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}

export async function POST(request: Request) {
  try {
    assertSameOriginMutation(request);
    const body = await readBoundedJsonBody(request, 8_192);
    const token = String(body.token || '').trim().slice(0, 4096);
    const payload = verifyVipToken(token);
    const record = await assertVipLinkActive(payload, token);
    assertVipPaymentStatePayable(record);

    return noStore({
      success: true,
      payload: { id: payload.id, name: payload.name, price: payload.price, exp: payload.exp },
    });
  } catch (error: unknown) {
    const internalMessage = error instanceof Error ? error.message : 'VIP link doğrulanamadı.';
    console.error('[SAATCHI VIP VERIFY]', internalMessage);
    const originError = internalMessage.includes('Çapraz kaynak') || internalMessage.includes('kaynak doğrulamasından');
    const unavailable =
      internalMessage.includes('Firestore') ||
      internalMessage.includes('yapılandırılmamış') ||
      internalMessage.includes('proje kimliği');

    return noStore(
      {
        success: false,
        message: originError
          ? 'İstek kaynağı doğrulanamadı.'
          : unavailable
            ? 'VIP bağlantısı şu anda doğrulanamıyor.'
            : 'VIP bağlantısı geçersiz, kullanılmış, iptal edilmiş veya süresi dolmuş.',
      },
      { status: originError ? 403 : unavailable ? 503 : 400 }
    );
  }
}
