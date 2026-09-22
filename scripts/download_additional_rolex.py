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

NEW_MODELS = [
    {
        "id": "5250",
        "ref": "126613LB",
        "filename": "rolex-126613lb-5250.jpg",
        "query": "Rolex Submariner 126613LB Bluesy blue dial two tone gold oyster isolated white background watch"
    },
    {
        "id": "5251",
        "ref": "126613LN",
        "filename": "rolex-126613ln-5251.jpg",
        "query": "Rolex Submariner 126613LN black dial two tone gold oyster isolated white background watch"
    },
    {
        "id": "5252",
        "ref": "126711CHNR",
        "filename": "rolex-126711chnr-5252.jpg",
        "query": "Rolex GMT Master II 126711CHNR Root Beer two tone everose oyster isolated white background watch"
    },
    {
        "id": "5253",
        "ref": "116400GV-0002",
        "filename": "rolex-116400gv-0002-5253.jpg",
        "query": "Rolex Milgauss 116400GV Z-Blue dial green sapphire isolated white background watch"
    },
    {
        "id": "5254",
        "ref": "116400GV-0001",
        "filename": "rolex-116400gv-0001-5254.jpg",
        "query": "Rolex Milgauss 116400GV black dial green sapphire orange lightning hand isolated white background watch"
    },
    {
        "id": "5255",
        "ref": "126334-0026",
        "filename": "rolex-126334-0026-5255.jpg",
        "query": "Rolex Datejust 41 126334 white dial roman numerals fluted jubilee isolated white background watch"
    },
    {
        "id": "5256",
        "ref": "126334-0001",
        "filename": "rolex-126334-0001-5256.jpg",
        "query": "Rolex Datejust 41 126334 bright black dial fluted bezel jubilee isolated white background watch"
    },
    {
        "id": "5257",
        "ref": "126300-0013",
        "filename": "rolex-126300-0013-5257.jpg",
        "query": "Rolex Datejust 41 126300 smooth bezel slate rhodium grey dial oyster isolated white background watch"
    },
    {
        "id": "5258",
        "ref": "126300-0011",
        "filename": "rolex-126300-0011-5258.jpg",
        "query": "Rolex Datejust 41 126300 smooth bezel bright black dial oyster isolated white background watch"
    },
    {
        "id": "5259",
        "ref": "126234-0015",
        "filename": "rolex-126234-0015-5259.jpg",
        "query": "Rolex Datejust 36 126234 silver dial fluted bezel jubilee isolated white background watch"
    },
    {
        "id": "5260",
        "ref": "126234-0017",
        "filename": "rolex-126234-0017-5260.jpg",
        "query": "Rolex Datejust 36 126234 bright black dial fluted bezel jubilee isolated white background watch"
    },
    {
        "id": "5261",
        "ref": "126234-0025",
        "filename": "rolex-126234-0025-5261.jpg",
        "query": "Rolex Datejust 36 126234 white dial roman fluted jubilee isolated white background watch"
    },
    {
        "id": "5262",
        "ref": "126200-0005",
        "filename": "rolex-126200-0005-5262.jpg",
        "query": "Rolex Datejust 36 126200 smooth bezel bright blue dial oyster isolated white background watch"
    },
    {
        "id": "5263",
        "ref": "126200-0002",
        "filename": "rolex-126200-0002-5263.jpg",
        "query": "Rolex Datejust 36 126200 smooth bezel bright black dial oyster isolated white background watch"
    },
    {
        "id": "5264",
        "ref": "278274-0018",
        "filename": "rolex-278274-0018-5264.jpg",
        "query": "Rolex Datejust 31 278274 aubergine purple dial diamonds fluted jubilee isolated white background watch"
    },
    {
        "id": "5265",
        "ref": "124200-0001",
        "filename": "rolex-124200-0001-5265.jpg",
        "query": "Rolex Oyster Perpetual 34 124200 silver dial oystersteel isolated white background watch"
    },
    {
        "id": "5266",
        "ref": "277200-0007",
        "filename": "rolex-277200-0007-5266.jpg",
        "query": "Rolex Oyster Perpetual 31 277200 turquoise tiffany blue dial oyster isolated white background watch"
    },
    {
        "id": "5267",
        "ref": "277200-0005",
        "filename": "rolex-277200-0005-5267.jpg",
        "query": "Rolex Oyster Perpetual 31 277200 candy pink dial oystersteel isolated white background watch"
    },
    {
        "id": "5268",
        "ref": "277200-0004",
        "filename": "rolex-277200-0004-5268.jpg",
        "query": "Rolex Oyster Perpetual 31 277200 green dial oystersteel isolated white background watch"
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

# Mevcut tüm görsellerin hash'lerini oku ki ASLA eskilerle çakışmasın
existing_hashes = set()
for f in os.listdir(TARGET_DIR):
    p = os.path.join(TARGET_DIR, f)
    if os.path.isfile(p) and f.endswith(('.jpg', '.png', '.webp')):
        with open(p, 'rb') as fp:
            existing_hashes.add(hashlib.md5(fp.read()).hexdigest())

print(f"Mevcut sistemdeki benzersiz görsel hash sayısı: {len(existing_hashes)}")

success_count = 0
for idx, item in enumerate(NEW_MODELS, 1):
    m_id = item["id"]
    filename = item["filename"]
    query = item["query"]
    target_path = os.path.join(TARGET_DIR, filename)
    
    print(f"\n[{idx}/19] ID: {m_id} | {filename}")
    print(f"  Sorgu: {query}")
    
    murls = search_bing_images(query)
    saved = False
    for url in murls[:12]:
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
            if h in existing_hashes:
                print(f"  Hash çakışması ({h[:8]}), diğer aday...")
                continue
            with open(target_path, 'wb') as fp:
                fp.write(processed)
            existing_hashes.add(h)
            saved = True
            print(f"  -> BAŞARILI! URL: {url[:50]}... ({len(processed)} bayt, Hash: {h[:8]})")
            success_count += 1
            break
        except Exception:
            continue
        time.sleep(0.2)
    
    if not saved:
        print(f"  !! DİKKAT: {filename} kaydedilemedi!")
    time.sleep(0.8)

print("\n" + "=" * 60)
print(f"19 YENİ ROLEX'TEN {success_count} ADEDİ BAŞARIYLA İNDİRİLDİ!")
print(f"TOPLAM BENZERSİZ HASH: {len(existing_hashes)}")
print("=" * 60)
