#!/usr/bin/env bash
set -euo pipefail

files=(
  "public/videos/hero1.mp4"
  "public/videos/hero2.mp4"
  "public/videos/hero3.mp4"
)

# Quality guardrails for the compatibility transcode. These are internal
# acceptance thresholds, not claims of a universal perceptual standard.
min_ssim="0.985"
min_psnr="36.0"
crf_candidates=(18 20 22)

if ! command -v ffmpeg >/dev/null 2>&1 || ! command -v ffprobe >/dev/null 2>&1; then
  echo "Installing ffmpeg/ffprobe"
  sudo apt-get update -qq
  sudo apt-get install -y ffmpeg >/dev/null
fi

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

float_ge() {
  awk -v a="$1" -v b="$2" 'BEGIN { exit !(a+0 >= b+0) }'
}

probe_video() {
  local file="$1"
  ffprobe -v error -select_streams v:0 \
    -show_entries stream=codec_name,pix_fmt,width,height,r_frame_rate \
    -of csv=p=0 "$file"
}

probe_audio_codec() {
  local file="$1"
  ffprobe -v error -select_streams a:0 \
    -show_entries stream=codec_name -of default=nw=1:nk=1 "$file" 2>/dev/null || true
}

probe_duration() {
  local file="$1"
  ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$file"
}

atom_check() {
  local file="$1"
  python3 - "$file" <<'PY'
import os
import struct
import sys

path = sys.argv[1]
size = os.path.getsize(path)
pos = 0
atoms = []
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
                raise SystemExit(f"truncated extended atom header: {path}")
            atom_size = struct.unpack(">Q", ext)[0]
            header_size = 16
        elif atom_size == 0:
            atom_size = size - pos
        if atom_size < header_size:
            raise SystemExit(f"invalid atom size: {path} {atom_type}")
        atoms.append((atom_type, pos, atom_size))
        pos += atom_size

names = [x[0] for x in atoms]
if "moov" not in names or "mdat" not in names:
    raise SystemExit(f"missing moov/mdat: {path} atoms={names}")
moov = next(x[1] for x in atoms if x[0] == "moov")
mdat = next(x[1] for x in atoms if x[0] == "mdat")
print(f"atoms={names} moov={moov} mdat={mdat}")
if moov > mdat:
    raise SystemExit(f"moov is after mdat: {path}")
PY
}

measure_quality() {
  local source="$1"
  local candidate="$2"
  local ssim_log psnr_log ssim psnr

  ssim_log="$(ffmpeg -hide_banner -nostdin -v info -i "$source" -i "$candidate" \
    -lavfi '[0:v][1:v]ssim' -f null - 2>&1 || true)"
  ssim="$(printf '%s\n' "$ssim_log" | sed -n 's/.* All:\([0-9.]*\).*/\1/p' | tail -1)"

  psnr_log="$(ffmpeg -hide_banner -nostdin -v info -i "$source" -i "$candidate" \
    -lavfi '[0:v][1:v]psnr' -f null - 2>&1 || true)"
  psnr="$(printf '%s\n' "$psnr_log" | sed -n 's/.* average:\([0-9.]*\).*/\1/p' | tail -1)"

  if [ -z "$ssim" ] || [ -z "$psnr" ]; then
    echo "ERROR: could not parse SSIM/PSNR for $candidate" >&2
    return 1
  fi

  printf '%s %s\n' "$ssim" "$psnr"
}

echo "== PART 2: mobile-safe video normalization =="

total_before=0
total_after=0

