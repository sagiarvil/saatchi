#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${HERO_PRODUCTION_URL:-https://saatchi.watch}"
IOS_UA='Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
failures=0

fail() {
  echo "ERROR: $*" >&2
  failures=1
}

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

echo "== Production homepage readback =="
http_code="$(curl -sS -L --retry 2 --connect-timeout 10 --max-time 60 -A "$IOS_UA" -o "$tmp/home.html" -w '%{http_code}' "$BASE_URL/")"
echo "homepage HTTP=$http_code bytes=$(stat -c%s "$tmp/home.html")"
[ "$http_code" = "200" ] || fail "homepage returned HTTP=$http_code"

grep -Fq 'data-hero-root="true"' "$tmp/home.html" || fail "live homepage does not contain current data-hero-root marker"
grep -Fq '/videos/hero1.mp4' "$tmp/home.html" || fail "live homepage does not reference hero1.mp4"

echo "== Production video binary readback =="
for name in hero1.mp4 hero2.mp4 hero3.mp4; do
  local_file="public/videos/$name"
  live_file="$tmp/$name"
  headers="$tmp/$name.headers"

  [ -s "$local_file" ] || { fail "missing local $local_file"; continue; }

  code="$(curl -sS -L --retry 2 --connect-timeout 10 --max-time 180 \
    -A "$IOS_UA" -D "$headers" -o "$live_file" -w '%{http_code}' \
    "$BASE_URL/videos/$name?readback=${GITHUB_SHA:-manual}")"

  content_type="$(awk 'BEGIN{IGNORECASE=1} /^content-type:/ {v=$2} END {gsub(/\r/,"",v); split(v,a,";"); print tolower(a[1])}' "$headers")"
  cache_control="$(awk 'BEGIN{IGNORECASE=1} /^cache-control:/ {$1=""; sub(/^ /,""); v=$0} END {gsub(/\r/,"",v); print v}' "$headers")"
  local_sha="$(sha256sum "$local_file" | awk '{print $1}')"
  live_sha="$(sha256sum "$live_file" | awk '{print $1}')"
  local_bytes="$(stat -c%s "$local_file")"
  live_bytes="$(stat -c%s "$live_file")"

  echo "$name HTTP=$code type=${content_type:-missing} cache='${cache_control:-missing}' local_bytes=$local_bytes live_bytes=$live_bytes"
  echo "$name local_sha=$local_sha"
  echo "$name live_sha =$live_sha"

  [ "$code" = "200" ] || fail "$name full readback returned HTTP=$code"
  [ "$content_type" = "video/mp4" ] || fail "$name Content-Type=${content_type:-missing}; expected video/mp4"
  [ "$local_bytes" = "$live_bytes" ] || fail "$name byte-size drift: repo=$local_bytes live=$live_bytes"
  [ "$local_sha" = "$live_sha" ] || fail "$name SHA-256 drift: production binary is not repo HEAD binary"

  range_headers="$tmp/$name.range.headers"
  range_code="$(curl -sS -L --retry 2 --connect-timeout 10 --max-time 60 \
    -A "$IOS_UA" -H 'Range: bytes=0-1023' -D "$range_headers" -o /dev/null \
    -w '%{http_code}' "$BASE_URL/videos/$name?range=${GITHUB_SHA:-manual}")"
  content_range="$(awk 'BEGIN{IGNORECASE=1} /^content-range:/ {$1=""; sub(/^ /,""); v=$0} END {gsub(/\r/,"",v); print v}' "$range_headers")"
  echo "$name range HTTP=$range_code Content-Range=${content_range:-missing}"
  [ "$range_code" = "206" ] || fail "$name range request returned HTTP=$range_code; expected 206"
  [ -n "$content_range" ] || fail "$name range request missing Content-Range"
done

if [ "$failures" -ne 0 ]; then
  echo "HERO_PRODUCTION_READBACK=FAILED"
  exit 1
fi

echo "HERO_PRODUCTION_READBACK=PASSED"
