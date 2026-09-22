#!/usr/bin/env python3
import os
import io
import re
import json
import time
import hashlib
import urllib.request
import urllib.parse
from PIL import Image

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
}

TARGET_DIR = os.path.join(os.getcwd(), 'public/images/products/elite')
os.makedirs(TARGET_DIR, exist_ok=True)

with open('src/data/elit-saatler.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

cartiers = [x for x in data if x.get('brand') == 'Cartier']

def search_bing_images(query):
    url = f'https://www.bing.com/images/search?q={urllib.parse.quote(query)}&form=HDRSC2&first=1'
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as res:
        html = res.read().decode('utf-8', errors='ignore')
    murls = re.findall(r'murl&quot;:&quot;(https?://[^&]+)&quot;', html)
    return murls

def process_and_standardize_image(raw_bytes):
    try:
        img = Image.open(io.BytesIO(raw_bytes))
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            bg = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            bg.paste(img, mask=img.split()[3])
            img = bg
        else:
            img = img.convert('RGB')
        
        w, h = img.size
        if w < 300 or h < 300:
            return None
        
        ratio = w / h
        if ratio < 0.5 or ratio > 2.0:
            return None
        
        target_size = 1000
        canvas = Image.new('RGB', (target_size, target_size), (255, 255, 255))
        
        scale = (target_size * 0.90) / max(w, h)
        new_w = int(w * scale)
        new_h = int(h * scale)
        resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        paste_x = (target_size - new_w) // 2
        paste_y = (target_size - new_h) // 2
        canvas.paste(resized, (paste_x, paste_y))
        
        out_io = io.BytesIO()
        canvas.save(out_io, format='JPEG', quality=90, optimize=True)
        return out_io.getvalue()
    except Exception:
        return None

saved_hashes = set()
updated_count = 0

for idx, c in enumerate(cartiers, 1):
    c_id = c['id']
    m_name = c['modelName']
    current_img = c.get('image', '')
    filename = f"cartier-{c_id}.jpg"
    target_path = os.path.join(TARGET_DIR, filename)
    local_url = f"/images/products/elite/{filename}"
    
    print(f"[{idx}/16] ID: {c_id} | {m_name}")
    
    saved = False
    
    # 1. Eğer Cartier CDN linki ise önce onu dene
    if 'cartier.com' in current_img:
        try:
            req = urllib.request.Request(current_img, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=7) as res:
                raw_data = res.read()
            processed = process_and_standardize_image(raw_data)
            if processed:
                h = hashlib.md5(processed).hexdigest()
                if h not in saved_hashes:
                    with open(target_path, 'wb') as fp:
                        fp.write(processed)
                    saved_hashes.add(h)
                    saved = True
                    print(f"  -> Cartier resmi CDN'den indirildi ({len(processed)} bayt, Hash: {h[:8]})")
        except Exception as e:
            print(f"  Cartier CDN hata: {e}")
    
    # 2. Eğer Jomashop veya başarısız olduysa Bing ile gerçek stüdyo packshot ara
    if not saved:
        query = f"Cartier {m_name} watch isolated white background studio packshot"
        print(f"  Bing ile aranıyor: {query}")
        try:
            murls = search_bing_images(query)
            for url in murls[:10]:
                if any(bad in url.lower() for bad in ['jomashop.com', 'placeholder', 'logo', 'banner']):
                    continue
                try:
                    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req, timeout=6) as res:
                        raw_data = res.read()
                    processed = process_and_standardize_image(raw_data)
                    if not processed:
                        continue
                    h = hashlib.md5(processed).hexdigest()
                    if h in saved_hashes:
                        continue
                    with open(target_path, 'wb') as fp:
                        fp.write(processed)
                    saved_hashes.add(h)
                    saved = True
                    print(f"  -> Bing'den başarıyla indirildi: {url[:50]}... (Hash: {h[:8]})")
                    break
                except Exception:
                    continue
        except Exception as e:
            print(f"  Bing hata: {e}")
    
    if saved:
        # JSON'da güncelle
        c['image'] = local_url
        updated_count += 1
    else:
        print(f"  !! HATA: {c_id} için görsel kaydedilemedi!")
    
    time.sleep(0.5)

# Güncellenmiş veriyi kaydet
with open('src/data/elit-saatler.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("\n" + "=" * 60)
print(f"CARTIER TAMAMLANDI: 16 modelden {updated_count} adedi yerelleştirildi.")
print(f"Benzersiz hash sayısı: {len(saved_hashes)}")
print("=" * 60)
