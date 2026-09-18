import { NextResponse } from 'next/server';
import {
  VIP_ADMIN_COOKIE,
  assertAdminSession,
  assertSameOriginMutation,
  createAdminSession,
  verifyAdminKey,
} from '@/lib/vip-admin-session';
import { readBoundedJsonBody } from '@/lib/payment-boundary';
import { verifyAdminTotp } from '@/lib/vip-admin-totp';
import { assertAdminLoginNotThrottled, clearAdminLoginFailures, recordAdminLoginFailure } from '@/lib/vip-admin-throttle';

export const dynamic = 'force-dynamic';

function noStore(response: NextResponse) {
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  return response;
}

export async function POST(request: Request) {
  try {
    assertSameOriginMutation(request);
    assertAdminLoginNotThrottled(request);
    const body = await readBoundedJsonBody(request, 4_096);
    const key = String(body?.key || '');
    const otp = String(body?.otp || '');
    if (!verifyAdminKey(key) || !verifyAdminTotp(otp)) {
      recordAdminLoginFailure(request);
      return noStore(NextResponse.json({ success: false, message: 'Yönetim doğrulaması başarısız.' }, { status: 401 }));
    }

    clearAdminLoginFailures(request);
    const session = createAdminSession();
    const response = noStore(NextResponse.json({ success: true, expiresAt: session.expiresAt }));
    response.cookies.set(VIP_ADMIN_COOKIE, session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: session.maxAgeSeconds,
    });
    return response;
  } catch (error: unknown) {
    const internalMessage = error instanceof Error ? error.message : 'Yönetim oturumu açılamadı.';
    console.error('[SAATCHI ADMIN SESSION]', internalMessage);
    const originError = internalMessage.includes('Çapraz kaynak') || internalMessage.includes('kaynak doğrulamasından');
    const throttled = internalMessage.includes('geçici olarak sınırlandı');
    const requestError =
      internalMessage.includes('Content-Type') ||
      internalMessage.includes('Geçersiz JSON') ||
      internalMessage.includes('JSON nesnesi') ||
      internalMessage.includes('boyutu aşıyor');
    const response = noStore(NextResponse.json(
      { success: false, message: originError ? 'İstek kaynağı doğrulanamadı.' : throttled ? 'Çok fazla başarısız giriş denemesi. Daha sonra tekrar deneyin.' : requestError ? 'Geçersiz yönetim isteği.' : 'Yönetim oturumu açılamadı.' },
      { status: originError ? 403 : throttled ? 429 : requestError ? 400 : 503 }
    ));
    if (throttled) {
      const retryAfter = Number((error as Error & { retryAfterSeconds?: number }).retryAfterSeconds || 60);
      response.headers.set('Retry-After', String(Math.max(1, Math.min(300, retryAfter))));
    }
    return response;
  }
}

export async function GET(request: Request) {
  try {
    const session = assertAdminSession(request);
    return noStore(NextResponse.json({ success: true, authenticated: true, expiresAt: session.exp }));
  } catch {
    return noStore(NextResponse.json({ success: true, authenticated: false }, { status: 200 }));
  }
}

export async function DELETE(request: Request) {
  try {
    assertSameOriginMutation(request);
  } catch (error: unknown) {
    const internalMessage = error instanceof Error ? error.message : 'Oturum kapatılamadı.';
    console.error('[SAATCHI ADMIN SESSION DELETE]', internalMessage);
    return noStore(NextResponse.json({ success: false, message: 'Oturum kapatma isteği doğrulanamadı.' }, { status: 403 }));
  }
  const response = noStore(NextResponse.json({ success: true }));
  response.cookies.set(VIP_ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}
