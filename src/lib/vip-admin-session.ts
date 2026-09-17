import crypto from 'crypto';

export const VIP_ADMIN_COOKIE = 'saatchi_vip_admin';
const SESSION_TTL_MS = 2 * 60 * 60 * 1000;

type AdminSessionPayload = {
  v: 2;
  iat: number;
  exp: number;
  nonce: string;
};

function getPaymentSecret() {
  const secret = process.env.VIP_PAYMENT_SECRET;
  if (!secret || secret.length < 32) throw new Error('VIP_PAYMENT_SECRET yapılandırılmamış veya yetersiz.');
  return secret;
}

export function assertConfiguredAdminKey() {
  const key = process.env.VIP_ADMIN_KEY;
  if (!key || key.length < 12) throw new Error('VIP_ADMIN_KEY yapılandırılmamış.');
  return key;
}

function getSessionSecret() {
  const explicit = process.env.VIP_ADMIN_SESSION_SECRET;
  const rootSecret = explicit && explicit.length >= 32 ? explicit : getPaymentSecret();
  const adminKeyFingerprint = crypto.createHash('sha256').update(assertConfiguredAdminKey(), 'utf8').digest();
  return crypto
    .createHmac('sha256', rootSecret)
    .update('saatchi:vip-admin-session:v2')
    .update(adminKeyFingerprint)
    .digest('hex');
}

function signBody(body: string) {
  return crypto.createHmac('sha256', getSessionSecret()).update(body).digest('hex');
}

function parseCookies(header: string | null) {
  const out = new Map<string, string>();
  for (const item of String(header || '').split(';')) {
    const index = item.indexOf('=');
    if (index < 1) continue;
    const key = item.slice(0, index).trim();
    const value = item.slice(index + 1).trim();
    if (key) out.set(key, decodeURIComponent(value));
  }
  return out;
}

export function verifyAdminKey(candidate: string) {
  const expected = Buffer.from(assertConfiguredAdminKey(), 'utf8');
  const actual = Buffer.from(String(candidate || ''), 'utf8');
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

export function assertSameOriginMutation(request: Request) {
  const expectedOrigin = new URL(request.url).origin;
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const fetchSite = request.headers.get('sec-fetch-site');

  if (fetchSite && !['same-origin', 'none'].includes(fetchSite)) {
    throw new Error('Çapraz kaynak yönetim isteği reddedildi.');
  }
  if (origin && origin !== expectedOrigin) {
    throw new Error('Çapraz kaynak yönetim isteği reddedildi.');
  }
  if (!origin && referer) {
    try {
      if (new URL(referer).origin !== expectedOrigin) throw new Error('cross-origin');
    } catch {
      throw new Error('Çapraz kaynak yönetim isteği reddedildi.');
    }
  }
  if (!origin && !referer && fetchSite !== 'same-origin') {
    throw new Error('Yönetim isteği kaynak doğrulamasından geçemedi.');
  }
}

export function createAdminSession() {
  const now = Date.now();
  const payload: AdminSessionPayload = {
    v: 2,
    iat: now,
    exp: now + SESSION_TTL_MS,
    nonce: crypto.randomBytes(18).toString('base64url'),
  };
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  return {
    token: `${body}.${signBody(body)}`,
    expiresAt: payload.exp,
    maxAgeSeconds: Math.floor(SESSION_TTL_MS / 1000),
  };
}

export function verifyAdminSessionToken(token: string): AdminSessionPayload {
  const [body, signature] = String(token || '').split('.');
  if (!body || !signature) throw new Error('Yönetim oturumu bulunamadı.');
  const expected = Buffer.from(signBody(body), 'utf8');
  const actual = Buffer.from(signature, 'utf8');
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
    throw new Error('Yönetim oturumu doğrulanamadı.');
  }
  let payload: AdminSessionPayload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as AdminSessionPayload;
  } catch {
    throw new Error('Yönetim oturumu içeriği geçersiz.');
  }
  if (payload.v !== 2 || !payload.iat || !payload.exp || payload.exp <= Date.now() || payload.iat > Date.now() + 60_000) {
    throw new Error('Yönetim oturumunun süresi dolmuş veya geçersiz.');
  }
  return payload;
}

export function assertAdminSession(request: Request) {
  const token = parseCookies(request.headers.get('cookie')).get(VIP_ADMIN_COOKIE) || '';
  return verifyAdminSessionToken(token);
}
