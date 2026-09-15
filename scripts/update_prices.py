#!/usr/bin/env python3
import json
import os

# YENİ GÜMRÜK YASASI VE SAATCHI KURALI:
# Chrono24 USD Ref * 2.50 (+%150 Gümrük/Kâr Marjı)

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
        # Yeni Kural: +%150 (x 2.5)
        new_calc_price = int(orig_price * 2.5)
        watch['calculatedPrice'] = new_calc_price
        
        # TL Format: ₺954.352
        formatted_str = f"₺{new_calc_price:,}".replace(',', '.')
        watch['price'] = formatted_str
        updated += 1

    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(watches, f, ensure_ascii=False, indent=2)

    print(f"✅ {updated} saatin fiyatı YENİ GÜMRÜK YASASI (%150 kâr/gümrük marjı - x2.5) ile güncellendi.")

if __name__ == '__main__':
    update_prices()
