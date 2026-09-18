import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const page = read('src/app/admin/viplink/page.tsx');
const checkout = read('src/app/vip-checkout/page.tsx');
const session = read('src/lib/vip-admin-session.ts');
const sessionRoute = read('src/app/api/admin-session/route.ts');
const vipRoute = read('src/app/api/vip-link/route.ts');
const paymentRoute = read('src/app/api/payment/route.ts');
const boundary = read('src/lib/payment-boundary.ts');
const store = read('src/lib/vip-link-store.ts');
const listRoute = read('src/app/api/admin/vip-links/route.ts');
const firebase = read('firebase.json');
const workflow = read('.github/workflows/pos-security-pr.yml');
const legacyPaymentDirExists = fs.existsSync(path.join(root, 'src/lib/payment_backend_ready'));
const mockSuccessExists = fs.existsSync(path.join(root, 'src/app/test-success'));

const paymentActiveChecks = paymentRoute.match(/assertVipLinkActive\(vip, token\)/g)?.length || 0;
const vipAdminChecks = vipRoute.match(/assertAdminSession\(request\)/g)?.length || 0;

const requirements = [
  ['admin page must not send raw admin key on VIP create', !page.includes('x-vip-admin-key')],
  ['admin page uses session endpoint', page.includes("fetch('/api/admin-session'")],
  ['admin page restores authenticated gate', page.includes('if (!authenticated)')],
  ['admin page has exact WhatsApp CTA', page.includes('WhatsApp ile Linki İlet')],
  ['admin page has durable revoke CTA', page.includes('Linki İptal Et')],
  ['admin page lists durable links', page.includes("fetch('/api/admin/vip-links'")],
  ['session cookie is HttpOnly', sessionRoute.includes('httpOnly: true')],
  ['session cookie is SameSite strict', sessionRoute.includes("sameSite: 'strict'")],
  ['session cookie is secure in production', sessionRoute.includes("secure: process.env.NODE_ENV === 'production'")],
  ['session is signed with HMAC', session.includes("createHmac('sha256'")],
  ['session v2 derives from current admin key', session.includes('saatchi:vip-admin-session:v2') && session.includes('adminKeyFingerprint')],
  ['mutations enforce same-origin', vipRoute.includes('assertSameOriginMutation(request)')],
  ['provenance-less mutations fail closed', session.includes('Yönetim isteği kaynak doğrulamasından geçemedi.')],
  ['VIP creation and revoke require admin session', vipAdminChecks >= 2],
  ['VIP admin list requires admin session', listRoute.includes('assertAdminSession(request)')],
  ['VIP revoke is durable', vipRoute.includes('revokeVipLink') && store.includes("state: 'revoked'") && store.includes('revokedAt: Date.now()')],
  ['VIP record is Firestore-backed', store.includes('firestore.googleapis.com') && store.includes("const COLLECTION = 'saatchiVipLinks'")],
  ['Firestore project is fail-closed and pinned', store.includes("EXPECTED_PROJECT_ID = 'studio-7658156126-ffb8e'") && store.includes('Beklenmeyen Firestore proje kimliği')],
  ['VIP token is stored only as hash', store.includes('tokenHash') && store.includes("createHash('sha256')")],
  ['VIP hash comparison is timing safe', store.includes('safeEqualHex') && store.includes('timingSafeEqual')],
  ['checkout verification checks durable state', vipRoute.includes('assertVipLinkActive(payload, token)')],
  ['payment checks durable state before and after provider', paymentActiveChecks >= 2],
  ['payment enforces same-origin mutation', paymentRoute.includes('assertSameOriginMutation(request)')],
  ['payment request body is bounded', paymentRoute.includes('assertRequestBodySize(request)')],
  ['payment external call has bounded timeout', paymentRoute.includes('AbortSignal.timeout(20_000)')],
  ['payment has request correlation id', paymentRoute.includes('requestId') && paymentRoute.includes('X-SAATCHI-Request-Id')],
  ['payment sends idempotency key header', paymentRoute.includes("'Idempotency-Key': idempotencyKey")],
  ['payment atomically claims single attempt', paymentRoute.includes('claimVipPaymentAttempt') && store.includes('currentDocument.updateTime') && store.includes("paymentState: 'creating'")],
  ['ambiguous payment result becomes uncertain', paymentRoute.includes("finalizeVipPaymentAttempt(vip.id, requestId, 'uncertain')") && store.includes("paymentState === 'uncertain'")],
  ['cardholder data is rejected by merchant API', paymentRoute.includes('assertNoCardholderData(body)') && paymentRoute.includes('CARD_DATA_KEYS')],
  ['production payment API has explicit origin allowlist', paymentRoute.includes('SAATCHI_PAYMENT_API_ALLOWED_ORIGINS') && paymentRoute.includes('allowedOrigins.has(url.origin)')],
  ['production payment endpoint has no legacy fallback', paymentRoute.includes("process.env.NODE_ENV !== 'production' ? process.env.BELGIN_PAYMENT_CREATE_URL : ''")],
  ['test payment bypass is absent', !paymentRoute.includes('TEST_POS') && !paymentRoute.includes('/test-success') && !mockSuccessExists],
  ['dead direct-card backend is absent from runtime tree', !legacyPaymentDirExists],
  ['checkout legal consents default false', checkout.includes('useState(false)') && !checkout.includes('Hukuki metinler (Gizli)') && !checkout.includes('termsAccepted: true')],
  ['checkout exposes legal document links', checkout.includes('/on-bilgilendirme-formu') && checkout.includes('/mesafeli-satis-sozlesmesi') && checkout.includes('/yuksek-degerli-urun-teslimi')],
  ['checkout makes payment obligation explicit', checkout.includes('Ödeme Yükümlülüğü Doğuran')],
  ['provider HTML is never injected into checkout', !checkout.includes('document.write') && !checkout.includes('htmlContent')],
  ['payment handoff requires HTTPS', boundary.includes("url.protocol !== 'https:'")],
  ['payment handoff supports explicit origin allowlist', boundary.includes('SAATCHI_PAYMENT_ALLOWED_ORIGINS') && boundary.includes('allowlist.has(url.origin)')],
  ['provider form data is bounded', boundary.includes('MAX_FORM_FIELDS') && boundary.includes('MAX_FORM_VALUE_LENGTH')],
  ['security headers include HSTS', firebase.includes('Strict-Transport-Security')],
  ['security headers block MIME sniffing', firebase.includes('X-Content-Type-Options') && firebase.includes('nosniff')],
  ['checkout CSP is present', firebase.includes('Content-Security-Policy')],
  ['POS PRs run isolated regression workflow before merge', workflow.includes('pull_request:') && workflow.includes('npm run check:vip') && workflow.includes('npm run test:vip') && workflow.includes('npm run build')],
  ['PR gate checks dependency high/critical vulnerabilities', workflow.includes('npm audit --audit-level=high')],
];

const failed = requirements.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('VIP_SECURITY_GUARD_FAILED');
  for (const [name] of failed) console.error(`- ${name}`);
  process.exit(1);
}

console.log(`VIP/POS security regression guard: PASS (${requirements.length}/${requirements.length})`);
