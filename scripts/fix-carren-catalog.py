#!/usr/bin/env python3
from __future__ import annotations
import json, re, sys
from pathlib import Path
from typing import Dict, List
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from curl_cffi import requests

ROOT = Path(__file__).resolve().parents[1]
WATCH_FILE = ROOT / "src" / "data" / "saatler.json"
ELITE_FILE = ROOT / "src" / "data" / "elit-saatler.json"
PAYTR_FILE = ROOT / "src" / "data" / "saatler_paytr.json"
REPORT_FILE = ROOT / "scripts" / "sync-saatchi-catalog-report.json"
FIXED_PRICE = 19990
TIMEOUT = 25
MAX_PAGES = 30
CARREN_SOURCES = {
    "Erkek": "https://carren.com.tr/index.php/urun-kategori/erkek/",
    "Kadın": "https://carren.com.tr/index.php/urun-kategori/kadin/",
}

def load_json(path: Path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default

def write_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def slugify(text: str) -> str:
    tr = str.maketrans("ığüşöçİĞÜŞÖÇ", "igusocIGUSOC")
    return re.sub(r"[^a-z0-9]+", "-", str(text or "").translate(tr).lower()).strip("-")

def request_html(url: str) -> str:
    res = requests.get(url, impersonate="chrome", timeout=TIMEOUT,
        headers={"Accept-Language":"tr-TR,tr;q=0.9,en;q=0.7"})
    res.raise_for_status()
    return res.text

def clean_name(value: str) -> str:
    text = re.sub(r"\s+", " ", str(value or "")).strip()
    text = re.sub(r"\bSTOKTA\s+YOK\b", "", text, flags=re.I)
    text = re.sub(r"₺\s*0(?:[.,]00)?", "", text, flags=re.I)
    text = re.sub(r"\bCARREN\b", "", text, flags=re.I)
    return re.sub(r"\s+", " ", text).strip(" -|")

def image_url(node, base_url: str) -> str:
    if node is None: return ""
    for attr in ("data-src","data-lazy-src","src"):
        value = str(node.get(attr) or "").strip()
        if value and not value.startswith("data:"): return urljoin(base_url, value)
    srcset = str(node.get("srcset") or "").strip()
    if srcset:
        first = srcset.split(",")[0].strip().split(" ")[0]
        if first: return urljoin(base_url, first)
    return ""

def derive_ref(name: str, href: str) -> str:
    m = re.search(r"\b(\d{3,5}(?:\s+[A-Z0-9]{1,6}){0,3})\b", name.upper())
    if m: return re.sub(r"\s+"," ",m.group(1)).strip()
    slug = href.rstrip("/").split("/")[-1]
    return clean_name(slug.replace("-"," ")).upper() or slugify(name).upper()

def extract_page_products(html: str, page_url: str, gender: str) -> Dict[str, dict]:
    soup = BeautifulSoup(html, "html.parser")
    found: Dict[str, dict] = {}
    def add(href, name, img, stock):
        href = urljoin(page_url, href)
        if "/urun/" not in href.lower(): return
        name = clean_name(name)
        if not name:
            name = clean_name(href.rstrip("/").split("/")[-1].replace("-"," "))
        if not name: return
        ref = derive_ref(name, href)
        found[href] = {
            "id": f"CARREN-{slugify(ref or name).upper()}",
            "brand": "Carren", "modelName": name, "ref": ref, "reference": ref,
            "originalPrice": FIXED_PRICE, "calculatedPrice": FIXED_PRICE, "price": "₺19.990",
            "seoUrl": f"/saatler/{slugify('Carren ' + name + ' ' + ref)}",
            "image": img, "category": "Saat", "stock": stock,
            "condition": "Sıfır / Carren katalog",
            "description": f"Carren {name} kol saati.",
            "gender": gender, "subCategory": gender,
            "sourceUrl": href, "sourcePrice": 0,
            "sourcePriceStatus": "source_catalog_zero_price",
            "fixedPrice": FIXED_PRICE, "pricingRule": "CARREN_FIXED_19990",
            "sourceVerified": True, "mekanizma": "", "kasaCapi": "", "cam": "", "suGecirmezlik": "",
        }
    cards = soup.select("li.product, .products .product, .wc-block-grid__product, article.product")
    for card in cards:
        a = card.select_one("a[href*='/urun/']")
        if a is None: continue
        img = card.find("img")
        title = card.select_one("h2.woocommerce-loop-product__title, h2.wc-block-grid__product-title, h2, h3")
        name = " ".join(title.stripped_strings) if title else (str(img.get("alt") or "").strip() if img else str(a.get("title") or a.get("aria-label") or "").strip())
        txt = " ".join(card.stripped_strings).lower()
        add(str(a.get("href") or ""), name, image_url(img, page_url), 0 if "stokta yok" in txt else 1)
    if not found:
        for a in soup.select("a[href*='/urun/']"):
            img = a.find("img")
            name = str(a.get("title") or a.get("aria-label") or "").strip() or (str(img.get("alt") or "").strip() if img else "") or " ".join(a.stripped_strings)
            parent = a.find_parent(["li","article","div"])
            txt = " ".join(parent.stripped_strings).lower() if parent else ""
            add(str(a.get("href") or ""), name, image_url(img, page_url), 0 if "stokta yok" in txt else 1)
    return found

def scrape_gender(gender: str, source_url: str) -> List[dict]:
    products: Dict[str, dict] = {}
    stale = 0
    for page in range(1, MAX_PAGES+1):
        page_url = source_url if page == 1 else f"{source_url}?product-page={page}"
        try:
            page_products = extract_page_products(request_html(page_url), page_url, gender)
        except Exception as exc:
            print(f"[Carren] {gender}: page {page} fetch failed: {exc}")
            stale += 1
            if stale >= 2: break
            continue
        before = len(products); products.update(page_products); added = len(products)-before
        print(f"[Carren] {gender}: page {page}, found {len(page_products)}, new {added}, total {len(products)}")
        stale = stale + 1 if added == 0 else 0
        if stale >= 2: break
    return list(products.values())

def main() -> None:
    watches = load_json(WATCH_FILE, [])
    elite = load_json(ELITE_FILE, [])
    report = load_json(REPORT_FILE, {})
    carren = []; gender_counts = {}
    for gender, url in CARREN_SOURCES.items():
        items = scrape_gender(gender, url); gender_counts[gender] = len(items); carren.extend(items)
    dedup = {}
    for item in carren:
        key = str(item.get("sourceUrl") or item.get("ref") or item.get("id") or "").lower()
        if key: dedup[key] = item
    carren = list(dedup.values())
    if not carren:
        print("CARREN_FIXED_PRICE_SYNC_FAILED: no products scraped", file=sys.stderr); sys.exit(1)
    watches = [x for x in watches if str(x.get("brand") or "").strip().lower() != "carren"] + carren
    order = {"Tissot":10,"Carren":11,"Calvin Klein":12,"Michael Kors":13,"Versace":14}
    watches.sort(key=lambda x:(order.get(str(x.get("brand") or ""),99), int(x.get("calculatedPrice") or 0), str(x.get("modelName") or "")))
    write_json(WATCH_FILE, watches)
    write_json(PAYTR_FILE, [{"id":p.get("id"),"modelName":p.get("modelName"),"brand":p.get("brand"),"calculatedPrice":p.get("calculatedPrice"),"stock":p.get("stock",1),"sourceUrl":p.get("sourceUrl")} for p in (elite+watches)])
    report.setdefault("sourceCounts", {})["Carren"] = len(carren)
    report.setdefault("watchBrandCounts", {})["Carren"] = len(carren)
    report["standardCount"] = len(watches)
    report["carrenFixedPrice"] = FIXED_PRICE
    report["carrenGenderCounts"] = gender_counts
    write_json(REPORT_FILE, report)
    bad = [x for x in carren if int(x.get("calculatedPrice") or 0) != FIXED_PRICE]
    if bad:
        print(f"CARREN_FIXED_PRICE_SYNC_FAILED: {len(bad)} bad prices", file=sys.stderr); sys.exit(1)
    print(f"CARREN_COUNT={len(carren)}")
    print(f"CARREN_GENDER_COUNTS={gender_counts}")
    print(f"CARREN_FIXED_PRICE={FIXED_PRICE}")
    print("CARREN_FIXED_PRICE_SYNC_OK")

if __name__ == "__main__":
    main()
