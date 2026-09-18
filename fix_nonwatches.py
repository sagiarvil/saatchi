import json

def is_watch(text: str) -> bool:
    if not text: return True
    text = str(text).lower()
    blacklist = ["kalem", "kolye", "bileklik", "cüzdan", "gözlük", "parfüm", "çanta", "küpe", "yüzük", "mücevher", "anahtarlık", "kol düğmesi", "kravat", "kemer", "şapka", "atkı", "şal", "bere", "eldiven", "cufflinks", "pen ", " pen", "-pen-", "necklace", "bracelet", "wallet", "sunglass", "perfume", "bag", "earring", "ring", "jewelry", "keychain", "tie", "belt", "hat", "scarf", "beanie", "glove"]
    for w in blacklist:
        if w in text: return False
    return True

with open("src/data/saatler.json", "r", encoding="utf-8") as f:
    watches = json.load(f)

clean = []
for w in watches:
    name = w.get("modelName", "")
    sku = w.get("ref", "")
    url = w.get("seoUrl", "")
    if is_watch(name) and is_watch(sku) and is_watch(url):
        clean.append(w)

with open("src/data/saatler.json", "w", encoding="utf-8") as f:
    json.dump(clean, f, ensure_ascii=False, indent=2)

print(f"Removed {len(watches) - len(clean)} items.")
