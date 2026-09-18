import assert from 'node:assert/strict';

process.env.VIP_PAYMENT_SECRET = 'P'.repeat(64);
process.env.VIP_ADMIN_SESSION_SECRET = 'S'.repeat(64);
process.env.VIP_ADMIN_KEY = 'admin-key-0001-strong-32-chars-minimum';
process.env.GOOGLE_CLOUD_PROJECT = 'studio-7658156126-ffb8e';

const session = await import('../src/lib/vip-admin-session.ts');
const tokenLib = await import('../src/lib/vip-token.ts');
const store = await import('../src/lib/vip-link-store.ts');
const paymentBoundary = await import('../src/lib/payment-boundary.ts');
const vipInput = await import('../src/lib/vip-input.ts');
const adminTotp = await import('../src/lib/vip-admin-totp.ts');
const adminThrottle = await import('../src/lib/vip-admin-throttle.ts');
const paymentSessionConsistency = await import('../src/lib/payment-session-consistency.ts');

function expectThrow(fn, pattern) {
  let thrown = null;
  try { fn(); } catch (error) { thrown = error; }
  assert.ok(thrown, `Expected error matching ${pattern}`);
  assert.match(String(thrown?.message || thrown), pattern);
}

const adminSession = session.createAdminSession();
assert.ok(adminSession.token.includes('.'));
assert.equal(session.verifyAdminSessionToken(adminSession.token).v, 2);

const totpSecret = 'JBSWY3DPEHPK3PXPJBSWY3DPEHPK3PXP';
process.env.VIP_ADMIN_TOTP_SECRET = totpSecret;
const totpNow = 1_900_000_000_000;
const validOtp = adminTotp.generateTotpForTest(totpSecret, totpNow);
assert.equal(adminTotp.verifyAdminTotp(validOtp, totpNow), true);
assert.equal(adminTotp.verifyAdminTotp('000000', totpNow), validOtp === '000000');
assert.equal(adminTotp.verifyAdminTotp('12345', totpNow), false);
process.env.VIP_ADMIN_TOTP_SECRET = 'INVALID!SECRET';
expectThrow(() => adminTotp.verifyAdminTotp('123456', totpNow), /base32 formatı geçersiz/i);
process.env.VIP_ADMIN_TOTP_SECRET = totpSecret;

adminThrottle.resetAdminLoginThrottleForTests();
const throttleRequest = new Request('https://saatchi.watch/api/admin-session', {
  method: 'POST',
  headers: { 'x-appengine-user-ip': '203.0.113.10' },
});
for (let index = 0; index < 5; index += 1) await adminThrottle.recordAdminLoginFailure(throttleRequest, 1_900_000_000_000);
await assert.rejects(
  () => adminThrottle.assertAdminLoginNotThrottled(throttleRequest, 1_900_000_000_001),
  /geçici olarak sınırlandı/i
);
adminThrottle.resetAdminLoginThrottleForTests();
await assert.doesNotReject(() => adminThrottle.assertAdminLoginNotThrottled(throttleRequest, 1_900_000_000_001));

