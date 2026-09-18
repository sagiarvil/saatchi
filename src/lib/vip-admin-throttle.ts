import crypto from 'crypto';

const WINDOW_MS = 5 * 60 * 1000;
const MAX_FAILURES = 5;
const buckets = new Map<string, { failures: number; resetAt: number }>();

function clientKey(request: Request) {
  const source =
    request.headers.get('x-appengine-user-ip') ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('user-agent') ||
    'unknown';
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

function bucketFor(key: string, now: number) {
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    const next = { failures: 0, resetAt: now + WINDOW_MS };
    buckets.set(key, next);
    return next;
  }
  return current;
}

export function assertAdminLoginNotThrottled(request: Request, now = Date.now()) {
  const key = clientKey(request);
  const bucket = bucketFor(key, now);
  if (bucket.failures >= MAX_FAILURES) {
    const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    const error = new Error('Yönetim girişi geçici olarak sınırlandı.');
    (error as Error & { retryAfterSeconds?: number }).retryAfterSeconds = retryAfterSeconds;
    throw error;
  }
  return key;
}

export function recordAdminLoginFailure(request: Request, now = Date.now()) {
  const key = clientKey(request);
  const bucket = bucketFor(key, now);
  bucket.failures += 1;
  return { failures: bucket.failures, resetAt: bucket.resetAt };
}

export function clearAdminLoginFailures(request: Request) {
  buckets.delete(clientKey(request));
}

export function resetAdminLoginThrottleForTests() {
  buckets.clear();
}
