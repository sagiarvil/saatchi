export function normalizeVipTitle(value: unknown) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

export function parseVipAmount(value: unknown) {
  if (typeof value === 'number') {
    return Number.isSafeInteger(value) && value > 0 ? value : NaN;
  }

  const raw = String(value || '').trim();
  if (!raw) return NaN;

  if (/^\d+$/.test(raw)) {
    const parsed = Number(raw);
    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : NaN;
  }

  // Turkish thousands grouping only (e.g. 1.250.000). Decimal inputs are deliberately rejected.
  if (/^\d{1,3}(?:\.\d{3})+$/.test(raw)) {
    const parsed = Number(raw.replace(/\./g, ''));
    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : NaN;
  }

  return NaN;
}
