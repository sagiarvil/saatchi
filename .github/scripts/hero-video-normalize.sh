#!/usr/bin/env bash
set -euo pipefail

files=(
  "public/videos/hero1.mp4"
  "public/videos/hero2.mp4"
  "public/videos/hero3.mp4"
)

# Immutable pre-normalization source blobs. Using the original VP9/AV1 sources
# avoids generational H.264-to-H.264 quality loss during later refinements.
declare -A baseline_blobs=(
  ["hero1.mp4"]="d76db02fd6802b7fbe876b74e1dd2b736eb9f563"
  ["hero2.mp4"]="a7ba1cf24e304203a28ea200228f7ec1ccd5e498"
  ["hero3.mp4"]="d01533d3a66b0f9e0d4a40c4458d938ebca34ea7"
)

# Conservative internal quality gates. These are evidence thresholds for this
# project, not a claim that SSIM/PSNR alone define perceptual quality.
min_ssim="0.990"
min_psnr="42.0"
crf_candidates=(22 24 26 28)

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

echo "== PART 2: mobile-safe video normalization / bitrate refinement =="

total_original=0
total_selected=0

for file in "${files[@]}"; do
  if [ ! -s "$file" ]; then
    echo "ERROR: missing or empty current asset: $file"
    exit 1
  fi

  base="$(basename "$file" .mp4)"
  blob="${baseline_blobs[$(basename "$file")]}"
  source_copy="$tmpdir/${base}.original.mp4"

  if ! git cat-file -e "$blob" 2>/dev/null; then
    echo "ERROR: original source blob is unavailable for $file: $blob"
    exit 1
  fi
  git cat-file blob "$blob" > "$source_copy"

  original_size="$(stat -c%s "$source_copy")"
  original_video="$(probe_video "$source_copy")"
  original_audio="$(probe_audio_codec "$source_copy")"
  original_duration="$(probe_duration "$source_copy")"
  current_size="$(stat -c%s "$file")"
  current_video="$(probe_video "$file")"
  total_original=$((total_original + original_size))

  echo "ORIGINAL $file blob=$blob bytes=$original_size video=$original_video audio=${original_audio:-none} duration=$original_duration"
  echo "CURRENT  $file bytes=$current_size video=$current_video"

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
    delta_original="$(awk -v b="$original_size" -v a="$candidate_size" 'BEGIN { printf "%.2f", ((a-b)/b)*100 }')"
    echo "CANDIDATE $file crf=$crf bytes=$candidate_size delta_vs_original_pct=$delta_original ssim=$ssim psnr=$psnr"

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
  total_selected=$((total_selected + final_size))
  delta_pct="$(awk -v b="$original_size" -v a="$final_size" 'BEGIN { printf "%.2f", ((a-b)/b)*100 }')"

  [ "$final_codec" = "h264" ] || { echo "ERROR: final codec is not h264 for $file"; exit 1; }
  [ "$final_pix" = "yuv420p" ] || { echo "ERROR: final pix_fmt is not yuv420p for $file"; exit 1; }
  [ -z "$final_audio" ] || { echo "ERROR: final file has audio for $file"; exit 1; }

  echo "SELECTED $file crf=$best_crf bytes=$final_size delta_vs_original_pct=$delta_pct ssim=$best_ssim psnr=$best_psnr codec=$final_codec pix_fmt=$final_pix audio=none $final_atoms"
done

total_delta_pct="$(awk -v b="$total_original" -v a="$total_selected" 'BEGIN { printf "%.2f", ((a-b)/b)*100 }')"
echo "TOTAL original_bytes=$total_original selected_bytes=$total_selected delta_vs_original_pct=$total_delta_pct"

echo "== Final repository diff scope =="
git status --short -- public/videos/hero1.mp4 public/videos/hero2.mp4 public/videos/hero3.mp4

for forbidden in firebase.json next.config.ts package.json package-lock.json src/components/ui/HeroSlider.tsx; do
  if ! git diff --quiet -- "$forbidden"; then
    echo "ERROR: forbidden out-of-scope change detected: $forbidden"
    exit 1
  fi
done

echo "PART2_NORMALIZATION=PASSED"
