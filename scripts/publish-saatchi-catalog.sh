#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SITE_URL="https://saatchi.com.tr"
PROJECT_ID="studio-7658156126-ffb8e"
HOSTING_TARGET="saatchi"

fail() {
  echo "SAATCHI_RELEASE_FAILED: $*" >&2
  exit 1
}

json_assert() {
  python3 - "$@"
}

request_status() {
  local method="$1" url="$2" outfile="$3" body="${4:-}"
  local args=(-sS -X "$method" --connect-timeout 10 --max-time 30 -o "$outfile" -w '%{http_code}')
  if [ -n "$body" ]; then
    args+=(-H 'Content-Type: application/json' -H "Origin: $SITE_URL" --data "$body")
  fi
  curl "${args[@]}" "$url"
}

echo "=== 1/18 CLEAN-TREE PREFLIGHT ==="
if [ -n "$(git status --porcelain --untracked-files=all)" ]; then
  git status --short
  fail "working tree is not clean; no local file was modified or deleted"
fi

echo "=== 2/18 GIT SYNC ==="
git switch main
git pull --ff-only origin main
BASE_SHA="$(git rev-parse HEAD)"
echo "BASE_SHA=$BASE_SHA"

echo "=== 3/18 FIREBASE TARGET PROOF ==="
python3 - <<'PY'
import json,sys
from pathlib import Path
root=Path.cwd()
rc=json.loads((root/'.firebaserc').read_text(encoding='utf-8'))
fb=json.loads((root/'firebase.json').read_text(encoding='utf-8'))
project=rc.get('projects',{}).get('default')
targets=rc.get('targets',{}).get(project,{}).get('hosting',{}).get('saatchi',[])
site=fb.get('hosting',{}).get('site')
source=fb.get('hosting',{}).get('source')
region=fb.get('hosting',{}).get('frameworksBackend',{}).get('region')
if project!='studio-7658156126-ffb8e' or site!='saatchi' or 'saatchi' not in targets or source!='.' or region!='us-central1':
    print('FIREBASE_TARGET_INVALID',project,site,targets,source,region)
    sys.exit(1)
print('FIREBASE_TARGET_OK project=studio-7658156126-ffb8e site=saatchi region=us-central1')
PY

echo "=== 4/18 PYTHON ENV ==="
PYENV="$ROOT/.venv-catalog"
if [ ! -x "$PYENV/bin/python" ]; then
  python3 -m venv "$PYENV"
fi
"$PYENV/bin/python" -m pip install -q --upgrade pip
"$PYENV/bin/python" -m pip install -q curl_cffi beautifulsoup4

echo "=== 5/18 BACKUP ROLEX/CARTIER ==="
"$PYENV/bin/python" scripts/update_prices_resilient.py --backup

echo "=== 6/18 SOURCE CATALOG SYNC ==="
"$PYENV/bin/python" scripts/sync-saatchi-catalog-v3.py

echo "=== 7/18 KONYALI BRAND-SAFE SYNC ==="
"$PYENV/bin/python" scripts/sync-konyali-brand-safe.py

echo "=== 8/18 ROLEX/CARTIER VERIFIED PRICING ==="
"$PYENV/bin/python" scripts/update_prices_resilient.py

echo "=== 9/18 CARREN FIXED PRICE SYNC ==="
"$PYENV/bin/python" scripts/fix-carren-catalog.py

echo "=== 10/18 CATALOG VALIDATION ==="
"$PYENV/bin/python" - <<'PY'
import json, sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

MAX=1_799_000
CARREN_PRICE=19_990
RC_RULE='FOREIGN_SOURCE_X_DOVIZ_SELL_X_2_50'
SNAPSHOT_TTL=72*3600
root=Path.cwd()
elite=json.loads((root/'src/data/elit-saatler.json').read_text(encoding='utf-8'))
watch=json.loads((root/'src/data/saatler.json').read_text(encoding='utf-8'))
report=json.loads((root/'scripts/sync-saatchi-catalog-report.json').read_text(encoding='utf-8'))
snapshots=json.loads((root/'scripts/rolex-cartier-verified-snapshot.json').read_text(encoding='utf-8'))
all_items=elite+watch
zero=[x for x in all_items if float(x.get('calculatedPrice') or 0)<=0]
over_non_rc=[x for x in all_items if x.get('brand') not in {'Rolex','Cartier'} and float(x.get('calculatedPrice') or 0)>MAX]
elite_allowed={'Rolex','Cartier','TAG Heuer','Rado'}
wrong_elite=[x for x in elite if x.get('brand') not in elite_allowed]
rc=[x for x in elite if x.get('brand') in {'Rolex','Cartier'}]
now=datetime.now(timezone.utc)

