#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from bs4 import BeautifulSoup

import update_prices as base

ROOT = Path(__file__).resolve().parents[1]
ELITE_FILE = ROOT / "src" / "data" / "elit-saatler.json"
REPORT_FILE = ROOT / "scripts" / "sync-saatchi-catalog-report.json"
SNAPSHOT_FILE = ROOT / "scripts" / "rolex-cartier-verified-snapshot.json"
SNAPSHOT_TTL_SECONDS = 72 * 60 * 60
MAX_SAME_CURRENCY_DRIFT = 0.35

_DIRECT_FETCH = base.fetch_page
_BASE_SOURCE_PAGE_PRICE = base.source_page_price
_OBSERVATIONS: dict[str, dict] = {}


def _reader_url(url: str) -> str:
    return f"https://r.jina.ai/{url}"


def _plain_text(value: str) -> str:
    return " ".join(BeautifulSoup(value or "", "html.parser").stripped_strings)


def _parse_iso(value: str) -> datetime:
    text = str(value or "").strip()
    if text.endswith('Z'):
        text = text[:-1] + '+00:00'
    parsed = datetime.fromisoformat(text)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def _iso_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec='seconds').replace('+00:00', 'Z')


def _load_snapshot() -> dict[str, dict]:
    try:
        rows = json.loads(SNAPSHOT_FILE.read_text(encoding='utf-8'))
    except Exception:
        rows = []
    result: dict[str, dict] = {}
    if not isinstance(rows, list):
        return result
    for row in rows:
        item_id = str(row.get('id') or '').strip()
        if item_id and item_id not in result:
            result[item_id] = row
    return result


_SNAPSHOT = _load_snapshot()


def _snapshot_age_seconds(row: dict) -> int:
    try:
        return max(0, int((datetime.now(timezone.utc) - _parse_iso(str(row.get('verifiedAt') or ''))).total_seconds()))
    except Exception:
        return SNAPSHOT_TTL_SECONDS + 1


def _validate_snapshot(item: dict, row: dict) -> tuple[float, str, str]:
    item_id = str(item.get('id') or '')
    reference = str(item.get('reference') or '')
    if not row or str(row.get('id') or '') != item_id:
        raise RuntimeError('verified snapshot missing')
    if base.normalize_ref(row.get('reference')) != base.normalize_ref(reference):
        raise RuntimeError('verified snapshot reference mismatch')
    age = _snapshot_age_seconds(row)
    if age > SNAPSHOT_TTL_SECONDS:
        raise RuntimeError(f'verified snapshot stale ({age}s)')
    amount = base.parse_number(row.get('amount'))
    currency = str(row.get('currency') or '').upper().strip()
    source_url = str(row.get('sourceUrl') or '').strip()
    host = urlparse(source_url).netloc.lower()
    if not amount or not (750 <= amount <= 500_000):
        raise RuntimeError('verified snapshot amount invalid')
    if currency not in {'USD', 'EUR'}:
        raise RuntimeError('verified snapshot currency invalid')
    if 'chrono24.' not in host and 'watchcharts.com' not in host:
        raise RuntimeError('verified snapshot source host not approved')
    return float(amount), currency, source_url


def _drift_guard(item: dict, amount: float, currency: str) -> None:
    prior = _SNAPSHOT.get(str(item.get('id') or ''))
    if not prior or str(prior.get('currency') or '').upper() != currency:
        return
    prior_amount = base.parse_number(prior.get('amount'))
    if not prior_amount:
        return
    drift = abs(amount - prior_amount) / prior_amount
    if drift > MAX_SAME_CURRENCY_DRIFT:
        raise RuntimeError(
            f"live source drift {drift:.1%} exceeds {MAX_SAME_CURRENCY_DRIFT:.0%} guard "
            f"({prior_amount:.0f}->{amount:.0f} {currency})"
        )


def _record_observation(item: dict, amount: float, currency: str, source_url: str, mode: str, verified_at: str | None = None, evidence_run_id=None) -> None:
    _OBSERVATIONS[str(item.get('id') or '')] = {
        'mode': mode,
        'amount': float(amount),
        'currency': currency,
        'sourceUrl': source_url,
        'verifiedAt': verified_at or _iso_now(),
        'evidenceRunId': evidence_run_id,
    }


