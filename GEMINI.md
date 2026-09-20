# SAATCHI — MASTER SUITE v2 RUNTIME CONTRACT

## Source of truth
Project business invariants live in `AGENTS.md`. `/suite` execution invariants live in code, not prose:
- `.gemini/commands/suite.toml` — real Gemini CLI `/suite` entry point.
- `.gemini/settings.json` — synchronous enforcement hooks.
- `scripts/master-suite-v2.mjs` — contract, scope, fail-closed and verification engine.
- `scripts/test-master-suite-v2.mjs` — permanent regression tests.
- `n8n/22_N8N_AI_SEARCH_MONITORING_WORKFLOW.json` — importable evidence/observability gate.
- `.github/workflows/master-suite-v2.yml` — independent CI gate.

## /suite semantics
`/suite <task>` is accepted as complete only when the runtime verifier proves all applicable conditions:
1. A valid execution contract was registered before mutation.
2. Every new changed file is inside `allowedFiles` and outside `forbiddenFiles`.
3. `git diff --check` passes.
4. Every deterministic test in the contract exits 0.
5. Runtime readback passes when `runtime.required=true`.
6. External writes/deploys/pushes are not performed by `/suite`.

Unknown, missing or unverifiable evidence is FAIL, never PASS. The worker/model cannot self-certify completion. AfterAgent verification is the completion oracle and may trigger only the bounded repair attempts declared in the contract.

## Operational rule
Use `/commands reload` after changing `.gemini/commands/suite.toml`. Gemini CLI hooks must remain enabled. Do not bypass the hooks to claim `/suite` completion.
