import json
import re
import os
import random
from curl_cffi import requests
from bs4 import BeautifulSoup

def fetch_currency():
    rates = {"USD": 34.0, "EUR": 37.0}
    try:
        r = requests.get("https://kur.doviz.com/serbest-piyasa/amerikan-dolari", impersonate="chrome110")
        soup = BeautifulSoup(r.text, "html.parser")
        usd = soup.select_one(".color-up") or soup.select_one(".color-down") or soup.select_one(".text-xl")
        if usd: rates["USD"] = float(usd.text.replace(',', '.'))
        
        r = requests.get("https://kur.doviz.com/serbest-piyasa/euro", impersonate="chrome110")
        soup = BeautifulSoup(r.text, "html.parser")
        eur = soup.select_one(".color-up") or soup.select_one(".color-down") or soup.select_one(".text-xl")
        if eur: rates["EUR"] = float(eur.text.replace(',', '.'))
    except:
        pass
    return rates

def generate_seo_slug(title, index):
    base = f"{title} Elit Kategori Luks Erkek Saati {index}"
    replacements = {'ı':'i', 'ğ':'g', 'ü':'u', 'ş':'s', 'ö':'o', 'ç':'c'}
    for k, v in replacements.items():
        base = base.replace(k, v)
    base = base.lower()
    base = re.sub(r'[^a-z0-9\s-]', '', base)
    base = re.sub(r'[\s-]+', '-', base).strip('-')
    return base

brands = {
    "Rolex": ["Submariner Date", "Daytona", "GMT-Master II", "Datejust 41", "Oyster Perpetual", "Sky-Dweller", "Sea-Dweller", "Yacht-Master", "Explorer", "Milgauss"],
    "Omega": ["Speedmaster Professional Moonwatch", "Seamaster Diver 300M", "Aqua Terra", "Planet Ocean", "Constellation", "De Ville", "Speedmaster '57", "Seamaster 300"],
    "Patek Philippe": ["Nautilus 5711", "Aquanaut", "Calatrava", "Complications", "Grand Complications", "Golden Ellipse"],
    "Cartier": ["Santos de Cartier", "Tank Must", "Ballon Bleu", "Panthere", "Pasha de Cartier", "Drive de Cartier", "Tank Francaise"],
    "TAG Heuer": ["Carrera", "Monaco", "Aquaracer", "Formula 1", "Autavia", "Link"],
    "IWC": ["Pilot's Watch Chronograph", "Portugieser", "Portofino", "Aquatimer", "Ingenieur", "Da Vinci"],
    "Hublot": ["Big Bang", "Classic Fusion", "Spirit of Big Bang", "King Power"]
}

colors = ["Siyah Kadran", "Mavi Kadran", "Beyaz Kadran", "Yeşil Kadran", "Gümüş Kadran", "Altın Detaylı", "Rose Gold", "Çelik", "Titanyum"]
conditions = ["Sıfır", "İkinci El (Mükemmel Durumda)", "Kutusuz (Sertifikalı)"]

rates = fetch_currency()
watches = []
id_counter = 1

for brand, models in brands.items():
    # 50 models per brand
    for i in range(50):
        model_name = models[i % len(models)]
        color = colors[i % len(colors)]
        title = f"{brand} {model_name} {color}"
        
        # Patek is very expensive
        base_price_usd = random.randint(15000, 150000) if brand == "Patek Philippe" else random.randint(5000, 45000)
        
        base_price_tl = base_price_usd * rates["USD"]
        # EXACT 80% markup
        markup_price_tl = int(base_price_tl * 1.80)
        
        formatted_price = f"₺{markup_price_tl:,}".replace(',', '.')
        slug = generate_seo_slug(title, id_counter)
        
        watches.append({
            "id": str(id_counter),
            "brand": brand,
            "modelName": title,
            "originalPrice": base_price_tl,
            "calculatedPrice": markup_price_tl,
            "foreignPrice": f"${base_price_usd:,}",
            "price": formatted_price,
            "seoUrl": f"/elit-saat/{slug}",
            "image": "",
            "category": "Elit Kategori",
            "stock": 1,
            "condition": random.choice(conditions),
            "description": f"Özel Sipariş ile yurtdışından {brand} butiklerinden veya Chrono24 referanslı satıcılardan tedarik edilmektedir. VIP teslimat sağlanır."
        })
        id_counter += 1

os.makedirs("/Users/macair1/projects/saatchi/src/data", exist_ok=True)
with open("/Users/macair1/projects/saatchi/src/data/elit-saatler.json", "w", encoding="utf-8") as f:
    json.dump(watches, f, ensure_ascii=False, indent=2)

print(f"Toplam {len(watches)} adet ELIT saat mock (Live Kur ve +%80 Kâr) ile olusturuldu!")
