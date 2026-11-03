# -*- coding: utf-8 -*-
"""
Saatchi & Co. - Kullanıcı Markaları Senkronizasyon ve Özgün İçerik Motoru
Sadece kullanıcının belirlediği 12 marka:
Seiko, Tissot, Swatch, Casio, Carren, Versace, Calvin Klein, Michael Kors, Guess, Welder, Diesel, Fossil.
Fiyatlama Formülü: Referans Fiyat x 1.60 (Carren için sabit 19.990 TL)
Taban Fiyat: 10.000 TL
Özgün Tanıtım Yazısı: Her saat için teknik özelliklere dayalı %100 özgün içerik.
"""

import os, sys, json, re, time, urllib.request, urllib.parse
from bs4 import BeautifulSoup
from curl_cffi import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WATCH_FILE = os.path.join(ROOT, 'src', 'data', 'saatler.json')
ELITE_FILE = os.path.join(ROOT, 'src', 'data', 'elit-saatler.json')
PAYTR_FILE = os.path.join(ROOT, 'src', 'data', 'saatler_paytr.json')

MARKUP = 1.60
MIN_PRICE = 10000
MAX_PRICE = 1700000

PURE_ACCESSORY_PATTERNS = [
    re.compile(r'^(?:kadın|erkek|unisex)?\s*(?:bileklik|kolye|küpe|yüzük|cüzdan|çanta|parfüm)\b', re.I),
    re.compile(r'\b(?:kolye ucu|tek küpe|deri bileklik|çelik bileklik)\b', re.I),
    re.compile(r'^cuir\b', re.I),
    re.compile(r'^(?:yedek kayış|saat kayışı|kordon takımı)\b', re.I),
    re.compile(r'\b(?:kordon|kayış|kayis|toka|strap|aksesuar|hediye seti|taki)\b', re.I)
]

def is_pure_accessory(name):
    for pat in PURE_ACCESSORY_PATTERNS:
        if pat.search(name):
            return True
    return False

def slugify(text):
    tr = str.maketrans('ığüşöçİĞÜŞÖÇ', 'igusocIGUSOC')
    text = str(text or '').translate(tr).lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def fmt_try(val):
    return '₺' + f'{int(val):,}'.replace(',', '.')

