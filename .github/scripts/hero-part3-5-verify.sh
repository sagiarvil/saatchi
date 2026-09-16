#!/usr/bin/env bash
set -euo pipefail

hero="src/components/ui/HeroSlider.tsx"
css="src/app/globals.css"

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

require_literal() {
  local file="$1"
  local needle="$2"
  grep -Fq -- "$needle" "$file" || fail "$file missing required invariant: $needle"
}

for file in "$hero" "$css"; do
  test -s "$file" || fail "missing or empty file: $file"
done

echo "== PART 3: video element and bounded playback =="
for needle in \
  "autoPlay" \
  "loop" \
  "muted" \
  "playsInline" \
  "preload={current === 0 ? 'auto' : 'metadata'}" \
  "video.muted = true" \
  "video.defaultMuted = true" \
  "video.playsInline = true" \
  "video.setAttribute('muted', '')" \
  "video.setAttribute('autoplay', '')" \
  "video.setAttribute('playsinline', '')" \
  "video.setAttribute('webkit-playsinline', 'true')" \
  "video.addEventListener('loadedmetadata', retry)" \
  "video.addEventListener('canplay', retry)" \
  "window.addEventListener('pageshow', retry)" \
  "document.addEventListener('visibilitychange', handleVisibility)" \
  "handleFirstInteraction" \
  "retry();"; do
  require_literal "$hero" "$needle"
done

play_calls="$(grep -o 'video\.play()' "$hero" | wc -l | tr -d ' ')"
[ "$play_calls" = "1" ] || fail "expected exactly one direct video.play() call, found $play_calls"

for forbidden in \
  "retryTimersRef" \
  "clearRetryTimers" \
  "video.addEventListener('loadeddata'" \
  "window.addEventListener('online'" \
  "onCanPlay=" \
  "setInterval(" \
  "[0, 250, 900, 2200]"; do
  if grep -Fq -- "$forbidden" "$hero"; then
    fail "aggressive or duplicate playback retry returned: $forbidden"
  fi
done

echo "== PART 4: mobile visibility and viewport invariants =="
for needle in \
  'data-hero-video="true"' \
  "absolute" \
  "inset-0" \
  "block" \
  "h-full" \
  "w-full" \
  "object-cover" \
  "h-[100svh]" \
  "min-h-[560px]"; do
  require_literal "$hero" "$needle"
done

for forbidden in "sm:hidden" "md:hidden" "lg:hidden" "mobile:hidden" "hidden md:block" "hidden sm:block"; do
  if grep -Fq -- "$forbidden" "$hero"; then
    fail "responsive hero hiding class found: $forbidden"
  fi
done

python3 - "$css" <<'PY'
import re
import sys

path = sys.argv[1]
text = open(path, encoding="utf-8").read()

hero = re.search(r'\[data-hero-video="true"\]\s*\{([^}]*)\}', text, re.S)
if not hero:
    raise SystemExit("ERROR: scoped hero video CSS rule missing")
body = hero.group(1)
required = {
    "position": "absolute",
    "inset": "0",
    "width": "100%",
    "height": "100%",
    "display": "block",
    "visibility": "visible",
    "object-fit": "cover",
}
for prop, value in required.items():
    if not re.search(rf'{re.escape(prop)}\s*:\s*{re.escape(value)}\s*;', body):
        raise SystemExit(f"ERROR: hero CSS missing {prop}: {value}")

reduced = re.search(r'@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{(.*)\}\s*$', text, re.S)
if not reduced:
    raise SystemExit("ERROR: reduced-motion policy block missing")
rb = reduced.group(1).lower()
for forbidden in (
    "animation-duration: inherit",
    "animation-iteration-count: inherit",
    "transition-duration: inherit",
    "!important",
    "display: none",
    "visibility: hidden",
):
    if forbidden in rb:
        raise SystemExit(f"ERROR: unsafe reduced-motion override found: {forbidden}")
print("CSS invariants OK")
PY

echo "== PART 5: source-wide reduced-motion sanity =="
if grep -RIn --include='*.css' -E 'prefers-reduced-motion[^}]*' src >/dev/null 2>&1; then
  echo "Reduced-motion declarations found under src; scoped policy inspected above."
fi

if grep -RIn --exclude-dir=node_modules -F "patch_video_force" src >/dev/null 2>&1; then
  fail "legacy force-play patch is referenced from active src code"
fi

echo "PART3_5_STATIC_VERIFICATION=PASSED"
