import crypto from 'crypto';

export type VipTokenPayload = {
  id: string;
  name: string;
  price: number;
  iat: number;
  exp: number;
};

function getSecret() {
  const secret = process.env.VIP_PAYMENT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('VIP_PAYMENT_SECRET yapılandırılmamış veya yetersiz.');
  }
  return secret;
}

export function signVipToken(payload: VipTokenPayload) {
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto.createHmac('sha256', getSecret()).update(body).digest('hex');
  return `${body}.${signature}`;
}

export function verifyVipToken(token: string): VipTokenPayload {
  if (!token || typeof token !== 'string') throw new Error('VIP ödeme tokenı eksik.');
  if (token.length > 4096) throw new Error('VIP ödeme tokenı geçersiz.');
  const parts = token.split('.');
  if (parts.length !== 2) throw new Error('VIP ödeme tokenı geçersiz.');
  const [body, signature] = parts;
  if (!body || !signature || !/^[A-Fa-f0-9]{64}$/.test(signature)) throw new Error('VIP ödeme tokenı geçersiz.');

  const expected = crypto.createHmac('sha256', getSecret()).update(body).digest('hex');
  const actualBuffer = Buffer.from(signature, 'utf8');
  const expectedBuffer = Buffer.from(expected, 'utf8');
  if (actualBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(actualBuffer, expectedBuffer)) {
    throw new Error('VIP ödeme tokenı doğrulanamadı.');
  }

  let payload: VipTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as VipTokenPayload;
  } catch {
    throw new Error('VIP ödeme tokenı içeriği geçersiz.');
  }

  const now = Date.now();
  if (
    !/^VIP-SAATCHI-[A-Za-z0-9-]{8,120}$/.test(String(payload.id || '')) ||
    typeof payload.name !== 'string' ||
    payload.name.length < 1 ||
    payload.name.length > 180 ||
    !Number.isSafeInteger(Number(payload.price)) ||
    Number(payload.price) <= 0 ||
    !Number.isSafeInteger(Number(payload.iat)) ||
    !Number.isSafeInteger(Number(payload.exp)) ||
    payload.iat > now + 60_000 ||
    payload.exp <= payload.iat ||
    payload.exp - payload.iat > 7 * 24 * 60 * 60 * 1000 + 60_000
  ) {
    throw new Error('VIP ödeme tokenı içeriği geçersiz.');
  }
  if (now > payload.exp) throw new Error('VIP ödeme linkinin süresi dolmuş.');

  return {
    id: payload.id,
    name: payload.name,
    price: Number(payload.price),
    iat: Number(payload.iat),
    exp: Number(payload.exp),
  };
}
