#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import statistics
import tempfile
import time
from pathlib import Path
from typing import Any, Optional, Tuple
from urllib.parse import urlparse

from bs4 import BeautifulSoup
from curl_cffi import requests

ROOT = Path(__file__).resolve().parents[1]
ELITE_FILE = ROOT / "src" / "data" / "elit-saatler.json"
WATCH_FILE = ROOT / "src" / "data" / "saatler.json"
PAYTR_FILE = ROOT / "src" / "data" / "saatler_paytr.json"
REPORT_FILE = ROOT / "scripts" / "sync-saatchi-catalog-report.json"
SOURCE_MAP_FILE = ROOT / "scripts" / "rolex-cartier-source-map.json"
BACKUP_FILE = Path(tempfile.gettempdir()) / "saatchi-rolex-cartier-backup.json"
DOVIZ_URL = "https://kur.doviz.com/"
TARGET_BRANDS = {"Rolex", "Cartier"}
MARKUP_MULTIPLIER = 2.50
TIMEOUT = 30
_PAGE_CACHE: dict[str, str] = {}
_SESSION = requests.Session(impersonate="chrome")
_LAST_MARKETPLACE_FETCH = 0.0


def load_json(path: Path, default: Any) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default


def write_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def parse_number(value: Any) -> Optional[float]:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value) if float(value) > 0 else None
    text = str(value).strip().replace("\u00a0", " ")
    if not text:
        return None
    text = re.sub(r"[^0-9.,]", "", text)
    if not text:
        return None
    if "," in text and "." in text:
        if text.rfind(",") > text.rfind("."):
            text = text.replace(".", "").replace(",", ".")
        else:
            text = text.replace(",", "")
    elif "," in text:
        parts = text.split(",")
        if len(parts) == 2 and len(parts[-1]) == 3:
            text = "".join(parts)
        elif len(parts[-1]) in (1, 2, 4):
            text = "".join(parts[:-1]) + "." + parts[-1]
        else:
            text = "".join(parts)
    elif text.count(".") > 1:
        text = text.replace(".", "")
    try:
        number = float(text)
        return number if number > 0 else None
    except ValueError:
        return None


def fmt_try(value: int) -> str:
    return "₺" + f"{int(value):,}".replace(",", ".")


def normalize_ref(value: Any) -> str:
    return re.sub(r"[^A-Z0-9]", "", str(value or "").upper())


def load_source_map() -> dict[str, dict]:
    rows = load_json(SOURCE_MAP_FILE, [])
    if not isinstance(rows, list) or len(rows) != 31:
        raise RuntimeError(f"Rolex/Cartier source map must contain exactly 31 rows, found {len(rows) if isinstance(rows, list) else 0}")
    mapped: dict[str, dict] = {}
    for row in rows:
        item_id = str(row.get("id") or "").strip()
        brand = str(row.get("brand") or "").strip()
        reference = str(row.get("reference") or "").strip()
        source_reference = str(row.get("sourceReference") or reference).strip()
        source_url = str(row.get("sourceUrl") or "").strip()
        if not item_id or item_id in mapped or brand not in TARGET_BRANDS or not reference or not source_reference or not source_url.startswith("https://"):
            raise RuntimeError(f"Invalid Rolex/Cartier source map row: {row}")
        mapped[item_id] = row
    return mapped


def mapped_item(item: dict, source_map: dict[str, dict]) -> dict:
    item_id = str(item.get("id") or "").strip()
    row = source_map.get(item_id)
    if not row:
        raise RuntimeError(f"{item.get('brand')}:{item_id} has no real source mapping")
    if str(row.get("brand") or "") != str(item.get("brand") or ""):
        raise RuntimeError(f"{item_id} source map brand mismatch")
    result = dict(item)
    result["ref"] = row["reference"]
    result["reference"] = row["reference"]
    result["sourceReference"] = row.get("sourceReference") or row["reference"]
    result["sourceUrl"] = row["sourceUrl"]
    result["identitySourceUrl"] = row.get("identitySourceUrl") or row["sourceUrl"]
    result["sourceProvider"] = "Chrono24"
    result["sourcePriceKind"] = "LIVE_LISTING_MEDIAN_USD"
    if row.get("modelName"):
        result["modelName"] = str(row["modelName"])
    return result


