#!/usr/bin/env python3
import json
import os

# DO NOT CHANGE: Master Suite Saatchi pricing mandate
# Chrono24 USD Ref * 1.80 (80% markup)

FILE_PATH = 'src/data/elit-saatler.json'

def update_prices():
    if not os.path.exists(FILE_PATH):
        print(f"File not found: {FILE_PATH}")
        return

    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        watches = json.load(f)

    updated = 0
    for watch in watches:
        orig_price = watch.get('originalPrice', 0)
        # Yeni Kural: +%80 (x 1.8)
        new_calc_price = int(orig_price * 1.8)
        watch['calculatedPrice'] = new_calc_price
        
        # TL Format: ₺954.352
        formatted_str = f"₺{new_calc_price:,}".replace(',', '.')
        watch['price'] = formatted_str
        updated += 1

    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(watches, f, ensure_ascii=False, indent=2)

    print(f"✅ {updated} saatin fiyatı %80 kâr marjı (x1.8) Chrono24 kuralıyla güncellendi.")

if __name__ == '__main__':
    update_prices()
