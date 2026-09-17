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

echo "=== 3/8 CARREN FIXED PRICE SYNC ==="
"$PYENV/bin/python" scripts/fix-carren-catalog.py

echo "=== 4/8 CARREN VALIDATION ==="
"$PYENV/bin/python" - <<'PY'
import json, sys
from pathlib import Path
PRICE=19_990
root=Path.cwd()
watch=json.loads((root/'src/data/saatler.json').read_text(encoding='utf-8'))
report=json.loads((root/'scripts/sync-saatchi-catalog-report.json').read_text(encoding='utf-8'))
carren=[x for x in watch if x.get('brand')=='Carren']
bad=[x for x in carren if int(x.get('calculatedPrice') or 0)!=PRICE or x.get('price')!='₺19.990' or x.get('pricingRule')!='CARREN_FIXED_19990']
if not carren or bad:
    print('CARREN_VALIDATION_FAILED', 'count=', len(carren), 'bad=', len(bad))
    sys.exit(1)
print('CARREN_COUNT=', len(carren))
print('CARREN_PRICE=', PRICE)
print('CARREN_GENDER_COUNTS=', report.get('carrenGenderCounts'))
print('CARREN_VALIDATION_OK')
PY

echo "=== 5/8 BUILD + HERO GUARD ==="
npm run build
git restore src/app/tailwind.css 2>/dev/null || true

echo "=== 6/8 COMMIT + PUSH ==="
git add src/data/saatler.json src/data/saatler_paytr.json scripts/sync-saatchi-catalog-report.json
if ! git diff --cached --quiet; then
  git commit -m "data: publish Carren catalog at fixed 19990 TRY"
  git push origin HEAD:main
else
  echo "Carren catalog unchanged; no data commit required."
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
echo "CARREN_FIXED_PRICE_PUBLISH_OK"
