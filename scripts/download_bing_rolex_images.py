#!/usr/bin/env python3
import os
import io
import re
import time
import hashlib
import urllib.request
import urllib.parse
from PIL import Image

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
}

TARGET_DIR = os.path.join(os.getcwd(), 'public/images/products/elite')
os.makedirs(TARGET_DIR, exist_ok=True)

MODELS = [
    {
        "id": "5001",
        "filename": "rolex-126610ln-5001.jpg",
        "query": "Rolex Submariner Date 126610LN black dial ceramic bezel isolated white background watch"
    },
    {
        "id": "5004",
        "filename": "rolex-126710blnr-5004.jpg",
        "query": "Rolex GMT Master II 126710BLNR Batman oyster bracelet isolated white background watch"
    },
    {
        "id": "5212",
        "filename": "rolex-126710blnr-0002-5212.jpg",
        "query": "Rolex GMT Master II 126710BLNR Batgirl jubilee bracelet isolated white background watch"
    },
    {
        "id": "5005",
        "filename": "rolex-126720vtnr-5005.jpg",
        "query": "Rolex GMT Master II 126720VTNR Sprite left hand green black isolated white background watch"
    },
    {
        "id": "5215",
        "filename": "rolex-126710grnr-5215.jpg",
        "query": "Rolex GMT Master II 126710GRNR Bruce Wayne black grey jubilee isolated white background watch"
    },
    {
        "id": "5006",
        "filename": "rolex-126334-0002-5006.jpg",
        "query": "Rolex Datejust 41 126334 bright blue dial fluted bezel jubilee isolated white background watch"
    },
    {
        "id": "5007",
        "filename": "rolex-126334-0014-5007.jpg",
        "query": "Rolex Datejust 41 126334 Wimbledon slate green roman dial jubilee isolated white background watch"
    },
    {
        "id": "5218",
        "filename": "rolex-126334-0028-5218.jpg",
        "query": "Rolex Datejust 41 126334 mint green dial fluted bezel jubilee isolated white background watch"
    },
    {
        "id": "5219",
        "filename": "rolex-126334-0004-5219.jpg",
        "query": "Rolex Datejust 41 126334 rhodium slate grey dial fluted jubilee isolated white background watch"
    },
    {
        "id": "5220",
        "filename": "rolex-126300-0001-5220.jpg",
        "query": "Rolex Datejust 41 126300 smooth bezel bright blue dial oyster isolated white background watch"
    },
    {
        "id": "5008",
        "filename": "rolex-126234-0050-5008.jpg",
        "query": "Rolex Datejust 36 126234 palm motif green dial fluted jubilee isolated white background watch"
    },
    {
        "id": "5223",
        "filename": "rolex-126234-0051-5223.jpg",
        "query": "Rolex Datejust 36 126234 fluted motif bright blue dial jubilee isolated white background watch"
    },
    {
        "id": "5224",
        "filename": "rolex-126234-0045-5224.jpg",
        "query": "Rolex Datejust 36 126234 pink dial diamond markers jubilee isolated white background watch"
    },
    {
        "id": "5225",
        "filename": "rolex-126200-0020-5225.jpg",
        "query": "Rolex Datejust 36 126200 smooth bezel mint green dial oyster isolated white background watch"
    },
    {
        "id": "5011",
        "filename": "rolex-124060-5011.jpg",
        "query": "Rolex Submariner No Date 124060 oystersteel 41mm isolated white background watch"
    },
    {
        "id": "5012",
        "filename": "rolex-126610lv-5012.jpg",
        "query": "Rolex Submariner Date 126610LV Kermit Starbucks green bezel isolated white background watch"
    },
    {
        "id": "5014",
        "filename": "rolex-124270-5014.jpg",
        "query": "Rolex Explorer 36 124270 black dial oystersteel 36mm isolated white background watch"
    },
    {
        "id": "5236",
        "filename": "rolex-224270-5236.jpg",
        "query": "Rolex Explorer 40 224270 black dial oystersteel 40mm isolated white background watch"
    },
    {
        "id": "5015",
        "filename": "rolex-226570-0001-5015.jpg",
        "query": "Rolex Explorer II 226570 polar white dial orange gmt hand isolated white background watch"
    },
    {
        "id": "5237",
        "filename": "rolex-226570-0002-5237.jpg",
        "query": "Rolex Explorer II 226570 black dial orange gmt hand isolated white background watch"
    },
    {
        "id": "5020",
        "filename": "rolex-126600-5020.jpg",
        "query": "Rolex Sea Dweller 43mm 126600 red lettering black dial isolated white background watch"
    },
    {
        "id": "5018",
        "filename": "rolex-124300-0006-5018.jpg",
        "query": "Rolex Oyster Perpetual 41 124300 turquoise tiffany blue dial isolated white background watch"
    },
    {
        "id": "5231",
        "filename": "rolex-124300-0005-5231.jpg",
        "query": "Rolex Oyster Perpetual 41 124300 green dial oystersteel isolated white background watch"
    },
    {
        "id": "5232",
        "filename": "rolex-124300-0003-5232.jpg",
        "query": "Rolex Oyster Perpetual 41 124300 bright blue dial oystersteel isolated white background watch"
    },
    {
        "id": "5233",
        "filename": "rolex-124300-0001-5233.jpg",
        "query": "Rolex Oyster Perpetual 41 124300 silver dial gold hands isolated white background watch"
    },
    {
        "id": "5019",
        "filename": "rolex-126000-0014-5019.jpg",
        "query": "Rolex Oyster Perpetual 36 126000 bright black dial 36mm isolated white background watch"
    },
    {
        "id": "5234",
        "filename": "rolex-126000-0007-5234.jpg",
        "query": "Rolex Oyster Perpetual 36 126000 turquoise blue dial 36mm isolated white background watch"
    },
    {
        "id": "5235",
        "filename": "rolex-126000-0005-5235.jpg",
        "query": "Rolex Oyster Perpetual 36 126000 candy pink dial 36mm isolated white background watch"
    },
    {
        "id": "5245",
        "filename": "rolex-126900-5245.jpg",
        "query": "Rolex Air King 40 126900 crown guards black dial isolated white background watch"
    },
    {
        "id": "5238",
        "filename": "rolex-126622-0001-5238.jpg",
        "query": "Rolex Yacht Master 40 126622 rhodium slate dial blue second hand isolated white background watch"
    },
    {
        "id": "5239",
        "filename": "rolex-126622-0002-5239.jpg",
        "query": "Rolex Yacht Master 40 126622 bright blue dial red second hand isolated white background watch"
    }
]

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
        if w < 350 or h < 350:
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