// Production durable throttle simulation: metadata identity + Firestore CAS must preserve failures.
const throttleOriginalFetch = globalThis.fetch;
const throttleOriginalEnv = process.env.NODE_ENV;
let throttleDoc = null;
let throttleVersion = 1;
globalThis.fetch = async (input, init = {}) => {
  const url = new URL(String(input));
  const method = String(init.method || 'GET').toUpperCase();

  if (url.hostname === 'metadata.google.internal') {
    return new Response(JSON.stringify({ access_token: 'runtime-service-account-token', expires_in: 300 }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  if (url.hostname === 'firestore.googleapis.com') {
    if (method === 'GET') {
      if (!throttleDoc) return new Response('{}', { status: 404 });
      return new Response(JSON.stringify({ ...throttleDoc, updateTime: `v${throttleVersion}` }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (method === 'PATCH') {
      const expected = url.searchParams.get('currentDocument.updateTime');
      const createOnly = url.searchParams.get('currentDocument.exists') === 'false';
      if (createOnly && throttleDoc) return new Response('{}', { status: 412 });
      if (expected && expected !== `v${throttleVersion}`) return new Response('{}', { status: 412 });
      throttleDoc = JSON.parse(String(init.body || '{}'));
      throttleVersion += 1;
      return new Response(JSON.stringify({ ...throttleDoc, updateTime: `v${throttleVersion}` }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (method === 'DELETE') {
      throttleDoc = null;
      throttleVersion += 1;
      return new Response('', { status: 204 });
    }
  }

  throw new Error(`Unexpected durable throttle target: ${url.toString()}`);
};

try {
  process.env.NODE_ENV = 'production';
  delete process.env.FIRESTORE_ACCESS_TOKEN;
  adminThrottle.resetAdminLoginThrottleForTests();

  for (let index = 0; index < 5; index += 1) {
    await adminThrottle.recordAdminLoginFailure(throttleRequest, 1_900_000_100_000);
  }
  await assert.rejects(
    () => adminThrottle.assertAdminLoginNotThrottled(throttleRequest, 1_900_000_100_001),
    /geçici olarak sınırlandı/i
  );

  await adminThrottle.clearAdminLoginFailures(throttleRequest);
  await assert.doesNotReject(
    () => adminThrottle.assertAdminLoginNotThrottled(throttleRequest, 1_900_000_100_002)
  );
} finally {
  globalThis.fetch = throttleOriginalFetch;
  process.env.NODE_ENV = throttleOriginalEnv || 'test';
  adminThrottle.resetAdminLoginThrottleForTests();
}

const [body, signature] = adminSession.token.split('.');
const tamperedSignature = `${signature.slice(0, -1)}${signature.endsWith('a') ? 'b' : 'a'}`;
expectThrow(() => session.verifyAdminSessionToken(`${body}.${tamperedSignature}`), /doğrulanamadı/i);

process.env.VIP_ADMIN_KEY = 'admin-key-0002-rotated-32-chars-minimum';
expectThrow(() => session.verifyAdminSessionToken(adminSession.token), /doğrulanamadı/i);
process.env.VIP_ADMIN_KEY = 'admin-key-0001-strong-32-chars-minimum';
assert.equal(session.verifyAdminSessionToken(adminSession.token).v, 2);

const originalNodeEnv = process.env.NODE_ENV;
process.env.NODE_ENV = 'production';
process.env.VIP_ADMIN_SESSION_SECRET = process.env.VIP_PAYMENT_SECRET;
expectThrow(() => session.createAdminSession(), /bağımsız olmalıdır/i);
process.env.VIP_ADMIN_SESSION_SECRET = 'S'.repeat(64);
process.env.NODE_ENV = originalNodeEnv || 'test';

assert.equal(vipInput.parseVipAmount(123456), 123456);
assert.equal(vipInput.parseVipAmount('1.250.000'), 1250000);
assert.ok(Number.isNaN(vipInput.parseVipAmount(123456.78)));
assert.ok(Number.isNaN(vipInput.parseVipAmount('123.45')));
assert.ok(Number.isNaN(vipInput.parseVipAmount('-100')));
assert.equal(vipInput.normalizeVipTitle('  Rolex\u0000   Submariner  '), 'Rolex Submariner');
assert.doesNotThrow(() => paymentBoundary.assertNoCardholderData({ token: 'opaque', custName: 'Test' }));
assert.doesNotThrow(() => paymentBoundary.assertAllowedObjectKeys(
  { token: 'opaque', custName: 'Test' },
  ['token', 'custName'],
  'Ödeme isteği'
));
expectThrow(
  () => paymentBoundary.assertAllowedObjectKeys(
    { token: 'opaque', arbitrary: '4111111111111111' },
    ['token'],
    'Ödeme isteği'
  ),
  /beklenmeyen alan/i
);
expectThrow(() => paymentBoundary.assertNoCardholderData({ cardNumber: '4111111111111111' }), /Kart numarası/i);
expectThrow(() => paymentBoundary.assertNoCardholderData({ nested: { cvv: '123' } }), /Kart numarası/i);

assert.equal(
  paymentSessionConsistency.assertProviderSessionConsistency(
    { merchant_oid: 'ORD-123', amount: 250000, currency: 'TRY', provider: 'KUVEYTTURK' },
    { amount: 250000, currency: 'TRY', provider: 'KUVEYTTURK' }
  ),
  'ORD-123'
);
expectThrow(
  () => paymentSessionConsistency.assertProviderSessionConsistency(
    { amount: 250000, currency: 'TRY' },
    { amount: 250000, currency: 'TRY' }
  ),
  /sipariş referansı/i
);
expectThrow(
  () => paymentSessionConsistency.assertProviderSessionConsistency(
    { merchant_oid: 'ORD-123', amount: 250001, currency: 'TRY' },
    { amount: 250000, currency: 'TRY' }
  ),
  /tutarı sipariş tutarıyla uyuşmuyor/i
);
expectThrow(
  () => paymentSessionConsistency.assertProviderSessionConsistency(
    { merchant_oid: 'ORD-123', amount: 250000, currency: 'USD' },
    { amount: 250000, currency: 'TRY' }
  ),
  /para birimi/i
);

const now = Date.now();
const payload = {
  id: 'VIP-SAATCHI-TEST-001',
  name: 'Test Saat',
  price: 123456,
  iat: now,
  exp: now + 60_000,
};
const token = tokenLib.signVipToken(payload);
assert.deepEqual(tokenLib.verifyVipToken(token), payload);

const [tokenBody, tokenSignature] = token.split('.');
const tamperedToken = `${tokenBody}.${tokenSignature.slice(0, -1)}${tokenSignature.endsWith('a') ? 'b' : 'a'}`;
expectThrow(() => tokenLib.verifyVipToken(tamperedToken), /doğrulanamadı/i);

const activeRecord = {
  id: payload.id,
  name: payload.name,
  price: payload.price,
  tokenHash: store.hashVipToken(token),
  state: 'active',
  createdAt: payload.iat,
  expiresAt: payload.exp,
  revokedAt: 0,
  paymentState: 'idle',
  paymentAttemptId: '',
  paymentAttemptAt: 0,
  paymentUpdatedAt: 0,
};
assert.equal(store.validateVipLinkRecord(activeRecord, payload, token, now).id, payload.id);
expectThrow(() => store.validateVipLinkRecord({ ...activeRecord, state: 'revoked', revokedAt: now }, payload, token, now), /iptal/i);
expectThrow(() => store.validateVipLinkRecord({ ...activeRecord, expiresAt: now - 1 }, { ...payload, exp: now - 1 }, token, now), /süresi dolmuş/i);
expectThrow(() => store.validateVipLinkRecord({ ...activeRecord, price: payload.price + 1 }, payload, token, now), /içeriği uyuşmuyor/i);
expectThrow(() => store.validateVipLinkRecord({ ...activeRecord, tokenHash: '0'.repeat(64) }, payload, token, now), /bütünlüğü/i);
expectThrow(() => store.validateVipLinkRecord({ ...activeRecord, expiresAt: payload.exp + 1 }, payload, token, now), /süre bütünlüğü/i);

assert.equal(store.assertVipPaymentStatePayable(activeRecord), true);
assert.equal(store.assertVipLinkRevocable({ paymentState: 'idle' }), true);
expectThrow(() => store.assertVipLinkRevocable({ paymentState: 'creating' }), /mutabakatı olmadan doğrudan iptal/i);
expectThrow(() => store.assertVipLinkRevocable({ paymentState: 'ready' }), /mutabakatı olmadan doğrudan iptal/i);
expectThrow(() => store.assertVipLinkRevocable({ paymentState: 'uncertain' }), /mutabakatı olmadan doğrudan iptal/i);
expectThrow(() => store.assertVipPaymentStatePayable({ paymentState: 'creating' }), /zaten oluşturuluyor/i);
expectThrow(() => store.assertVipPaymentStatePayable({ paymentState: 'ready' }), /daha önce oluşturuldu/i);
expectThrow(() => store.assertVipPaymentStatePayable({ paymentState: 'uncertain' }), /mutabakat/i);
assert.equal(store.assertVipPaymentReconciliationResettable({ paymentState: 'uncertain', paymentAttemptAt: now }), true);
assert.equal(
  store.assertVipPaymentReconciliationResettable(
    { paymentState: 'creating', paymentAttemptAt: now - 6 * 60 * 1000 },
    now
  ),
  true
);
expectThrow(
  () => store.assertVipPaymentReconciliationResettable({ paymentState: 'ready', paymentAttemptAt: now }, now),
  /Yalnız sonucu belirsiz veya zaman aşımına uğramış/i
);
expectThrow(
  () => store.assertVipPaymentReconciliationResettable({ paymentState: 'creating', paymentAttemptAt: now - 60_000 }, now),
  /Yalnız sonucu belirsiz veya zaman aşımına uğramış/i
);

const sameOriginRequest = new Request('https://saatchi.watch/api/vip-link', {
  method: 'POST',
  headers: { origin: 'https://saatchi.watch', 'sec-fetch-site': 'same-origin' },
});
assert.doesNotThrow(() => session.assertSameOriginMutation(sameOriginRequest));

const crossOriginRequest = new Request('https://saatchi.watch/api/vip-link', {
  method: 'POST',
  headers: { origin: 'https://attacker.example', 'sec-fetch-site': 'cross-site' },
});
expectThrow(() => session.assertSameOriginMutation(crossOriginRequest), /Çapraz kaynak/i);

const provenanceLessRequest = new Request('https://saatchi.watch/api/vip-link', { method: 'POST' });
expectThrow(() => session.assertSameOriginMutation(provenanceLessRequest), /kaynak doğrulamasından/i);

process.env.NODE_ENV = 'production';
assert.equal(session.expectedPublicOrigin(new Request('https://evil.example/api/payment')), 'https://saatchi.watch');
process.env.SAATCHI_PUBLIC_ORIGIN = 'https://evil.example';
expectThrow(
  () => session.expectedPublicOrigin(new Request('https://saatchi.watch/api/payment')),
  /Beklenmeyen production public origin/i
);
delete process.env.SAATCHI_PUBLIC_ORIGIN;
process.env.NODE_ENV = 'test';

const allowlist = 'https://secure.example-bank.test,https://3ds.example-bank.test';
const previousNodeEnvForHandoff = process.env.NODE_ENV;
process.env.NODE_ENV = 'production';
expectThrow(
  () => paymentBoundary.assertPaymentHandoffConfiguration(''),
  /izin listesi production ortamında yapılandırılmamış/i
);
assert.equal(paymentBoundary.assertPaymentHandoffConfiguration(allowlist).size, 2);
process.env.NODE_ENV = previousNodeEnvForHandoff || 'test';
assert.equal(
  paymentBoundary.assertPaymentUrlAllowed('https://secure.example-bank.test/pay/123', allowlist),
  'https://secure.example-bank.test/pay/123'
);
expectThrow(
  () => paymentBoundary.assertPaymentUrlAllowed('http://secure.example-bank.test/pay/123', allowlist),
  /güvenli olmayan/i
);
expectThrow(
  () => paymentBoundary.assertPaymentUrlAllowed('https://evil.example/pay/123', allowlist),
  /izin verilmeyen/i
);
assert.deepEqual(
  paymentBoundary.normalizePaymentFormData({ orderId: 'ABC', amount: 12345, threeDS: true }),
  { orderId: 'ABC', amount: '12345', threeDS: 'true' }
);
expectThrow(
  () => paymentBoundary.normalizePaymentFormData({ '<script>': 'x' }),
  /geçersiz form alanı/i
);
expectThrow(
  () => paymentBoundary.normalizePaymentFormData({ cardNumber: '4111111111111111' }),
  /kart verisi/i
);
expectThrow(
  () => paymentBoundary.normalizePaymentFormData({ cvv: '123' }),
  /kart verisi/i
);
const boundedRequest = new Request('https://saatchi.watch/api/payment', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ ok: true }),
});
assert.deepEqual(await paymentBoundary.readBoundedJsonBody(boundedRequest, 100), { ok: true });

const oversizedRequest = new Request('https://saatchi.watch/api/payment', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ value: 'x'.repeat(200) }),
});
await assert.rejects(() => paymentBoundary.readBoundedJsonBody(oversizedRequest, 64), /boyutu aşıyor/i);

assert.deepEqual(
  paymentBoundary.normalizePaymentHandoff({
    gatewayUrl: 'https://3ds.example-bank.test/auth',
    formData: { token: 'opaque-provider-token' },
  }, allowlist),
  {
    redirectUrl: null,
    gatewayUrl: 'https://3ds.example-bank.test/auth',
    formData: { token: 'opaque-provider-token' },
  }
);
expectThrow(
  () => paymentBoundary.normalizePaymentFormData({ securityCode: '123' }),
  /kart verisi/i
);

assert.equal(
  paymentSessionConsistency.assertProviderSessionConsistency(
    { merchant_oid: 'BANK-001', amount: 123456, currency: 'TRY', provider: 'TESTBANK' },
    { amount: 123456, currency: 'TRY', provider: 'TESTBANK' }
  ),
  'BANK-001'
);
expectThrow(
  () => paymentSessionConsistency.assertProviderSessionConsistency(
    { merchant_oid: 'BANK-002', currency: 'TRY', provider: 'TESTBANK' },
    { amount: 123456, currency: 'TRY', provider: 'TESTBANK' }
  ),
  /işlem tutarı/i
);
expectThrow(
  () => paymentSessionConsistency.assertProviderSessionConsistency(
    { merchant_oid: 'BANK-003', amount: 123456, provider: 'TESTBANK' },
    { amount: 123456, currency: 'TRY', provider: 'TESTBANK' }
  ),
  /para birimi/i
);
expectThrow(
  () => paymentSessionConsistency.assertProviderSessionConsistency(
    { merchant_oid: 'BANK-004', amount: 123456, currency: 'TRY', provider: 'OTHERBANK' },
    { amount: 123456, currency: 'TRY', provider: 'TESTBANK' }
  ),
  /provider ile uyuşmuyor/i
);

// Firestore CAS race simulation: two concurrent payment claims must never both win.
process.env.FIRESTORE_ACCESS_TOKEN = 'test-firestore-token';
const originalFetch = globalThis.fetch;
let mockDoc = null;
let mockVersion = 1;
let pendingGets = 0;
let releaseGets;
const bothGetsReady = new Promise((resolve) => { releaseGets = resolve; });

function makeFirestoreResponse(status, payload = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

globalThis.fetch = async (input, init = {}) => {
  const url = new URL(String(input));
  const method = String(init.method || 'GET').toUpperCase();

  if (!url.hostname.includes('firestore.googleapis.com')) {
    throw new Error('Unexpected network target in Firestore race test');
  }

  if (method === 'GET') {
    if (!mockDoc) return makeFirestoreResponse(404, {});
    const snapshot = JSON.parse(JSON.stringify(mockDoc));
    pendingGets += 1;
    if (pendingGets === 2) releaseGets();
    await bothGetsReady;
    return makeFirestoreResponse(200, { ...snapshot, updateTime: `v${mockVersion}` });
  }

  if (method === 'PATCH') {
    const body = JSON.parse(String(init.body || '{}'));
    if (url.searchParams.get('currentDocument.exists') === 'false') {
      if (mockDoc) return makeFirestoreResponse(412, {});
      mockDoc = body;
      mockVersion += 1;
      return makeFirestoreResponse(200, { ...mockDoc, updateTime: `v${mockVersion}` });
    }

    const expected = url.searchParams.get('currentDocument.updateTime');
    if (expected !== `v${mockVersion}`) return makeFirestoreResponse(412, {});
    mockDoc = body;
    mockVersion += 1;
    return makeFirestoreResponse(200, { ...mockDoc, updateTime: `v${mockVersion}` });
  }

  throw new Error(`Unexpected Firestore method: ${method}`);
};

try {
  const raceNow = Date.now();
  const racePayload = {
    id: 'VIP-SAATCHI-RACE-0001',
    name: 'Race Test Saat',
    price: 250000,
    iat: raceNow,
    exp: raceNow + 60_000,
  };
  const raceToken = tokenLib.signVipToken(racePayload);

  // Seed a Firestore-shaped durable record through the same production create function.
  pendingGets = 2; // create does not GET; keep the barrier released for later explicit race setup.
  releaseGets();
  await store.createVipLinkRecord(racePayload, raceToken);

  // Reset the GET barrier so both claims read the exact same updateTime before either PATCH.
  pendingGets = 0;
  let raceRelease;
  const raceBarrier = new Promise((resolve) => { raceRelease = resolve; });
  releaseGets = raceRelease;
  // Rebind via closure-visible variable used by mock GET.
  // eslint-disable-next-line no-global-assign
  // bothGetsReady cannot be reassigned, so perform an explicit snapshot clone race below.
  const originalRaceFetch = globalThis.fetch;
  let raceGetCount = 0;
  let releaseRaceReads;
  const raceReads = new Promise((resolve) => { releaseRaceReads = resolve; });
  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(String(input));
    const method = String(init.method || 'GET').toUpperCase();
    if (method === 'GET' && url.hostname.includes('firestore.googleapis.com')) {
      if (!mockDoc) return makeFirestoreResponse(404, {});
      const snapshot = JSON.parse(JSON.stringify(mockDoc));
      const versionAtRead = mockVersion;
      raceGetCount += 1;
      if (raceGetCount === 2) releaseRaceReads();
      await raceReads;
      return makeFirestoreResponse(200, { ...snapshot, updateTime: `v${versionAtRead}` });
    }
    return originalRaceFetch(input, init);
  };

  const claims = await Promise.allSettled([
    store.claimVipPaymentAttempt(racePayload, raceToken, 'attempt-A', { distanceSales: 'v1' }),
    store.claimVipPaymentAttempt(racePayload, raceToken, 'attempt-B', { distanceSales: 'v1' }),
  ]);
  assert.equal(claims.filter((x) => x.status === 'fulfilled').length, 1);
  assert.equal(claims.filter((x) => x.status === 'rejected').length, 1);
  assert.match(
    String(claims.find((x) => x.status === 'rejected')?.reason?.message || ''),
    /eşzamanlı başka bir ödeme denemesi/i
  );
} finally {
  globalThis.fetch = originalFetch;
  delete process.env.FIRESTORE_ACCESS_TOKEN;
}

console.log('VIP/POS behavioral tests: PASS (session rotation, tamper, strict inputs, card-data rejection, durable state, CAS race, reconciliation gate, origin, HTTPS allowlist, provider handoff)');