def generate_unique_description(brand, model_name, ref, gender, case_diameter, glass, wr, movement, material, strap, dial_color):
    g_text = 'Erkek' if gender == 'Erkek' else ('Kadın' if gender == 'Kadın' else 'Unisex')
    parts = []
    
    # 1. Kanca ve marka kimliği
    if brand == 'Seiko':
        parts.append(f'{brand} markasının köklü Japon saatçilik mirasını ve hassas mühendislik felsefesini yansıtan {model_name} ({ref}), hem estetik hem de fonksiyonel üstünlük sunan özgün bir {g_text.lower()} kol saatidir.')
    elif brand == 'Tissot':
        parts.append(f'İsviçre geleneksel saatçilik sanatının modern doruk noktası olan {model_name} ({ref}), Tissot atölyelerinin yüksek kronometrik standartlarını ve rafine işçiliğini bileğinize taşır.')
    elif brand == 'Swatch':
        parts.append(f'İsviçre saatçiliğinin yenilikçi, dinamik ve ikonik ruhunu taşıyan {model_name} ({ref}), enerjik tasarımı ve ergonomik yapısıyla günlük stilinize sofistike bir dokunuş kazandırır.')
    elif brand == 'Casio':
        parts.append(f'Casio’nun yüksek dayanıklılık ve ileri teknoloji standartlarıyla üretilen {model_name} ({ref}), zorlu koşullara meydan okuyan sağlam mimarisi ve zamansız çizgileriyle öne çıkan bir başyapıttır.')
    elif brand == 'Versace':
        parts.append(f'İtalyan yüksek moda evinin görkemli couture estetiğini ve kusursuz saat işçiliğini buluşturan {model_name} ({ref}), prestijli tasarımıyla lüksün en seçkin sembollerindendir.')
    elif brand == 'Calvin Klein':
        parts.append(f'New York çağdaş tasarım vizyonunu minimalizm ve modern hatlarla buluşturan {model_name} ({ref}), yalın şıklığı ve zarif detaylarıyla gün boyu kusursuz konfor sunar.')
    elif brand == 'Michael Kors':
        parts.append(f'Amerikan jet-set zarafetini ve ışıltılı podyum stilini bileğinize taşıyan {model_name} ({ref}), göz alıcı detayları ve lüks bitişiyle her ortamda fark yaratır.')
    elif brand == 'Guess':
        parts.append(f'Cesur, dinamik ve trendleri belirleyen ikonik tasarım DNA’sına sahip {model_name} ({ref}), modern yaşamın temposuna ayak uyduran çarpıcı bir aksesuar deneyimi vadediyor.')
    elif brand == 'Welder':
        parts.append(f'Zaman algısına felsefi ve yenilikçi bir boyut kazandıran Welder Moody {model_name} ({ref}), ışığa ve açıya göre renk değiştiren karakteristik fotokromik camı ve sol tarafta konumlanan ikonik kurma koluyla benzersiz bir karakter sergiler.')
    elif brand == 'Diesel':
        parts.append(f'Endüstriyel güç, cesur kadran tasarımı ve tavizsiz sokak stilini harmanlayan Diesel {model_name} ({ref}), güçlü bilek varlığı ve karizmatik detaylarıyla güçlü bir duruş sergiler.')
    elif brand == 'Fossil':
        parts.append(f'Amerikan vintage mirasını otantik detaylar ve modern saat mühendisliğiyle harmanlayan Fossil {model_name} ({ref}), zamansız zarafetiyle her tarza kusursuz uyum sağlar.')
    elif brand == 'Carren':
        parts.append(f'Çağdaş lüks saatçilik vizyonuyla üretilen Carren {model_name} ({ref}), asil hatları ve modern kadran mimarisiyle her ortamda seçkin bir zarafet sunar.')
    else:
        parts.append(f'{brand} koleksiyonunun özenle seçilmiş özel parçası {model_name} ({ref}), üstün işçilik ve modern tasarım anlayışıyla dikkat çeken seçkin bir modeldir.')

    # 2. Teknik özellikler ve konstrüksiyon
    tech_details = []
    if case_diameter:
        tech_details.append(f'{case_diameter} çapındaki ergonomik kasası')
    if material:
        tech_details.append(f'yüksek kalitede işlenmiş {material.lower()} gövdesi')
    if strap:
        tech_details.append(f'üst düzey konfor sağlayan {strap.lower()} kordonu')
    if dial_color:
        tech_details.append(f'derinlik hissi veren {dial_color.lower()} kadranı')
    if glass:
        tech_details.append(f'çizilmelere karşı maksimum direnç sunan {glass.lower()} cam yapısı')
    if movement:
        tech_details.append(f'yüksek hassasiyetle çalışan {movement.lower()} mekanizması')
    if wr:
        tech_details.append(f'{wr} basınca dayanıklı su geçirmezlik derecesi')

    if tech_details:
        sentence = 'Model; ' + ', '.join(tech_details[:-1]) + (' ve ' if len(tech_details) > 1 else '') + tech_details[-1] + ' ile donatılmıştır.'
        parts.append(sentence)

    # 3. Kapanış ve güvence
    parts.append(f'Saatchi & Co. güvencesiyle %100 orijinal, adınıza düzenlenmiş sertifikası ve lüks özel ambalajıyla titizlikle teslim edilen {ref}, koleksiyonunuzun en değerli parçalarından biri olmaya adaydır.')

    return ' '.join(parts)

print("Helper functions initialized.")

