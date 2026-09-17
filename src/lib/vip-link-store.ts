import crypto from 'crypto';
import type { VipTokenPayload } from '@/lib/vip-token';

const COLLECTION = 'saatchiVipLinks';
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { booleanValue: boolean };

type FirestoreDocument = { fields?: Record<string, FirestoreValue> };
type FirestoreListResponse = { documents?: FirestoreDocument[]; nextPageToken?: string };

export type VipLinkRecord = {
  id: string;
  name: string;
  price: number;
  tokenHash: string;
  state: 'active' | 'revoked';
  createdAt: number;
  expiresAt: number;
  revokedAt: number;
};

function projectId() {
  if (process.env.GOOGLE_CLOUD_PROJECT) return process.env.GOOGLE_CLOUD_PROJECT;
  if (process.env.GCLOUD_PROJECT) return process.env.GCLOUD_PROJECT;
  try {
    const parsed = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
    if (parsed.projectId) return String(parsed.projectId);
  } catch {}
  return 'studio-7658156126-ffb8e';
}

function collectionUrl(pageSize = 50) {
  const safeSize = Math.min(100, Math.max(1, Math.floor(pageSize)));
  return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId())}/databases/(default)/documents/${COLLECTION}?pageSize=${safeSize}`;
}

function docUrl(id: string) {
  return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId())}/databases/(default)/documents/${COLLECTION}/${encodeURIComponent(id)}`;
}

async function accessToken() {
  const explicit = process.env.FIRESTORE_ACCESS_TOKEN;
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
  };
}

async function firestoreFetch(url: string, init: RequestInit) {
  const token = await accessToken();
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  });
  return response;
}

export function hashVipToken(token: string) {
  return crypto.createHash('sha256').update(String(token || ''), 'utf8').digest('hex');
}

export async function createVipLinkRecord(payload: VipTokenPayload, token: string) {
  const record: VipLinkRecord = {
    id: payload.id,
    name: payload.name,
    price: payload.price,
    tokenHash: hashVipToken(token),
    state: 'active',
    createdAt: payload.iat,
    expiresAt: payload.exp,
    revokedAt: 0,
  };

  const response = await firestoreFetch(docUrl(record.id), {
    method: 'PATCH',
    body: JSON.stringify(encode(record)),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`VIP link kalıcı kaydı oluşturulamadı (${response.status}): ${text.slice(0, 240)}`);
  }
  return record;
}

export async function getVipLinkRecord(id: string) {
  const response = await firestoreFetch(docUrl(id), { method: 'GET' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`VIP link durumu okunamadı (${response.status}).`);
  return decode(await response.json() as FirestoreDocument);
}

export async function listVipLinkRecords(limit = 50) {
  const response = await firestoreFetch(collectionUrl(limit), { method: 'GET' });
  if (!response.ok) throw new Error(`VIP link listesi okunamadı (${response.status}).`);
  const data = await response.json() as FirestoreListResponse;
  return (data.documents || [])
    .map(decode)
    .filter((record) => record.id.startsWith('VIP-SAATCHI-'))
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, Math.min(100, Math.max(1, Math.floor(limit))));
}

export async function assertVipLinkActive(payload: VipTokenPayload, token: string) {
  const record = await getVipLinkRecord(payload.id);
  if (!record) throw new Error('VIP ödeme linki aktif kayıtla eşleşmiyor.');
  if (record.state !== 'active' || record.revokedAt > 0) throw new Error('VIP ödeme linki iptal edilmiş.');
  if (record.expiresAt <= Date.now()) throw new Error('VIP ödeme linkinin süresi dolmuş.');
  if (record.tokenHash !== hashVipToken(token)) throw new Error('VIP ödeme linki kayıt bütünlüğü doğrulanamadı.');
  if (record.name !== payload.name || record.price !== Math.round(payload.price)) throw new Error('VIP ödeme linki kayıt içeriği uyuşmuyor.');
  return record;
}

export async function revokeVipLink(id: string) {
  const current = await getVipLinkRecord(id);
  if (!current) throw new Error('İptal edilecek VIP link kaydı bulunamadı.');
  if (current.state === 'revoked') return current;
  const next: VipLinkRecord = { ...current, state: 'revoked', revokedAt: Date.now() };
  const response = await firestoreFetch(docUrl(id), {
    method: 'PATCH',
    body: JSON.stringify(encode(next)),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`VIP link iptal kaydı yazılamadı (${response.status}): ${text.slice(0, 240)}`);
  }
  return next;
}
