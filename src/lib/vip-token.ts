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
  const [body, signature] = token.split('.');
  if (!body || !signature) throw new Error('VIP ödeme tokenı geçersiz.');

  const expected = crypto.createHmac('sha256', getSecret()).update(body).digest('hex');
  const actualBuffer = Buffer.from(signature, 'utf8');
  const expectedBuffer = Buffer.from(expected, 'utf8');
  if (actualBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(actualBuffer, expectedBuffer)) {
    throw new Error('VIP ödeme tokenı doğrulanamadı.');
  }

  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as VipTokenPayload;
  if (!payload.id || !payload.name || !Number.isFinite(Number(payload.price)) || Number(payload.price) <= 0) {
    throw new Error('VIP ödeme tokenı içeriği geçersiz.');
  }
  if (!payload.exp || Date.now() > payload.exp) throw new Error('VIP ödeme linkinin süresi dolmuş.');

  return { ...payload, price: Number(payload.price) };
}
