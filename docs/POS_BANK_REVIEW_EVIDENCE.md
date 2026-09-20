# SAATCHI Virtual POS Bank Review Evidence Matrix

Status vocabulary: `VERIFIED_DONE`, `PARTIALLY_DONE`, `NOT_DONE`, `BLOCKED`, `NOT_APPLICABLE`.

This document intentionally separates repository evidence from production/bank evidence. A commit, build or test result is not treated as proof of a live deployment.

| Control | Status before production | Repository evidence | Production / external evidence required |
|---|---|---|---|
| Merchant does not collect PAN/CVV/expiry | VERIFIED_DONE | `src/lib/payment-boundary.ts`, `/api/payment`, security/behavior tests | DAST / browser flow confirmation after deploy |
| Hosted-payment redirect origin validation | PARTIALLY_DONE | HTTPS + exact-origin allowlist code | Exact bank/provider production HPP + 3DS origins |
| Payment API upstream origin validation | PARTIALLY_DONE | HTTPS + exact-origin allowlist code | Exact provider production API origin |
| Amount/currency integrity | VERIFIED_DONE | server-owned `vip.price` + TRY; provider echo verified | Real provider response contract + sandbox run |
| Provider order reference | PARTIALLY_DONE | response is rejected without provider order ID | Official provider field contract + sandbox evidence |
| 3-D Secure | BLOCKED | No speculative bank-specific implementation | Bank contract proving required 3DS mode and result fields |
| Callback/status verification | BLOCKED | No guessed signature algorithm is present | Official signature, timestamp, replay and status-query contract |
| Idempotency / duplicate payment-session defense | VERIFIED_DONE | Firestore CAS + Idempotency-Key + tests | Concurrent sandbox/provider test |
| Ambiguous timeout handling | VERIFIED_DONE | fail-closed `uncertain` state | Provider reconciliation/status test |
| Reconciliation recovery | PARTIALLY_DONE | admin + same-origin + step-up TOTP + no-charge confirmation + audit ref | Real bank/provider no-charge reconciliation exercise |
| Admin MFA | VERIFIED_DONE | admin key + TOTP, HttpOnly Secure SameSite session | Production secret provisioning and login runtime test |
| Admin brute-force defense | PARTIALLY_DONE | production Firestore-backed distributed 429 throttle + long key + TOTP | Edge/WAF rate-limit configuration + production runtime evidence |
| Security headers | PARTIALLY_DONE | Firebase HSTS/CSP/nosniff/referrer/permissions config | Live header readback and TLS scan |
| Checkout CSP isolation | PARTIALLY_DONE | dedicated checkout CSP, frame-src none, no third-party scripts; server-side HPP exact-origin validation | Replace broad static `form-action https:` with exact bank/provider HPP origins after onboarding, then live CSP/readback and browser regression |
| Legal consent | VERIFIED_DONE | visible unchecked mandatory consents; server-owned document versions/timestamp | Production browser screenshot/flow |
| Seller identity, contact, delivery, privacy, returns | VERIFIED_DONE | checkout/legal/contact routes and regression guard | Bank reviewer/live-site confirmation |
| SSL/TLS | BLOCKED | HTTPS-only code/config assumptions | External live TLS scan proving supported protocols/certificate |
| PCI DSS scope | BLOCKED | card-data minimization architecture | Acquirer/brand confirmation of SAQ scope and provider AOC |
| PCI ASV scan | BLOCKED | Not replaceable by unit tests | Passing external ASV report |
| Dependency security | VERIFIED_DONE for runtime dependency gate | CI audits production dependencies at moderate+ and all dependencies at high+ | Re-run on final merge SHA |
| Release integrity | PARTIALLY_DONE | exact-SHA release, build identity, runtime readback | Successful final production workflow |
| Rollback | PARTIALLY_DONE | release refuses mutation without previous SHA and contains verified automatic rollback | Production rollback drill / evidence |
| Live exact SHA | BLOCKED | release workflow implements readback | Final production `build-info.json` readback |
| GitHub main protection | BLOCKED | Current repository API reports main not protected | Enable ruleset/branch protection with required checks |
| Official merchant identifiers | BLOCKED | No invented VKN/MERSİS/ETBİS values in repo | Verified official business documents / bank requirement |
| Kuveyt Türk website-review basics | PARTIALLY_DONE | privacy, distance sales, return/cancellation, contact, checkout disclosures exist | Live SSL + active payment page bank review |
| Real payment E2E | BLOCKED | Mock success path removed | approved, decline, 3DS fail/cancel, timeout, replay, refund/void tests |

## Production acceptance evidence package

Do not mark the POS implementation complete until the final merge SHA has all of the following attached or referenced:

1. Bank/provider onboarding document version and approved production endpoints/origins.
2. Merchant/terminal identifiers supplied through secrets, never committed.
3. Provider PCI DSS AOC or equivalent acquirer evidence.
4. Acquirer-confirmed merchant PCI validation scope.
5. Passing ASV external scan where required.
6. Sandbox/test-merchant transaction evidence for approve, decline, 3DS cancel/fail, duplicate click, timeout/ambiguous outcome, reconciliation and refund/void where supported.
7. Final GitHub CI run for the exact merge SHA.
8. Production deploy run with exact SHA readback.
9. Live TLS and security-header report.
10. Admin MFA and unauthorized-access runtime checks.
11. Checkout screenshots demonstrating seller/product/price/delivery/legal disclosures and absence of merchant card fields.
12. Rollback/recovery evidence.
13. Edge/WAF rate-limit evidence for admin/payment abuse paths.

## Non-negotiable release rule

`CODE != RUNTIME`, `COMMIT != DEPLOY`, `TEST != PRODUCTION`. Missing production or bank evidence remains `BLOCKED`; it must never be converted to `VERIFIED_DONE` by wording alone.
