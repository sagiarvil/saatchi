import { NextResponse } from 'next/server';
import { assertAdminSession } from '@/lib/vip-admin-session';
import { listVipLinkRecords } from '@/lib/vip-link-store';

export const dynamic = 'force-dynamic';

function noStore(response: NextResponse) {
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  return response;
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function GET(request: Request) {
  try {
    assertAdminSession(request);
    const records = await listVipLinkRecords(75);
    return noStore(NextResponse.json({
      success: true,
      links: records.map((record) => ({
        id: record.id,
        name: record.name,
        price: record.price,
        state: record.state,
        createdAt: record.createdAt,
        expiresAt: record.expiresAt,
        revokedAt: record.revokedAt,
        paymentState: record.paymentState,
        paymentUpdatedAt: record.paymentUpdatedAt,
        reconciledAt: record.reconciledAt,
        paymentProviderOrderId: record.paymentProviderOrderId,
        paymentEvidenceId: record.paymentEvidenceId,
        paymentLastError: record.paymentLastError,
      })),
    }));
  } catch (error: unknown) {
    const message = errorMessage(error, 'VIP link listesi alınamadı.');
    const authError = message.includes('Yönetim oturumu');
    return noStore(NextResponse.json({ success: false, message }, { status: authError ? 401 : 503 }));
  }
}
