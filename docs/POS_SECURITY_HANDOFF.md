# SAATCHI POS Security Handoff

Branch: `security/pos-hardening-2026-09-18`

## Scope

Product catalog, global navigation, typography, imagery and site visual theme are outside this change set. The VIP checkout received one intentional compliance-only UI change: mandatory legal acknowledgements are now visible, unchecked by default, and required before payment-session creation. This corrects the previous hidden/preaccepted implementation.

## Security invariants

- VIP create/revoke/list operations require the signed HttpOnly admin session.
- Management mutations require same-origin provenance.
- Payment creation cannot return the temporary `TEST_POS` path; the mock success route and stale patch artifacts are removed.
- Dead `payment_backend_ready` code that accepted PAN/CVV/expiry is removed from the branch.
- The active SAATCHI payment API explicitly rejects card-number/CVV/expiry fields.
- Card data must be collected on the approved bank/payment-provider page, not by SAATCHI.
- Provider handoff accepts HTTPS only.
- Production hosted-payment/3DS redirects require exact origins in `SAATCHI_PAYMENT_ALLOWED_ORIGINS`.
- Production payment API calls require `SAATCHI_PAYMENT_CREATE_URL` and exact upstream origins in `SAATCHI_PAYMENT_API_ALLOWED_ORIGINS`.
- The legacy `BELGIN_PAYMENT_CREATE_URL` fallback is disabled in production.
- A durable Firestore CAS state machine prevents concurrent/repeated payment-session creation for one VIP link.
- Payment states are `idle -> creating -> ready` or `idle -> creating -> uncertain`.
- `ready` cannot be reset. `uncertain` requires admin + same-origin + explicit bank/provider no-charge confirmation + reconciliation reference/reason before returning to `idle`.
- VIP durable state is checked before and after provider session creation.
- Provider calls have bounded timeout, correlation ID and Idempotency-Key.
- Provider-supplied HTML is not executed in the checkout.
- Pull requests run dependency high/critical audit, security guard, behavioral tests, targeted lint and production build.

## Required production configuration

The following values are mandatory before merge/deploy:

```text
SAATCHI_PAYMENT_CREATE_URL=https://<approved-payment-session-api>
SAATCHI_PAYMENT_API_ALLOWED_ORIGINS=https://<exact-approved-api-origin>
SAATCHI_PAYMENT_ALLOWED_ORIGINS=https://<exact-hosted-payment-origin>,https://<exact-3ds-origin>
```

Do not add speculative domains. Values must come from the bank/provider production onboarding package.

Existing VIP secrets/session configuration must also be confirmed in the target environment:

```text
VIP_PAYMENT_SECRET=<strong production secret>
VIP_ADMIN_KEY=<strong production admin key>
VIP_ADMIN_SESSION_SECRET=<strong independent production session secret; mandatory>
VIP_ADMIN_TOTP_SECRET=<base32 TOTP secret; minimum 160-bit; mandatory in production>
```

## External validation still required

Repository code and CI cannot prove the bank/acquirer production environment. Before production acceptance, obtain and retain:

- Approved bank/provider production endpoint and hosted-payment/3DS origins.
- Callback/status/reconciliation contract and signature-verification rules.
- Merchant/terminal configuration confirmation from the bank/acquirer.
- PCI DSS validation scope confirmation from the acquirer/payment brand.
- Required ASV external scan result for the merchant e-commerce web presence.
- Real bank test-merchant flow: approved transaction, declined transaction, 3DS failure/cancel, timeout/ambiguous result, repeat-click/idempotency, reconciliation and refund/void where applicable.
- Production runtime readback of the exact deployed SHA and security headers.

## Audit synchronization marker

Latest main reviewed during strict closure pass: `9c22da36e4ad16537de43352a2aa7468e03c3b75`.

The two main-only commits reviewed in this pass affect product filtering, hero media, product images and generated Tailwind output. They do not modify the VIP/payment/admin API files. The PR CI must nevertheless pass on GitHub's current-main merge ref before the PR can leave draft state.

Live `saatchi.watch` runtime could not be independently fetched from the available web runtime in this session, so production header/endpoint verification remains explicitly BLOCKED until post-deploy readback is available.

## Release rule

Do not bypass PR checks and do not manually deploy this branch. Keep the PR draft until external production parameters are available and verified. After an approved merge to `main`, the existing production workflow builds the exact verified main SHA, deploys it, reads back `build-info.json`, runs public runtime smoke checks and attempts automatic rollback to the previous live SHA if deployment verification fails.
