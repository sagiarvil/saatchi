import { NextResponse } from 'next/server';
import {
  VIP_ADMIN_COOKIE,
  assertAdminSession,
  assertSameOriginMutation,
  createAdminSession,
  verifyAdminKey,
} from '@/lib/vip-admin-session';

export const dynamic = 'force-dynamic';

function noStore(response: NextResponse) {
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  return response;
}

export async function POST(request: Request) {
  try {
    assertSameOriginMutation(request);
    const body = await request.json();
    const key = String(body?.key || '');
    if (!verifyAdminKey(key)) {
      return noStore(NextResponse.json({ success: false, message: 'Yönetim doğrulaması başarısız.' }, { status: 401 }));
    }

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
  } catch (error: any) {
    return noStore(NextResponse.json({ success: false, message: error?.message || 'Yönetim oturumu açılamadı.' }, { status: 503 }));
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
  } catch (error: any) {
    return noStore(NextResponse.json({ success: false, message: error?.message || 'Oturum kapatılamadı.' }, { status: 403 }));
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
