#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from urllib.parse import urlparse

from bs4 import BeautifulSoup

import update_prices as base

ROOT = Path(__file__).resolve().parents[1]
ELITE_FILE = ROOT / "src" / "data" / "elit-saatler.json"
REPORT_FILE = ROOT / "scripts" / "sync-saatchi-catalog-report.json"

_DIRECT_FETCH = base.fetch_page
_BASE_SOURCE_PAGE_PRICE = base.source_page_price


def _reader_url(url: str) -> str:
    return f"https://r.jina.ai/{url}"


def _plain_text(value: str) -> str:
    return " ".join(BeautifulSoup(value or "", "html.parser").stripped_strings)


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
        r"Market Price[^$]{0,80}\$\s*([0-9][0-9,]{2,})",
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


def source_page_price_resilient(item: dict) -> tuple[float, str, str]:
    primary_errors: list[str] = []
    try:
        return _BASE_SOURCE_PAGE_PRICE(item)
    except Exception as exc:
        primary_errors.append(str(exc))

    identity_url = str(item.get("identitySourceUrl") or "").strip()
    host = urlparse(identity_url).netloc.lower()
    if identity_url.startswith("https://") and (host == "watchcharts.com" or host.endswith(".watchcharts.com")):
        try:
            html = fetch_page_resilient(identity_url)
            reference = str(item.get("reference") or "").strip()
            amount = watchcharts_market_price(html, reference)
            return amount, "USD", identity_url
        except Exception as exc:
            primary_errors.append(f"WatchCharts fallback failed: {exc}")

    raise RuntimeError(" | ".join(primary_errors))


def normalize_provenance() -> None:
    elite = json.loads(ELITE_FILE.read_text(encoding="utf-8"))
    provider_counts: dict[str, int] = {}
    changed = False
    for item in elite:
        if item.get("brand") not in {"Rolex", "Cartier"}:
            continue
        host = urlparse(str(item.get("sourceUrl") or "")).netloc.lower()
        if "watchcharts.com" in host:
            provider = "WatchCharts"
            kind = "WATCHCHARTS_MARKET_USD"
        elif "chrono24." in host:
            provider = "Chrono24"
            kind = str(item.get("sourcePriceKind") or f"LIVE_LISTING_MEDIAN_{item.get('sourceCurrency') or 'USD'}")
        else:
            raise RuntimeError(f"Unapproved Rolex/Cartier source host: {host or '<missing>'}")
        if item.get("sourceProvider") != provider:
            item["sourceProvider"] = provider
            changed = True
        if item.get("sourcePriceKind") != kind:
            item["sourcePriceKind"] = kind
            changed = True
        provider_counts[provider] = provider_counts.get(provider, 0) + 1

    if sum(provider_counts.values()) != 31:
        raise RuntimeError(f"Expected 31 Rolex/Cartier provenance rows, found {sum(provider_counts.values())}")
    if changed:
        ELITE_FILE.write_text(json.dumps(elite, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        watches = json.loads(base.WATCH_FILE.read_text(encoding="utf-8"))
        base.rebuild_paytr(elite, watches)

    report = json.loads(REPORT_FILE.read_text(encoding="utf-8"))
    report["rolexCartierSourceProvider"] = "Chrono24 primary; WatchCharts exact-model fallback"
    report["rolexCartierSourceProviderCounts"] = provider_counts
    report["rolexCartierSourcePriceKind"] = "LIVE_MARKET_REFERENCE_USD_OR_EUR"
    REPORT_FILE.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("ROLEX_CARTIER_PROVENANCE_OK", provider_counts)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--backup", action="store_true")
    args = parser.parse_args()

    base.fetch_page = fetch_page_resilient
    base.source_page_price = source_page_price_resilient

    if args.backup:
        base.backup_rolex_cartier()
        return

    base.update_prices()
    normalize_provenance()
    print("ROLEX_CARTIER_RESILIENT_SYNC_OK")


if __name__ == "__main__":
    main()