def fresh(value):
    try:
        dt=datetime.fromisoformat(str(value).replace('Z','+00:00')).astimezone(timezone.utc)
        age=(now-dt).total_seconds()
        return -300 <= age <= SNAPSHOT_TTL
    except Exception:
        return False

def valid_rc_source(x):
    host=urlparse(str(x.get('sourceUrl') or '')).netloc.lower()
    provider=str(x.get('sourceProvider') or '')
    status=str(x.get('sourcePriceStatus') or '')
    kind=str(x.get('sourcePriceKind') or '')
    if provider=='Chrono24' and 'chrono24.' not in host: return False
    if provider=='WatchCharts' and 'watchcharts.com' not in host: return False
    if provider not in {'Chrono24','WatchCharts'}: return False
    if status=='live_source_url':
        return kind.startswith('LIVE_LISTING_MEDIAN_') or kind=='WATCHCHARTS_MARKET_USD'
    if status=='verified_source_snapshot':
        return kind.startswith('VERIFIED_SNAPSHOT_') and fresh(x.get('sourceVerifiedAt'))
    return False

bad_rc=[x for x in rc if x.get('pricingRule')!=RC_RULE or x.get('fxSource')!='doviz.com' or x.get('fxRateSide')!='sell' or x.get('sourceCurrency') not in {'USD','EUR'} or float(x.get('fxRate') or 0)<=0 or not valid_rc_source(x) or not x.get('calculatedPrice')]
if len(snapshots)!=31 or len({str(x.get('id')) for x in snapshots})!=31:
    print('ROLEX_CARTIER_SNAPSHOT_SET_INVALID')
    sys.exit(1)
if any(not fresh(x.get('verifiedAt')) or not x.get('amount') or x.get('currency') not in {'USD','EUR'} for x in snapshots):
    print('ROLEX_CARTIER_SNAPSHOT_FRESHNESS_INVALID')
    sys.exit(1)

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

verified=int(report.get('rolexCartierVerifiedSourceCount') or 0)
live=int(report.get('rolexCartierLiveSourceVerifiedCount') or 0)
fallback=int(report.get('rolexCartierSnapshotFallbackCount') or 0)
if zero or over_non_rc or wrong_elite or len(rc) < 15 or len(rc) > 31 or bad_rc or verified!=31 or live+fallback!=31 or not carren or bad_carren or bad_konyali or report.get('konyaliBrandIdentityVerified') is not True:
    print('CATALOG_VALIDATION_FAILED')
    print('zero_price=', len(zero), 'over_non_rc=', len(over_non_rc), 'wrong_elite=', len(wrong_elite), 'rc=', len(rc), 'bad_rc=', len(bad_rc), 'verified=',verified,'live=',live,'fallback=',fallback,'carren=', len(carren), 'bad_carren=', len(bad_carren), 'bad_konyali=', bad_konyali)
    sys.exit(1)
print('ELITE_COUNT=', len(elite))
print('WATCH_COUNT=', len(watch))
print('ROLEX_CARTIER_COUNT=', len(rc))
print('ROLEX_CARTIER_VERIFIED=', verified, 'LIVE=', live, 'FRESH_SNAPSHOT=', fallback)
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

echo "=== 11/18 DEPENDENCY + PRECOMMIT BUILD GATE ==="
npm ci
npm run build
git restore src/app/tailwind.css 2>/dev/null || true

echo "=== 12/18 COMMIT GENERATED CATALOG ==="
git add src/data/elit-saatler.json src/data/saatler.json src/data/saatler_paytr.json scripts/sync-saatchi-catalog-report.json scripts/rolex-cartier-verified-snapshot.json
if ! git diff --cached --quiet; then
  git commit -m "data: refresh Saatchi catalog with verified source evidence"
else
  echo "Catalog data unchanged; no data commit required."
fi

echo "=== 13/18 PUSH + REMOTE SHA PROOF ==="
if ! git push origin HEAD:main; then
  fail "remote main changed during release; rerun after synchronizing instead of forcing"
fi
LOCAL_SHA="$(git rev-parse HEAD)"
REMOTE_SHA="$(git ls-remote origin refs/heads/main | awk '{print $1}')"
echo "LOCAL_SHA=$LOCAL_SHA"
echo "REMOTE_SHA=$REMOTE_SHA"
test "$LOCAL_SHA" = "$REMOTE_SHA" || fail "local and remote main differ"