def fetch_page_resilient(url: str) -> str:
    try:
        return _DIRECT_FETCH(url)
    except Exception as direct_error:
        if not str(url).startswith("https://"):
            raise
        try:
            response = base.requests.get(
                _reader_url(url),
                impersonate="chrome",
                timeout=max(base.TIMEOUT, 35),
                headers={
                    "Accept": "text/plain,text/markdown;q=0.9,*/*;q=0.5",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Cache-Control": "no-cache",
                },
            )
            if response.status_code == 200 and len(response.text or "") >= 500:
                body = response.text
                base._PAGE_CACHE[url] = body
                return body
            raise RuntimeError(f"reader HTTP {response.status_code}")
        except Exception as reader_error:
            raise RuntimeError(f"{direct_error} | reader fallback failed: {reader_error}") from reader_error


def watchcharts_market_price(html: str, reference: str) -> float:
    text = _plain_text(html)
    if base.normalize_ref(reference) not in base.normalize_ref(text):
        raise RuntimeError(f"WatchCharts source does not contain exact reference {reference}")

    patterns = (
        r"Market Price\s*\$\s*([0-9][0-9,]{2,})",
        r"Market Price[^$]{0,120}\$\s*([0-9][0-9,]{2,})",
        r"\$\s*([0-9][0-9,]{2,})\s+MKT",
    )
    values: list[float] = []
    for pattern in patterns:
        for match in re.finditer(pattern, text, flags=re.I):
            value = base.parse_number(match.group(1))
            if value and 750 <= value <= 500_000:
                values.append(value)
        if values:
            break
    if not values:
        raise RuntimeError("WatchCharts market price could not be parsed")
    return float(round(values[0]))


def _watchcharts_price_from_url(url: str, reference: str) -> float:
    host = urlparse(url).netloc.lower()
    if not (host == "watchcharts.com" or host.endswith(".watchcharts.com")):
        raise RuntimeError(f"unsupported WatchCharts host {host or '<missing>'}")
    html = fetch_page_resilient(url)
    return watchcharts_market_price(html, reference)


def source_page_price_resilient(item: dict) -> tuple[float, str, str]:
    errors: list[str] = []
    try:
        amount, currency, source_url = _BASE_SOURCE_PAGE_PRICE(item)
        _drift_guard(item, amount, currency)
        _record_observation(item, amount, currency, source_url, 'live')
        return amount, currency, source_url
    except Exception as exc:
        errors.append(str(exc))

    reference = str(item.get("reference") or "").strip()
    identity_url = str(item.get("identitySourceUrl") or "").strip()
    identity_host = urlparse(identity_url).netloc.lower()
    if identity_url.startswith("https://") and (identity_host == "watchcharts.com" or identity_host.endswith(".watchcharts.com")):
        try:
            amount = _watchcharts_price_from_url(identity_url, reference)
            _drift_guard(item, amount, 'USD')
            _record_observation(item, amount, 'USD', identity_url, 'live')
            return amount, "USD", identity_url
        except Exception as exc:
            errors.append(f"WatchCharts identity fallback failed: {exc}")

    row = base.load_source_map().get(str(item.get("id") or ""), {})
    fallback_urls = row.get("fallbackSourceUrls") or []
    if isinstance(fallback_urls, str):
        fallback_urls = [fallback_urls]
    for fallback_url in fallback_urls:
        url = str(fallback_url or "").strip()
        if not url.startswith("https://"):
            continue
        try:
            amount = _watchcharts_price_from_url(url, reference)
            _drift_guard(item, amount, 'USD')
            _record_observation(item, amount, 'USD', url, 'live')
            return amount, "USD", url
        except Exception as exc:
            errors.append(f"fallback {url} failed: {exc}")

    try:
        snapshot = _SNAPSHOT.get(str(item.get('id') or ''), {})
        amount, currency, source_url = _validate_snapshot(item, snapshot)
        _record_observation(
            item,
            amount,
            currency,
            source_url,
            'snapshot',
            verified_at=str(snapshot.get('verifiedAt') or ''),
            evidence_run_id=snapshot.get('evidenceRunId'),
        )
        print(f"SOURCE_SNAPSHOT {item.get('brand')}:{item.get('id')} ref={reference} age={_snapshot_age_seconds(snapshot)}s")
        return amount, currency, source_url
    except Exception as exc:
        errors.append(f"durable snapshot fallback failed: {exc}")

    raise RuntimeError(" | ".join(errors))


