#!/usr/bin/env bash
set -u

failures=0
files=(
  "public/videos/hero1.mp4"
  "public/videos/hero2.mp4"
  "public/videos/hero3.mp4"
)

fail() {
  echo "ERROR: $*"
  failures=1
}

echo "== Repository asset checks =="
for file in "${files[@]}"; do
  if [ ! -s "$file" ]; then
    fail "Missing or empty hero asset: $file"
    continue
  fi
  if ! git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
    fail "Hero asset is not git-tracked: $file"
  fi
  mime="$(file -b --mime-type "$file" 2>/dev/null || true)"
  if [ "$mime" != "video/mp4" ]; then
    fail "Unexpected local MIME for $file: ${mime:-missing}"
  fi
  echo "$file bytes=$(stat -c%s "$file") mime=${mime:-missing} tracked=yes"
done

echo "== MP4 codec and streaming structure =="
if ! command -v ffprobe >/dev/null 2>&1; then
  echo "ffprobe missing; installing ffmpeg package"
  sudo apt-get update -qq && sudo apt-get install -y ffmpeg || fail "Could not install ffmpeg/ffprobe"
fi

if command -v ffprobe >/dev/null 2>&1; then
  for file in "${files[@]}"; do
    [ -s "$file" ] || continue
    video_codec="$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nw=1:nk=1 "$file" 2>/dev/null || true)"
    pixel_format="$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of default=nw=1:nk=1 "$file" 2>/dev/null || true)"
    audio_codec="$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=nw=1:nk=1 "$file" 2>/dev/null || true)"

    [ "$video_codec" = "h264" ] || fail "$file video codec=$video_codec; expected h264"
    [ "$pixel_format" = "yuv420p" ] || fail "$file pixel format=$pixel_format; expected yuv420p"
    if [ -n "$audio_codec" ] && [ "$audio_codec" != "aac" ]; then
      fail "$file audio codec=$audio_codec; expected aac or no audio"
    fi

    python3 - "$file" <<'PY' || failures=1
import os
import struct
import sys

path = sys.argv[1]
size = os.path.getsize(path)
atoms = []
pos = 0
with open(path, "rb") as fh:
    while pos + 8 <= size:
        fh.seek(pos)
        header = fh.read(8)
        if len(header) < 8:
            break
        atom_size = struct.unpack(">I", header[:4])[0]
        atom_type = header[4:8].decode("latin-1")
        header_size = 8
        if atom_size == 1:
            ext = fh.read(8)
            if len(ext) < 8:
                raise SystemExit(f"ERROR: {path}: truncated extended atom header")
            atom_size = struct.unpack(">Q", ext)[0]
            header_size = 16
        elif atom_size == 0:
            atom_size = size - pos
        if atom_size < header_size:
            raise SystemExit(f"ERROR: {path}: invalid atom size for {atom_type}")
        atoms.append((atom_type, pos, atom_size))
        pos += atom_size

names = [atom[0] for atom in atoms]
if "moov" not in names or "mdat" not in names:
    raise SystemExit(f"ERROR: {path}: missing moov or mdat atom; atoms={names}")
moov_pos = next(atom[1] for atom in atoms if atom[0] == "moov")
mdat_pos = next(atom[1] for atom in atoms if atom[0] == "mdat")
print(f"{path}: atoms={names} moov={moov_pos} mdat={mdat_pos}")
if moov_pos > mdat_pos:
    raise SystemExit(f"ERROR: {path}: moov atom is after mdat; fast-start is not enabled")
PY
    echo "$file codec=${video_codec:-missing} pix_fmt=${pixel_format:-missing} audio=${audio_codec:-none}"
  done
fi

echo "== Hero lint =="
if ! npx eslint src/components/ui/HeroSlider.tsx; then
  fail "HeroSlider lint failed"
fi

echo "== Production build =="
if ! npm run build; then
  fail "Production build failed"
fi

echo "== Current deployment artifact check =="
public_dir="$(node - <<'NODE'
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('firebase.json', 'utf8'));
const raw = config.hosting;
const hosting = Array.isArray(raw)
  ? (raw.find((entry) => entry && entry.site === 'saatchi') || raw[0])
  : raw;
process.stdout.write(hosting && typeof hosting.public === 'string' ? hosting.public : '');
NODE
)"

if [ -n "$public_dir" ]; then
  echo "Firebase public directory from current config: $public_dir"
  for name in hero1.mp4 hero2.mp4 hero3.mp4; do
    target="$public_dir/videos/$name"
    if [ ! -s "$target" ]; then
      fail "Hero asset missing from current deployment artifact: $target"
    else
      echo "$target bytes=$(stat -c%s "$target")"
    fi
  done
else
  echo "No hosting.public directory is configured; static artifact-path check is not applicable."
fi

echo "== Production mobile HTTP/MIME/range probes =="
ios_ua='Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
android_ua='Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36'

probe() {
  ua_name="$1"
  ua="$2"
  name="$3"
  url="https://saatchi.watch/videos/$name"
  headers="$(mktemp)"
  errfile="$(mktemp)"
  code="$(curl -sS -L --retry 2 --connect-timeout 10 --max-time 40 \
    -A "$ua" -H 'Range: bytes=0-1023' -D "$headers" -o /dev/null \
    -w '%{http_code}' "$url" 2>"$errfile" || true)"
  content_type="$(awk 'BEGIN{IGNORECASE=1} /^content-type:/ {v=$2} END {gsub(/\r/,"",v); split(v,a,";"); print tolower(a[1])}' "$headers")"
  accept_ranges="$(awk 'BEGIN{IGNORECASE=1} /^accept-ranges:/ {v=$2} END {gsub(/\r/,"",v); print tolower(v)}' "$headers")"
  content_range="$(awk 'BEGIN{IGNORECASE=1} /^content-range:/ {$1=""; sub(/^ /,""); v=$0} END {gsub(/\r/,"",v); print v}' "$headers")"

  echo "$ua_name $url -> HTTP=${code:-missing} Content-Type=${content_type:-missing} Accept-Ranges=${accept_ranges:-missing} Content-Range=${content_range:-missing}"

  if [ "$code" != "200" ] && [ "$code" != "206" ]; then
    fail "$ua_name $url returned HTTP=${code:-missing}"
    cat "$errfile" || true
  fi
  if [ "$content_type" != "video/mp4" ]; then
    fail "$ua_name $url returned Content-Type=${content_type:-missing}"
  fi
  rm -f "$headers" "$errfile"
}

for name in hero1.mp4 hero2.mp4 hero3.mp4; do
  probe ios "$ios_ua" "$name"
  probe android "$android_ua" "$name"
done

echo "== PART 1 result =="
if [ "$failures" -ne 0 ]; then
  echo "PART1_VERIFICATION=FAILED"
  exit 1
fi

echo "PART1_VERIFICATION=PASSED"
