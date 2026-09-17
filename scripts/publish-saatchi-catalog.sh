#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== 1/8 GIT SYNC ==="
git switch main
git pull --ff-only origin main

echo "=== 2/8 PYTHON ENV ==="
PYENV="$ROOT/.venv-catalog"
if [ ! -x "$PYENV/bin/python" ]; then
  python3 -m venv "$PYENV"
fi
"$PYENV/bin/python" -m pip install -q --upgrade pip
"$PYENV/bin/python" -m pip install -q curl_cffi beautifulsoup4

echo "=== 3/8 SOURCE CATALOG SYNC ==="
"$PYENV/bin/python" scripts/sync-saatchi-catalog-v3.py

echo "=== 4/8 CATALOG VALIDATION ==="
"$PYENV/bin/python" - <<'PY'
import json, sys
from pathlib import Path
MAX=1_799_000
root=Path.cwd()
elite=json.loads((root/'src/data/elit-saatler.json').read_text(encoding='utf-8'))
watch=json.loads((root/'src/data/saatler.json').read_text(encoding='utf-8'))
report=json.loads((root/'scripts/sync-saatchi-catalog-report.json').read_text(encoding='utf-8'))
all_items=elite+watch
over=[x for x in all_items if float(x.get('calculatedPrice') or 0)>MAX]
zero=[x for x in all_items if float(x.get('calculatedPrice') or 0)<=0]
elite_allowed={'Rolex','Cartier','TAG Heuer','Rado'}
wrong_elite=[x for x in elite if x.get('brand') not in elite_allowed]
if over or zero or wrong_elite:
    print('CATALOG_VALIDATION_FAILED')
    print('over_cap=', len(over), 'zero_price=', len(zero), 'wrong_elite=', len(wrong_elite))
    sys.exit(1)
print('ELITE_COUNT=', len(elite))
print('WATCH_COUNT=', len(watch))
print('SOURCE_COUNTS=', report.get('sourceCounts'))
print('SOURCE_ERRORS=', report.get('errors'))
print('CATALOG_VALIDATION_OK')
PY

echo "=== 5/8 BUILD ==="
npm run build
git restore src/app/tailwind.css 2>/dev/null || true

echo "=== 6/8 COMMIT GENERATED CATALOG ==="
git add src/data/elit-saatler.json src/data/saatler.json src/data/saatler_paytr.json scripts/sync-saatchi-catalog-report.json
if ! git diff --cached --quiet; then
  git commit -m "data: refresh Saatchi catalog from approved sources"
  git push origin HEAD:main
else
  echo "Catalog data unchanged; no data commit required."
fi

echo "=== 7/8 REMOTE SHA CHECK ==="
LOCAL_SHA="$(git rev-parse HEAD)"
REMOTE_SHA="$(git ls-remote origin refs/heads/main | awk '{print $1}')"
echo "LOCAL : $LOCAL_SHA"
echo "REMOTE: $REMOTE_SHA"
test "$LOCAL_SHA" = "$REMOTE_SHA"

echo "=== 8/8 FIREBASE DEPLOY ==="
export PATH="$(dirname "$(command -v npm)"):$PATH"
npx -y firebase-tools@latest deploy --only hosting:saatchi --project studio-7658156126-ffb8e

echo
echo "SAATCHI_CATALOG_PUBLISH_OK"
