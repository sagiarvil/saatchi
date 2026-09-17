#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== 1/12 GIT SYNC ==="
git switch main
git pull --ff-only origin main

echo "=== 2/12 PYTHON ENV ==="
PYENV="$ROOT/.venv-catalog"
if [ ! -x "$PYENV/bin/python" ]; then
  python3 -m venv "$PYENV"
fi
"$PYENV/bin/python" -m pip install -q --upgrade pip
"$PYENV/bin/python" -m pip install -q curl_cffi beautifulsoup4

echo "=== 3/12 BACKUP ROLEX/CARTIER ==="
"$PYENV/bin/python" scripts/update_prices.py --backup

echo "=== 4/12 SOURCE CATALOG SYNC ==="
"$PYENV/bin/python" scripts/sync-saatchi-catalog-v3.py

echo "=== 5/12 KONYALI BRAND-SAFE SYNC ==="
"$PYENV/bin/python" scripts/sync-konyali-brand-safe.py

echo "=== 6/12 ROLEX/CARTIER FX PRICING ==="
"$PYENV/bin/python" scripts/update_prices.py

echo "=== 7/12 CARREN FIXED PRICE SYNC ==="
"$PYENV/bin/python" scripts/fix-carren-catalog.py

echo "=== 8/12 CATALOG VALIDATION ==="
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
bad_rc=[x for x in rc if x.get('pricingRule')!=RC_RULE or x.get('fxSource')!='doviz.com' or x.get('fxRateSide')!='sell' or x.get('sourceCurrency') not in {'USD','EUR'} or float(x.get('fxRate') or 0)<=0 or not str(x.get('sourceUrl') or '').startswith(('https://','http://')) or x.get('sourcePriceStatus')!='live_source_url']
carren=[x for x in watch if x.get('brand')=='Carren']
bad_carren=[x for x in carren if int(x.get('calculatedPrice') or 0)!=CARREN_PRICE or x.get('price')!='₺19.990' or x.get('pricingRule')!='CARREN_FIXED_19990']

def norm(v):
    return ' '.join(str(v or '').lower().replace('ı','i').split())

def konyali_ok(x, brand, token):
    model=norm(x.get('modelName'))
    url=norm(x.get('sourceUrl'))
    identity=(token in model) or ((token.replace(' ','-')) in url)
    return x.get('brand')==brand and identity and 'konyalisaat.com.tr' in url and x.get('pricingRule')=='SOURCE_X_1_50'

konyali_sets={
    'TAG Heuer': ([x for x in elite if x.get('brand')=='TAG Heuer'], 'tag heuer'),
    'Rado': ([x for x in elite if x.get('brand')=='Rado'], 'rado'),
    'Tissot': ([x for x in watch if x.get('brand')=='Tissot'], 'tissot'),
}
bad_konyali=[]
for brand,(items,token) in konyali_sets.items():
    if not items:
        bad_konyali.append((brand,'EMPTY'))
        continue
    bad=[x for x in items if not konyali_ok(x,brand,token)]
    if bad:
        bad_konyali.append((brand,len(bad)))

if zero or over_non_rc or wrong_elite or not rc or bad_rc or not carren or bad_carren or bad_konyali or report.get('konyaliBrandIdentityVerified') is not True:
    print('CATALOG_VALIDATION_FAILED')
    print('zero_price=', len(zero), 'over_non_rc=', len(over_non_rc), 'wrong_elite=', len(wrong_elite), 'rc=', len(rc), 'bad_rc=', len(bad_rc), 'carren=', len(carren), 'bad_carren=', len(bad_carren), 'bad_konyali=', bad_konyali)
    sys.exit(1)
print('ELITE_COUNT=', len(elite))
print('WATCH_COUNT=', len(watch))
print('ROLEX_CARTIER_COUNT=', len(rc))
print('ROLEX_CARTIER_RULE=', RC_RULE)
print('FX_RATES=', report.get('fxRates'))
print('KONYALI_VERIFIED_COUNTS=', report.get('konyaliVerifiedCounts'))
print('CARREN_COUNT=', len(carren))
print('CARREN_PRICE=', CARREN_PRICE)
print('CARREN_GENDER_COUNTS=', report.get('carrenGenderCounts'))
print('SOURCE_COUNTS=', report.get('sourceCounts'))
print('SOURCE_ERRORS=', report.get('errors'))
print('CATALOG_VALIDATION_OK')
PY

echo "=== 9/12 BUILD ==="
npm run build
git restore src/app/tailwind.css 2>/dev/null || true

echo "=== 10/12 COMMIT GENERATED CATALOG ==="
git add src/data/elit-saatler.json src/data/saatler.json src/data/saatler_paytr.json scripts/sync-saatchi-catalog-report.json
if ! git diff --cached --quiet; then
  git commit -m "data: refresh Saatchi catalog with verified source identity"
  git push origin HEAD:main
else
  echo "Catalog data unchanged; no data commit required."
fi

echo "=== 11/12 REMOTE SHA CHECK ==="
LOCAL_SHA="$(git rev-parse HEAD)"
REMOTE_SHA="$(git ls-remote origin refs/heads/main | awk '{print $1}')"
echo "LOCAL : $LOCAL_SHA"
echo "REMOTE: $REMOTE_SHA"
test "$LOCAL_SHA" = "$REMOTE_SHA"

echo "=== 12/12 FIREBASE DEPLOY ==="
export PATH="$(dirname "$(command -v npm)"):$PATH"
npx -y firebase-tools@latest deploy --only hosting:saatchi --project studio-7658156126-ffb8e

echo
echo "SAATCHI_CATALOG_PUBLISH_OK"