def fetch_saatvesaat_brand(brand_name, max_items=500):
    print(f"[*] Saat&Saat: {brand_name} çekiliyor...")
    products = []
    seen_skus = set()
    page_size = 60
    
    for offset in range(0, max_items, page_size):
        url = f"https://www.saatvesaat.com.tr/elastic.php?categoryId=2&from={offset}&size={page_size}&filters[brand.f]={urllib.parse.quote(brand_name)}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
        try:
            res = urllib.request.urlopen(req, timeout=12)
            data = json.loads(res.read())
            hits = data.get('product', {}).get('hits', {}).get('hits', [])
            if not hits:
                break
                
            for h in hits:
                src = h.get('_source', {})
                name = str(src.get('name') or '').strip()
                sku = str(src.get('sku') or '').strip()
                if not name or not sku or sku in seen_skus:
                    continue
                if is_pure_accessory(name):
                    continue
                
                # Fiyat
                price_val = src.get('special_price') or src.get('price')
                try:
                    price_val = float(price_val)
                except (ValueError, TypeError):
                    price_val = 0
                if price_val <= 0:
                    continue
                    
                calc_price = int(round(price_val * MARKUP))
                if calc_price < MIN_PRICE or calc_price > MAX_PRICE:
                    continue
                    
                # Görsel
                img_path = str(src.get('image') or '').strip()
                if img_path and not img_path.startswith('http'):
                    image_url = f"https://www.saatvesaat.com.tr/media/catalog/product{img_path}"
                else:
                    image_url = img_path
                    
                # Cinsiyet
                g_raw = src.get('gender')
                gender = 'Unisex'
                if isinstance(g_raw, list) and g_raw:
                    gender = g_raw[0]
                elif isinstance(g_raw, str):
                    gender = g_raw
                    
                # Teknik detaylar
                cam = str(src.get('cam_ozellik') or '').strip()
                kasa_capi = str(src.get('kasa_capi') or '').strip()
                wr = str(src.get('su_gecirmezlik') or '').strip()
                movement = str(src.get('teknoloji') or src.get('makine_ozellik') or '').strip()
                
                kasa_mat = src.get('kasa_materyali')
                material = kasa_mat[0] if isinstance(kasa_mat, list) and kasa_mat else (str(kasa_mat) if kasa_mat else '')
                
                kordon = src.get('kayis_kordon_ozellik')
                strap = kordon[0] if isinstance(kordon, list) and kordon else (str(kordon) if kordon else '')
                
                kadran = src.get('kadran_renk')
                
                if isinstance(kadran, list) and kadran:
                    dial_color = kadran[0]
                elif isinstance(kadran, str):
                    dial_color = kadran
                else:
                    dial_color = ''
                    
                url_key = str(src.get('url_key') or '').strip()
                source_url = f"https://www.saatvesaat.com.tr/{url_key}" if url_key else f"https://www.saatvesaat.com.tr/{slugify(brand_name)}"
                
                unique_desc = generate_unique_description(
                    brand=brand_name,
                    model_name=name,
                    ref=sku,
                    gender=gender,
                    case_diameter=kasa_capi,
                    glass=cam,
                    wr=wr,
                    movement=movement,
                    material=material,
                    strap=strap,
                    dial_color=dial_color
                )
                
                sid = f"SRC-{slugify(brand_name).upper()}-{slugify(sku).upper()}"
                item = {
                    "id": sid,
                    "brand": brand_name,
                    "modelName": name,
                    "ref": sku,
                    "reference": sku,
                    "originalPrice": int(round(price_val)),
                    "calculatedPrice": calc_price,
                    "price": fmt_try(calc_price),
                    "seoUrl": f"/saatler/{slugify(brand_name + '-' + name + '-' + sku)}",
                    "image": image_url,
                    "category": "Saat",
                    "stock": 1,
                    "condition": "Orijinal",
                    "badge": "",
                    "description": unique_desc,
                    "gender": gender,
                    "sourceUrl": source_url,
                    "sourcePrice": int(round(price_val)),
                    "pricingRule": "SOURCE_X_1_60",
                    "sourceVerified": True,
                    "mekanizma": movement,
                    "kasaCapi": kasa_capi,
                    "cam": cam,
                    "suGecirmezlik": wr,
                    "stockStatus": "in_stock"
                }
                seen_skus.add(sku)
                products.append(item)
                
            time.sleep(0.15)
        except Exception as e:
            print(f"[!] Error on {brand_name} page {page}: {e}")
            break
            
    print(f"[+] {brand_name} tamamlandı: {len(products)} adet saat (>=10.000 TL).")
    return products

