#!/usr/bin/env python3
"""
SAATCHI — Unified Catalog Sync v3

Source policy
- ELITE: Rolex + Cartier (existing curated catalog, price-cap filtered)
         TAG Heuer + Rado (Konyali Saat live source)
- SAAT:  Tissot (Konyali Saat live source)
         Carren Erkek/Kadin (Carren live source)
         Calvin Klein + Michael Kors + Versace (Saat&Saat live elastic source)

Commercial policy
- Reference source price x 1.50
- Final public price MUST be <= 1,799,000 TRY
- No zero-price / unverifiable-price product is published
- Product source URL and source price are retained internally in JSON

Run from repo root:
    python3 scripts/sync-saatchi-catalog-v3.py

Dependencies:
    pip install curl_cffi beautifulsoup4
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
from dataclasses import dataclass
from typing import Any, Dict, Iterable, List, Optional, Tuple
from urllib.parse import urljoin

sys.path.append(os.path.dirname(__file__))

try:
    from curl_cffi import requests
    from bs4 import BeautifulSoup
except Exception:
    print("ERROR: Missing dependencies. Run: pip3 install curl_cffi beautifulsoup4", file=sys.stderr)
    raise

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ELITE_FILE = os.path.join(ROOT, "src", "data", "elit-saatler.json")
WATCH_FILE = os.path.join(ROOT, "src", "data", "saatler.json")
PAYTR_FILE = os.path.join(ROOT, "src", "data", "saatler_paytr.json")
REPORT_FILE = os.path.join(ROOT, "scripts", "sync-saatchi-catalog-report.json")

MARKUP = 1.50
MAX_PUBLIC_PRICE = 1_799_000
TIMEOUT = 25

KONYALI_SOURCES = {
    "TAG Heuer": ("https://www.konyalisaat.com.tr/isvicre-mekanizma/tag-heuer", "elite"),
    "Rado": ("https://www.konyalisaat.com.tr/rado", "elite"),
    "Tissot": ("https://www.konyalisaat.com.tr/isvicre-mekanizma/tissot", "watch"),
}

CARREN_SOURCES = {
    "Erkek": "https://carren.com.tr/index.php/urun-kategori/erkek/",
    "Kadın": "https://carren.com.tr/index.php/urun-kategori/kadin/",
}

SAATVESAAT_CONFIGS = [
    {"id": "calvin-klein", "name": "Calvin Klein", "brandParam": "calvin klein", "pageId": "35"},
    {"id": "michael-kors", "name": "Michael Kors", "brandParam": "michael kors", "pageId": "8"},
    {"id": "versace", "name": "Versace", "brandParam": "versace", "pageId": "124"},
]

SOURCE_CATEGORY_URLS = {
    "Calvin Klein": "https://www.saatvesaat.com.tr/calvin-klein",
    "Michael Kors": "https://www.saatvesaat.com.tr/michael-kors",
    "Versace": "https://www.saatvesaat.com.tr/versace",
}


def load_json(path: str, default: Any) -> Any:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def write_json(path: str, data: Any) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


def slugify(text: str) -> str:
    tr = str.maketrans("ığüşöçİĞÜŞÖÇ", "igusocIGUSOC")
    text = str(text or "").translate(tr).lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def normalize_price(value: Any) -> Optional[float]:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value) if float(value) > 0 else None
    s = str(value).strip()
    if not s:
        return None
    s = re.sub(r"[^0-9.,]", "", s)
    if not s:
        return None
    # Turkish money: 120.400,00
    if "," in s and "." in s:
        s = s.replace(".", "").replace(",", ".")
    elif "," in s:
        left, right = s.rsplit(",", 1)
        s = left.replace(".", "") + "." + right
    elif s.count(".") > 1:
        s = s.replace(".", "")
    try:
        v = float(s)
        return v if v > 0 else None
    except Exception:
        return None


def public_price(source_price: float) -> int:
    return int(round(float(source_price) * MARKUP))


def fmt_try(value: int) -> str:
    return "₺" + f"{int(value):,}".replace(",", ".")


def source_is_publishable(source_price: float) -> bool:
    p = public_price(source_price)
    return source_price > 0 and p <= MAX_PUBLIC_PRICE


def request_html(url: str) -> Optional[str]:
    try:
        res = requests.get(
            url,
            impersonate="chrome",
            timeout=TIMEOUT,
            headers={"Accept-Language": "tr-TR,tr;q=0.9,en;q=0.7"},
        )
        if res.status_code != 200:
            return None
        return res.text
    except Exception:
        return None


def jsonld_products(soup: BeautifulSoup) -> List[dict]:
    found: List[dict] = []
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
            item = stack.pop()
            if isinstance(item, dict):
                if item.get("@type") == "Product":
                    found.append(item)
                graph = item.get("@graph")
                if isinstance(graph, list):
                    stack.extend(graph)
                item_list = item.get("itemListElement")
                if isinstance(item_list, list):
                    for el in item_list:
                        if isinstance(el, dict):
                            stack.append(el.get("item", el))
            elif isinstance(item, list):
                stack.extend(item)
    return found


def image_from_product_ld(product: dict) -> str:
    image = product.get("image")
    if isinstance(image, list):
        image = image[0] if image else ""
    if isinstance(image, dict):
        image = image.get("url") or image.get("contentUrl") or ""
    return str(image or "").strip()


def price_from_product_ld(product: dict) -> Optional[float]:
    offers = product.get("offers")
    if isinstance(offers, list):
        offers = offers[0] if offers else None
    if isinstance(offers, dict):
        return normalize_price(offers.get("price") or offers.get("lowPrice") or offers.get("highPrice"))
    return None


def collect_product_links(base_url: str, brand_hint: str, max_pages: int = 30) -> List[str]:
    links: List[str] = []
    seen = set()
    stagnant = 0
    for page in range(1, max_pages + 1):
        candidates = [base_url]
        if page > 1:
            sep = "&" if "?" in base_url else "?"
            candidates = [f"{base_url}{sep}page={page}", urljoin(base_url.rstrip("/") + "/", f"page/{page}/")]
        page_new = 0
        for page_url in candidates:
            html = request_html(page_url)
            if not html:
                continue
            soup = BeautifulSoup(html, "html.parser")
            for a in soup.find_all("a", href=True):
                href = urljoin(base_url, a.get("href"))
                text = " ".join(a.stripped_strings).lower()
                hlow = href.lower()
                brand_low = brand_hint.lower().replace("ı", "i")
                likely_product = (
                    "/urun/" in hlow
                    or "kol-saati" in hlow
                    or slugify(brand_hint) in hlow
                    or brand_low in text.replace("ı", "i")
                )
                if not likely_product:
                    continue
                if href.rstrip("/") == base_url.rstrip("/"):
                    continue
                if href not in seen:
                    seen.add(href)
                    links.append(href)
                    page_new += 1
        if page_new == 0:
            stagnant += 1
            if stagnant >= 2:
                break
        else:
            stagnant = 0
    return links


def parse_product_page(url: str, brand: str, category: str, gender: str = "Unisex") -> Optional[dict]:
    html = request_html(url)
    if not html:
        return None
    soup = BeautifulSoup(html, "html.parser")
    products = jsonld_products(soup)
    pld = products[0] if products else {}

    name = str(pld.get("name") or "").strip()
    if not name:
        h1 = soup.find("h1")
        name = " ".join(h1.stripped_strings) if h1 else ""
    if not name:
        return None

    source_price = price_from_product_ld(pld)
    if not source_price:
        price_candidates = [
            soup.select_one(".teso-product-info__price"),
            soup.select_one(".product-price"),
            soup.select_one(".price"),
            soup.select_one("[itemprop='price']"),
        ]
        for tag in price_candidates:
            if tag:
                source_price = normalize_price(tag.get("content") or tag.get_text(" ", strip=True))
                if source_price:
                    break
    if not source_price or not source_is_publishable(source_price):
        return None

    image = image_from_product_ld(pld)
    if not image:
        og = soup.select_one("meta[property='og:image']")
        image = str(og.get("content") or "").strip() if og else ""

    sku = str(pld.get("sku") or pld.get("model") or "").strip()
    if not sku:
        sku_match = re.search(r"\b([A-Z]{1,6}[A-Z0-9.\-]{4,})\b", name.upper())
        sku = sku_match.group(1) if sku_match else slugify(name)[-28:].upper()

    desc = str(pld.get("description") or "").strip()
    if not desc:
        d = soup.select_one(".product-description, #description, .desc, .woocommerce-product-details__short-description")
        desc = " ".join(d.stripped_strings) if d else ""

    specs: Dict[str, str] = {}
    for row in soup.select("tr"):
        cells = [" ".join(c.stripped_strings) for c in row.find_all(["th", "td"])]
        if len(cells) >= 2 and len(cells[0]) <= 80:
            specs[cells[0]] = cells[1]

    calc = public_price(source_price)
    route = "elit-saat" if category == "elite" else "saatler"
    sid = f"SRC-{slugify(brand).upper()}-{slugify(sku).upper()}"
    return {
        "id": sid,
        "brand": brand,
        "modelName": name,
        "ref": sku,
        "reference": sku,
        "originalPrice": int(round(source_price)),
        "calculatedPrice": calc,
        "price": fmt_try(calc),
        "seoUrl": f"/{route}/{slugify(brand + '-' + name + '-' + sku)}",
        "image": image,
        "category": "Elit Kategori" if category == "elite" else "Saat",
        "stock": 1,
        "condition": "Sıfır / Kaynak katalog",
        "description": desc,
        "gender": gender,
        "sourceUrl": url,
        "sourcePrice": int(round(source_price)),
        "pricingRule": "SOURCE_X_1_50",
        "sourceVerified": True,
        "mekanizma": specs.get("Mekanizma") or specs.get("Teknoloji") or "",
        "kasaCapi": specs.get("Kasa Çapı") or specs.get("Kasa Çapi") or "",
        "cam": specs.get("Cam") or specs.get("Cam Tipi") or specs.get("Cam Özelliği") or "",
        "suGecirmezlik": specs.get("Su Geçirmezlik") or "",
    }


def fetch_konyali_brand(brand: str, source_url: str, category: str) -> List[dict]:
    print(f"[Konyali] {brand}: category discovery")
    links = collect_product_links(source_url, brand, max_pages=30)
    print(f"[Konyali] {brand}: {len(links)} candidate links")
    out: List[dict] = []
    for i, link in enumerate(links, 1):
        item = parse_product_page(link, brand, category)
        if item:
            out.append(item)
        if i % 25 == 0:
            print(f"[Konyali] {brand}: {i}/{len(links)} scanned, {len(out)} publishable")
    return dedupe(out)


def fetch_carren() -> List[dict]:
    out: List[dict] = []
    for gender, source_url in CARREN_SOURCES.items():
        print(f"[Carren] {gender}: category discovery")
        links = collect_product_links(source_url, "Carren", max_pages=12)
        print(f"[Carren] {gender}: {len(links)} candidate links")
        for link in links:
            item = parse_product_page(link, "Carren", "watch", gender=gender)
            if item:
                item["subCategory"] = "Erkek" if gender == "Erkek" else "Kadın"
                out.append(item)
    return dedupe(out)


def fetch_saatvesaat_brand(cfg: dict) -> List[dict]:
    all_products: List[dict] = []
    offset = 0
    size = 100
    print(f"[Saat&Saat] {cfg['name']}: elastic catalog")
    while True:
        url = (
            "https://www.saatvesaat.com.tr/elastic.php?categoryId=2"
            f"&pageId={cfg['pageId']}"
            f"&filters[brand.f]={cfg['brandParam'].replace(' ', '%20')}"
            f"&size={size}&from={offset}&order=created_at&direction=desc"
        )
        try:
            res = requests.get(url, impersonate="chrome", timeout=TIMEOUT)
            if res.status_code != 200:
                print(f"[Saat&Saat] {cfg['name']}: HTTP {res.status_code}")
                break
            data = res.json()
        except Exception as exc:
            print(f"[Saat&Saat] {cfg['name']}: {exc}")
            break
        hits = (((data or {}).get("product") or {}).get("hits") or {}).get("hits") or []
        if not hits:
            break
        all_products.extend([h.get("_source") or {} for h in hits])
        offset += size
        total = (((data or {}).get("product") or {}).get("hits") or {}).get("total") or {}
        total_value = total.get("value") if isinstance(total, dict) else int(total or 0)
        if offset >= int(total_value or 0):
            break

    out: List[dict] = []
    for p in all_products:
        if p.get("is_in_stock") not in (1, "1", True, None):
            continue
        source_price = normalize_price(p.get("special_price") or p.get("price"))
        if not source_price or not source_is_publishable(source_price):
            continue
        sku = str(p.get("sku") or p.get("url_key") or "").strip()
        name = str(p.get("name") or sku or "Kol Saati").strip()
        main_img = str(p.get("image") or "").strip()
        if main_img and not main_img.startswith("http"):
            main_img = "https://cdn.saatvesaat.com.tr/mnresize/800/-/media/catalog/product" + ("" if main_img.startswith("/") else "/") + main_img
        gender_raw = str(p.get("gender") or "Unisex")
        gender = "Kadın" if "kad" in gender_raw.lower() or "bayan" in gender_raw.lower() else ("Erkek" if "erk" in gender_raw.lower() else "Unisex")
        calc = public_price(source_price)
        source_url = f"https://www.saatvesaat.com.tr/{p.get('url_key')}" if p.get("url_key") else SOURCE_CATEGORY_URLS[cfg["name"]]
        sid = f"SVS-{slugify(cfg['name']).upper()}-{slugify(sku).upper()}"
        out.append({
            "id": sid,
            "brand": cfg["name"],
            "modelName": name,
            "ref": sku,
            "reference": sku,
            "originalPrice": int(round(source_price)),
            "calculatedPrice": calc,
            "price": fmt_try(calc),
            "seoUrl": f"/saatler/{slugify(cfg['name'] + '-' + name + '-' + sku)}",
            "image": main_img,
            "category": "Saat",
            "stock": int(float(p.get("qty") or 1)),
            "condition": "Sıfır / Distribütör katalog",
            "description": str(p.get("description") or "").strip(),
            "gender": gender,
            "sourceUrl": source_url,
            "sourcePrice": int(round(source_price)),
            "pricingRule": "SOURCE_X_1_50",
            "sourceVerified": True,
            "mekanizma": str(p.get("teknoloji") or "").strip(),
            "kasaCapi": str(p.get("kasa_capi") or "").strip(),
            "cam": str(p.get("cam_ozellik") or "").strip(),
            "suGecirmezlik": str(p.get("su_gecirmezlik") or "").strip(),
        })
    return dedupe(out)


def dedupe(items: Iterable[dict]) -> List[dict]:
    seen = set()
    out = []
    for item in items:
        key = (str(item.get("brand") or "").lower(), str(item.get("ref") or item.get("id") or item.get("modelName") or "").lower())
        if key in seen:
            continue
        seen.add(key)
        out.append(item)
    return out


def current_price(item: dict) -> Optional[float]:
    p = normalize_price(item.get("calculatedPrice"))
    if p:
        return p
    return normalize_price(item.get("price"))


def preserve_rolex_cartier(existing_elite: List[dict]) -> List[dict]:
    out = []
    for item in existing_elite:
        brand = str(item.get("brand") or "").strip()
        if brand not in {"Rolex", "Cartier"}:
            continue
        p = current_price(item)
        if not p or p > MAX_PUBLIC_PRICE:
            continue
        copy = dict(item)
        copy["category"] = "Elit Kategori"
        copy["catalogTier"] = "elite"
        out.append(copy)
    return dedupe(out)


def sort_catalog(items: List[dict]) -> List[dict]:
    brand_order = {
        "Rolex": 1, "Cartier": 2, "TAG Heuer": 3, "Rado": 4,
        "Tissot": 10, "Carren": 11, "Calvin Klein": 12, "Michael Kors": 13, "Versace": 14,
    }
    return sorted(items, key=lambda x: (brand_order.get(str(x.get("brand")), 99), int(x.get("calculatedPrice") or 0), str(x.get("modelName") or "")))


def main() -> None:
    started = time.time()
    existing_elite = load_json(ELITE_FILE, [])
    elite = preserve_rolex_cartier(existing_elite)
    standard: List[dict] = []
    errors: List[str] = []
    source_counts: Dict[str, int] = {}

    for brand, (url, tier) in KONYALI_SOURCES.items():
        try:
            items = fetch_konyali_brand(brand, url, tier)
            source_counts[brand] = len(items)
            if tier == "elite":
                elite.extend(items)
            else:
                standard.extend(items)
        except Exception as exc:
            errors.append(f"Konyali {brand}: {exc}")

    try:
        carren = fetch_carren()
        import carren_seo
        carren = carren_seo.enrich_carren_catalog(carren)
        source_counts["Carren"] = len(carren)
        standard.extend(carren)
    except Exception as exc:
        errors.append(f"Carren: {exc}")

    for cfg in SAATVESAAT_CONFIGS:
        try:
            items = fetch_saatvesaat_brand(cfg)
            source_counts[cfg["name"]] = len(items)
            standard.extend(items)
        except Exception as exc:
            errors.append(f"Saat&Saat {cfg['name']}: {exc}")

    elite = [x for x in dedupe(elite) if (current_price(x) or 0) <= MAX_PUBLIC_PRICE]
    standard = [x for x in dedupe(standard) if (current_price(x) or 0) <= MAX_PUBLIC_PRICE]
    elite = sort_catalog(elite)
    standard = sort_catalog(standard)

    write_json(ELITE_FILE, elite)
    write_json(WATCH_FILE, standard)
    write_json(PAYTR_FILE, [
        {
            "id": p.get("id"),
            "modelName": p.get("modelName"),
            "brand": p.get("brand"),
            "calculatedPrice": p.get("calculatedPrice"),
            "stock": p.get("stock", 1),
            "sourceUrl": p.get("sourceUrl"),
        }
        for p in (elite + standard)
    ])

    report = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "markup": MARKUP,
        "maxPublicPrice": MAX_PUBLIC_PRICE,
        "eliteCount": len(elite),
        "standardCount": len(standard),
        "sourceCounts": source_counts,
        "eliteBrandCounts": {b: sum(1 for x in elite if x.get("brand") == b) for b in ["Rolex", "Cartier", "TAG Heuer", "Rado"]},
        "watchBrandCounts": {b: sum(1 for x in standard if x.get("brand") == b) for b in ["Tissot", "Carren", "Calvin Klein", "Michael Kors", "Versace"]},
        "errors": errors,
        "elapsedSeconds": round(time.time() - started, 2),
    }
    write_json(REPORT_FILE, report)

    print("\n========== SAATCHI CATALOG SYNC COMPLETE ==========")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if errors:
        print("WARNING: Some sources could not be verified. Those products were NOT invented/published.")


if __name__ == "__main__":
    main()
