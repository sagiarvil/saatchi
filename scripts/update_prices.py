#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import tempfile
import time
from pathlib import Path
from typing import Any, Optional, Tuple

from bs4 import BeautifulSoup
from curl_cffi import requests

ROOT = Path(__file__).resolve().parents[1]
ELITE_FILE = ROOT / "src" / "data" / "elit-saatler.json"
WATCH_FILE = ROOT / "src" / "data" / "saatler.json"
PAYTR_FILE = ROOT / "src" / "data" / "saatler_paytr.json"
REPORT_FILE = ROOT / "scripts" / "sync-saatchi-catalog-report.json"
BACKUP_FILE = Path(tempfile.gettempdir()) / "saatchi-rolex-cartier-backup.json"
DOVIZ_URL = "https://kur.doviz.com/"
TARGET_BRANDS = {"Rolex", "Cartier"}
MARKUP_MULTIPLIER = 2.50
TIMEOUT = 25


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
        if len(parts[-1]) in (1, 2, 3, 4):
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


def parse_foreign_price(item: dict) -> Tuple[Optional[float], Optional[str]]:
    source_price = parse_number(item.get("sourcePriceForeign"))
    source_currency = str(item.get("sourceCurrency") or "").upper().strip()
    if source_price and source_currency in {"USD", "EUR"}:
        return source_price, source_currency
    raw = str(item.get("foreignPrice") or "").strip()
    if not raw:
        return None, None
    currency = "EUR" if ("€" in raw or "EUR" in raw.upper()) else "USD" if ("$" in raw or "USD" in raw.upper()) else None
    return parse_number(raw), currency


def source_page_price(item: dict) -> Tuple[Optional[float], Optional[str]]:
    url = str(item.get("sourceUrl") or "").strip()
    if not url:
        return None, None
    try:
        res = requests.get(url, impersonate="chrome", timeout=TIMEOUT)
        if res.status_code != 200:
            return None, None
        soup = BeautifulSoup(res.text, "html.parser")
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
                if obj.get("@type") != "Product":
                    continue
                offers = obj.get("offers")
                if isinstance(offers, list):
                    offers = offers[0] if offers else None
                if not isinstance(offers, dict):
                    continue
                amount = parse_number(offers.get("price") or offers.get("lowPrice") or offers.get("highPrice"))
                currency = str(offers.get("priceCurrency") or "").upper().strip()
                if amount and currency in {"USD", "EUR"}:
                    return amount, currency
    except Exception:
        return None, None
    return None, None


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
    if not selected:
        raise SystemExit("ROLEX_CARTIER_BACKUP_FAILED: no Rolex/Cartier products found")
    write_json(BACKUP_FILE, selected)
    print(f"ROLEX_CARTIER_BACKUP_OK count={len(selected)} path={BACKUP_FILE}")


def update_prices() -> None:
    elite = load_json(ELITE_FILE, [])
    watches = load_json(WATCH_FILE, [])
    report = load_json(REPORT_FILE, {})
    source_items = load_json(BACKUP_FILE, []) if BACKUP_FILE.exists() else [x for x in elite if str(x.get("brand") or "").strip() in TARGET_BRANDS]
    if not source_items:
        raise SystemExit("ROLEX_CARTIER_PRICE_SYNC_FAILED: no source products")

    rates = fetch_doviz_sell_rates()
    updated: list[dict] = []
    failures: list[str] = []
    now = time.strftime("%Y-%m-%dT%H:%M:%S%z")

    for original in source_items:
        item = dict(original)
        brand = str(item.get("brand") or "").strip()
        live_amount, live_currency = source_page_price(item)
        if live_amount and live_currency:
            amount, currency = live_amount, live_currency
            price_status = "live_source_url"
            item["foreignPrice"] = ("€" if currency == "EUR" else "$") + f"{amount:,.2f}".rstrip("0").rstrip(".")
        else:
            amount, currency = parse_foreign_price(item)
            price_status = "stored_foreign_price_reference"
        if not amount or currency not in rates:
            failures.append(f"{brand}:{item.get('id')} source price/currency missing")
            continue

        fx_rate = rates[currency]
        base_try = int(round(amount * fx_rate))
        final_try = int(round(base_try * MARKUP_MULTIPLIER))
        item["originalPrice"] = base_try
        item["calculatedPrice"] = final_try
        item["price"] = fmt_try(final_try)
        item["sourcePriceForeign"] = amount
        item["sourceCurrency"] = currency
        item["sourcePriceStatus"] = price_status
        item["fxRate"] = fx_rate
        item["fxRateSide"] = "sell"
        item["fxSource"] = "doviz.com"
        item["pricingRule"] = "FOREIGN_SOURCE_X_DOVIZ_SELL_X_2_50"
        item["pricingUpdatedAt"] = now
        item["category"] = "Elit Kategori"
        item["catalogTier"] = "elite"
        updated.append(item)

    if failures:
        raise SystemExit("ROLEX_CARTIER_PRICE_SYNC_FAILED: " + "; ".join(failures))

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