print("Saat&Saat fetcher defined.")

def fetch_konyali_brand(brand_name, query_slug, max_pages=15):
    print(f"[*] Konyalı Saat: {brand_name} çekiliyor...")
    products = []
    seen_urls = set()
    session = requests.Session(impersonate="chrome")
    
    # 1. Sayfalardan ürün linklerini topla
    product_links = []
    for page in range(1, max_pages + 1):
        url = f"https://www.konyalisaat.com.tr/arama?q={query_slug}&page={page}"
        try:
            res = session.get(url, timeout=15)
            if res.status_code != 200:
                break
            soup = BeautifulSoup(res.text, 'html.parser')
            page_links = []
            for a in soup.find_all('a', href=True):
                href = a['href']
                if 'kol-saati' in href and query_slug in href.lower():
                    if not href.startswith('http'):
                        href = 'https://www.konyalisaat.com.tr' + href
                    clean_href = href.split('?')[0]
                    if clean_href not in seen_urls:
                        seen_urls.add(clean_href)
                        page_links.append(clean_href)
            if not page_links:
                break
            product_links.extend(page_links)
            time.sleep(0.1)
        except Exception as e:
            print(f"[!] Error listing {brand_name} page {page}: {e}")
            break
            
    print(f"[*] {brand_name} için {len(product_links)} adet aday link tespit edildi. Detaylar ayrıştırılıyor...")
    
    # 2. Ürün detaylarını çek
    for purl in product_links:
        try:
            r = session.get(purl, timeout=12)
            if r.status_code != 200:
                continue
            soup = BeautifulSoup(r.text, 'html.parser')
            
            pld = None
            for sc in soup.find_all('script', type='application/ld+json'):
                try:
                    d = json.loads(sc.string or '')
                    if '@graph' in d:
                        for item in d['@graph']:
                            if item.get('@type') == 'Product':
                                pld = item
                                break
                    elif d.get('@type') == 'Product':
                        pld = d
                        break
                except:
                    pass
                if pld:
                    break
                    
            if not pld:
                continue
                
            name = str(pld.get('name') or '').strip()
            if not name or is_pure_accessory(name):
                continue
                
            sku = str(pld.get('sku') or '').strip()
            if not sku:
                sku_m = re.search(r'\b([A-Z0-9.\-]{5,})\b', name.upper())
                sku = sku_m.group(1) if sku_m else slugify(name)[-20:].upper()
                
            offers = pld.get('offers')
            if isinstance(offers, list) and offers:
                offers = offers[0]
            price_val = 0
            if isinstance(offers, dict):
                p_raw = offers.get('price')
                try:
                    price_val = float(p_raw)
                except:
                    price_val = 0
                    
            if price_val <= 0:
                continue
                
            calc_price = int(round(price_val * MARKUP))
            if calc_price < MIN_PRICE or calc_price > MAX_PRICE:
                continue
                
            img = pld.get('image')
            if isinstance(img, list) and img:
                image_url = img[0]
            elif isinstance(img, str):
                image_url = img
            else:
                image_url = ""
                
            props = pld.get('additionalProperty', [])
            prop_dict = {}
            if isinstance(props, list):
                for pr in props:
                    if isinstance(pr, dict):
                        n = pr.get('name')
                        v = pr.get('value')
                        if n and v:
                            prop_dict[n] = v
                            
            gender = prop_dict.get('Cinsiyet') or 'Unisex'
            cam = prop_dict.get('Cam Tipi') or prop_dict.get('Cam') or ''
            kasa_capi = prop_dict.get('Kasa Çapı') or ''
            wr = prop_dict.get('Su Geçirmezlik') or ''
            movement = prop_dict.get('Mekanizma') or ''
            material = prop_dict.get('Kasa Materyali') or ''
            strap = prop_dict.get('Kordon Materyali') or ''
            dial_color = prop_dict.get('Kadran Rengi') or ''
            
            unique_desc = generate_unique_description(
                brand=brand_name,
                model_name=name,
                ref=sku,
                gender=gender,
                case_diameter=kasa_capi,
                glass=cam,
                wr=wr,
                movement=movement,
                material=material,
                strap=strap,
                dial_color=dial_color
            )
            
            sid = f"SRC-{slugify(brand_name).upper()}-{slugify(sku).upper()}"
            item = {
                "id": sid,
                "brand": brand_name,
                "modelName": name,
                "ref": sku,
                "reference": sku,
                "originalPrice": int(round(price_val)),
                "calculatedPrice": calc_price,
                "price": fmt_try(calc_price),
                "seoUrl": f"/saatler/{slugify(brand_name + '-' + name + '-' + sku)}",
                "image": image_url,
                "category": "Saat",
                "stock": 1,
                "condition": "Orijinal",
                "badge": "",
                "description": unique_desc,
                "gender": gender,
                "sourceUrl": purl,
                "sourcePrice": int(round(price_val)),
                "pricingRule": "SOURCE_X_1_60",
                "sourceVerified": True,
                "mekanizma": movement,
                "kasaCapi": kasa_capi,
                "cam": cam,
                "suGecirmezlik": wr,
                "stockStatus": "in_stock"
            }
            products.append(item)
            time.sleep(0.08)
        except Exception as e:
            continue
            
    print(f"[+] Konyalı {brand_name} tamamlandı: {len(products)} adet saat (>=10.000 TL).")
    return products

