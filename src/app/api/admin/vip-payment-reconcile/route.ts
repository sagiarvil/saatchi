import { NextResponse } from 'next/server';
import { assertAdminSession, assertSameOriginMutation } from '@/lib/vip-admin-session';
import { resetUncertainVipPaymentAttempt } from '@/lib/vip-link-store';

export const dynamic = 'force-dynamic';

function noStore(payload: unknown, init?: ResponseInit) {
  const response = NextResponse.json(payload, init);
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

    const body = await request.json() as Record<string, unknown>;
    if (body.confirmedNoCharge !== true) {
      return noStore(
        { success: false, message: 'Bankada tahsilat olmadığı açıkça doğrulanmadan yeniden deneme açılamaz.' },
        { status: 400 }
      );
    }

    const id = String(body.id || '').trim();
    const reconciliationReference = String(body.reconciliationReference || '').trim();
    const reconciliationReason = String(body.reconciliationReason || '').trim();

    if (!id.startsWith('VIP-SAATCHI-')) {
      return noStore({ success: false, message: 'Geçerli VIP link referansı zorunludur.' }, { status: 400 });
    }

    const record = await resetUncertainVipPaymentAttempt(id, reconciliationReference, reconciliationReason);

    return noStore({
      success: true,
      id: record.id,
      paymentState: record.paymentState,
      reconciledAt: record.reconciledAt,
    });
  } catch (error: unknown) {
    const message = errorMessage(error, 'Ödeme mutabakatı tamamlanamadı.');
    const authError = message.includes('Yönetim oturumu');
    const originError = message.includes('Çapraz kaynak') || message.includes('kaynak doğrulamasından');
    return noStore(
      { success: false, message },
      { status: originError ? 403 : authError ? 401 : 409 }
    );
  }
}
