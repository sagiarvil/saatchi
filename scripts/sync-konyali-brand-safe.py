#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
from pathlib import Path
from typing import Dict, List

ROOT = Path(__file__).resolve().parents[1]
SYNC_PATH = ROOT / "scripts" / "sync-saatchi-catalog-v3.py"
ELITE_FILE = ROOT / "src" / "data" / "elit-saatler.json"
WATCH_FILE = ROOT / "src" / "data" / "saatler.json"
PAYTR_FILE = ROOT / "src" / "data" / "saatler_paytr.json"
REPORT_FILE = ROOT / "scripts" / "sync-saatchi-catalog-report.json"

SOURCES = {
    "TAG Heuer": ("https://www.konyalisaat.com.tr/tag-heuer", "elite", "tag heuer"),
    "Rado": ("https://www.konyalisaat.com.tr/rado", "elite", "rado"),
    "Tissot": ("https://www.konyalisaat.com.tr/tissot", "watch", "tissot"),
}
MIN_COUNTS = {"TAG Heuer": 10, "Rado": 20, "Tissot": 20}

spec = importlib.util.spec_from_file_location("saatchi_catalog_v3", SYNC_PATH)
if spec is None or spec.loader is None:
    raise SystemExit("KONYALI_BRAND_SAFE_SYNC_FAILED: v3 module could not be loaded")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


def load_json(path: Path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default


def write_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def normalized(text: str) -> str:
    return " ".join(str(text or "").lower().replace("ı", "i").split())


def brand_matches(item: dict, expected: str) -> bool:
    source = normalized(item.get("sourceUrl"))
    if "?" in source or "page=" in source:
        return False
    model = normalized(item.get("modelName"))
    if any(ak in model for ak in ["kordon", "kayis", "kayış", "cuir", "toka", "strap", "aksesuar"]):
        return False
    if expected == "tag heuer":
        identity_ok = "tag heuer" in model or "tag-heuer" in source
    else:
        identity_ok = expected in model or f"/{expected}" in source or f"-{expected}-" in source
    return identity_ok and "konyalisaat.com.tr" in source


def fetch_verified_brand(brand: str, source_url: str, tier: str, expected: str) -> List[dict]:
    print(f"[Konyali Safe] {brand}: {source_url}")
    links = mod.collect_product_links(source_url, brand, max_pages=40)
    print(f"[Konyali Safe] {brand}: {len(links)} candidate links")
    verified: List[dict] = []
    rejected = 0
    for index, link in enumerate(links, 1):
        item = mod.parse_product_page(link, brand, tier)
        if not item:
            continue
        if not brand_matches(item, expected):
            rejected += 1
            continue
        verified.append(item)
        if index % 50 == 0:
            print(f"[Konyali Safe] {brand}: {index}/{len(links)} scanned, {len(verified)} verified, {rejected} rejected")
    verified = mod.dedupe(verified)
    if len(verified) < MIN_COUNTS[brand]:
        raise SystemExit(f"KONYALI_BRAND_SAFE_SYNC_FAILED: {brand} verified count too low ({len(verified)})")
    print(f"[Konyali Safe] {brand}: VERIFIED={len(verified)} REJECTED={rejected}")
    return verified


def rebuild_paytr(elite: List[dict], watches: List[dict]) -> None:
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


def main() -> None:
    elite = load_json(ELITE_FILE, [])
    watches = load_json(WATCH_FILE, [])
    report = load_json(REPORT_FILE, {})
    results: Dict[str, List[dict]] = {}

    for brand, (url, tier, expected) in SOURCES.items():
        results[brand] = fetch_verified_brand(brand, url, tier, expected)

    elite = [x for x in elite if x.get("brand") not in {"TAG Heuer", "Rado"}]
    elite.extend(results["TAG Heuer"])
    elite.extend(results["Rado"])
    watches = [x for x in watches if x.get("brand") != "Tissot"]
    watches.extend(results["Tissot"])

    elite = mod.sort_catalog(mod.dedupe(elite))
    watches = mod.sort_catalog(mod.dedupe(watches))
    write_json(ELITE_FILE, elite)
    write_json(WATCH_FILE, watches)
    rebuild_paytr(elite, watches)

    counts = {brand: len(items) for brand, items in results.items()}
    report.setdefault("sourceCounts", {}).update(counts)
    report["eliteCount"] = len(elite)
    report["standardCount"] = len(watches)
    report["eliteBrandCounts"] = {b: sum(1 for x in elite if x.get("brand") == b) for b in ["Rolex", "Cartier", "TAG Heuer", "Rado"]}
    report["watchBrandCounts"] = {b: sum(1 for x in watches if x.get("brand") == b) for b in ["Tissot", "Carren", "Calvin Klein", "Michael Kors", "Versace"]}
    report["konyaliBrandIdentityVerified"] = True
    report["konyaliVerifiedCounts"] = counts
    write_json(REPORT_FILE, report)

    print("KONYALI_BRAND_SAFE_SYNC_OK")
    print(json.dumps(counts, ensure_ascii=False))


if __name__ == "__main__":
    main()