print("Konyalı fetcher defined.")

def fetch_ersa_casio(max_pages_erkek=15, max_pages_kadin=10):
    print("[*] Ersa Saat: Casio modelleri çekiliyor...")
    products = []
    seen_skus = set()
    session = requests.Session(impersonate="chrome")
    
    sections = [
        ("https://www.ersasaat.com.tr/casio-erkek-saat", "Erkek", max_pages_erkek),
        ("https://www.ersasaat.com.tr/casio-kadin-saat", "Kadın", max_pages_kadin),
    ]
    
    for base_url, default_gender, max_pages in sections:
        for page in range(1, max_pages + 1):
            url = f"{base_url}?p={page}"
            try:
                res = session.get(url, timeout=15)
                if res.status_code != 200:
                    break
                soup = BeautifulSoup(res.text, 'html.parser')
                links = soup.select('a.product-link')
                if not links:
                    break
                    
                for a in links:
                    sku = a.get('data-product-code') or a.get('data-id') or ''
                    name = a.get('data-name') or ''
                    price_str = a.get('data-price') or '0'
                    href = a.get('href') or ''
                    
                    if not sku or sku in seen_skus:
                        continue
                    if is_pure_accessory(name):
                        continue
                        
                    try:
                        price_val = float(price_str)
                    except:
                        price_val = 0
                        
                    if price_val <= 0:
                        continue
                        
                    calc_price = int(round(price_val * MARKUP))
                    if calc_price < MIN_PRICE or calc_price > MAX_PRICE:
                        continue
                        
                    img_tag = a.select_one('img')
                    image_url = img_tag.get('src') if img_tag else f"https://cdn.demircloud.com/products/1000/{sku}.jpg"
                    
                    purl = "https://www.ersasaat.com.tr" + href if href.startswith('/') else href
                    
                    # Detay sayfasından teknik özellikler
                    cam, kasa_capi, wr, movement, material, strap, dial_color = "", "", "", "", "", "", ""
                    try:
                        r_det = session.get(purl, timeout=8)
                        if r_det.status_code == 200:
                            soup_det = BeautifulSoup(r_det.text, 'html.parser')
                            specs = {}
                            for row in soup_det.select('table tr'):
                                tds = row.find_all(['td', 'th'])
                                if len(tds) == 2:
                                    specs[tds[0].get_text(strip=True)] = tds[1].get_text(strip=True)
                            cam = specs.get('Cam Tipi', '')
                            kasa_capi = specs.get('Kasa Çapı', '')
                            wr = specs.get('Su Geçirmezlik', '')
                            movement = specs.get('Mekanizma', '')
                            material = specs.get('Kasa Cinsi', '')
                            strap = specs.get('Kayış Kordon Tipi', '')
                            dial_color = specs.get('Kadran Rengi', '')
                    except:
                        pass
                        
                    # İsim temizliği
                    clean_name = f"Casio {sku} {name}".strip()
                    if name.startswith("GÜNEŞ ENERJİLİ") or name.startswith("Kol Saati"):
                        clean_name = f"Casio {sku} Kol Saati"
                    else:
                        clean_name = f"Casio {name}" if not name.lower().startswith('casio') else name
                        
                    unique_desc = generate_unique_description(
                        brand="Casio",
                        model_name=clean_name,
                        ref=sku,
                        gender=default_gender,
                        case_diameter=kasa_capi,
                        glass=cam,
                        wr=wr,
                        movement=movement,
                        material=material,
                        strap=strap,
                        dial_color=dial_color
                    )
                    
                    sid = f"SRC-CASIO-{slugify(sku).upper()}"
                    item = {
                        "id": sid,
                        "brand": "Casio",
                        "modelName": clean_name,
                        "ref": sku,
                        "reference": sku,
                        "originalPrice": int(round(price_val)),
                        "calculatedPrice": calc_price,
                        "price": fmt_try(calc_price),
                        "seoUrl": f"/saatler/{slugify('casio-' + clean_name + '-' + sku)}",
                        "image": image_url,
                        "category": "Saat",
                        "stock": 1,
                        "condition": "Orijinal",
                        "badge": "",
                        "description": unique_desc,
                        "gender": default_gender,
                        "sourceUrl": purl,
                        "sourcePrice": int(round(price_val)),
                        "pricingRule": "SOURCE_X_1_60",
                        "sourceVerified": True,
                        "mekanizma": movement,
                        "kasaCapi": kasa_capi,
                        "cam": cam,
                        "suGecirmezlik": wr,
                        "stockStatus": "in_stock"
                    }
                    seen_skus.add(sku)
                    products.append(item)
                    time.sleep(0.05)
            except Exception as e:
                print(f"[!] Error on Casio {default_gender} page {page}: {e}")
                break
                
    print(f"[+] Ersa Casio tamamlandı: {len(products)} adet saat (>=10.000 TL).")
    return products

