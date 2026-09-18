import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const port = 3107;
const base = `http://127.0.0.1:${port}`;

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
  env: {
    ...process.env,
    NODE_ENV: 'production',
    VIP_PAYMENT_SECRET: 'P'.repeat(64),
    VIP_ADMIN_KEY: 'admin-key-runtime-smoke-32-characters-minimum',
    VIP_ADMIN_SESSION_SECRET: 'S'.repeat(64),
    VIP_ADMIN_TOTP_SECRET: 'JBSWY3DPEHPK3PXPJBSWY3DPEHPK3PXP',
    GOOGLE_CLOUD_PROJECT: 'studio-7658156126-ffb8e',
    SAATCHI_PAYMENT_ENABLED: 'false',
  },
});

let stderr = '';
server.stderr.on('data', (chunk) => { stderr += String(chunk); });

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${base}/api/admin-session`, { cache: 'no-store' });
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Next runtime did not start. ${stderr.slice(-2000)}`);
}

async function jsonRequest(path, init = {}) {
  const response = await fetch(`${base}${path}`, { redirect: 'manual', ...init });
  let body = {};
  try { body = await response.json(); } catch {}
  return { response, body };
}

try {
  await waitForServer();

  const session = await jsonRequest('/api/admin-session');
  assert.equal(session.response.status, 200);
  assert.equal(session.body.success, true);
  assert.equal(session.body.authenticated, false);
  assert.match(session.response.headers.get('cache-control') || '', /no-store/i);

  const wrongLogin = await jsonRequest('/api/admin-session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      referer: 'https://saatchi.watch/admin/viplink',
    },
    body: JSON.stringify({ key: 'wrong-admin-key', otp: '000000' }),
  });
  assert.equal(wrongLogin.response.status, 401);
  assert.equal(wrongLogin.body.success, false);

  const invalidVerify = await jsonRequest('/api/vip-link/verify', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      referer: 'https://saatchi.watch/vip-checkout',
    },
    body: JSON.stringify({ token: 'invalid' }),
  });
  assert.equal(invalidVerify.response.status, 400);
  assert.equal(invalidVerify.body.success, false);

  const malformedAdmin = await jsonRequest('/api/admin-session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      referer: 'https://saatchi.watch/admin/viplink',
    },
    body: JSON.stringify({ key: { nested: true }, otp: '000000' }),
  });
  assert.equal(malformedAdmin.response.status, 400);

  const unknownVerifyField = await jsonRequest('/api/vip-link/verify', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      referer: 'https://saatchi.watch/vip-checkout',
    },
    body: JSON.stringify({ token: 'invalid', unexpected: 'value' }),
  });
  assert.equal(unknownVerifyField.response.status, 400);

  const unknownPaymentField = await jsonRequest('/api/payment', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      referer: 'https://saatchi.watch/vip-checkout',
    },
    body: JSON.stringify({ token: 'invalid', arbitrary: '4111111111111111' }),
  });
  assert.equal(unknownPaymentField.response.status, 400);

  const legacyQueryVerify = await fetch(`${base}/api/vip-link?token=invalid`, { redirect: 'manual' });
  assert.equal(legacyQueryVerify.status, 405);

  const cardDataAttempt = await jsonRequest('/api/payment', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      referer: 'https://saatchi.watch/vip-checkout',
    },
    body: JSON.stringify({
      token: 'invalid',
      cardNumber: '4111111111111111',
      cvv: '123',
    }),
  });
  assert.equal(cardDataAttempt.response.status, 400);
  assert.match(String(cardDataAttempt.body.message || ''), /Kart numarası|kart/i);

  const checkout = await fetch(`${base}/vip-checkout`, { redirect: 'manual' });
  assert.equal(checkout.status, 200);

  console.log('POS built-runtime smoke: PASS (routes, no-store, strict schemas, POST token verify, query-token disabled, card-data rejection)');
} finally {
  server.kill('SIGTERM');
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 2000);
    server.once('exit', () => {
      clearTimeout(timer);
      resolve();
    });
  });
}