for file in "${files[@]}"; do
  if [ ! -s "$file" ]; then
    echo "ERROR: missing or empty source: $file"
    exit 1
  fi

  base="$(basename "$file" .mp4)"
  source_copy="$tmpdir/${base}.source.mp4"
  cp "$file" "$source_copy"

  before_sha="$(git hash-object "$file")"
  before_size="$(stat -c%s "$file")"
  before_video="$(probe_video "$file")"
  before_audio="$(probe_audio_codec "$file")"
  before_duration="$(probe_duration "$file")"
  total_before=$((total_before + before_size))

  echo "SOURCE $file sha=$before_sha bytes=$before_size video=$before_video audio=${before_audio:-none} duration=$before_duration"

  best=""
  best_size=0
  best_crf=""
  best_ssim=""
  best_psnr=""

  for crf in "${crf_candidates[@]}"; do
    candidate="$tmpdir/${base}.crf${crf}.mp4"

    ffmpeg -hide_banner -nostdin -loglevel error -y \
      -i "$source_copy" \
      -map 0:v:0 \
      -c:v libx264 \
      -preset slow \
      -crf "$crf" \
      -profile:v high \
      -pix_fmt yuv420p \
      -tag:v avc1 \
      -movflags +faststart \
      -an \
      "$candidate"

    codec="$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nw=1:nk=1 "$candidate")"
    pix="$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of default=nw=1:nk=1 "$candidate")"
    audio="$(probe_audio_codec "$candidate")"
    [ "$codec" = "h264" ] || { echo "ERROR: candidate codec=$codec"; exit 1; }
    [ "$pix" = "yuv420p" ] || { echo "ERROR: candidate pix_fmt=$pix"; exit 1; }
    [ -z "$audio" ] || { echo "ERROR: candidate unexpectedly has audio=$audio"; exit 1; }
    atom_check "$candidate" >/dev/null

    read -r ssim psnr < <(measure_quality "$source_copy" "$candidate")
    candidate_size="$(stat -c%s "$candidate")"
    echo "CANDIDATE $file crf=$crf bytes=$candidate_size ssim=$ssim psnr=$psnr"

    if float_ge "$ssim" "$min_ssim" && float_ge "$psnr" "$min_psnr"; then
      if [ -z "$best" ] || [ "$candidate_size" -lt "$best_size" ]; then
        best="$candidate"
        best_size="$candidate_size"
        best_crf="$crf"
        best_ssim="$ssim"
        best_psnr="$psnr"
      fi
    fi
  done

  if [ -z "$best" ]; then
    echo "ERROR: no H.264 candidate met quality gates SSIM>=$min_ssim and PSNR>=$min_psnr for $file"
    exit 1
  fi

  # Verify geometry, frame rate, and duration were not materially altered.
  source_dims_fps="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of csv=p=0 "$source_copy")"
  best_dims_fps="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of csv=p=0 "$best")"
  if [ "$source_dims_fps" != "$best_dims_fps" ]; then
    echo "ERROR: geometry/frame-rate changed for $file source=$source_dims_fps output=$best_dims_fps"
    exit 1
  fi

  source_duration="$(probe_duration "$source_copy")"
  best_duration="$(probe_duration "$best")"
  duration_delta="$(awk -v a="$source_duration" -v b="$best_duration" 'BEGIN { d=a-b; if (d<0) d=-d; printf "%.6f", d }')"
  if ! awk -v d="$duration_delta" 'BEGIN { exit !(d <= 0.100001) }'; then
    echo "ERROR: duration changed by ${duration_delta}s for $file"
    exit 1
  fi

  cp "$best" "$file"

  final_codec="$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nw=1:nk=1 "$file")"
  final_pix="$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of default=nw=1:nk=1 "$file")"
  final_audio="$(probe_audio_codec "$file")"
  final_atoms="$(atom_check "$file")"
  final_size="$(stat -c%s "$file")"
  total_after=$((total_after + final_size))
  delta_pct="$(awk -v b="$before_size" -v a="$final_size" 'BEGIN { printf "%.2f", ((a-b)/b)*100 }')"

  [ "$final_codec" = "h264" ] || { echo "ERROR: final codec is not h264 for $file"; exit 1; }
  [ "$final_pix" = "yuv420p" ] || { echo "ERROR: final pix_fmt is not yuv420p for $file"; exit 1; }
  [ -z "$final_audio" ] || { echo "ERROR: final file has audio for $file"; exit 1; }

  echo "SELECTED $file crf=$best_crf bytes=$final_size delta_pct=$delta_pct ssim=$best_ssim psnr=$best_psnr codec=$final_codec pix_fmt=$final_pix audio=none $final_atoms"
done

total_delta_pct="$(awk -v b="$total_before" -v a="$total_after" 'BEGIN { printf "%.2f", ((a-b)/b)*100 }')"
echo "TOTAL before_bytes=$total_before after_bytes=$total_after delta_pct=$total_delta_pct"

echo "== Final repository diff scope =="
git status --short -- public/videos/hero1.mp4 public/videos/hero2.mp4 public/videos/hero3.mp4

# No architecture/application files are modified by this script.
for forbidden in firebase.json next.config.ts package.json package-lock.json src/components/ui/HeroSlider.tsx; do
  if ! git diff --quiet -- "$forbidden"; then
    echo "ERROR: forbidden out-of-scope change detected: $forbidden"
    exit 1
  fi
done

echo "PART2_NORMALIZATION=PASSED"