def _rate_limit_marketplace(url: str) -> None:
    global _LAST_MARKETPLACE_FETCH
    host = urlparse(url).netloc.lower()
    if "chrono24.com" not in host:
        return
    wait_for = 1.35 - (time.monotonic() - _LAST_MARKETPLACE_FETCH)
    if wait_for > 0:
        time.sleep(wait_for)
    _LAST_MARKETPLACE_FETCH = time.monotonic()


def fetch_page(url: str) -> str:
    if url in _PAGE_CACHE:
        return _PAGE_CACHE[url]

    last_status = 0
    for attempt in range(5):
        _rate_limit_marketplace(url)
        try:
            response = _SESSION.get(
                url,
                timeout=TIMEOUT,
                headers={
                    "Accept-Language": "en-US,en;q=0.9",
                    "Cache-Control": "no-cache",
                    "Referer": "https://www.google.com/",
                },
            )
            last_status = response.status_code
            if response.status_code == 200 and len(response.text or "") >= 1000:
                _PAGE_CACHE[url] = response.text
                return response.text
            if response.status_code not in {403, 429, 503}:
                break
        except Exception:
            last_status = 0
        if attempt < 4:
            time.sleep(2.5 * (attempt + 1))

    raise RuntimeError(f"source HTTP {last_status or 'error'} after retries: {url}")


def contains_reference(text: str, reference: str) -> bool:
    return normalize_ref(reference) in normalize_ref(BeautifulSoup(text, "html.parser").get_text(" ", strip=True))


def verify_source_identity(item: dict, pricing_html: str) -> None:
    full_ref = str(item.get("reference") or "").strip()
    source_ref = str(item.get("sourceReference") or full_ref).strip()
    if not contains_reference(pricing_html, source_ref):
        raise RuntimeError(f"{item.get('brand')}:{item.get('id')} pricing source does not contain {source_ref}")
    if contains_reference(pricing_html, full_ref):
        return
    identity_url = str(item.get("identitySourceUrl") or "").strip()
    if not identity_url:
        raise RuntimeError(f"{item.get('brand')}:{item.get('id')} exact reference {full_ref} not verified")
    identity_html = fetch_page(identity_url)
    if not contains_reference(identity_html, full_ref):
        raise RuntimeError(f"{item.get('brand')}:{item.get('id')} identity source does not contain {full_ref}")


def chrono24_live_price(html: str) -> Optional[float]:
    soup = BeautifulSoup(html, "html.parser")
    text = " ".join(soup.stripped_strings)

    preferred_patterns = [
        r"average listing price(?:\s+of)?(?:\s+approximately)?\s*\$\s*([0-9][0-9,]{2,})",
        r"Average Listing Price\s*\$\s*([0-9][0-9,]{2,})",
    ]
    for pattern in preferred_patterns:
        match = re.search(pattern, text, flags=re.I)
        if match:
            value = parse_number(match.group(1))
            if value and 750 <= value <= 500_000:
                return value

    prices: list[float] = []
    for match in re.finditer(r"(?<![A-Z])(?:US\$|\$)\s*([0-9][0-9,]{2,})(?:\.\d{2})?", text, flags=re.I):
        value = parse_number(match.group(1))
        if value and 750 <= value <= 500_000:
            prices.append(value)

    if len(prices) < 5:
        return None

    prices.sort()
    trim = max(1, int(len(prices) * 0.10)) if len(prices) >= 20 else 0
    sample = prices[trim:len(prices) - trim] if trim and len(prices) - (2 * trim) >= 5 else prices
    return float(round(statistics.median(sample)))


