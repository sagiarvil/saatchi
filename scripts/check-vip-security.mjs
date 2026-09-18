import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const compact = (value) => value.replace(/\s+/g, ' ');

const page = read('src/app/admin/viplink/page.tsx');
const checkout = read('src/app/vip-checkout/page.tsx');
const paymentReview = read('src/app/odeme/page.tsx');
const footer = read('src/components/layout/Footer.tsx');
const legalPages = read('src/data/legal/legal-pages.ts');
const session = read('src/lib/vip-admin-session.ts');
const sessionRoute = read('src/app/api/admin-session/route.ts');
const vipRoute = read('src/app/api/vip-link/route.ts');
const vipVerifyRoute = read('src/app/api/vip-link/verify/route.ts');
const paymentRoute = read('src/app/api/payment/route.ts');
const boundary = read('src/lib/payment-boundary.ts');
const paymentSessionConsistency = read('src/lib/payment-session-consistency.ts');
const store = read('src/lib/vip-link-store.ts');
const vipInput = read('src/lib/vip-input.ts');
const vipAdminTotp = read('src/lib/vip-admin-totp.ts');
const vipAdminThrottle = read('src/lib/vip-admin-throttle.ts');
const securityAuditLog = read('src/lib/security-audit-log.ts');
const listRoute = read('src/app/api/admin/vip-links/route.ts');
const reconcileRoute = read('src/app/api/admin/vip-payment-reconcile/route.ts');
const firebase = read('firebase.json');
const workflow = read('.github/workflows/pos-security-pr.yml');
const productionRelease = read('.github/workflows/production-release.yml');
const mainRegression = read('.github/workflows/ui-regression.yml');
const runtimeSmokeScript = read('scripts/smoke-pos-runtime.mjs');
const behaviorTest = read('scripts/test-vip-behavior.mjs');
const liveRuntimeSmoke = read('.github/workflows/live-runtime-smoke.yml');
const handoff = read('docs/POS_SECURITY_HANDOFF.md');
const bankEvidence = read('docs/POS_BANK_REVIEW_EVIDENCE.md');
const legacyAdminHtml = read('public/admin.html');
const legacyAdminJs = read('public/js/admin.js');
const vipCheckoutLayout = read('src/app/vip-checkout/layout.tsx');
const rootLayout = read('src/app/layout.tsx');
const robots = read('public/robots.txt');
const publicVipPaymentExists = fs.existsSync(path.join(root, 'public/js/vip-payment.js'));
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
  ['Firebase-compatible admin cookie is used', session.includes("VIP_ADMIN_COOKIE = '__session'")],
  ['session cookie is HttpOnly', sessionRoute.includes('httpOnly: true')],
  ['session cookie is SameSite strict', sessionRoute.includes("sameSite: 'strict'")],
  ['session cookie is secure in production', sessionRoute.includes("secure: process.env.NODE_ENV === 'production'")],
  ['session is signed with HMAC', session.includes("createHmac('sha256'")],
  ['session v2 derives from current admin key', session.includes('saatchi:vip-admin-session:v2') && session.includes('adminKeyFingerprint')],
  ['admin key requires at least 32 characters', session.includes('key.length < 32')],
  ['production admin session secret is mandatory and independent', session.includes('VIP_ADMIN_SESSION_SECRET production ortamında') && session.includes('diğer ödeme/yönetim secret değerlerinden bağımsız')],
  ['production admin throttle is Firestore durable', vipAdminThrottle.includes("const COLLECTION = 'saatchiAdminLoginThrottle'") && vipAdminThrottle.includes('currentDocument.updateTime')],
  ['throttle memory override is CI-only', vipAdminThrottle.includes("process.env.CI === 'true'") && vipAdminThrottle.includes("SAATCHI_ADMIN_THROTTLE_TEST_MODE === 'true'") && runtimeSmokeScript.includes("SAATCHI_ADMIN_THROTTLE_TEST_MODE: 'true'")],
  ['throttle helper is non-recursive', vipAdminThrottle.includes("process.env.NODE_ENV !== 'production'") && !vipAdminThrottle.includes("return (\n    useMemoryThrottle() ||")],
  ['behavior tests exercise production durable throttle', behaviorTest.includes('Production durable throttle simulation') && behaviorTest.includes('metadata.google.internal') && behaviorTest.includes('firestore.googleapis.com')],
  ['VIP admin production MFA is mandatory', sessionRoute.includes('verifyAdminTotp(otp)') && vipAdminTotp.includes('VIP_ADMIN_TOTP_SECRET production ortamında yapılandırılmamış') && vipAdminTotp.includes('timingSafeEqual')],
  ['VIP admin UI asks for a six-digit OTP', page.includes('2 Adımlı Doğrulama') && page.includes('one-time-code') && page.includes('loginOtp')],
  ['VIP admin repeated failures are throttled', sessionRoute.includes('assertAdminLoginNotThrottled(request)') && sessionRoute.includes('recordAdminLoginFailure(request)') && sessionRoute.includes("status: originError ? 403 : throttled ? 429") && vipAdminThrottle.includes('MAX_FAILURES = 5') && sessionRoute.includes("Retry-After")],
  ['mutations enforce same-origin', vipRoute.includes('assertSameOriginMutation(request)')],
  ['production origin is pinned to canonical Saatchi host', session.includes("SAATCHI_PUBLIC_ORIGIN || 'https://saatchi.watch'") && session.includes("origin !== 'https://saatchi.watch'")],
  ['provenance-less mutations fail closed', session.includes('Yönetim isteği kaynak doğrulamasından geçemedi.')],
  ['VIP creation and revoke require admin session', vipAdminChecks >= 2],
  ['VIP admin list requires admin session', listRoute.includes('assertAdminSession(request)')],
  ['VIP revoke is durable', vipRoute.includes('revokeVipLink') && store.includes("state: 'revoked'") && store.includes('revokedAt: Date.now()')],
  ['VIP record is Firestore-backed', store.includes('firestore.googleapis.com') && store.includes("const COLLECTION = 'saatchiVipLinks'")],
  ['Firestore project is fail-closed and pinned', store.includes("EXPECTED_PROJECT_ID = 'studio-7658156126-ffb8e'") && store.includes('Beklenmeyen Firestore proje kimliği')],
  ['production forbids static Firestore bearer token', store.includes("NODE_ENV === 'production' && explicit") && store.includes('runtime service-account metadata kimliği kullanılmalıdır')],
  ['VIP token is stored only as hash', store.includes('tokenHash') && store.includes("createHash('sha256')")],
  ['VIP hash comparison is timing safe', store.includes('safeEqualHex') && store.includes('timingSafeEqual')],
  ['checkout verification checks durable state', vipVerifyRoute.includes('assertVipLinkActive(payload, token)') && vipVerifyRoute.includes('assertVipPaymentStatePayable(record)')],
  ['VIP amount parser rejects ambiguous decimals', vipRoute.includes('parseVipAmount(body.amount)') && vipInput.includes('Number.isSafeInteger') && vipInput.includes('Decimal inputs are deliberately rejected')],
  ['payment checks durable state before and after provider', paymentActiveChecks >= 2],
  ['payment enforces same-origin mutation', paymentRoute.includes('assertSameOriginMutation(request)')],
  ['payment request body is streaming-bounded from actual bytes', paymentRoute.includes('readBoundedJsonBody(request)') && boundary.includes('readBoundedRequestText') && boundary.includes('request.body.getReader()') && boundary.includes('total > maxBytes')],
  ['provider response body is bounded', paymentRoute.includes('readBoundedResponseText(belginResponse)') && boundary.includes('response.body.getReader()')],
  ['payment API redirects are disabled', paymentRoute.includes("redirect: 'error'")],
  ['payment external call has bounded timeout', paymentRoute.includes('AbortSignal.timeout(20_000)')],
  ['payment has request correlation id', paymentRoute.includes('requestId') && paymentRoute.includes('X-SAATCHI-Request-Id')],
  ['VIP bearer token is not forwarded upstream', !paymentRoute.includes('vipToken: token')],
  ['payment sends idempotency key header', paymentRoute.includes("'Idempotency-Key': idempotencyKey")],
  ['payment amount and currency are server-owned', paymentRoute.includes('amount: vip.price') && paymentRoute.includes('totalAmount: vip.price') && paymentRoute.includes("currency: 'TRY'") && paymentRoute.includes('price: vip.price')],
  ['payment atomically claims single attempt', paymentRoute.includes('claimVipPaymentAttempt') && store.includes('currentDocument.updateTime') && store.includes("paymentState: 'creating'")],
  ['ambiguous payment result becomes uncertain', paymentRoute.includes("finalizeVipPaymentAttempt(vip.id, requestId, 'uncertain',") && store.includes("value === 'uncertain'") && store.includes("Önceki ödeme denemesinin sonucu belirsiz")],
  ['uncertain recovery is admin-only and explicit', reconcileRoute.includes('assertSameOriginMutation(request)') && reconcileRoute.includes('assertAdminSession(request)') && reconcileRoute.includes('confirmedNoCharge !== true') && store.includes("record.paymentState !== 'uncertain' && !staleCreating")],
  ['payment reconciliation requires step-up TOTP', reconcileRoute.includes('verifyAdminTotp(otp)') && page.includes('reconcileOtp') && page.includes('2FA kodu')],
  ['admin UI exposes reconciliation evidence and controlled recovery', page.includes('Banka / Sağlayıcı Mutabakatı') && page.includes('paymentProviderOrderId') && page.includes('paymentEvidenceId') && page.includes('paymentLastError') && page.includes('confirmedNoCharge: true') && page.includes('Kontrollü Yeniden Aç')],
  ['stale creating recovery requires explicit reconciliation', store.includes('PAYMENT_ATTEMPT_STALE_MS') && store.includes('staleCreating') && reconcileRoute.includes('confirmedNoCharge !== true')],
  ['ready payments cannot be reset by recovery path', store.includes("record.paymentState !== 'uncertain' && !staleCreating") && store.includes('assertVipPaymentReconciliationResettable')],
  ['payment state persists provider evidence', store.includes('paymentProviderOrderId') && store.includes('paymentEvidenceId') && store.includes('paymentLastError') && paymentRoute.includes('providerOrderId: verifiedProviderOrderId')],
  ['security audit log filters sensitive fields', securityAuditLog.includes('BLOCKED_FIELD') && securityAuditLog.includes('token|secret|password') && behaviorTest.includes('assert.doesNotMatch(auditLine')],
  ['critical auth/payment transitions emit structured audit events', sessionRoute.includes("securityAudit('admin.login.") && paymentRoute.includes("securityAudit('payment.session.") && reconcileRoute.includes("securityAudit('payment.reconciliation.reset'")],
  ['provider session requires order id amount currency and provider consistency', paymentRoute.includes('assertProviderSessionConsistency') && paymentSessionConsistency.includes('doğrulanabilir işlem tutarı') && paymentSessionConsistency.includes('doğrulanabilir para birimi') && paymentSessionConsistency.includes('provider kimliği döndürmedi')],
  ['cardholder data is rejected by merchant API', paymentRoute.includes('assertNoCardholderData(body)') && paymentRoute.includes("assertNoCardholderData") && boundary.includes('CARD_DATA_KEYS') && boundary.includes('export function assertNoCardholderData')],
  ['payment request uses strict field allowlist', paymentRoute.includes('assertAllowedObjectKeys(body') && boundary.includes('export function assertAllowedObjectKeys') && paymentRoute.includes("'marketingConsent'")],
  ['admin and VIP mutation routes use strict schemas',
    compact(sessionRoute).includes("assertAllowedObjectKeys(body, ['key', 'otp']") &&
    compact(vipRoute).includes("assertAllowedObjectKeys(body, ['title', 'amount']") &&
    compact(vipRoute).includes("assertAllowedObjectKeys(body, ['id']") &&
    compact(vipVerifyRoute).includes("assertAllowedObjectKeys(body, ['token']") &&
    compact(reconcileRoute).includes("assertAllowedObjectKeys( body, ['id', 'confirmedNoCharge', 'reconciliationReference', 'reconciliationReason', 'otp']")],
  ['production payment API has explicit origin allowlist', paymentRoute.includes('SAATCHI_PAYMENT_API_ALLOWED_ORIGINS') && paymentRoute.includes('allowedOrigins.has(url.origin)')],
  ['production payment endpoint has no legacy fallback', paymentRoute.includes("process.env.NODE_ENV !== 'production' ? process.env.BELGIN_PAYMENT_CREATE_URL : ''")],
  ['test payment bypass is absent', !paymentRoute.includes('TEST_POS') && !paymentRoute.includes('/test-success') && !mockSuccessExists],
  ['dead direct-card backend is absent from runtime tree', !legacyPaymentDirExists],
  ['stale payment patch artifacts are absent', !fs.existsSync(path.join(root, 'patch_payment.js')) && !fs.existsSync(path.join(root, 'patch_checkout.js')) && !fs.existsSync(path.join(root, 'scripts/legacy_patches/patch_vip.js'))],
  ['public legacy payment engine is removed', !publicVipPaymentExists && !legacyAdminHtml.includes('vip-payment.js')],
  ['legacy admin has no hard-coded PIN fallback', !legacyAdminJs.includes('1999') && !legacyAdminHtml.includes('adminPinInput') && !legacyAdminHtml.includes('verifyPin')],
  ['legacy admin sends no client admin-key credential', !legacyAdminJs.includes('x-admin-key') && !legacyAdminJs.includes('adminKey=') && !legacyAdminJs.includes('Saatchi_admin_pin')],
  ['legacy admin VIP links use hardened Next route', legacyAdminHtml.includes('/admin/viplink') && legacyAdminJs.includes("window.open('/admin/viplink', '_blank')")],
  ['VIP bearer token is kept out of verification URLs', vipRoute.includes('/vip-checkout#token=') && checkout.includes("fetch('/api/vip-link/verify'") && checkout.includes("window.history.replaceState(null, '', '/vip-checkout')") && !checkout.includes('/api/vip-link?token=')],
  ['checkout legal consents default false', checkout.includes('useState(false)') && !checkout.includes('Hukuki metinler (Gizli)') && !checkout.includes('termsAccepted: true')],
  ['checkout exposes legal document links', checkout.includes('/on-bilgilendirme-formu') && checkout.includes('/mesafeli-satis-sozlesmesi') && checkout.includes('/yuksek-degerli-urun-teslimi')],
  ['checkout makes payment obligation explicit', checkout.includes('Ödeme Yükümlülüğü Doğuran')],
  ['checkout visibly shows product identity', checkout.includes('{summary.name}')],
  ['checkout visibly shows seller identity and delivery method', checkout.includes('SEMİH SONBAHAR - SAATCHI') && checkout.includes('Menderes Caddesi No:231/B') && checkout.includes('Showroom teslimi')],
  ['verified merchant registration details are visible', legalPages.includes("taxNumber: '7740298676'") && legalPages.includes("chamberRegistryNumber: '492956'") && checkout.includes('VKN 7740298676') && checkout.includes('Oda Sicil No 492956')],
  ['public bank-reviewable payment page exists', paymentReview.includes('Güvenli Ödeme') && paymentReview.includes('7740298676') && paymentReview.includes('492956') && paymentReview.includes('/mesafeli-satis-sozlesmesi') && paymentReview.includes('/iade-degisim-cayma') && paymentReview.includes('Kart numarası, CVV/CVC') && footer.includes('href="/odeme"')],
  ['checkout exposes KVKK and privacy notice at data collection', checkout.includes('/kvkk-aydinlatma-metni') && checkout.includes('/gizlilik-politikasi') && checkout.includes('kimlik ve iletişim bilgileri')],
  ['checkout exposes return and withdrawal policy', checkout.includes('/iade-degisim-cayma') && checkout.includes('İade, Değişim ve Cayma Politikası')],
  ['public payment errors are sanitized', paymentRoute.includes('publicPaymentError') && paymentRoute.includes('Ödeme hizmeti şu anda kullanılamıyor')],
  ['public VIP verification errors are sanitized', vipVerifyRoute.includes('VIP bağlantısı şu anda doğrulanamıyor') && vipVerifyRoute.includes('VIP bağlantısı geçersiz, kullanılmış, iptal edilmiş veya süresi dolmuş')],
  ['provider HTML is never injected into checkout', !checkout.includes('document.write') && !checkout.includes('htmlContent')],
  ['checkout does not embed payment iframe', !checkout.includes('<iframe') && !checkout.includes("createElement('iframe')")],
  ['checkout loads no third-party scripts', !checkout.includes('<script') && !checkout.includes('next/script') && !checkout.includes('googletagmanager') && !checkout.includes('clarity')],
  ['payment handoff requires HTTPS', boundary.includes("url.protocol !== 'https:'")],
  ['payment handoff supports explicit origin allowlist', boundary.includes('SAATCHI_PAYMENT_ALLOWED_ORIGINS') && boundary.includes('allowlist.has(url.origin)')],
  ['payment handoff configuration is non-recursive and executable', boundary.includes('const allowlist = parseAllowedOrigins(') && !boundary.includes('const allowlist = assertPaymentHandoffConfiguration(rawAllowlist)')],
  ['provider form data is bounded', boundary.includes('MAX_FORM_FIELDS') && boundary.includes('MAX_FORM_VALUE_LENGTH')],
  ['provider handoff rejects card-data fields', boundary.includes('SENSITIVE_PAYMENT_FIELD') && boundary.includes('merchant handoff üzerinden kart verisi')],
  ['security headers include HSTS', firebase.includes('Strict-Transport-Security')],
  ['security headers block MIME sniffing', firebase.includes('X-Content-Type-Options') && firebase.includes('nosniff')],
  ['checkout CSP is present', firebase.includes('Content-Security-Policy')],
  ['VIP checkout has stricter CSP and browser isolation', firebase.includes("connect-src 'self'; frame-src 'none'") && firebase.includes('Cross-Origin-Resource-Policy') && firebase.includes('X-Permitted-Cross-Domain-Policies')],
  ['VIP checkout is noindex/nocache', vipCheckoutLayout.includes('index: false') && vipCheckoutLayout.includes('nocache: true') && firebase.includes('"source": "/vip-checkout"') && firebase.includes('noindex, nofollow, noarchive, nosnippet')],
  ['admin surfaces are no-store/noindex', firebase.includes('"source": "/admin/**"') && firebase.includes('"source": "/admin.html"')],
  ['public crawl is not globally blocked', robots.includes('Allow: /') && !robots.includes('Disallow: /\n') && robots.includes('Disallow: /vip-checkout') && robots.includes('Disallow: /admin')],
  ['public site root metadata is indexable', rootLayout.includes('index: true') && rootLayout.includes('follow: true')],
  ['CSP permits only explicit Firebase admin SDK origin', firebase.includes("script-src 'self' 'unsafe-inline' https://www.gstatic.com")],
  ['POS PRs run isolated regression workflow before merge', workflow.includes('pull_request:') && workflow.includes('npm run check:vip') && workflow.includes('npm run test:vip') && workflow.includes('npm run build')],
  ['production deploy is regression-gated and exact-current-main only', productionRelease.includes("github.event.workflow_run.conclusion == 'success'") && !productionRelease.includes('workflow_dispatch:') && productionRelease.includes('RELEASE_SHA_IS_CURRENT_MAIN') && productionRelease.includes('test "$RELEASE_SHA" = "$MAIN_SHA"')],
  ['production deploy uses lockfile Firebase CLI', productionRelease.includes('./node_modules/.bin/firebase deploy') && !productionRelease.includes('firebase-tools@latest')],
  ['production deploy snapshots live Firebase release for rollback', productionRelease.includes('hosting:clone "$HOSTING_TARGET:live" "$HOSTING_TARGET:predeploy-rollback"') && productionRelease.includes('hosting:clone "$HOSTING_TARGET:predeploy-rollback" "$HOSTING_TARGET:live"') && productionRelease.includes('ROLLBACK_SNAPSHOT_VERIFIED')],
  ['live runtime smoke runs after production release', liveRuntimeSmoke.includes('workflows: ["Saatchi Production Release"]') && !liveRuntimeSmoke.includes('push:\n    branches: [main]')],
  ['live runtime smoke verifies exact SHA and checkout security headers', liveRuntimeSmoke.includes('LIVE_DEPLOY_SHA_OK') && liveRuntimeSmoke.includes('strict-transport-security') && liveRuntimeSmoke.includes('x-content-type-options') && liveRuntimeSmoke.includes('content-security-policy') && liveRuntimeSmoke.includes('x-robots-tag')],
  ['main regression repeats security and dependency gates', mainRegression.includes('npm audit --audit-level=high') && mainRegression.includes('npm audit --omit=dev --audit-level=moderate') && mainRegression.includes('npm run check:vip') && mainRegression.includes('npm run test:vip') && mainRegression.includes('node --check public/js/admin.js') && mainRegression.includes('npm run build') && mainRegression.includes('node scripts/smoke-pos-runtime.mjs')],
  ['POS workflow path filters cover audit logger separately', workflow.includes("- 'src/lib/security-audit-log.ts'") && workflow.includes("- 'src/lib/vip-admin-throttle.ts'") && !workflow.includes("vip-admin-throttle.ts src/lib/security-audit-log.ts")],
  ['POS lint covers all payment/vip security modules', workflow.includes('src/lib/payment-*.ts') && workflow.includes('src/lib/vip-*.ts') && workflow.includes('src/lib/security-audit-log.ts')],
  ['PR gate executes built runtime HTTP smoke', workflow.includes('node scripts/smoke-pos-runtime.mjs') && runtimeSmokeScript.includes('/api/vip-link/verify') && runtimeSmokeScript.includes('legacyQueryVerify.status, 405') && runtimeSmokeScript.includes('cardDataAttempt.response.status, 400') && runtimeSmokeScript.includes('unknownPaymentField.response.status, 400') && runtimeSmokeScript.includes('malformedAdmin.response.status, 400')],
  ['GitHub Actions are pinned to immutable SHAs', workflow.includes('actions/checkout@11d5960a326750d5838078e36cf38b85af677262') && workflow.includes('actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020') && mainRegression.includes('actions/setup-python@a26af69be951a213d495a4c3e4e4022e16d87065') && productionRelease.includes('actions/checkout@11d5960a326750d5838078e36cf38b85af677262')],
  ['PR gate checks dependency high/critical vulnerabilities', workflow.includes('npm audit --audit-level=high')],
  ['handoff documents production payment API allowlist', handoff.includes('SAATCHI_PAYMENT_API_ALLOWED_ORIGINS')],
  ['handoff documents hosted-payment allowlist', handoff.includes('SAATCHI_PAYMENT_ALLOWED_ORIGINS')],
  ['handoff documents external bank test requirement', handoff.includes('Real bank test-merchant flow')],
  ['handoff documents ASV validation requirement', handoff.includes('ASV external scan')],
  ['bank evidence matrix preserves external blockers', bankEvidence.includes('3-D Secure | BLOCKED') && bankEvidence.includes('Callback/status verification | BLOCKED') && bankEvidence.includes('PCI ASV scan | BLOCKED') && bankEvidence.includes('Live exact SHA | BLOCKED') && bankEvidence.includes('GitHub main protection | BLOCKED')],
  ['bank evidence matrix forbids code-to-production equivalence', bankEvidence.includes('CODE != RUNTIME') && bankEvidence.includes('COMMIT != DEPLOY') && bankEvidence.includes('TEST != PRODUCTION')],
  ['legal acceptance versions are persisted', paymentRoute.includes('LEGAL_DOCUMENT_VERSIONS') && store.includes('legalAcceptedAt') && store.includes('legalDocumentVersions')],
  ['legal timestamps are server-owned', paymentRoute.includes('const legalAcceptedAt = new Date().toISOString()') && !checkout.includes('presentedAt: new Date().toISOString()')],
];

const failed = requirements.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('VIP_SECURITY_GUARD_FAILED');
  for (const [name] of failed) console.error(`- ${name}`);
  process.exit(1);
}

console.log(`VIP/POS security regression guard: PASS (${requirements.length}/${requirements.length})`);
