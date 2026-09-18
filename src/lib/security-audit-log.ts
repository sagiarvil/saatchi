const BLOCKED_FIELD = /(?:token|secret|password|passcode|key|card|cvv|cvc|pan|identity|address|email|phone)/i;
const SAFE_EVENT = /^[a-z0-9_.:-]{3,96}$/i;

type AuditValue = string | number | boolean | null | undefined;

function sanitizeValue(value: AuditValue) {
  if (typeof value === 'string') {
    return value.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, 200);
  }
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'boolean' || value === null) return value;
  return undefined;
}

export function securityAudit(event: string, fields: Record<string, AuditValue> = {}) {
  if (!SAFE_EVENT.test(event)) {
    throw new Error('Geçersiz security audit event adı.');
  }

  const safeFields: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (BLOCKED_FIELD.test(key)) continue;
    const safe = sanitizeValue(value);
    if (safe !== undefined) safeFields[key] = safe;
  }

  console.info(JSON.stringify({
    type: 'security_audit',
    event,
    at: new Date().toISOString(),
    ...safeFields,
  }));
}
