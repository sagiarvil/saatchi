# SAATCHI POS Security Handoff

Branch: `security/pos-hardening-2026-09-18`

## Design lock

Customer-facing layout, spacing, typography, product catalog, navigation, imagery and visual theme are outside this change set. The checkout visual structure is preserved. Changes are limited to authorization, payment handoff, browser security headers, tests and release safety.

## Security invariants

- VIP create/revoke/list operations require the existing signed HttpOnly admin session.
- Payment creation cannot return the temporary `TEST_POS` success path.
- Checkout never executes provider-supplied HTML.
- Provider handoff accepts HTTPS only.
- Production payment redirects require `SAATCHI_PAYMENT_ALLOWED_ORIGINS`.
- VIP link state is verified before and after external payment-session creation.
- Provider call remains bounded by timeout and uses a request correlation id.
- PAN/CVV fields are not accepted by the SAATCHI checkout API.
- Pull requests execute the same regression/build suite before merge.
- Production deployment remains restricted to the existing main-branch release workflow and retains automatic rollback/readback.

## Required production configuration

`SAATCHI_PAYMENT_ALLOWED_ORIGINS` must be a comma-separated allowlist of the exact hosted-payment / 3DS origins returned by the approved provider(s).

Example only:

```text
SAATCHI_PAYMENT_ALLOWED_ORIGINS=https://secure.bank.example,https://3ds.bank.example
```

Do not add speculative bank domains. Populate only from the bank/provider production documentation and onboarding package.

## Merge rule

Do not bypass the PR checks. Do not manually deploy this branch. Merge only after `Saatchi Main Regression` succeeds. The existing production workflow will build the exact verified main SHA, deploy it, read back `build-info.json`, run public runtime smoke checks and automatically roll back when post-deploy verification fails.
