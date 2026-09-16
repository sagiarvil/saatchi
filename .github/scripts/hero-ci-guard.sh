#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

hero="src/components/ui/HeroSlider.tsx"
assets=(
  "public/videos/hero1.mp4"
  "public/videos/hero2.mp4"
  "public/videos/hero3.mp4"
)

echo "== HERO CI GUARD: assets =="
for file in "${assets[@]}"; do
  [ -f "$file" ] || fail "$file missing"
  [ -s "$file" ] || fail "$file is empty"
  git ls-files --error-unmatch "$file" >/dev/null 2>&1 || fail "$file is not tracked by git"
  bytes="$(wc -c < "$file" | tr -d ' ')"
  echo "$file bytes=$bytes tracked=yes"
done

echo "== HERO CI GUARD: HeroSlider lint =="
[ -s "$hero" ] || fail "$hero missing or empty"
npx eslint "$hero"
echo "hero_lint=PASS"

echo "== HERO CI GUARD: production build =="
npm run build
echo "production_build=PASS"

echo "HERO_CI_GUARD=PASSED"
