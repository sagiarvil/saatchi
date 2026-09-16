import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { signVipToken, verifyVipToken } from '@/lib/vip-token';

export const dynamic = 'force-dynamic';

function assertAdminKey(request: Request) {
  const configured = process.env.VIP_ADMIN_KEY;
  if (!configured || configured.length < 12) throw new Error('VIP_ADMIN_KEY yapılandırılmamış.');
  const supplied = request.headers.get('x-vip-admin-key') || '';
  const a = Buffer.from(configured, 'utf8');
  const b = Buffer.from(supplied, 'utf8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) throw new Error('Yönetim anahtarı geçersiz.');
}

export async function POST(request: Request) {
  try {
    assertAdminKey(request);
    const body = await request.json();
    const title = String(body.title || '').trim().slice(0, 180);
    const amount = Number(String(body.amount || '').replace(/[^0-9.,]/g, '').replace(/\./g, '').replace(',', '.'));
    if (!title) return NextResponse.json({ success: false, message: 'Ürün adı zorunludur.' }, { status: 400 });
    if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ success: false, message: 'Geçerli bir tutar girin.' }, { status: 400 });

    const now = Date.now();
    const id = `VIP-SAATCHI-${now}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const token = signVipToken({ id, name: title, price: amount, iat: now, exp: now + 7 * 24 * 60 * 60 * 1000 });
    const origin = new URL(request.url).origin;
    return NextResponse.json({ success: true, id, expiresAt: now + 7 * 24 * 60 * 60 * 1000, url: `${origin}/vip-checkout?token=${encodeURIComponent(token)}` });
  } catch (error: any) {
    const status = String(error?.message || '').includes('anahtarı') ? 401 : 503;
    return NextResponse.json({ success: false, message: error?.message || 'VIP link oluşturulamadı.' }, { status });
  }
}

export async function GET(request: Request) {
  try {
    const token = new URL(request.url).searchParams.get('token') || '';
    const payload = verifyVipToken(token);
    return NextResponse.json({ success: true, payload: { id: payload.id, name: payload.name, price: payload.price, exp: payload.exp } }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || 'VIP link doğrulanamadı.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }
}