def main():
    print("=" * 60)
    print("SAATCHI ROLEX 31 BENZERSİZ BİNG GÖRSEL MOTORU BAŞLADI")
    print("=" * 60)
    
    saved_hashes = set()
    success_count = 0
    
    for idx, item in enumerate(MODELS, 1):
        m_id = item["id"]
        filename = item["filename"]
        query = item["query"]
        target_path = os.path.join(TARGET_DIR, filename)
        
        print(f"\n[{idx}/31] ID: {m_id} | Dosya: {filename}")
        print(f"  Sorgu: {query}")
        
        murls = []
        try:
            murls = search_bing_images(query)
            print(f"  Bulunan aday görsel: {len(murls)}")
        except Exception as e:
            print(f"  Bing arama hatası: {e}")
        
        saved = False
        for url in murls[:15]:
            if any(bad in url.lower() for bad in ['jomashop.com', 'placeholder', 'logo', 'banner', 'icon']):
                continue
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=6) as res:
                    raw_data = res.read()
                
                processed_data = process_and_standardize_image(raw_data)
                if not processed_data:
                    continue
                
                h = hashlib.md5(processed_data).hexdigest()
                if h in saved_hashes:
                    print(f"  Hash çakışması ({h[:8]}), diğer aday...")
                    continue
                
                with open(target_path, 'wb') as fp:
                    fp.write(processed_data)
                
                saved_hashes.add(h)
                saved = True
                print(f"  -> BAŞARILI! URL: {url[:55]}... ({len(processed_data)} bayt, Hash: {h[:8]})")
                success_count += 1
                break
            except Exception:
                continue
            time.sleep(0.2)
        
        if not saved:
            print(f"  !! DİKKAT: {filename} kaydedilemedi!")
        
        time.sleep(0.8)

    print("\n" + "=" * 60)
    print(f"BİTTİ: 31 modelden {success_count} adedi başarıyla benzersiz kaydedildi.")
    print(f"Benzersiz hash sayısı: {len(saved_hashes)}")
    print("=" * 60)

if __name__ == '__main__':
    main()
