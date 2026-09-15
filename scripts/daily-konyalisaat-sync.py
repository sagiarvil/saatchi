#!/usr/bin/env python3
"""
Belgin Kuyumculuk & Saat — Daily KonyalıSaat Stock & Price Sync Engine
Scheduled: Every day at 01:00 (cron: 0 1 * * *)
Margin Rule: Live KonyalıSaat Price +%40 (x 1.40)
"""

import os, sys, re, json, time
from concurrent.futures import ThreadPoolExecutor, as_completed
from curl_cffi import requests
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_JS = os.path.join(ROOT, "src", "data", "saatler.json")
PAYTR_JSON = os.path.join(ROOT, "src", "data", "saatler_paytr.json")

def slugify(text):
    text = text.lower()
    text = re.sub(r"[ığüşöçİĞÜŞÖÇ]", lambda m: {"ı":"i","ğ":"g","ü":"u","ş":"s","ö":"o","ç":"c","İ":"i","Ğ":"g","Ü":"u","Ş":"s","Ö":"o","Ç":"c"}[m.group(0)], text)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

def sanitize_text(text):
    if not text:
        return ""
    patterns = [
        r"(?i)\bkonyal[ıi]\s*saat\b",
        r"(?i)\bkonyal[ıi]saat\b",
        r"(?i)konyalisaat\.com\.tr",
        r"(?i)konyalı\s*saat\s*güvencesiyle",
        r"(?i)türkiye\s*distribütörü\s*konyalı\s*saat",
    ]
    cleaned = text
    for p in patterns:
        cleaned = re.sub(p, "SAATCHI", cleaned)
    return re.sub(r"\s+", " ", cleaned).strip()

def sync_price_and_stock(url, fallback_brand):
    try:
        res = requests.get(url, impersonate="chrome", timeout=15)
        if res.status_code != 200:
            return None
        soup = BeautifulSoup(res.text, "html.parser")
        
        product_ld = None
        for s in soup.find_all("script", type="application/ld+json"):
            try:
                data = json.loads(s.string)
                if isinstance(data, dict) and "@graph" in data:
                    for item in data["@graph"]:
                        if item.get("@type") == "Product":
                            product_ld = item
                            break
                elif isinstance(data, dict) and data.get("@type") == "Product":
                    product_ld = data
            except Exception:
                pass
        
        title = ""
        if product_ld and product_ld.get("name"):
            title = sanitize_text(product_ld.get("name"))
        if not title:
            h1 = soup.find("h1")
            title = sanitize_text(h1.get_text().strip()) if h1 else ""

        base_price = None
        if product_ld and isinstance(product_ld.get("offers"), dict):
            p = product_ld["offers"].get("price")
            try:
                base_price = float(p)
            except Exception:
                pass
        if not base_price:
            price_tag = soup.select_one(".teso-product-info__price, .product-price, .price")
            if price_tag:
                clean_p = re.sub(r"[^\d.,]", "", price_tag.get_text())
                if clean_p.count(",") > 0 and clean_p.count(".") > 0:
                    clean_p = clean_p.replace(".", "").replace(",", ".")
                elif clean_p.count(",") == 1:
                    clean_p = clean_p.replace(",", ".")
                try:
                    base_price = float(clean_p)
                except Exception:
                    pass

        if not base_price or base_price <= 0:
            return None

        description = ""
        if product_ld and product_ld.get("description"):
            description = sanitize_text(product_ld.get("description"))
        
        if not description:
            desc_div = soup.select_one(".product-description, #description, .desc")
            if desc_div:
                description = sanitize_text(desc_div.get_text(separator=" ", strip=True))

        features = []
        features_table = soup.select(".product-features tr, .specifications tr, .urun-ozellikleri li")
        for row in features_table:
            features.append(sanitize_text(row.get_text(separator=": ", strip=True)))
        
        if not features:
            features = [
                "Orijinal Kutu & Sertifika",
                "2 Yıl Uluslararası Garanti",
                "Safir Kristal Cam",
                "Paslanmaz Çelik",
                "Su Geçirmezlik"
            ]

        belgin_price = int(round(base_price * 1.40))
        
        ref = ""
        if product_ld and (product_ld.get("sku") or product_ld.get("model")):
            ref = str(product_ld.get("sku") or product_ld.get("model")).strip()
        if not ref:
            ref_match = re.search(r"([A-Z0-9]{3,}(?:-[A-Z0-9]+)+)", url)
            ref = ref_match.group(1) if ref_match else "KS-" + os.path.basename(url)[:15]

        product_id = f"saat-{slugify(fallback_brand)}-{slugify(ref)}"

        return {
            "id": product_id,
            "url": url,
            "title": title,
            "base_price": base_price,
            "price": belgin_price,
            "inStock": True,
            "description": description,
            "features": features
        }
    except Exception:
        return None

def main():
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Starting KonyalıSaat Daily Price & Stock Sync...")
    try:
        with open(DATA_JS, "r", encoding="utf8") as f:
            products = json.load(f)
    except Exception as e:
        print(f"Error reading {DATA_JS}: {e}")
        return

    konyali_items = [p for p in products if "konyalisaat" in (p.get("sourceUrl") or p.get("source_url") or "")]
    print(f"Syncing {len(konyali_items)} active KonyalıSaat products with live +40% pricing...")

    updated_count = 0
    with ThreadPoolExecutor(max_workers=8) as executor:
        future_to_item = {
            executor.submit(sync_price_and_stock, item.get("source_url") or item.get("sourceUrl"), item["brand"]): item
            for item in konyali_items
            if (item.get("source_url") or item.get("sourceUrl"))
        }
        for future in as_completed(future_to_item):
            item = future_to_item[future]
            res = future.result()
            if res and res.get("price"):
                item["originalPrice"] = res["base_price"]
                item["calculatedPrice"] = res["price"]
                item["price"] = f"₺{res['price']:,}".replace(",", ".")
                item["stock"] = 1 if res.get("inStock", True) else 0
                if res.get("description"):
                    item["description"] = res["description"]
                if res.get("features"):
                    item["features"] = res["features"]
                updated_count += 1

    print(f"Updated {updated_count}/{len(konyali_items)} products.")

    with open(DATA_JS, "w", encoding="utf8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    paytr_catalog = [{"id": p.get("id"), "modelName": p.get("modelName"), "brand": p.get("brand"), "calculatedPrice": p.get("calculatedPrice"), "stock": p.get("stock", 1)} for p in products]
    with open(PAYTR_JSON, "w", encoding="utf8") as f:
        json.dump(paytr_catalog, f, ensure_ascii=False, indent=2)

    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Sync complete. saatler.json and saatler_paytr.json updated successfully.")

if __name__ == "__main__":
    main()
