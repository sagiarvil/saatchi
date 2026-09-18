import crypto from 'crypto';

const WINDOW_MS = 5 * 60 * 1000;
const MAX_FAILURES = 5;
const COLLECTION = 'saatchiAdminLoginThrottle';
const EXPECTED_PROJECT_ID = 'studio-7658156126-ffb8e';
const memoryBuckets = new Map<string, { failures: number; resetAt: number }>();
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

function useMemoryThrottle() {
  return (
    process.env.NODE_ENV !== 'production' ||
    (process.env.CI === 'true' && process.env.SAATCHI_ADMIN_THROTTLE_TEST_MODE === 'true')
  );
}

type DurableBucket = {
  failures: number;
  resetAt: number;
  updateTime: string;
};

function projectId() {
  let resolved = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || '';
  if (!resolved) {
    try {
      const parsed = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
      resolved = String(parsed.projectId || '');
    } catch {}
  }
  if (!resolved) throw new Error('Admin throttle Firestore proje kimliği bulunamadı.');
  if (resolved !== EXPECTED_PROJECT_ID) {
    throw new Error('Admin throttle beklenmeyen Firestore projesine bağlanamaz.');
  }
  return resolved;
}

function databaseRoot() {
  return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId())}/databases/(default)/documents`;
}

function trustedSource(request: Request) {
  const forwarded = String(request.headers.get('x-forwarded-for') || '')
    .split(',')[0]
    .trim()
    .slice(0, 128);
  return (
    request.headers.get('x-appengine-user-ip') ||
    request.headers.get('cf-connecting-ip') ||
    forwarded ||
    request.headers.get('user-agent') ||
    'unknown'
  );
}

function clientKey(request: Request) {
  return crypto.createHash('sha256').update(String(trustedSource(request)), 'utf8').digest('hex');
}

function docUrl(key: string) {
  return `${databaseRoot()}/${COLLECTION}/${encodeURIComponent(key)}`;
}

async function accessToken() {
  if (useMemoryThrottle()) {
    const explicit = String(process.env.FIRESTORE_ACCESS_TOKEN || '');
    if (explicit) return explicit;
  }

  if (process.env.NODE_ENV === 'production' && process.env.FIRESTORE_ACCESS_TOKEN) {
    throw new Error('Admin throttle production ortamında statik Firestore token kullanamaz.');
  }

  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedAccessToken.token;
  }

  const response = await fetch(
    'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
    {
      headers: { 'Metadata-Flavor': 'Google' },
      cache: 'no-store',
      signal: AbortSignal.timeout(2500),
    }
  );
  if (!response.ok) throw new Error('Admin throttle service-account kimliği alınamadı.');
  const data = await response.json() as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error('Admin throttle service-account tokenı alınamadı.');

  cachedAccessToken = {
    token: data.access_token,
    expiresAt: Date.now() + Math.max(60, Number(data.expires_in || 300)) * 1000,
  };
  return cachedAccessToken.token;
}

async function firestoreFetch(url: string, init: RequestInit) {
  const token = await accessToken();
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  });
}

function memoryBucket(key: string, now: number) {
  const current = memoryBuckets.get(key);
  if (!current || current.resetAt <= now) {
    const next = { failures: 0, resetAt: now + WINDOW_MS };
    memoryBuckets.set(key, next);
    return next;
  }
  return current;
}

function throttleError(resetAt: number, now: number) {
  const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000));
  const error = new Error('Yönetim girişi geçici olarak sınırlandı.');
  (error as Error & { retryAfterSeconds?: number }).retryAfterSeconds = retryAfterSeconds;
  return error;
}

async function readDurableBucket(key: string): Promise<DurableBucket | null> {
  const response = await firestoreFetch(docUrl(key), { method: 'GET' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Admin throttle durumu okunamadı.');

  const document = await response.json() as {
    fields?: {
      failures?: { integerValue?: string };
      resetAt?: { integerValue?: string };
    };
    updateTime?: string;
  };
  if (!document.updateTime) throw new Error('Admin throttle sürüm bilgisi alınamadı.');

  return {
    failures: Number(document.fields?.failures?.integerValue || 0),
    resetAt: Number(document.fields?.resetAt?.integerValue || 0),
    updateTime: document.updateTime,
  };
}

function bucketBody(failures: number, resetAt: number) {
  return JSON.stringify({
    fields: {
      failures: { integerValue: String(failures) },
      resetAt: { integerValue: String(resetAt) },
      updatedAt: { integerValue: String(Date.now()) },
    },
  });
}

async function recordDurableFailure(key: string, now: number) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const current = await readDurableBucket(key);
    const expired = !current || current.resetAt <= now;
    const failures = expired ? 1 : current.failures + 1;
    const resetAt = expired ? now + WINDOW_MS : current.resetAt;

    const url = new URL(docUrl(key));
    if (current) url.searchParams.set('currentDocument.updateTime', current.updateTime);
    else url.searchParams.set('currentDocument.exists', 'false');

    const response = await firestoreFetch(url.toString(), {
      method: 'PATCH',
      body: bucketBody(failures, resetAt),
    });

    if (response.ok) return { failures, resetAt };
    if (response.status === 409 || response.status === 412) continue;
    throw new Error('Admin throttle başarısız giriş kaydı yazılamadı.');
  }

  throw new Error('Admin throttle eşzamanlı güncelleme sınırı aşıldı.');
}

export async function assertAdminLoginNotThrottled(request: Request, now = Date.now()) {
  const key = clientKey(request);

  if (useMemoryThrottle()) {
    const bucket = memoryBucket(key, now);
    if (bucket.failures >= MAX_FAILURES) throw throttleError(bucket.resetAt, now);
    return key;
  }

  const bucket = await readDurableBucket(key);
  if (!bucket || bucket.resetAt <= now) return key;
  if (bucket.failures >= MAX_FAILURES) throw throttleError(bucket.resetAt, now);
  return key;
}

export async function recordAdminLoginFailure(request: Request, now = Date.now()) {
  const key = clientKey(request);

  if (useMemoryThrottle()) {
    const bucket = memoryBucket(key, now);
    bucket.failures += 1;
    return { failures: bucket.failures, resetAt: bucket.resetAt };
  }

  return recordDurableFailure(key, now);
}

export async function clearAdminLoginFailures(request: Request) {
  const key = clientKey(request);

  if (useMemoryThrottle()) {
    memoryBuckets.delete(key);
    return;
  }

  const response = await firestoreFetch(docUrl(key), { method: 'DELETE' });
  if (response.status !== 404 && !response.ok) {
    throw new Error('Admin throttle başarı kaydı temizlenemedi.');
  }
}

export function resetAdminLoginThrottleForTests() {
  memoryBuckets.clear();
  cachedAccessToken = null;
}
