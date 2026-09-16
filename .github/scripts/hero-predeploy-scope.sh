#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

base="${HERO_SCOPE_BASE:-HEAD^}"
if [ -z "$base" ] || [[ "$base" =~ ^0+$ ]] || ! git rev-parse --verify "$base^{commit}" >/dev/null 2>&1; then
  base="HEAD^"
fi

echo "hero_scope_base=$base"
mapfile -t changed < <(git diff --name-only "$base"...HEAD)

if [ "${#changed[@]}" -eq 0 ]; then
  fail "no changed files found for hero release scope"
fi

allowed() {
  case "$1" in
    src/components/ui/HeroSlider.tsx) return 0 ;;
    src/app/globals.css) return 0 ;;
    postcss.config.mjs) return 0 ;; # existing Tailwind/PostCSS pipeline restored from repo backup
    public/videos/*) return 0 ;;
    .github/scripts/hero-*) return 0 ;;
    .github/workflows/hero-*) return 0 ;;
    *) return 1 ;;
  esac
}

forbidden_reason() {
  case "$1" in
    firebase.json) echo "Firebase hosting architecture" ;;
    next.config.ts|next.config.js|next.config.mjs) echo "Next.js architecture" ;;
    src/app/api/*|src/app/api/**) echo "API routes" ;;
    *auth*|*Auth*|*authentication*) echo "authentication" ;;
    *payment*|*Payment*|*checkout*|*Checkout*) echo "payment/checkout" ;;
    *product*|*Product*) echo "product pages/data" ;;
    *database*|*Database*|*firestore*|*firebase*) echo "database/platform" ;;
    *pricing*|*Pricing*) echo "pricing" ;;
    *) echo "outside approved hero scope" ;;
  esac
}

echo "== HERO PREDEPLOY SCOPE =="
status=0
for file in "${changed[@]}"; do
  if allowed "$file"; then
    echo "ALLOW $file"
  else
    echo "BLOCK $file reason=$(forbidden_reason "$file")" >&2
    status=1
  fi
done

[ "$status" -eq 0 ] || fail "hero release contains out-of-scope changes; deployment must stop"
echo "HERO_PREDEPLOY_SCOPE=PASSED"
