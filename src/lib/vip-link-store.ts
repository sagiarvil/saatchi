import crypto from 'crypto';
import type { VipTokenPayload } from '@/lib/vip-token';

const COLLECTION = 'saatchiVipLinks';
const EXPECTED_PROJECT_ID = 'studio-7658156126-ffb8e';
let cachedAccessToken: { token: string; expiresAt: number } | null = null;
const PAYMENT_ATTEMPT_STALE_MS = 5 * 60 * 1000;

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { booleanValue: boolean };

type FirestoreDocument = {
  fields?: Record<string, FirestoreValue>;
  updateTime?: string;
};

type FirestoreQueryRow = { document?: FirestoreDocument };

export type VipPaymentState = 'idle' | 'creating' | 'ready' | 'uncertain';

export type VipLinkRecord = {
  id: string;
  name: string;
  price: number;
  tokenHash: string;
  state: 'active' | 'revoked';
  createdAt: number;
  expiresAt: number;
  revokedAt: number;
  paymentState: VipPaymentState;
  paymentAttemptId: string;
  paymentAttemptAt: number;
  paymentUpdatedAt: number;
  reconciliationReference: string;
  reconciliationReason: string;
  reconciledAt: number;
  paymentProviderOrderId: string;
  paymentEvidenceId: string;
  paymentLastError: string;
  legalAcceptedAt: number;
  legalDocumentVersions: string;
};

function projectId() {
  let resolved = '';
  if (process.env.GOOGLE_CLOUD_PROJECT) resolved = process.env.GOOGLE_CLOUD_PROJECT;
  else if (process.env.GCLOUD_PROJECT) resolved = process.env.GCLOUD_PROJECT;
  else {
    try {
      const parsed = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
      if (parsed.projectId) resolved = String(parsed.projectId);
    } catch {}
  }
  if (!resolved) throw new Error('Firestore proje kimliği çalışma ortamında bulunamadı.');
  if (resolved !== EXPECTED_PROJECT_ID) throw new Error(`Beklenmeyen Firestore proje kimliği: ${resolved}.`);
  return resolved;
}

