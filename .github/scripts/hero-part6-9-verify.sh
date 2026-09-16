#!/usr/bin/env bash
set -euo pipefail

hero="src/components/ui/HeroSlider.tsx"

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

require() {
  local pattern="$1"
  local description="$2"
  grep -Fq -- "$pattern" "$hero" || fail "$description"
}

forbid() {
  local pattern="$1"
  local description="$2"
  if grep -Fq -- "$pattern" "$hero"; then
    fail "$description"
  fi
}

[ -s "$hero" ] || fail "HeroSlider.tsx missing or empty"

echo "== PART 6: fallback and layer ordering =="
require 'data-hero-fallback="true"' "permanent fallback marker missing"
require 'data-hero-video="true"' "hero video marker missing"
require 'data-hero-overlay="true"' "cinematic overlay marker missing"
require "data-hero-content={index === current ? 'active' : 'inactive'}" "hero content state marker missing"
require 'data-hero-cta="true"' "CTA marker missing"
require 'data-hero-nav="true"' "navigation marker missing"
require 'className="absolute inset-0 z-0 scale-110"' "fallback z-index invariant missing"
require 'z-[1]' "video z-index invariant missing"
require 'z-[2]' "overlay z-index invariant missing"
require "index === current ? 'z-10 opacity-100'" "active content visibility invariant missing"
require 'z-20' "navigation z-index invariant missing"
require "videoPlaying ? 'opacity-100' : 'opacity-0'" "video playing opacity gate missing"

fallback_line="$(grep -n 'data-hero-fallback="true"' "$hero" | head -1 | cut -d: -f1)"
video_line="$(grep -n 'data-hero-video="true"' "$hero" | head -1 | cut -d: -f1)"
overlay_line="$(grep -n 'data-hero-overlay="true"' "$hero" | head -1 | cut -d: -f1)"
content_line="$(grep -n 'data-hero-content=' "$hero" | head -1 | cut -d: -f1)"
nav_line="$(grep -n 'data-hero-nav="true"' "$hero" | head -1 | cut -d: -f1)"

if ! (( fallback_line < video_line && video_line < overlay_line && overlay_line < content_line && content_line < nav_line )); then
  fail "hero layer source ordering is not fallback -> video -> overlay -> content -> nav"
fi

echo "layer_order=PASS fallback=$fallback_line video=$video_line overlay=$overlay_line content=$content_line nav=$nav_line"

echo "== PART 7: slider lifecycle independence =="
require 'const SLIDE_DURATION_MS = 7000;' "7-second slide duration constant missing"
require '}, SLIDE_DURATION_MS);' "slider timer is not using independent duration"
require '}, [current]);' "slider timer must depend on current slide only"
forbid "if (mediaState === 'loading') return;" "slider still freezes while media state is loading"
forbid 'videoPlaying ? 7000 : 9000' "slider duration still depends on video playback state"
forbid 'setInterval(' "polling interval found in hero lifecycle"

echo "slider_lifecycle=PASS duration_ms=7000 media_state_dependency=no"

echo "== PART 8: hero1 priority and network pressure =="
require "preload={current === 0 ? 'auto' : 'metadata'}" "hero1 priority preload policy missing"
require "src={activeSlide.video}" "video source is not limited to active slide"
video_tag_count="$(grep -c '<video' "$hero")"
[ "$video_tag_count" -eq 1 ] || fail "expected exactly one active video element, found $video_tag_count"
forbid 'rel="preload"' "explicit speculative media preload link found; only active video should drive media loading"

echo "network_policy=PASS active_video_elements=$video_tag_count first_preload=auto later_preload=metadata speculative_preload_links=0"

echo "== PART 9: media failure handling =="
require "video.addEventListener('loadedmetadata', retry);" "loadedmetadata handler missing"
require "video.addEventListener('canplay', retry);" "canplay handler missing"
require "onPlaying={() => setMediaState('playing')}" "playing handler missing"
require 'onError={handleVideoError}' "error handler missing"
require 'onStalled={() =>' "stalled handler missing"
require 'const failedVideoRef = useRef<HTMLVideoElement | null>(null);' "hard-error guard ref missing"
require 'if (failedVideoRef.current === video) return;' "hard-error retry guard missing"
require 'if (video) failedVideoRef.current = video;' "hard-error terminal marking missing"
require 'failedVideoRef.current = null;' "next-slide error guard reset missing"
require 'key={activeSlide.id}' "video remount must be tied only to slide identity"

error_block="$(awk '/const handleVideoError = \(\) => \{/{flag=1} flag{print} flag && /^  };/ {exit}' "$hero")"
printf '%s\n' "$error_block" | grep -Fq 'setMediaState('
if printf '%s\n' "$error_block" | grep -Eq 'setCurrent|activeSlide|SLIDES'; then
  fail "hard error handler mutates slider identity/state"
fi

echo "failure_mode=PASS hard_error_same_video_retry=no next_slide_retry=yes"

echo "== PART 2 carry-forward: encoded media invariants =="
if ! command -v ffprobe >/dev/null 2>&1; then
  echo "ffprobe missing; installing ffmpeg package"
  sudo apt-get update -qq
  sudo apt-get install -y ffmpeg >/dev/null
fi

for file in public/videos/hero1.mp4 public/videos/hero2.mp4 public/videos/hero3.mp4; do
  [ -s "$file" ] || fail "missing hero asset: $file"
  codec="$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nw=1:nk=1 "$file")"
  pix="$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of default=nw=1:nk=1 "$file")"
  audio="$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=nw=1:nk=1 "$file" 2>/dev/null || true)"
  [ "$codec" = "h264" ] || fail "$file codec=$codec expected h264"
  [ "$pix" = "yuv420p" ] || fail "$file pix_fmt=$pix expected yuv420p"
  [ -z "$audio" ] || fail "$file has unexpected audio codec=$audio"

  python3 - "$file" <<'PY'
import os, struct, sys
path = sys.argv[1]
size = os.path.getsize(path)
pos = 0
atoms = []
with open(path, 'rb') as fh:
    while pos + 8 <= size:
        fh.seek(pos)
        header = fh.read(8)
        if len(header) < 8:
            break
        atom_size = struct.unpack('>I', header[:4])[0]
        atom_type = header[4:8].decode('latin-1')
        header_size = 8
        if atom_size == 1:
            ext = fh.read(8)
            if len(ext) < 8:
                raise SystemExit(f'truncated atom: {path}')
            atom_size = struct.unpack('>Q', ext)[0]
            header_size = 16
        elif atom_size == 0:
            atom_size = size - pos
        if atom_size < header_size:
            raise SystemExit(f'invalid atom: {path}')
        atoms.append((atom_type, pos))
        pos += atom_size
names = [x[0] for x in atoms]
if 'moov' not in names or 'mdat' not in names:
    raise SystemExit(f'missing moov/mdat: {path} {names}')
moov = next(pos for name, pos in atoms if name == 'moov')
mdat = next(pos for name, pos in atoms if name == 'mdat')
if moov >= mdat:
    raise SystemExit(f'moov not before mdat: {path} moov={moov} mdat={mdat}')
print(f'{path} codec_structure=PASS moov={moov} mdat={mdat}')
PY

done

echo "PART6_9_VERIFICATION=PASSED"
