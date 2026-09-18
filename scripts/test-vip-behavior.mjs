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

function expectThrow(fn, pattern) {
  let thrown = null;
  try { fn(); } catch (error) { thrown = error; }
  assert.ok(thrown, `Expected error matching ${pattern}`);
  assert.match(String(thrown?.message || thrown), pattern);
}

const adminSession = session.createAdminSession();
assert.ok(adminSession.token.includes('.'));
assert.equal(session.verifyAdminSessionToken(adminSession.token).v, 2);

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
expectThrow(() => store.assertVipPaymentStatePayable({ paymentState: 'creating' }), /zaten oluşturuluyor/i);
expectThrow(() => store.assertVipPaymentStatePayable({ paymentState: 'ready' }), /daha önce oluşturuldu/i);
expectThrow(() => store.assertVipPaymentStatePayable({ paymentState: 'uncertain' }), /mutabakat/i);
assert.equal(store.assertVipPaymentReconciliationResettable({ paymentState: 'uncertain' }), true);
expectThrow(() => store.assertVipPaymentReconciliationResettable({ paymentState: 'ready' }), /Yalnız sonucu belirsiz/i);
expectThrow(() => store.assertVipPaymentReconciliationResettable({ paymentState: 'creating' }), /Yalnız sonucu belirsiz/i);

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

console.log('VIP/POS behavioral tests: PASS (session rotation, tamper, durable state, atomic payment-state gate, origin, HTTPS allowlist, provider handoff)');