def normalize_provenance() -> None:
    elite = json.loads(ELITE_FILE.read_text(encoding="utf-8"))
    provider_counts: dict[str, int] = {}
    live_count = 0
    snapshot_count = 0
    changed = False
    snapshot_rows: list[dict] = []
    run_id = os.environ.get('GITHUB_RUN_ID') or 'local-runtime'

    for item in elite:
        if item.get("brand") not in {"Rolex", "Cartier"}:
            continue
        item_id = str(item.get('id') or '')
        observation = _OBSERVATIONS.get(item_id)
        if not observation:
            raise RuntimeError(f"Missing runtime observation for {item.get('brand')}:{item_id}")

        host = urlparse(str(item.get("sourceUrl") or "")).netloc.lower()
        if "watchcharts.com" in host:
            provider = "WatchCharts"
            live_kind = "WATCHCHARTS_MARKET_USD"
        elif "chrono24." in host:
            provider = "Chrono24"
            live_kind = f"LIVE_LISTING_MEDIAN_{item.get('sourceCurrency') or observation['currency']}"
        else:
            raise RuntimeError(f"Unapproved Rolex/Cartier source host: {host or '<missing>'}")

        mode = observation['mode']
        if mode == 'snapshot':
            item['sourcePriceStatus'] = 'verified_source_snapshot'
            item['sourcePriceKind'] = f"VERIFIED_SNAPSHOT_{observation['currency']}"
            item['sourceVerifiedAt'] = observation['verifiedAt']
            item['sourceEvidenceRunId'] = observation.get('evidenceRunId')
            item['sourceSnapshotAgeSeconds'] = _snapshot_age_seconds(_SNAPSHOT[item_id])
            snapshot_count += 1
        else:
            item['sourcePriceStatus'] = 'live_source_url'
            item['sourcePriceKind'] = live_kind
            item['sourceVerifiedAt'] = observation['verifiedAt']
            item['sourceEvidenceRunId'] = run_id
            item.pop('sourceSnapshotAgeSeconds', None)
            live_count += 1

        item['sourceProvider'] = provider
        provider_counts[provider] = provider_counts.get(provider, 0) + 1
        changed = True
        snapshot_rows.append({
            'id': item_id,
            'reference': str(item.get('reference') or ''),
            'amount': observation['amount'],
            'currency': observation['currency'],
            'sourceUrl': observation['sourceUrl'],
            'verifiedAt': observation['verifiedAt'],
            'evidenceRunId': observation.get('evidenceRunId') or run_id,
        })

    if len(snapshot_rows) != 31 or live_count + snapshot_count != 31:
        raise RuntimeError(f"Expected 31 verified Rolex/Cartier observations, got {len(snapshot_rows)}")

    if changed:
        ELITE_FILE.write_text(json.dumps(elite, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        watches = json.loads(base.WATCH_FILE.read_text(encoding="utf-8"))
        base.rebuild_paytr(elite, watches)
    SNAPSHOT_FILE.write_text(json.dumps(snapshot_rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    report = json.loads(REPORT_FILE.read_text(encoding="utf-8"))
    report["rolexCartierSourceProvider"] = "Chrono24 primary; WatchCharts exact-model fallback; durable <=72h verified snapshot"
    report["rolexCartierSourceProviderCounts"] = provider_counts
    report["rolexCartierSourcePriceKind"] = "LIVE_OR_FRESH_VERIFIED_MARKET_REFERENCE_USD_OR_EUR"
    report["rolexCartierVerifiedSourceCount"] = 31
    report["rolexCartierLiveSourceVerifiedCount"] = live_count
    report["rolexCartierSnapshotFallbackCount"] = snapshot_count
    report["rolexCartierSnapshotTtlSeconds"] = SNAPSHOT_TTL_SECONDS
    report["rolexCartierSourceDriftGuard"] = MAX_SAME_CURRENCY_DRIFT
    report["rolexCartierVerificationRunId"] = run_id
    REPORT_FILE.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("ROLEX_CARTIER_PROVENANCE_OK", provider_counts, f"live={live_count}", f"snapshot={snapshot_count}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--backup", action="store_true")
    args = parser.parse_args()

    base.fetch_page = fetch_page_resilient
    base.source_page_price = source_page_price_resilient

    if args.backup:
        base.backup_rolex_cartier()
        return

    started = time.monotonic()
    base.update_prices()
    normalize_provenance()
    print(f"ROLEX_CARTIER_RESILIENT_SYNC_OK elapsed={time.monotonic() - started:.1f}s")


if __name__ == "__main__":
    main()
