import urllib.request
import json
import re
import os

def normalize(name):
    # Remove punctuation and extra spaces
    name = re.sub(r'[^\w\s]', '', name.lower())
    return ' '.join(name.split())

def fetch_ersan_products(brand_slug):
    ersan_products = []
    for page in range(1, 5):
        try:
            url = f"https://ersandiamonds.com/koleksiyon?brand={brand_slug}&page={page}"
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                html = response.read().decode('utf-8')
                matches = re.findall(r'\\"name\\":\\"([^"]+)\\"[^{}]*?\\"image\\":\\"([^"]+)\\"', html)
                for name, image in matches:
                    name = name.replace('\\u0026', '&').replace('\\u00e7', 'ç')
                    image = image.replace('\\u002F', '/')
                    ersan_products.append({"name": name, "image": image})
        except Exception as e:
            pass
    return ersan_products

# Fetch Ersan catalogs
ersan_rolex = fetch_ersan_products('rolex')
ersan_cartier = fetch_ersan_products('cartier')

# Read saatchi data
data_path = 'src/data/elit-saatler.json'
with open(data_path, 'r', encoding='utf-8') as f:
    saatchi_data = json.load(f)

updated_count = 0
for watch in saatchi_data:
    brand = watch.get('brand')
    if brand in ['Rolex', 'Cartier']:
        saatchi_name = normalize(watch.get('modelName', ''))
        
        ersan_products = ersan_rolex if brand == 'Rolex' else ersan_cartier
        
        # Find exact match
        for ep in ersan_products:
            ep_name = normalize(ep['name'])
            # The user requested EXACT match. Strict inclusion check:
            if saatchi_name == ep_name or saatchi_name in ep_name or ep_name in saatchi_name:
                watch['image'] = ep['image']
                updated_count += 1
                break

with open(data_path, 'w', encoding='utf-8') as f:
    json.dump(saatchi_data, f, ensure_ascii=False, indent=2)

print(f"Update complete. {updated_count} images updated.")
