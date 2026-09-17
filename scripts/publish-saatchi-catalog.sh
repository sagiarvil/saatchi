#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== 1/11 GIT SYNC ==="
git switch main
git pull --ff-only origin main

echo "=== 2/11 PYTHON ENV ==="
PYENV="$ROOT/.venv-catalog"
if [ ! -x "$PYENV/bin/python" ]; then
  python3 -m venv "$PYENV"
fi
"$PYENV/bin/python" -m pip install -q --upgrade pip
"$PYENV/bin/python" -m pip install -q curl_cffi beautifulsoup4

echo "=== 3/11 BACKUP ROLEX/CARTIER ==="
"$PYENV/bin/python" scripts/update_prices.py --backup

echo "=== 4/11 SOURCE CATALOG SYNC ==="
"$PYENV/bin/python" scripts/sync-saatchi-catalog-v3.py

echo "=== 5/11 ROLEX/CARTIER FX PRICING ==="
"$PYENV/bin/python" scripts/update_prices.py

echo "=== 6/11 CARREN FIXED PRICE SYNC ==="
"$PYENV/bin/python" scripts/fix-carren-catalog.py

echo "=== 7/11 CATALOG VALIDATION ==="
"$PYENV/bin/python" - <<'PY'
import json, sys
from pathlib import Path
MAX=1_799_000
CARREN_PRICE=19_990
RC_RULE='FOREIGN_SOURCE_X_DOVIZ_SELL_X_2_50'
root=Path.cwd()
elite=json.loads((root/'src/data/elit-saatler.json').read_text(encoding='utf-8'))
watch=json.loads((root/'src/data/saatler.json').read_text(encoding='utf-8'))
report=json.loads((root/'scripts/sync-saatchi-catalog-report.json').read_text(encoding='utf-8'))
all_items=elite+watch
zero=[x for x in all_items if float(x.get('calculatedPrice') or 0)<=0]
over_non_rc=[x for x in all_items if x.get('brand') not in {'Rolex','Cartier'} and float(x.get('calculatedPrice') or 0)>MAX]
elite_allowed={'Rolex','Cartier','TAG Heuer','Rado'}
wrong_elite=[x for x in elite if x.get('brand') not in elite_allowed]
rc=[x for x in elite if x.get('brand') in {'Rolex','Cartier'}]
bad_rc=[x for x in rc if x.get('pricingRule')!=RC_RULE or x.get('fxSource')!='doviz.com' or x.get('fxRateSide')!='sell' or x.get('sourceCurrency') not in {'USD','EUR'} or float(x.get('fxRate') or 0)<=0]
carren=[x for x in watch if x.get('brand')=='Carren']
bad_carren=[x for x in carren if int(x.get('calculatedPrice') or 0)!=CARREN_PRICE or x.get('price')!='₺19.990' or x.get('pricingRule')!='CARREN_FIXED_19990']
if zero or over_non_rc or wrong_elite or not rc or bad_rc or not carren or bad_carren:
    print('CATALOG_VALIDATION_FAILED')
    print('zero_price=', len(zero), 'over_non_rc=', len(over_non_rc), 'wrong_elite=', len(wrong_elite), 'rc=', len(rc), 'bad_rc=', len(bad_rc), 'carren=', len(carren), 'bad_carren=', len(bad_carren))
    sys.exit(1)
print('ELITE_COUNT=', len(elite))
print('WATCH_COUNT=', len(watch))
print('ROLEX_CARTIER_COUNT=', len(rc))
print('ROLEX_CARTIER_RULE=', RC_RULE)
print('FX_RATES=', report.get('fxRates'))
print('CARREN_COUNT=', len(carren))
print('CARREN_PRICE=', CARREN_PRICE)
print('CARREN_GENDER_COUNTS=', report.get('carrenGenderCounts'))
print('SOURCE_COUNTS=', report.get('sourceCounts'))
print('SOURCE_ERRORS=', report.get('errors'))
print('CATALOG_VALIDATION_OK')
PY

echo "=== 8/11 BUILD ==="
npm run build
git restore src/app/tailwind.css 2>/dev/null || true

echo "=== 9/11 COMMIT GENERATED CATALOG ==="
git add src/data/elit-saatler.json src/data/saatler.json src/data/saatler_paytr.json scripts/sync-saatchi-catalog-report.json
if ! git diff --cached --quiet; then
  git commit -m "data: refresh Saatchi catalog with split pricing policy"
  git push origin HEAD:main
else
  echo "Catalog data unchanged; no data commit required."
fi

echo "=== 10/11 REMOTE SHA CHECK ==="
LOCAL_SHA="$(git rev-parse HEAD)"
REMOTE_SHA="$(git ls-remote origin refs/heads/main | awk '{print $1}')"
echo "LOCAL : $LOCAL_SHA"
echo "REMOTE: $REMOTE_SHA"
test "$LOCAL_SHA" = "$REMOTE_SHA"

echo "=== 11/11 FIREBASE DEPLOY ==="
export PATH="$(dirname "$(command -v npm)"):$PATH"
npx -y firebase-tools@latest deploy --only hosting:saatchi --project studio-7658156126-ffb8e

echo
echo "SAATCHI_CATALOG_PUBLISH_OK"