def fetch_doviz_sell_rates() -> dict[str, float]:
    res = requests.get(
        DOVIZ_URL,
        impersonate="chrome",
        timeout=TIMEOUT,
        headers={"Accept-Language": "tr-TR,tr;q=0.9,en;q=0.7"},
    )
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "html.parser")
    rates: dict[str, float] = {}
    for code in ("USD", "EUR"):
        node = soup.select_one(f'[data-socket-key="{code}"][data-socket-attr="s"]')
        value = parse_number(node.get_text(" ", strip=True)) if node else None
        if not value:
            for row in soup.find_all("tr"):
                text = " ".join(row.stripped_strings)
                if not re.search(rf"\b{code}\b", text):
                    continue
                nums = re.findall(r"\d+[.,]\d+", text)
                if len(nums) >= 2:
                    value = parse_number(nums[1])
                    if value:
                        break
        if not value:
            raise RuntimeError(f"Doviz.com {code}/TRY satış kuru okunamadı")
        rates[code] = value
    return rates


def source_page_price(item: dict) -> Tuple[Optional[float], Optional[str]]:
    url = str(item.get("sourceUrl") or "").strip()
    if not url:
        raise RuntimeError(f"{item.get('brand')}:{item.get('id')} sourceUrl missing")
    pricing_html = fetch_page(url)
    verify_source_identity(item, pricing_html)
    host = urlparse(url).netloc.lower()
    if host.endswith("chrono24.com") or ".chrono24.com" in host:
        amount = chrono24_live_price(pricing_html)
        if not amount:
            raise RuntimeError(f"{item.get('brand')}:{item.get('id')} Chrono24 live USD listing price could not be parsed")
        return amount, "USD"

    soup = BeautifulSoup(pricing_html, "html.parser")
    for node in soup.find_all("script", type="application/ld+json"):
        raw = node.string or node.get_text() or ""
        if not raw.strip():
            continue
        try:
            data = json.loads(raw)
        except Exception:
            continue
        stack = data if isinstance(data, list) else [data]
        while stack:
            obj = stack.pop()
            if isinstance(obj, list):
                stack.extend(obj)
                continue
            if not isinstance(obj, dict):
                continue
            graph = obj.get("@graph")
            if isinstance(graph, list):
                stack.extend(graph)
            offers = obj.get("offers")
            if isinstance(offers, list):
                offers = offers[0] if offers else None
            if not isinstance(offers, dict):
                continue
            amount = parse_number(offers.get("price") or offers.get("lowPrice") or offers.get("highPrice"))
            currency = str(offers.get("priceCurrency") or "").upper().strip()
            if amount and currency in {"USD", "EUR"}:
                return amount, currency
    raise RuntimeError(f"{item.get('brand')}:{item.get('id')} live source price could not be parsed")


def rebuild_paytr(elite: list[dict], watches: list[dict]) -> None:
    write_json(PAYTR_FILE, [
        {
            "id": p.get("id"),
            "modelName": p.get("modelName"),
            "brand": p.get("brand"),
            "calculatedPrice": p.get("calculatedPrice"),
            "stock": p.get("stock", 1),
            "sourceUrl": p.get("sourceUrl"),
        }
        for p in (elite + watches)
    ])


def backup_rolex_cartier() -> None:
    elite = load_json(ELITE_FILE, [])
    selected = [x for x in elite if str(x.get("brand") or "").strip() in TARGET_BRANDS]
    if len(selected) != 31:
        raise SystemExit(f"ROLEX_CARTIER_BACKUP_FAILED: expected 31 products, found {len(selected)}")
    write_json(BACKUP_FILE, selected)
    print(f"ROLEX_CARTIER_BACKUP_OK count={len(selected)} path={BACKUP_FILE}")