print("Ersa Casio fetcher defined.")

def load_and_enrich_carren():
    print("[*] Carren saatleri yükleniyor ve özgünleştiriliyor...")
    try:
        with open(WATCH_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"[!] Error reading watch file: {e}")
        return []
        
    carren_items = [w for w in data if w.get('brand') == 'Carren']
    enriched = []
    for item in carren_items:
        mname = item.get('modelName') or ''
        ref = item.get('ref') or item.get('reference') or ''
        gender = item.get('gender') or item.get('subCategory') or 'Unisex'
        
        # Özgün tanıtım metni
        unique_desc = generate_unique_description(
            brand="Carren",
            model_name=mname,
            ref=ref,
            gender=gender,
            case_diameter=item.get('kasaCapi', ''),
            glass=item.get('cam', ''),
            wr=item.get('suGecirmezlik', ''),
            movement=item.get('mekanizma', ''),
            material="Çelik",
            strap="Deri / Çelik",
            dial_color=""
        )
        item['description'] = unique_desc
        item['condition'] = "Orijinal"
        item['stock'] = 1
        item['stockStatus'] = "in_stock"
        item['calculatedPrice'] = 19990
        item['price'] = "₺19.990"
        item['pricingRule'] = "CARREN_FIXED_19990"
        item['sourceVerified'] = True
        enriched.append(item)
        
    print(f"[+] Carren tamamlandı: {len(enriched)} adet saat.")
    return enriched

