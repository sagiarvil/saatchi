import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { signVipToken } from '@/lib/vip-token';
import { assertAdminSession, assertSameOriginMutation, expectedPublicOrigin } from '@/lib/vip-admin-session';
import { readBoundedJsonBody } from '@/lib/payment-boundary';
import { createVipLinkRecord, revokeVipLink } from '@/lib/vip-link-store';
import { normalizeVipTitle, parseVipAmount } from '@/lib/vip-input';

export const dynamic = 'force-dynamic';

function noStore(response: NextResponse) {
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  return response;
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function POST(request: Request) {
  try {
    assertSameOriginMutation(request);
    assertAdminSession(request);
    const body = await readBoundedJsonBody(request, 8_192);
    const title = normalizeVipTitle(body.title);
    const amount = parseVipAmount(body.amount);
    if (!title) return noStore(NextResponse.json({ success: false, message: 'Ürün adı zorunludur.' }, { status: 400 }));
    if (!Number.isFinite(amount) || amount <= 0) return noStore(NextResponse.json({ success: false, message: 'Geçerli bir tutar girin.' }, { status: 400 }));

    const now = Date.now();
    const payload = {
      id: `VIP-SAATCHI-${now}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      name: title,
      price: amount,
      iat: now,
      exp: now + 7 * 24 * 60 * 60 * 1000,
    };
    const token = signVipToken(payload);
    await createVipLinkRecord(payload, token);

    const origin = expectedPublicOrigin(request);
    return noStore(NextResponse.json({
      success: true,
      id: payload.id,
      expiresAt: payload.exp,
      url: `${origin}/vip-checkout#token=${encodeURIComponent(token)}`,
    }));
  } catch (error: unknown) {
    const message = errorMessage(error, 'VIP link oluşturulamadı.');
    const authError = message.includes('Yönetim oturumu');
    const originError = message.includes('Çapraz kaynak');
    return noStore(NextResponse.json({ success: false, message }, { status: originError ? 403 : authError ? 401 : 503 }));
  }
}

export async function DELETE(request: Request) {
  try {
    assertSameOriginMutation(request);
    assertAdminSession(request);
    const body = await readBoundedJsonBody(request, 8_192);
    const id = String(body?.id || '').trim();
    if (!id.startsWith('VIP-SAATCHI-')) {
      return noStore(NextResponse.json({ success: false, message: 'Geçerli bir VIP link referansı girin.' }, { status: 400 }));
    }
    const record = await revokeVipLink(id);
    return noStore(NextResponse.json({ success: true, id: record.id, revokedAt: record.revokedAt }));
  } catch (error: unknown) {
    const message = errorMessage(error, 'VIP link iptal edilemedi.');
    const authError = message.includes('Yönetim oturumu');
    const originError = message.includes('Çapraz kaynak');
    return noStore(NextResponse.json({ success: false, message }, { status: originError ? 403 : authError ? 401 : 503 }));
  }
}
