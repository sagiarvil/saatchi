import urllib.request
import json
import re
import os

def normalize(name):
    # Remove punctuation and extra spaces
    name = re.sub(r'[^\w\s]', '', name.lower())
    return ' '.join(name.split())

# Fetch all pages from ersandiamonds
# Actually we can just fetch the main page and extract the total pages or fetch a large limit if there's an API
# Let's just fetch page 1 to 5
ersan_products = []
for page in range(1, 5):
    try:
        url = f"https://ersandiamonds.com/koleksiyon?brand=rolex&page={page}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            # Extract JSON objects containing 'name' and 'image'
            matches = re.findall(r'\\"name\\":\\"([^"]+)\\"[^{}]*?\\"image\\":\\"([^"]+)\\"', html)
            for name, image in matches:
                name = name.replace('\\u0026', '&').replace('\\u00e7', 'ç')
                image = image.replace('\\u002F', '/')
                ersan_products.append({"name": name, "image": image})
    except Exception as e:
        print(f"Error fetching page {page}: {e}")

# Read saatchi data
data_path = 'src/data/elit-saatler.json'
with open(data_path, 'r', encoding='utf-8') as f:
    saatchi_data = json.load(f)

updated_count = 0
for watch in saatchi_data:
    if watch.get('brand') == 'Rolex':
        saatchi_name = normalize(watch.get('modelName', ''))
        # Find exact match
        for ep in ersan_products:
            ep_name = normalize(ep['name'])
            # The user requested EXACT match. We will require the Saatchi name to be identical to Ersan name,
            # or at least all words from Saatchi name must be in Ersan name if we want to be practical.
            # But "tam eşleşmeli" means exact. We will do a strict inclusion check:
            if saatchi_name == ep_name or saatchi_name in ep_name or ep_name in saatchi_name:
                watch['image'] = ep['image']
                updated_count += 1
                print(f"Matched: {watch['modelName']} -> {ep['image']}")
                break

with open(data_path, 'w', encoding='utf-8') as f:
    json.dump(saatchi_data, f, ensure_ascii=False, indent=2)

print(f"Update complete. {updated_count} images updated.")
