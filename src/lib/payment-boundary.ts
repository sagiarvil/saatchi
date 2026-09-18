export type PaymentHandoff = {
  redirectUrl: string | null;
  gatewayUrl: string | null;
  formData: Record<string, string> | null;
};

const MAX_FORM_FIELDS = 64;
const MAX_FORM_VALUE_LENGTH = 4096;
const SENSITIVE_PAYMENT_FIELD = /^(?:card_?(?:number|no|pan|cvv|cvc|expiry|expiredate|securitycode)|cc_?(?:number|num|no)|pan|cvv|cvc|security_?code|expiry|expiration|expiry_?(?:date|month|year)|expiration_?(?:date|month|year)|cardholderdata)$/i;

function parseAllowedOrigins(raw = process.env.SAATCHI_PAYMENT_ALLOWED_ORIGINS || '') {
  return new Set(
    raw
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => {
        const url = new URL(value);
        if (url.protocol !== 'https:' || url.username || url.password) {
          throw new Error('Ödeme yönlendirme izin listesinde yalnız güvenli HTTPS origin kullanılabilir.');
        }
        return url.origin;
      })
  );
}

export function assertPaymentHandoffConfiguration(rawAllowlist?: string) {
  const allowlist = parseAllowedOrigins(
    rawAllowlist === undefined ? process.env.SAATCHI_PAYMENT_ALLOWED_ORIGINS || '' : rawAllowlist
  );
  if (process.env.NODE_ENV === 'production' && allowlist.size === 0) {
    throw new Error('Ödeme yönlendirme izin listesi production ortamında yapılandırılmamış.');
  }
  return allowlist;
}

export function assertPaymentUrlAllowed(value: unknown, rawAllowlist?: string) {
  const raw = String(value || '').trim();
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('Ödeme kuruluşu geçersiz yönlendirme adresi döndürdü.');
  }

  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('Ödeme kuruluşu güvenli olmayan yönlendirme adresi döndürdü.');
  }

  const allowlist = parseAllowedOrigins(
    rawAllowlist === undefined ? process.env.SAATCHI_PAYMENT_ALLOWED_ORIGINS || '' : rawAllowlist
  );

  if (allowlist.size === 0) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Ödeme yönlendirme izin listesi yapılandırılmamış.');
    }
    return url.toString();
  }

  if (!allowlist.has(url.origin)) {
    throw new Error('Ödeme kuruluşu izin verilmeyen bir yönlendirme adresi döndürdü.');
  }

  return url.toString();
}

export function normalizePaymentFormData(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;

  const entries = Object.entries(input as Record<string, unknown>);
  if (entries.length === 0) return null;
  if (entries.length > MAX_FORM_FIELDS) {
    throw new Error('Ödeme kuruluşu beklenmeyen sayıda form alanı döndürdü.');
  }

  const out: Record<string, string> = {};
  for (const [key, value] of entries) {
    if (!/^[A-Za-z0-9_.\-\[\]]{1,80}$/.test(key)) {
      throw new Error('Ödeme kuruluşu geçersiz form alanı döndürdü.');
    }
    if (SENSITIVE_PAYMENT_FIELD.test(key)) {
      throw new Error('Ödeme kuruluşu merchant handoff üzerinden kart verisi döndüremez.');
    }
    if (!['string', 'number', 'boolean'].includes(typeof value)) {
      throw new Error('Ödeme kuruluşu geçersiz form değeri döndürdü.');
    }
    const normalized = String(value);
    if (normalized.length > MAX_FORM_VALUE_LENGTH) {
      throw new Error('Ödeme kuruluşu aşırı uzun form değeri döndürdü.');
    }
    out[key] = normalized;
  }

  return out;
}

export function normalizePaymentHandoff(data: Record<string, unknown>, rawAllowlist?: string): PaymentHandoff {
  const gatewayUrl = assertPaymentUrlAllowed(data.gatewayUrl, rawAllowlist);
  const formData = normalizePaymentFormData(data.formData || data.postParams);

  if (gatewayUrl && formData) {
    return { redirectUrl: null, gatewayUrl, formData };
  }

  const direct = data.redirectUrl || data.iframeUrl || data.paymentUrl || data.url;
  const redirectUrl = assertPaymentUrlAllowed(direct, rawAllowlist);
  if (!redirectUrl) {
    throw new Error('Ödeme kuruluşu geçerli yönlendirme bilgisi üretmedi.');
  }

  return { redirectUrl, gatewayUrl: null, formData: null };
}

export function assertRequestBodySize(request: Request, maxBytes = 16_384) {
  const raw = request.headers.get('content-length');
  if (!raw) return;
  const length = Number(raw);
  if (!Number.isFinite(length) || length < 0 || length > maxBytes) {
    throw new Error('Ödeme isteği izin verilen boyutu aşıyor.');
  }
}


export async function readBoundedJsonBody(request: Request, maxBytes = 16_384) {
  const contentType = String(request.headers.get('content-type') || '').toLowerCase();
  if (!contentType.startsWith('application/json')) {
    throw new Error('İstek Content-Type application/json olmalıdır.');
  }

  assertRequestBodySize(request, maxBytes);
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    throw new Error('Ödeme isteği izin verilen boyutu aşıyor.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('Geçersiz JSON isteği.');
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('İstek gövdesi JSON nesnesi olmalıdır.');
  }

  return parsed as Record<string, unknown>;
}

export async function readBoundedResponseText(response: Response, maxBytes = 65_536) {
  const contentLength = Number(response.headers.get('content-length') || 0);
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new Error('Ödeme sağlayıcısı yanıtı izin verilen boyutu aşıyor.');
  }

  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        throw new Error('Ödeme sağlayıcısı yanıtı izin verilen boyutu aşıyor.');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}
