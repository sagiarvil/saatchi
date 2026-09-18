import json
import urllib.request

with open('src/data/elit-saatler.json', 'r', encoding='utf-8') as f:
    watches = json.load(f)

for i, w in enumerate(watches):
    if w.get('brand') == 'Cartier':
        url = w.get('image')
        if url:
            try:
                urllib.request.urlretrieve(url, f"img_{i}.png")
            except Exception as e:
                print(f"Failed {i}")
print("Done")
