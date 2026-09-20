function safeText(value: unknown, maxLength: number) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function providerOrderId(data: Record<string, unknown>) {
  return safeText(data.merchant_oid || data.orderId || data.providerOrderId, 160);
}

export function assertProviderSessionConsistency(
  data: Record<string, unknown>,
  expected: { amount: number; currency: string; provider?: string }
) {
  const orderId = providerOrderId(data);
  if (!orderId) throw new Error('Ödeme sağlayıcısı mutabakat sipariş referansı döndürmedi.');

  const returnedAmount = data.amount ?? data.totalAmount;
  if (returnedAmount === undefined || returnedAmount === null || returnedAmount === '') {
    throw new Error('Ödeme sağlayıcısı doğrulanabilir işlem tutarı döndürmedi.');
  }
  if (!Number.isFinite(Number(returnedAmount)) || Number(returnedAmount) !== expected.amount) {
    throw new Error('Ödeme sağlayıcısı tutarı sipariş tutarıyla uyuşmuyor.');
  }

  const returnedCurrency = safeText(data.currency, 8).toUpperCase();
  if (!returnedCurrency) {
    throw new Error('Ödeme sağlayıcısı doğrulanabilir para birimi döndürmedi.');
  }
  if (returnedCurrency !== expected.currency.toUpperCase()) {
    throw new Error('Ödeme sağlayıcısı para birimi siparişle uyuşmuyor.');
  }

  const returnedProvider = safeText(data.provider, 64).toUpperCase();
  if (expected.provider && !returnedProvider) {
    throw new Error('Ödeme sağlayıcısı provider kimliği döndürmedi.');
  }
  if (expected.provider && returnedProvider !== expected.provider.toUpperCase()) {
    throw new Error('Ödeme sağlayıcısı beklenen provider ile uyuşmuyor.');
  }

  return orderId;
}