echo "=== 14/18 EXACT-SHA FINAL BUILD ==="
npm run build
git restore src/app/tailwind.css 2>/dev/null || true
npm run build:id
python3 - "$LOCAL_SHA" <<'PY'
import json,sys
from pathlib import Path
expected=sys.argv[1]
data=json.loads(Path('public/build-info.json').read_text(encoding='utf-8'))
assert data.get('gitSha')==expected, (data,expected)
print('BUILD_ID_OK',expected)
PY
if [ -n "$(git status --porcelain --untracked-files=all)" ]; then
  git status --short
  fail "tracked/untracked source drift detected immediately before deploy"
fi

echo "=== 15/18 CAPTURE PREVIOUS LIVE ID ==="
PREVIOUS_LIVE_SHA=""
if curl -fsS --connect-timeout 8 --max-time 15 "$SITE_URL/build-info.json" -o /tmp/saatchi-prev-build-info.json 2>/dev/null; then
  PREVIOUS_LIVE_SHA="$(python3 - <<'PY'
import json
from pathlib import Path
try: print(json.loads(Path('/tmp/saatchi-prev-build-info.json').read_text()).get('gitSha') or '')
except Exception: print('')
PY
)"
fi
echo "PREVIOUS_LIVE_SHA=${PREVIOUS_LIVE_SHA:-UNKNOWN}"

echo "=== 16/18 FIREBASE DEPLOY ==="
export PATH="$(dirname "$(command -v npm)"):$PATH"
npx -y firebase-tools@latest deploy --only "hosting:$HOSTING_TARGET" --project "$PROJECT_ID"

echo "=== 17/18 PRODUCTION RUNTIME READBACK ==="
LIVE_OK=0
for attempt in $(seq 1 18); do
  if curl -fsS --connect-timeout 8 --max-time 20 -H 'Cache-Control: no-cache' "$SITE_URL/build-info.json?attempt=$attempt" -o /tmp/saatchi-live-build-info.json 2>/dev/null; then
    if python3 - "$LOCAL_SHA" <<'PY'
import json,sys
from pathlib import Path
try:
    d=json.loads(Path('/tmp/saatchi-live-build-info.json').read_text(encoding='utf-8'))
except Exception:
    raise SystemExit(1)
raise SystemExit(0 if d.get('gitSha')==sys.argv[1] else 1)
PY
    then
      LIVE_OK=1
      break
    fi
  fi
  sleep 10
done
if [ "$LIVE_OK" != "1" ]; then
  echo "EXPECTED_LIVE_SHA=$LOCAL_SHA" >&2
  echo "PREVIOUS_LIVE_SHA=${PREVIOUS_LIVE_SHA:-UNKNOWN}" >&2
  [ -f /tmp/saatchi-live-build-info.json ] && cat /tmp/saatchi-live-build-info.json >&2 || true
  fail "production did not read back the deployed commit; rollback candidate is PREVIOUS_LIVE_SHA"
fi

echo "LIVE_DEPLOY_SHA_OK=$LOCAL_SHA"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
STATUS="$(request_status GET "$SITE_URL/api/admin-session" "$TMP/session.json")"
test "$STATUS" = "200" || fail "admin-session runtime HTTP $STATUS"
python3 - "$TMP/session.json" <<'PY'
import json,sys
d=json.load(open(sys.argv[1]))
assert d.get('success') is True and d.get('authenticated') is False, d
PY
STATUS="$(request_status GET "$SITE_URL/api/admin/vip-links" "$TMP/list.json")"
test "$STATUS" = "401" || fail "unauthenticated admin-list runtime HTTP $STATUS"
STATUS="$(request_status GET "$SITE_URL/api/vip-link?token=invalid" "$TMP/token.json")"
test "$STATUS" = "400" || fail "invalid-token runtime HTTP $STATUS"
STATUS="$(request_status POST "$SITE_URL/api/admin-session" "$TMP/login.json" '{"key":"definitely-wrong-runtime-smoke-key"}')"
test "$STATUS" = "401" || fail "wrong-admin-key runtime HTTP $STATUS"
STATUS="$(request_status POST "$SITE_URL/api/vip-link" "$TMP/create.json" '{"title":"Runtime Smoke","amount":123456}')"
test "$STATUS" = "401" || fail "unauthenticated VIP-create runtime HTTP $STATUS"
echo "VIP_PUBLIC_RUNTIME_BOUNDARIES_OK"

echo "=== 18/18 RELEASE EVIDENCE ==="
echo "BASE_SHA=$BASE_SHA"
echo "DEPLOYED_SHA=$LOCAL_SHA"
echo "PREVIOUS_LIVE_SHA=${PREVIOUS_LIVE_SHA:-UNKNOWN}"
echo "PROJECT=$PROJECT_ID"
echo "HOSTING_TARGET=$HOSTING_TARGET"
echo "SAATCHI_CATALOG_PUBLISH_OK"