def update_prices() -> None:
    elite = load_json(ELITE_FILE, [])
    watches = load_json(WATCH_FILE, [])
    report = load_json(REPORT_FILE, {})
    source_map = load_source_map()
    source_items = load_json(BACKUP_FILE, []) if BACKUP_FILE.exists() else [x for x in elite if str(x.get("brand") or "").strip() in TARGET_BRANDS]
    if len(source_items) != 31:
        raise SystemExit(f"ROLEX_CARTIER_PRICE_SYNC_FAILED: expected 31 source products, found {len(source_items)}")

    rates = fetch_doviz_sell_rates()
    updated: list[dict] = []
    failures: list[str] = []
    now = time.strftime("%Y-%m-%dT%H:%M:%S%z")

    for original in source_items:
        try:
            item = mapped_item(original, source_map)
            brand = str(item.get("brand") or "").strip()
            amount, currency = source_page_price(item)
            if not amount or currency not in rates:
                raise RuntimeError("live source price/currency missing")

            fx_rate = rates[currency]
            base_try = int(round(amount * fx_rate))
            final_try = int(round(base_try * MARKUP_MULTIPLIER))
            item["originalPrice"] = base_try
            item["calculatedPrice"] = final_try
            item["price"] = fmt_try(final_try)
            item["foreignPrice"] = ("€" if currency == "EUR" else "$") + f"{amount:,.2f}".rstrip("0").rstrip(".")
            item["sourcePriceForeign"] = amount
            item["sourceCurrency"] = currency
            item["sourcePriceStatus"] = "live_source_url"
            item["sourceVerifiedAt"] = now
            item["fxRate"] = fx_rate
            item["fxRateSide"] = "sell"
            item["fxSource"] = "doviz.com"
            item["pricingRule"] = "FOREIGN_SOURCE_X_DOVIZ_SELL_X_2_50"
            item["pricingUpdatedAt"] = now
            item["category"] = "Elit Kategori"
            item["catalogTier"] = "elite"
            updated.append(item)
            print(f"SOURCE_OK {brand}:{item.get('id')} ref={item.get('reference')} {currency} {amount:.0f}")
        except Exception as exc:
            failures.append(f"{original.get('brand')}:{original.get('id')} {exc}")

    if failures:
        raise SystemExit("ROLEX_CARTIER_PRICE_SYNC_FAILED: " + "; ".join(failures))
    if len(updated) != 31:
        raise SystemExit(f"ROLEX_CARTIER_PRICE_SYNC_FAILED: verified 31 required, got {len(updated)}")

    elite = [x for x in elite if str(x.get("brand") or "").strip() not in TARGET_BRANDS] + updated
    order = {"Rolex": 1, "Cartier": 2, "TAG Heuer": 3, "Rado": 4}
    elite.sort(key=lambda x: (order.get(str(x.get("brand") or ""), 99), int(x.get("calculatedPrice") or 0), str(x.get("modelName") or "")))
    write_json(ELITE_FILE, elite)
    rebuild_paytr(elite, watches)

    report["eliteCount"] = len(elite)
    report["eliteBrandCounts"] = {b: sum(1 for x in elite if x.get("brand") == b) for b in ["Rolex", "Cartier", "TAG Heuer", "Rado"]}
    report["rolexCartierMarkupMultiplier"] = MARKUP_MULTIPLIER
    report["rolexCartierFxSource"] = "doviz.com"
    report["rolexCartierFxSide"] = "sell"
    report["rolexCartierSourceProvider"] = "Chrono24"
    report["rolexCartierSourcePriceKind"] = "LIVE_LISTING_MEDIAN_USD"
    report["rolexCartierLiveSourceVerifiedCount"] = len(updated)
    report["fxRates"] = rates
    report["rolexCartierPricingUpdatedAt"] = now
    write_json(REPORT_FILE, report)

    if BACKUP_FILE.exists():
        BACKUP_FILE.unlink()

    print(f"ROLEX_CARTIER_COUNT={len(updated)}")
    print(f"DOVIZ_USD_TRY_SELL={rates['USD']}")
    print(f"DOVIZ_EUR_TRY_SELL={rates['EUR']}")
    print("ROLEX_CARTIER_PRICE_SYNC_OK")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--backup", action="store_true")
    args = parser.parse_args()
    if args.backup:
        backup_rolex_cartier()
    else:
        update_prices()


if __name__ == "__main__":
    main()
