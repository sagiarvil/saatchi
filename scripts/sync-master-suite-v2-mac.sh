#!/usr/bin/env bash
set -euo pipefail

REMOTE="${MASTER_SUITE_REMOTE:-origin}"
BRANCH="${MASTER_SUITE_BRANCH:-feat/master-suite-v2-runtime}"

fail() {
  printf 'MASTER_SUITE_SYNC_FAIL: %s\n' "$1" >&2
  exit 1
}

command -v git >/dev/null 2>&1 || fail "git not installed"
command -v node >/dev/null 2>&1 || fail "node not installed"
command -v npm >/dev/null 2>&1 || fail "npm not installed"

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "run inside the Saatchi git repository"
cd "$ROOT"

[ -z "$(git status --porcelain)" ] || fail "worktree is dirty; commit/stash intentionally before sync"
git remote get-url "$REMOTE" >/dev/null 2>&1 || fail "remote '$REMOTE' missing"

git fetch "$REMOTE" "$BRANCH"
TARGET_SHA="$(git rev-parse "$REMOTE/$BRANCH")"
[ -n "$TARGET_SHA" ] || fail "cannot resolve remote branch"

git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" "$REMOTE/$BRANCH"
git reset --ff-only "$REMOTE/$BRANCH" 2>/dev/null || {
  LOCAL_SHA="$(git rev-parse HEAD)"
  [ "$LOCAL_SHA" = "$TARGET_SHA" ] || fail "local branch diverged; refusing destructive reset"
}

# Obsolete v1 false-pass artifacts must not survive the sync.
rm -f deliverables/21_DARK_POOL_HALLUCINATION_MONITOR.py
rm -f scripts/generate-universal-deliverables.py

node --check scripts/master-suite-v2.mjs
node --check scripts/test-master-suite-v2.mjs
npm run suite:verify

for required in   .gemini/commands/suite.toml   .gemini/settings.json   scripts/master-suite-v2.mjs   scripts/test-master-suite-v2.mjs   n8n/22_N8N_AI_SEARCH_MONITORING_WORKFLOW.json   .github/workflows/master-suite-v2.yml
do
  [ -s "$required" ] || fail "required file missing or empty: $required"
done

CURRENT_SHA="$(git rev-parse HEAD)"
[ "$CURRENT_SHA" = "$TARGET_SHA" ] || fail "HEAD does not match remote target SHA"
[ -z "$(git status --porcelain)" ] || fail "sync left uncommitted changes"

printf 'MASTER_SUITE_V2_SYNC_OK sha=%s branch=%s\n' "$CURRENT_SHA" "$BRANCH"
