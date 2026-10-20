import urllib.request
import urllib.parse
import re
import json
import time
import sys
from bs4 import BeautifulSoup

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def clean_url(url):
    parsed = urllib.parse.urlsplit(url)
    safe_path = urllib.parse.quote(parsed.path)
    return urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, safe_path, parsed.query, parsed.fragment))

def fetch_url(url, retries=3):
    fixed_url = clean_url(url)
    for attempt in range(retries):
        try:
            req = urllib.request.Request(fixed_url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp:
                return resp.read().decode('utf-8', errors='ignore')
        except Exception as e:
            if attempt == retries - 1:
                print(f"Error fetching {fixed_url}: {e}", file=sys.stderr)
                return None
            time.sleep(1)
    return None

def slugify(text):
    text = text.lower()
    text = text.replace('ı', 'i').replace('ğ', 'g').replace('ü', 'u').replace('ş', 's').replace('ö', 'o').replace('ç', 'c')
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def sanitize_gucci(text):
    if not text:
        return ""
    patterns = [
        r'engin\s*saat(?:\'te|\'ten|\'in|\'e|\'i|\'den|\'de)?',
        r'eng\s*saat(?:\'te|\'ten|\'in|\'e|\'i|\'den|\'de)?',
        r'engsaat(?:\.com)?',
        r'yetkili\s*sat[ıi]c[ıi]\s*engin\s*saat',
        r'sitemizden\s*ald[ıi][ğg][ıi]n[ıi]z\s*t[üu]m\s*[üu]r[üu]nler\s*%100\s*orijinaldir\.?',
        r'256bit\s*ssl\s*sertifikas[ıi]\s*ile\s*t[üu]m\s*sipari[şs]leriniz\s*g[üu]vende\.?',
        r'sat[ıi][şs]\s*dan[ıi][şs]man[ıi]m[ıi]zdan\s*bilgi\s*al[ıi]n',
        r'ayn[ıi]\s*g[üu]n\s*kargo',
        r'[üu]cretsiz\s*kargo'
    ]
    for pat in patterns:
        text = re.sub(pat, '', text, flags=re.I)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def sanitize_seiko(text):
    if not text:
        return ""
    patterns = [
        r'ayd[ıi]n\s*saat(?:\'te|\'ten|\'in|\'e|\'i|\'den|\'de|\s*store|\s*resmi\s*distrib[üu]t[öo]r[üu])?',
        r'aydinsaatstore(?:\.com)?',
        r'aydinsaat(?:\.com)?',
        r'yetkili\s*sat[ıi]c[ıi]\s*ayd[ıi]n\s*saat',
        r'ayd[ıi]n\s*saat\xc3\xa7ilik',
        r'tavsiye\s*edilen\s*perakende\s*sat[ıi][şs]\s*fiyat[ıi]\s*:\s*[\d\.,\s]+(?:TL|₺)?',
        r'tpsf\s*:\s*[\d\.,\s]+(?:TL|₺)?'
    ]
    for pat in patterns:
        text = re.sub(pat, '', text, flags=re.I)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def scrape_gucci():
    print(">>> Starting Gucci scraping from engsaat.com...")
    main_url = 'https://www.engsaat.com/gucci-saat'
    html = fetch_url(main_url)
    if not html:
        print("Failed to fetch Gucci main page!", file=sys.stderr)
        return []
    
    soup = BeautifulSoup(html, 'html.parser')
    cards = soup.select('.product.relative')
    print(f"Found {len(cards)} Gucci product cards.")
    
    gucci_watches = []
    
    for idx, c in enumerate(cards):
        link = c.find('a', href=True)
        if not link:
            continue
        href = link['href']
        if not href.startswith('http'):
            href = 'https://www.engsaat.com' + href
        
        detail_html = fetch_url(href)
        if not detail_html:
            print(f"  Warning: Could not fetch {href}")
            continue
            
        detail_soup = BeautifulSoup(detail_html, 'html.parser')
        
        # Extract jspValue if available
        jsp_match = re.search(r'var jspValue = ({.*?});', detail_html)
        jsp_data = {}
        if jsp_match:
            try:
                jsp_data = json.loads(jsp_match.group(1))
            except Exception:
                pass
                
        # Model Name
        model_name = jsp_data.get('ModelName')
        if not model_name:
            h1 = detail_soup.find('h1')
            model_name = h1.get_text(strip=True) if h1 else link.get('title', '')
        model_name = sanitize_gucci(model_name).strip()
        
        # SKU / Ref
        ref = jsp_data.get('SKU')
        if not ref:
            ref_match = re.search(r'\b(YA\d{6}[A-Za-z0-9]*)\b', model_name + ' ' + href)
            ref = ref_match.group(1) if ref_match else f"GC-{idx+1:03d}"
            
        # Price
        orig_price = 0
        if jsp_data.get('Price'):
            try:
                orig_price = float(jsp_data['Price'])
            except:
                pass
        if orig_price <= 0:
            price_matches = re.findall(r'([\d\.,]+)\s*TL', detail_html)
            for pm in price_matches:
                v = float(pm.replace('.', '').replace(',', '.'))
                if v > 1000:
                    orig_price = v
                    break
        
        if orig_price <= 0:
            print(f"  Warning: Zero price for {href}, skipping!")
            continue
            
        calc_price = round(orig_price * 1.50)
        
        # Image
        img_url = ''
        img_match = re.findall(r'/productimages/\d+/(?:middle|original|big)/[^\"]+\.jpg', detail_html)
        if img_match:
            img_url = 'https://www.engsaat.com' + img_match[0].replace('/middle/', '/original/').replace('/big/', '/original/')
        else:
            img_card = c.find('img')
            if img_card:
                img_src = img_card.get('src') or img_card.get('data-src') or ''
                if img_src and not img_src.startswith('http'):
                    img_src = 'https://www.engsaat.com' + img_src
                img_url = img_src.replace('/middle/', '/original/')
                
        # Description
        details_el = detail_soup.select_one('#Details')
        desc_text = ""
        if details_el:
            p_tags = details_el.find_all(['p', 'h3', 'li'])
            clean_paragraphs = []
            for p in p_tags:
                txt = p.get_text(strip=True)
                txt = sanitize_gucci(txt)
                if txt and len(txt) > 10 and not any(ign in txt.lower() for ign in ['taksit', 'kargo', 'stokta var', 'sepete ekle']):
                    clean_paragraphs.append(txt)
            desc_text = " ".join(clean_paragraphs)
        if not desc_text or len(desc_text) < 20:
            desc_text = f"{model_name} kol saati. Gucci'nin imza tasarım detayları, safir kristal camı ve İsviçre saatçilik ustalığıyla üretilmiştir."
        else:
            desc_text = sanitize_gucci(desc_text)
            
        # Gender
        cat_path = jsp_data.get('CategorPath', '')
        gender = 'Kadın' if 'kadın' in cat_path.lower() or 'kadin' in cat_path.lower() or 'kadın' in model_name.lower() else 'Erkek' if 'erkek' in cat_path.lower() or 'erkek' in model_name.lower() else 'Unisex'
        
        # Specs
        quick_specs = ""
        for span in detail_soup.find_all('span'):
            stxt = span.get_text()
            if 'Kasa Çapı' in stxt or 'Makine Fonksiyonu' in stxt or 'Su Geçirmezlik' in stxt:
                quick_specs = stxt
                break
                
        kasa_capi = ""
        kc_m = re.search(r'Kasa Çapı\s*(?:\(mm\))?\s*:\s*([^\s<]+(?:\s*mm)?)', quick_specs + ' ' + detail_html, re.I)
        if kc_m:
            kasa_capi = kc_m.group(1).strip()
            
        su_gecirmezlik = ""
        sg_m = re.search(r'Su Geçirmezlik\s*:\s*([^\s<]+)', quick_specs + ' ' + detail_html, re.I)
        if sg_m:
            su_gecirmezlik = sg_m.group(1).strip()
            
        mekanizma = "Quartz"
        if "otomatik" in (quick_specs + ' ' + desc_text).lower() or "automatic" in (quick_specs + ' ' + desc_text).lower():
            mekanizma = "Otomatik"
            
        cam = "Safir Kristal"
        
        watch_obj = {
            "id": f"SRC-GUCCI-{ref}",
            "brand": "Gucci",
            "modelName": model_name,
            "ref": ref,
            "reference": ref,
            "originalPrice": int(orig_price),
            "calculatedPrice": int(calc_price),
            "price": f"₺{int(calc_price):,}".replace(',', '.'),
            "seoUrl": f"/saatler/gucci-{slugify(model_name)}-{ref.lower()}",
            "image": img_url,
            "category": "Saat",
            "stock": 0,
            "condition": "Stokta Yok",
            "badge": "Stokta Yok",
            "description": desc_text,
            "gender": gender,
            "sourceUrl": href,
            "sourcePrice": int(orig_price),
            "pricingRule": "SOURCE_X_1_50",
            "sourceVerified": True,
            "mekanizma": mekanizma,
            "kasaCapi": kasa_capi,
            "cam": cam,
            "suGecirmezlik": su_gecirmezlik,
            "stockStatus": "out_of_stock"
        }
        gucci_watches.append(watch_obj)
        time.sleep(0.2)
        
    print(f"Successfully scraped {len(gucci_watches)} Gucci watches.")
    return gucci_watches

def scrape_seiko():
    print(">>> Starting Seiko scraping from aydinsaatstore.com...")
    seiko_watches = []
    seen_urls = set()
    
    for page in [1, 2]:
        cat_url = 'https://www.aydinsaatstore.com/kategori/yeni-gelenler' if page == 1 else f'https://www.aydinsaatstore.com/kategori/yeni-gelenler?tp={page}'
        print(f"Fetching listing page {page}: {cat_url}")
        html = fetch_url(cat_url)
        if not html:
            continue
        soup = BeautifulSoup(html, 'html.parser')
        showcases = soup.select('.showcase')
        print(f"Page {page}: found {len(showcases)} showcases.")
        
        for sc in showcases:
            link = sc.find('a', href=True)
            if not link or '/urun/' not in link['href']:
                continue
            href = link['href']
            if href in seen_urls:
                continue
            seen_urls.add(href)
            
            full_url = 'https://www.aydinsaatstore.com' + href
            detail_html = fetch_url(full_url)
            if not detail_html:
                continue
            detail_soup = BeautifulSoup(detail_html, 'html.parser')
            
            # Title
            h1 = detail_soup.find('h1')
            model_name = h1.get_text(strip=True) if h1 else ''
            if not model_name:
                t_el = sc.select_one('.showcase-title, a.showcase-title')
                model_name = t_el.get_text(strip=True) if t_el else href.split('/')[-1]
            model_name = sanitize_seiko(model_name).strip()
            
            # Ref
            ref_match = re.search(r'\b([A-Z0-9]{5,10})\b', model_name.split()[-1] if model_name else '')
            ref = ref_match.group(1) if ref_match else href.split('/')[-1].replace('seiko-', '').upper()
            
            # Price
            orig_price = 0
            price_new_el = detail_soup.select_one('.showcase-price-new')
            if price_new_el:
                p_text = price_new_el.get_text(strip=True)
                p_val = re.sub(r'[^\d,]', '', p_text).replace(',', '.')
                try:
                    orig_price = float(p_val)
                except:
                    pass
            if orig_price <= 0:
                price_old_el = detail_soup.select_one('.product-price-old, .product-price')
                if price_old_el:
                    p_text = price_old_el.get_text(strip=True)
                    p_val = re.sub(r'[^\d,]', '', p_text).replace(',', '.')
                    try:
                        orig_price = float(p_val)
                    except:
                        pass
            if orig_price <= 0:
                sc_price = sc.get_text()
                p_matches = re.findall(r'([\d\.,]+)\s*(?:TL|₺)', sc_price)
                if p_matches:
                    orig_price = float(p_matches[0].replace('.', '').replace(',', '.'))
                    
            if orig_price <= 0:
                print(f"  Warning: Zero price for {full_url}, skipping!")
                continue
                
            calc_price = round(orig_price * 1.50)
            
            # Filter if under 10.000 TL (Rule 15)
            if calc_price < 10000:
                print(f"  Warning: Under 10k floor ({calc_price} TL) for {full_url}, skipping!")
                continue
                
            # Image
            img_url = ''
            img_el = detail_soup.select_one('.product-images img, [data-selector="product-image"], img[src*="/products/"]')
            if img_el:
                img_src = img_el.get('src') or ''
                if img_src.startswith('//'):
                    img_src = 'https:' + img_src
                img_url = img_src.replace('_min.', '.')
            if not img_url:
                sc_img = sc.find('img')
                if sc_img:
                    data_src = sc_img.get('data-src') or sc_img.get('src') or ''
                    if data_src.startswith('//'):
                        data_src = 'https:' + data_src
                    img_url = data_src.replace('_min.', '.')
                    
            # Description & Specs
            detail_el = detail_soup.select_one('.product-detail')
            desc_text = ""
            if detail_el:
                raw_text = detail_el.get_text('\n', strip=True)
                sanitized_text = sanitize_seiko(raw_text)
                desc_text = sanitized_text.replace('\n', ' ')
                desc_text = re.sub(r'\s+', ' ', desc_text).strip()
                
            if not desc_text or len(desc_text) < 20:
                desc_text = f"{model_name} kol saati. Seiko'nun köklü Japon saatçilik geleneği, üstün mekanik hassasiyeti ve zamansız tasarım estetiğiyle geliştirilmiştir."
            else:
                desc_text = sanitize_seiko(desc_text)
                
            # Gender from breadcrumb
            bc_el = detail_soup.select_one('.breadcrumb')
            bc_text = bc_el.get_text(' ', strip=True) if bc_el else ''
            gender = 'Kadın' if 'kadın' in bc_text.lower() or 'kadin' in model_name.lower() else 'Erkek' if 'erkek' in bc_text.lower() or 'erkek' in model_name.lower() else 'Unisex'
            
            # Specs extraction
            mekanizma = "Otomatik"
            if "solar" in desc_text.lower() or "gps solar" in desc_text.lower():
                mekanizma = "GPS Solar"
            elif "quartz" in desc_text.lower():
                mekanizma = "Quartz"
            elif "otomatik" in desc_text.lower():
                mekanizma = "Otomatik"
                
            kasa_capi = ""
            kc_m = re.search(r'kasa çapı\s*:\s*([\d\.,]+\s*mm)', desc_text, re.I)
            if kc_m:
                kasa_capi = kc_m.group(1).strip()
                
            su_gecirmezlik = ""
            sg_m = re.search(r'su geçirmezlik\s*:\s*([^\s,]+(?:\s*bar|\s*m)?)', desc_text, re.I)
            if sg_m:
                su_gecirmezlik = sg_m.group(1).strip()
                
            cam = "Safir Kristal"
            if "hardlex" in desc_text.lower():
                cam = "Hardlex Cam"
            elif "safir" in desc_text.lower():
                cam = "Safir Kristal"
                
            watch_obj = {
                "id": f"SRC-SEIKO-{ref}",
                "brand": "Seiko",
                "modelName": model_name,
                "ref": ref,
                "reference": ref,
                "originalPrice": int(orig_price),
                "calculatedPrice": int(calc_price),
                "price": f"₺{int(calc_price):,}".replace(',', '.'),
                "seoUrl": f"/saatler/seiko-{slugify(model_name)}-{ref.lower()}",
                "image": img_url,
                "category": "Saat",
                "stock": 0,
                "condition": "Stokta Yok",
                "badge": "Stokta Yok",
                "description": desc_text,
                "gender": gender,
                "sourceUrl": full_url,
                "sourcePrice": int(orig_price),
                "pricingRule": "SOURCE_X_1_50",
                "sourceVerified": True,
                "mekanizma": mekanizma,
                "kasaCapi": kasa_capi,
                "cam": cam,
                "suGecirmezlik": su_gecirmezlik,
                "stockStatus": "out_of_stock"
            }
            seiko_watches.append(watch_obj)
            time.sleep(0.2)
            
    print(f"Successfully scraped {len(seiko_watches)} Seiko watches.")
    return seiko_watches

if __name__ == '__main__':
    gucci = scrape_gucci()
    # Seiko is already scraped in previous run, but we can load or re-scrape
    try:
        with open('scripts/scraped_gucci_seiko.json', 'r', encoding='utf-8') as f:
            prev = json.load(f)
            seiko = prev.get('seiko', [])
            if len(seiko) < 79:
                seiko = scrape_seiko()
            else:
                print(f"Using {len(seiko)} already scraped Seiko watches.")
    except:
        seiko = scrape_seiko()
        
    output = {
        "gucci": gucci,
        "seiko": seiko
    }
    with open('scripts/scraped_gucci_seiko.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"ALL DONE! Saved {len(gucci)} Gucci and {len(seiko)} Seiko watches.")
