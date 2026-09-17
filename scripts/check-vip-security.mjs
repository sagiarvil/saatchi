import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const page = read('src/app/admin/viplink/page.tsx');
const session = read('src/lib/vip-admin-session.ts');
const sessionRoute = read('src/app/api/admin-session/route.ts');
const vipRoute = read('src/app/api/vip-link/route.ts');
const paymentRoute = read('src/app/api/payment/route.ts');
const store = read('src/lib/vip-link-store.ts');
const listRoute = read('src/app/api/admin/vip-links/route.ts');

const paymentActiveChecks = paymentRoute.match(/assertVipLinkActive\(vip, token\)/g)?.length || 0;

const requirements = [
  ['admin page must not send raw admin key on VIP create', !page.includes('x-vip-admin-key')],
  ['admin page uses session endpoint', page.includes("fetch('/api/admin-session'")],
  ['admin page has exact WhatsApp CTA', page.includes('WhatsApp ile Linki İlet')],
  ['admin page has durable revoke CTA', page.includes('Linki İptal Et')],
  ['admin page lists durable links', page.includes("fetch('/api/admin/vip-links'")],
  ['session cookie is HttpOnly', sessionRoute.includes('httpOnly: true')],
  ['session cookie is SameSite strict', sessionRoute.includes("sameSite: 'strict'")],
  ['session cookie is secure in production', sessionRoute.includes("secure: process.env.NODE_ENV === 'production'")],
  ['session is signed with HMAC', session.includes("createHmac('sha256'")],
  ['session v2 derives from current admin key', session.includes('saatchi:vip-admin-session:v2') && session.includes('adminKeyFingerprint')],
  ['mutations enforce same-origin', session.includes('assertSameOriginMutation') && sessionRoute.includes('assertSameOriginMutation(request)') && vipRoute.includes('assertSameOriginMutation(request)')],
  ['provenance-less mutations fail closed', session.includes('Yönetim isteği kaynak doğrulamasından geçemedi.')],
  ['VIP creation requires admin session', vipRoute.includes('assertAdminSession(request)')],
  ['VIP revoke is durable', vipRoute.includes('revokeVipLink') && store.includes("state: 'revoked'") && store.includes('revokedAt: Date.now()')],
  ['VIP record is Firestore-backed', store.includes('firestore.googleapis.com') && store.includes("const COLLECTION = 'saatchiVipLinks'")],
  ['Firestore project is fail-closed and pinned', store.includes("EXPECTED_PROJECT_ID = 'studio-7658156126-ffb8e'") && store.includes('Beklenmeyen Firestore proje kimliği')],
  ['VIP token is stored only as hash', store.includes('tokenHash') && store.includes("createHash('sha256')")],
  ['VIP hash comparison is timing safe', store.includes('safeEqualHex') && store.includes('timingSafeEqual')],
  ['checkout verification checks durable state', vipRoute.includes('assertVipLinkActive(payload, token)')],
  ['payment checks durable state before and after provider', paymentActiveChecks >= 2],
  ['payment external call has bounded timeout', paymentRoute.includes('AbortSignal.timeout(20_000)')],
  ['payment has request correlation id', paymentRoute.includes('requestId') && paymentRoute.includes('X-SAATCHI-Request-Id')],
  ['admin list requires admin session', listRoute.includes('assertAdminSession(request)')],
];

const failed = requirements.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('VIP_SECURITY_GUARD_FAILED');
  for (const [name] of failed) console.error(`- ${name}`);
  process.exit(1);
}

console.log(`VIP security regression guard: PASS (${requirements.length}/${requirements.length})`);