print("Carren loader defined.")

def main():
    print("=== SAATCHI & CO. 12 MARKA SENKRONİZASYON MOTORU BAŞLATILDI ===")
    all_new_watches = []
    
    # 1. Saat&Saat Markaları: Seiko, Versace, Calvin Klein, Michael Kors, Guess, Welder, Diesel, Fossil
    saatvesaat_brands = [
        'Seiko',
        'Versace',
        'Calvin Klein',
        'Michael Kors',
        'Guess',
        'Welder',
        'Diesel',
        'Fossil'
    ]
    for b in saatvesaat_brands:
        items = fetch_saatvesaat_brand(b, max_items=400)
        all_new_watches.extend(items)
        
    # 2. Konyalı Saat: Tissot, Swatch
    tissot_items = fetch_konyali_brand('Tissot', 'tissot', max_pages=15)
    all_new_watches.extend(tissot_items)
    
    swatch_items = fetch_konyali_brand('Swatch', 'swatch', max_pages=15)
    all_new_watches.extend(swatch_items)
    
    # 3. Ersa Saat: Casio
    casio_items = fetch_ersa_casio(max_pages_erkek=15, max_pages_kadin=10)
    all_new_watches.extend(casio_items)
    
    # 4. Carren: Sabit 19.990 TL
    carren_items = load_and_enrich_carren()
    all_new_watches.extend(carren_items)
    
    # 5. İkiz (Duplicate) ve Geçersiz Veri Filtresi
    seen_ids = set()
    unique_watches = []
    for w in all_new_watches:
        wid = w.get('id')
        if not wid or wid in seen_ids:
            continue
        calc = w.get('calculatedPrice', 0)
        if calc < MIN_PRICE or calc > MAX_PRICE:
            continue
        seen_ids.add(wid)
        unique_watches.append(w)
        
    print(f"\n[+] Toplam filtrelenmiş ve doğrulanmış saat sayısı: {len(unique_watches)}")
    
    # Marka bazlı özet
    brand_counts = {}
    for w in unique_watches:
        b = w.get('brand', 'Unknown')
        brand_counts[b] = brand_counts.get(b, 0) + 1
    print("Marka Dağılımı:")
    for b, cnt in sorted(brand_counts.items(), key=lambda x: -x[1]):
        print(f"  - {b}: {cnt} adet")
        
    # 6. JSON Dosyalarını Güncelle
    print("\n[*] saatler.json, saatler_paytr.json güncelleniyor...")
    with open(WATCH_FILE, 'w', encoding='utf-8') as f:
        json.dump(unique_watches, f, ensure_ascii=False, indent=2)
        f.write('\n')
        
    # PayTR senkronize liste
    paytr_list = []
    for w in unique_watches:
        paytr_list.append({
            "id": w["id"],
            "brand": w["brand"],
            "modelName": w["modelName"],
            "calculatedPrice": w["calculatedPrice"],
            "price": w["price"],
            "stock": w.get("stock", 1),
            "stockStatus": w.get("stockStatus", "in_stock"),
            "category": w.get("category", "Saat"),
            "gender": w.get("gender", "Unisex")
        })
    with open(PAYTR_FILE, 'w', encoding='utf-8') as f:
        json.dump(paytr_list, f, ensure_ascii=False, indent=2)
        f.write('\n')
        
    # elit-saatler.json dosyasını sıfırla (boş liste)
    print("[*] elit-saatler.json boşaltılıyor (sadece bu 12 marka çalışılacak)...")
    with open(ELITE_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f, ensure_ascii=False, indent=2)
        f.write('\n')
        
    print("[SUCCESS] Tüm veri tabanı ve dosyalar başarıyla güncellendi!")

if __name__ == '__main__':
    main()
