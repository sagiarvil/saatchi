import json

file_path = 'src/data/elit-saatler.json'

with open(file_path, 'r', encoding='utf-8') as f:
    watches = json.load(f)

for watch in watches:
    orig_price = watch.get('originalPrice', 0)
    # Yeni kural: +%150 -> x 2.5
    new_calc_price = int(orig_price * 2.5)
    watch['calculatedPrice'] = new_calc_price
    
    # Format to TR currency string like ₺954.352
    formatted_str = f"₺{new_calc_price:,}".replace(',', '.')
    watch['price'] = formatted_str

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(watches, f, ensure_ascii=False, indent=2)

print("Tüm fiyatlar %150 kar/gümrük marjı ile (x2.5) güncellendi.")