function databaseRoot() {
  return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId())}/databases/(default)/documents`;
}

function docUrl(id: string) {
  return `${databaseRoot()}/${COLLECTION}/${encodeURIComponent(id)}`;
}

function withUpdateTimePrecondition(id: string, updateTime: string) {
  const url = new URL(docUrl(id));
  url.searchParams.set('currentDocument.updateTime', updateTime);
  return url.toString();
}

function withCreatePrecondition(id: string) {
  const url = new URL(docUrl(id));
  url.searchParams.set('currentDocument.exists', 'false');
  return url.toString();
}

function runQueryUrl() {
  return `${databaseRoot()}:runQuery`;
}

async function accessToken() {
  const explicit = process.env.FIRESTORE_ACCESS_TOKEN;
  if (process.env.NODE_ENV === 'production' && explicit) {
    throw new Error('FIRESTORE_ACCESS_TOKEN production ortamında kullanılamaz; workload identity kullanılmalıdır.');
  }
  if (explicit) return explicit;
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) return cachedAccessToken.token;

  const response = await fetch('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token', {
    headers: { 'Metadata-Flavor': 'Google' },
    cache: 'no-store',
    signal: AbortSignal.timeout(2500),
  });
  if (!response.ok) throw new Error(`Firestore kimlik doğrulaması başarısız (${response.status}).`);
  const data = await response.json() as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error('Firestore erişim tokenı alınamadı.');
  cachedAccessToken = {
    token: data.access_token,
    expiresAt: Date.now() + Math.max(60, Number(data.expires_in || 300)) * 1000,
  };
  return cachedAccessToken.token;
}

function encode(record: VipLinkRecord): FirestoreDocument {
  return {
    fields: {
      id: { stringValue: record.id },
      name: { stringValue: record.name },
      price: { integerValue: String(Math.round(record.price)) },
      tokenHash: { stringValue: record.tokenHash },
      state: { stringValue: record.state },
      createdAt: { integerValue: String(record.createdAt) },
      expiresAt: { integerValue: String(record.expiresAt) },
      revokedAt: { integerValue: String(record.revokedAt) },
      paymentState: { stringValue: record.paymentState },
      paymentAttemptId: { stringValue: record.paymentAttemptId },
      paymentAttemptAt: { integerValue: String(record.paymentAttemptAt) },
      paymentUpdatedAt: { integerValue: String(record.paymentUpdatedAt) },
      reconciliationReference: { stringValue: record.reconciliationReference },
      reconciliationReason: { stringValue: record.reconciliationReason },
      reconciledAt: { integerValue: String(record.reconciledAt) },
      paymentProviderOrderId: { stringValue: record.paymentProviderOrderId },
      paymentEvidenceId: { stringValue: record.paymentEvidenceId },
      paymentLastError: { stringValue: record.paymentLastError },
      legalAcceptedAt: { integerValue: String(record.legalAcceptedAt) },
      legalDocumentVersions: { stringValue: record.legalDocumentVersions },
    },
  };
}

function fieldString(doc: FirestoreDocument, key: string) {
  const value = doc.fields?.[key];
  return value && 'stringValue' in value ? String(value.stringValue || '') : '';
}

function fieldNumber(doc: FirestoreDocument, key: string) {
  const value = doc.fields?.[key];
  return value && 'integerValue' in value ? Number(value.integerValue || 0) : 0;
}

function decodePaymentState(doc: FirestoreDocument): VipPaymentState {
  const value = fieldString(doc, 'paymentState');
  return value === 'creating' || value === 'ready' || value === 'uncertain' ? value : 'idle';
}

function decode(doc: FirestoreDocument): VipLinkRecord {
  const state = fieldString(doc, 'state');
  return {
    id: fieldString(doc, 'id'),
    name: fieldString(doc, 'name'),
    price: fieldNumber(doc, 'price'),
    tokenHash: fieldString(doc, 'tokenHash'),
    state: state === 'revoked' ? 'revoked' : 'active',
    createdAt: fieldNumber(doc, 'createdAt'),
    expiresAt: fieldNumber(doc, 'expiresAt'),
    revokedAt: fieldNumber(doc, 'revokedAt'),
    paymentState: decodePaymentState(doc),
    paymentAttemptId: fieldString(doc, 'paymentAttemptId'),
    paymentAttemptAt: fieldNumber(doc, 'paymentAttemptAt'),
    paymentUpdatedAt: fieldNumber(doc, 'paymentUpdatedAt'),
    reconciliationReference: fieldString(doc, 'reconciliationReference'),
    reconciliationReason: fieldString(doc, 'reconciliationReason'),
    reconciledAt: fieldNumber(doc, 'reconciledAt'),
    paymentProviderOrderId: fieldString(doc, 'paymentProviderOrderId'),
    paymentEvidenceId: fieldString(doc, 'paymentEvidenceId'),
    paymentLastError: fieldString(doc, 'paymentLastError'),
    legalAcceptedAt: fieldNumber(doc, 'legalAcceptedAt'),
    legalDocumentVersions: fieldString(doc, 'legalDocumentVersions'),
  };
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

async function getVipLinkSnapshot(id: string) {
  const response = await firestoreFetch(docUrl(id), { method: 'GET' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`VIP link durumu okunamadı (${response.status}).`);
  const document = await response.json() as FirestoreDocument;
  if (!document.updateTime) throw new Error('VIP link sürüm bilgisi alınamadı.');
  return { record: decode(document), updateTime: document.updateTime };
}

async function conditionalWrite(record: VipLinkRecord, updateTime: string, conflictMessage: string) {
  const response = await firestoreFetch(withUpdateTimePrecondition(record.id, updateTime), {
    method: 'PATCH',
    body: JSON.stringify(encode(record)),
  });
  if (response.status === 409 || response.status === 412) {
    throw new Error(conflictMessage);
  }
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`VIP link durumu güncellenemedi (${response.status}): ${text.slice(0, 180)}`);
  }
  return record;
}

export function hashVipToken(token: string) {
  return crypto.createHash('sha256').update(String(token || ''), 'utf8').digest('hex');
}

function safeEqualHex(left: string, right: string) {
  try {
    const a = Buffer.from(left, 'hex');
    const b = Buffer.from(right, 'hex');
    return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function validateVipLinkRecord(record: VipLinkRecord | null, payload: VipTokenPayload, token: string, now = Date.now()) {
  if (!record) throw new Error('VIP ödeme linki aktif kayıtla eşleşmiyor.');
  if (record.id !== payload.id) throw new Error('VIP ödeme linki kayıt kimliği uyuşmuyor.');
  if (record.state !== 'active' || record.revokedAt > 0) throw new Error('VIP ödeme linki iptal edilmiş.');
  if (record.expiresAt <= now || payload.exp <= now) throw new Error('VIP ödeme linkinin süresi dolmuş.');
  if (record.expiresAt !== payload.exp) throw new Error('VIP ödeme linki süre bütünlüğü doğrulanamadı.');
  if (!safeEqualHex(record.tokenHash, hashVipToken(token))) throw new Error('VIP ödeme linki kayıt bütünlüğü doğrulanamadı.');
  if (record.name !== payload.name || record.price !== Math.round(payload.price)) throw new Error('VIP ödeme linki kayıt içeriği uyuşmuyor.');
  return record;
}

export function assertVipPaymentStatePayable(record: Pick<VipLinkRecord, 'paymentState'>) {
  if (record.paymentState === 'idle') return true;
  if (record.paymentState === 'creating') throw new Error('Bu VIP link için ödeme oturumu zaten oluşturuluyor.');
  if (record.paymentState === 'ready') throw new Error('Bu VIP link için ödeme oturumu daha önce oluşturuldu.');
  throw new Error('Önceki ödeme denemesinin sonucu belirsiz. Yeni tahsilat öncesi banka işlemi mutabakatı gerekir.');
}

export async function createVipLinkRecord(payload: VipTokenPayload, token: string) {
  const record: VipLinkRecord = {
    id: payload.id,
    name: payload.name,
    price: Math.round(payload.price),
    tokenHash: hashVipToken(token),
    state: 'active',
    createdAt: payload.iat,
    expiresAt: payload.exp,
    revokedAt: 0,
    paymentState: 'idle',
    paymentAttemptId: '',
    paymentAttemptAt: 0,
    paymentUpdatedAt: 0,
    reconciliationReference: '',
    reconciliationReason: '',
    reconciledAt: 0,
    paymentProviderOrderId: '',
    paymentEvidenceId: '',
    paymentLastError: '',
    legalAcceptedAt: 0,
    legalDocumentVersions: '',
  };

  const response = await firestoreFetch(withCreatePrecondition(record.id), {
    method: 'PATCH',
    body: JSON.stringify(encode(record)),
  });
  if (response.status === 409 || response.status === 412) {
    throw new Error('VIP link kimliği daha önce kullanılmış.');
  }
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`VIP link kalıcı kaydı oluşturulamadı (${response.status}): ${text.slice(0, 240)}`);
  }
  return record;
}

export async function getVipLinkRecord(id: string) {
  const snapshot = await getVipLinkSnapshot(id);
  return snapshot?.record || null;
}

export async function listVipLinkRecords(limit = 50) {
  const safeLimit = Math.min(100, Math.max(1, Math.floor(limit)));
  const response = await firestoreFetch(runQueryUrl(), {
    method: 'POST',
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: COLLECTION }],
        orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
        limit: safeLimit,
      },
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`VIP link listesi okunamadı (${response.status}): ${text.slice(0, 180)}`);
  }
  const rows = await response.json() as FirestoreQueryRow[];
  return (Array.isArray(rows) ? rows : [])
    .map((row) => row.document)
    .filter((doc): doc is FirestoreDocument => Boolean(doc))
    .map(decode)
    .filter((record) => record.id.startsWith('VIP-SAATCHI-'));
}

export async function assertVipLinkActive(payload: VipTokenPayload, token: string) {
  const record = await getVipLinkRecord(payload.id);
  return validateVipLinkRecord(record, payload, token);
}

export async function claimVipPaymentAttempt(
  payload: VipTokenPayload,
  token: string,
  attemptId: string,
  legalDocumentVersions: Record<string, string>
) {
  const snapshot = await getVipLinkSnapshot(payload.id);
  const record = validateVipLinkRecord(snapshot?.record || null, payload, token);
  if (!snapshot) throw new Error('VIP ödeme linki aktif kayıtla eşleşmiyor.');
  assertVipPaymentStatePayable(record);

  const now = Date.now();
  const next: VipLinkRecord = {
    ...record,
    paymentState: 'creating',
    paymentAttemptId: attemptId,
    paymentAttemptAt: now,
    paymentUpdatedAt: now,
    legalAcceptedAt: now,
    legalDocumentVersions: JSON.stringify(legalDocumentVersions),
  };

  return conditionalWrite(
    next,
    snapshot.updateTime,
    'Bu VIP link için eşzamanlı başka bir ödeme denemesi başlatıldı.'
  );
}

export async function finalizeVipPaymentAttempt(
  id: string,
  attemptId: string,
  nextState: Extract<VipPaymentState, 'ready' | 'uncertain'>,
  metadata: { providerOrderId?: string; evidenceId?: string; lastError?: string } = {}
) {
  const snapshot = await getVipLinkSnapshot(id);
  if (!snapshot) throw new Error('VIP ödeme denemesi kaydı bulunamadı.');
  const current = snapshot.record;
  if (current.paymentAttemptId !== attemptId || current.paymentState !== 'creating') {
    throw new Error('VIP ödeme denemesi sürüm bütünlüğü doğrulanamadı.');
  }

  const next: VipLinkRecord = {
    ...current,
    paymentState: nextState,
    paymentUpdatedAt: Date.now(),
    paymentProviderOrderId: String(metadata.providerOrderId || current.paymentProviderOrderId || '').slice(0, 160),
    paymentEvidenceId: String(metadata.evidenceId || current.paymentEvidenceId || '').slice(0, 160),
    paymentLastError: String(metadata.lastError || '').slice(0, 500),
  };

  return conditionalWrite(
    next,
    snapshot.updateTime,
    'VIP ödeme denemesi eşzamanlı olarak değiştirildi.'
  );
}

export function assertVipPaymentReconciliationResettable(
  record: Pick<VipLinkRecord, 'paymentState' | 'paymentAttemptAt'>,
  now = Date.now()
) {
  const staleCreating =
    record.paymentState === 'creating' &&
    record.paymentAttemptAt > 0 &&
    now - record.paymentAttemptAt >= PAYMENT_ATTEMPT_STALE_MS;

  if (record.paymentState !== 'uncertain' && !staleCreating) {
    throw new Error('Yalnız sonucu belirsiz veya zaman aşımına uğramış ödeme denemeleri mutabakat sonrası yeniden açılabilir.');
  }
  return true;
}

export async function resetUncertainVipPaymentAttempt(
  id: string,
  reconciliationReference: string,
  reconciliationReason: string
) {
  const snapshot = await getVipLinkSnapshot(id);
  if (!snapshot) throw new Error('Mutabakat yapılacak VIP link kaydı bulunamadı.');

  const reference = String(reconciliationReference || '').trim().slice(0, 160);
  const reason = String(reconciliationReason || '').trim().slice(0, 500);
  if (reference.length < 4) throw new Error('Banka/sağlayıcı mutabakat referansı zorunludur.');
  if (reason.length < 10) throw new Error('Mutabakat açıklaması zorunludur.');

  assertVipPaymentReconciliationResettable(snapshot.record);

  const now = Date.now();
  const next: VipLinkRecord = {
    ...snapshot.record,
    paymentState: 'idle',
    paymentAttemptId: '',
    paymentAttemptAt: 0,
    paymentUpdatedAt: now,
    reconciliationReference: reference,
    reconciliationReason: reason,
    reconciledAt: now,
    paymentLastError: '',
  };

  return conditionalWrite(
    next,
    snapshot.updateTime,
    'VIP ödeme mutabakat kaydı eşzamanlı olarak değiştirildi.'
  );
}

export function assertVipLinkRevocable(record: Pick<VipLinkRecord, 'paymentState'>) {
  if (record.paymentState !== 'idle') {
    throw new Error('Ödeme denemesi başlamış VIP link, banka/sağlayıcı mutabakatı olmadan doğrudan iptal edilemez.');
  }
  return true;
}

export async function revokeVipLink(id: string) {
  const snapshot = await getVipLinkSnapshot(id);
  if (!snapshot) throw new Error('İptal edilecek VIP link kaydı bulunamadı.');
  if (snapshot.record.state === 'revoked') return snapshot.record;
  assertVipLinkRevocable(snapshot.record);

  const next: VipLinkRecord = {
    ...snapshot.record,
    state: 'revoked',
    revokedAt: Date.now(),
    paymentUpdatedAt: Date.now(),
  };

  return conditionalWrite(
    next,
    snapshot.updateTime,
    'VIP link durumu eşzamanlı olarak değiştirildi; tekrar okuyup deneyin.'
  );
}
