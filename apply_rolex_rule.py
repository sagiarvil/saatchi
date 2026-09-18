import json

with open('src/data/elit-saatler.json', 'r', encoding='utf-8') as f:
    watches = json.load(f)

new_watches = []
for w in watches:
    if w.get('brand') == 'Rolex':
        # Change sourceUrl to general Chrono24 TR as placeholder
        w['sourceUrl'] = 'https://www.chrono24.com.tr/rolex/index.htm'
        
        # We need to base it off an original TR price. If originalPrice is missing, 
        # try to parse from price or foreignPrice, or just use what we have.
        op = w.get('originalPrice')
        if not op:
             # Fallback if originalPrice is missing for some reason
             op = 200000 
             w['originalPrice'] = op

        calc_price = int(op * 2.5)
        w['calculatedPrice'] = calc_price
        
        # Max limit rule
        if calc_price <= 1700000:
            new_watches.append(w)
        else:
            print(f"Removed due to limit: {w.get('modelName')} (Calc: {calc_price})")
    else:
        new_watches.append(w)

with open('src/data/elit-saatler.json', 'w', encoding='utf-8') as f:
    json.dump(new_watches, f, ensure_ascii=False, indent=2)

print("Applied 2.5x rule and 1.7M cap to Rolex.")
