import json
import random
import uuid

file_path = 'src/data/elit-saatler.json'

with open(file_path, 'r', encoding='utf-8') as f:
    watches = json.load(f)

# ID for new watches based on length
start_id = len(watches) + 1

new_watches_data = [
    # Richard Mille
    {"brand": "Richard Mille", "modelName": "RM 11-03 Automatic Flyback Chronograph", "usd": 350000, "cat": "Elit Kategori", "img": "https://www.thewatchbox.com/on/demandware.static/-/Sites-watchbox-catalog/default/dw106d34e5/images/watches/Richard%20Mille/RM%2011-03/11-03_RM11-03.png"},
    {"brand": "Richard Mille", "modelName": "RM 35-02 Rafael Nadal Carbon TPT", "usd": 420000, "cat": "Elit Kategori", "img": "https://images.stockx.com/images/Richard-Mille-RM35-02-Rafael-Nadal-Carbon-TPT.png?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1626895315"},
    {"brand": "Richard Mille", "modelName": "RM 65-01 Split-Seconds Chronograph", "usd": 550000, "cat": "Elit Kategori", "img": "https://tse2.mm.bing.net/th?q=Richard+Mille+RM+65-01+png&w=400&h=400&c=7"},
    {"brand": "Richard Mille", "modelName": "RM 055 Bubba Watson White Ceramic", "usd": 310000, "cat": "Elit Kategori", "img": "https://tse3.mm.bing.net/th?q=Richard+Mille+RM+055+White+png&w=400&h=400&c=7"},
    {"brand": "Richard Mille", "modelName": "RM 72-01 Lifestyle In-House Chronograph", "usd": 285000, "cat": "Elit Kategori", "img": "https://tse4.mm.bing.net/th?q=Richard+Mille+RM+72-01+png&w=400&h=400&c=7"},
    
    # Panerai
    {"brand": "Panerai", "modelName": "Luminor Marina 44mm PAM01312", "usd": 8500, "cat": "Lüks Erkek", "img": "https://tse1.mm.bing.net/th?q=Panerai+Luminor+Marina+png&w=400&h=400&c=7"},
    {"brand": "Panerai", "modelName": "Submersible 42mm PAM00683", "usd": 10200, "cat": "Lüks Erkek", "img": "https://tse2.mm.bing.net/th?q=Panerai+Submersible+png&w=400&h=400&c=7"},
    {"brand": "Panerai", "modelName": "Radiomir 8 Days PAM00992", "usd": 9100, "cat": "Lüks Erkek", "img": "https://tse3.mm.bing.net/th?q=Panerai+Radiomir+png&w=400&h=400&c=7"},
    {"brand": "Panerai", "modelName": "Luminor Due 38mm PAM01273", "usd": 6800, "cat": "Lüks Kadın", "img": "https://tse4.mm.bing.net/th?q=Panerai+Luminor+Due+png&w=400&h=400&c=7"},
    {"brand": "Panerai", "modelName": "Luminor Chrono PAM01109", "usd": 9800, "cat": "Lüks Erkek", "img": "https://tse1.mm.bing.net/th?q=Panerai+Luminor+Chrono+png&w=400&h=400&c=7"},

    # Longines
    {"brand": "Longines", "modelName": "Master Collection Moonphase", "usd": 2800, "cat": "Lüks Erkek", "img": "https://tse2.mm.bing.net/th?q=Longines+Master+Collection+Moonphase+png&w=400&h=400&c=7"},
    {"brand": "Longines", "modelName": "HydroConquest Ceramic Bezel", "usd": 1950, "cat": "Lüks Erkek", "img": "https://tse3.mm.bing.net/th?q=Longines+HydroConquest+png&w=400&h=400&c=7"},
    {"brand": "Longines", "modelName": "Spirit Zulu Time GMT", "usd": 3200, "cat": "Lüks Erkek", "img": "https://tse4.mm.bing.net/th?q=Longines+Spirit+Zulu+Time+png&w=400&h=400&c=7"},
    {"brand": "Longines", "modelName": "DolceVita Steel & Diamonds", "usd": 2100, "cat": "Lüks Kadın", "img": "https://tse1.mm.bing.net/th?q=Longines+DolceVita+png&w=400&h=400&c=7"},
    {"brand": "Longines", "modelName": "Avigation BigEye Titanium", "usd": 3700, "cat": "Lüks Erkek", "img": "https://tse2.mm.bing.net/th?q=Longines+Avigation+BigEye+png&w=400&h=400&c=7"}
]

USD_TO_TL = 34.00

for item in new_watches_data:
    original_tl = int(item['usd'] * USD_TO_TL)
    calc_tl = int(original_tl * 2.5) # 150% markup standard
    slug_name = item['modelName'].lower().replace(' ', '-').replace('/', '-')
    
    watches.append({
        "id": str(start_id),
        "brand": item['brand'],
        "modelName": item['modelName'],
        "originalPrice": original_tl,
        "calculatedPrice": calc_tl,
        "foreignPrice": f"${item['usd']:,}",
        "price": f"₺{calc_tl:,}".replace(',', '.'),
        "seoUrl": f"/elit-saat/{slug_name}-{start_id}",
        "image": item['img'],
        "category": item['cat'],
        "stock": random.randint(1, 3),
        "condition": "Orijinal ve Kutulu (Sıfır Ayarında)",
        "description": ""
    })
    start_id += 1

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(watches, f, ensure_ascii=False, indent=2)

print("Longines, Richard Mille ve Panerai markaları standart 150% gümrük kurallarıyla eklendi.")
