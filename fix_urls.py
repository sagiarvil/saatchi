import json

with open('src/data/elit-saatler.json', 'r', encoding='utf-8') as f:
    watches = json.load(f)

for w in watches:
    if w.get('brand') == 'Cartier':
        img = w.get('image')
        if img:
            # clean up messy params
            base = img.split('?')[0]
            w['image'] = f"{base}?sw=750&sh=750&sm=fit&sfrm=png"

with open('src/data/elit-saatler.json', 'w', encoding='utf-8') as f:
    json.dump(watches, f, ensure_ascii=False, indent=2)

print("Fixed URLs")
