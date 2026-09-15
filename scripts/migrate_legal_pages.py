import os
import glob
import json
import re

BELGIN_DIR = '/Users/macair1/projects/belgin'
SAATCHI_DATA_DIR = 'src/data/legal'
os.makedirs(SAATCHI_DATA_DIR, exist_ok=True)

html_files = glob.glob(os.path.join(BELGIN_DIR, '*.html'))

legal_files = [
    'cerez-politikasi.html', 'garanti-ve-satis-sonrasi.html', 'gizlilik-politikasi.html',
    'guvenli-odeme-ve-3d-secure.html', 'hukuki-delil-ve-kayit-politikasi.html',
    'iade-degisim-cayma.html', 'iade-degisim.html', 'kullanim-kosullari.html',
    'kvkk-acik-riza.html', 'kvkk-aydinlatma-metni.html', 'kvkk-basvuru.html', 'kvkk.html',
    'magaza-teslim-tesellum-formu.html', 'mesafeli-satis-sozlesmesi.html',
    'musteri-tanima-ve-islem-guvenligi.html', 'on-bilgilendirme-formu.html',
    'ticari-elektronik-ileti-onayi.html', 'ticari-elektronik-ileti.html',
    'yuksek-degerli-urun-teslimi.html'
]

legal_data = []

def extract_body(html):
    # Try to find <main> or <body>
    match = re.search(r'<main[^>]*>(.*?)</main>', html, re.IGNORECASE | re.DOTALL)
    if match:
        return match.group(1)
    match = re.search(r'<body[^>]*>(.*?)</body>', html, re.IGNORECASE | re.DOTALL)
    if match:
        return match.group(1)
    return html

for filename in legal_files:
    filepath = os.path.join(BELGIN_DIR, filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    body = extract_body(content)
    
    # Replace Belgin references
    body = re.sub(r'Belgin Kuyumculuk', 'Saatchi Lüks Saatler', body, flags=re.IGNORECASE)
    body = re.sub(r'Belgin', 'Saatchi', body, flags=re.IGNORECASE)
    body = re.sub(r'belginkuyumculuk\.com', 'saatchi.com', body, flags=re.IGNORECASE)
    body = re.sub(r'altın', 'saat', body, flags=re.IGNORECASE)
    body = re.sub(r'kuyumculuk', 'saatçilik', body, flags=re.IGNORECASE)
    body = re.sub(r'mücevherat', 'lüks saat', body, flags=re.IGNORECASE)
    
    slug = filename.replace('.html', '')
    title = slug.replace('-', ' ').title()
    
    # Extract h1 if possible
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', body, re.IGNORECASE)
    if h1_match:
        title = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
        
    legal_data.append({
        'slug': slug,
        'title': title,
        'content': body
    })

with open(os.path.join(SAATCHI_DATA_DIR, 'legal-pages.json'), 'w', encoding='utf-8') as f:
    json.dump(legal_data, f, ensure_ascii=False, indent=2)

print(f"Migrated {len(legal_data)} legal pages.")
