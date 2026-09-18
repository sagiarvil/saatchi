import crypto from 'crypto';

const TOTP_STEP_SECONDS = 30;
const TOTP_DIGITS = 6;

function decodeBase32(input: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const normalized = String(input || '').toUpperCase().replace(/[^A-Z2-7]/g, '');
  if (!normalized) return Buffer.alloc(0);

  let bits = '';
  for (const char of normalized) {
    const value = alphabet.indexOf(char);
    if (value < 0) throw new Error('VIP_ADMIN_TOTP_SECRET base32 formatı geçersiz.');
    bits += value.toString(2).padStart(5, '0');
  }

  const bytes: number[] = [];
  for (let index = 0; index + 8 <= bits.length; index += 8) {
    bytes.push(Number.parseInt(bits.slice(index, index + 8), 2));
  }
  return Buffer.from(bytes);
}

function totpAt(secret: Buffer, counter: number) {
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter));
  const digest = crypto.createHmac('sha1', secret).update(counterBuffer).digest();
  const offset = digest[digest.length - 1] & 0x0f;
  const binary =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);
  return String(binary % 10 ** TOTP_DIGITS).padStart(TOTP_DIGITS, '0');
}

function configuredTotpSecret() {
  const raw = String(process.env.VIP_ADMIN_TOTP_SECRET || '').trim();
  if (!raw) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('VIP_ADMIN_TOTP_SECRET production ortamında yapılandırılmamış.');
    }
    return null;
  }

  const decoded = decodeBase32(raw);
  if (decoded.length < 20) {
    throw new Error('VIP_ADMIN_TOTP_SECRET en az 160-bit olmalıdır.');
  }
  return decoded;
}

export function verifyAdminTotp(candidate: string, nowMs = Date.now()) {
  const secret = configuredTotpSecret();
  if (!secret) return true;

  const normalized = String(candidate || '').replace(/\D/g, '');
  if (!/^\d{6}$/.test(normalized)) return false;

  const baseCounter = Math.floor(nowMs / 1000 / TOTP_STEP_SECONDS);
  for (const drift of [-1, 0, 1]) {
    const expected = Buffer.from(totpAt(secret, baseCounter + drift), 'utf8');
    const actual = Buffer.from(normalized, 'utf8');
    if (expected.length === actual.length && crypto.timingSafeEqual(expected, actual)) return true;
  }
  return false;
}

export function generateTotpForTest(secretBase32: string, nowMs: number) {
  const secret = decodeBase32(secretBase32);
  if (secret.length < 20) throw new Error('Test TOTP secret yetersiz.');
  const counter = Math.floor(nowMs / 1000 / TOTP_STEP_SECONDS);
  return totpAt(secret, counter);
}
