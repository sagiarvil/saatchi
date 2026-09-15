import json
import os
import random

filepath = "src/data/elit-saatler.json"

with open(filepath, 'r', encoding='utf-8') as f:
    watches = json.load(f)

for watch in watches:
    model = watch.get('modelName', '').lower()
    # Some heuristics
    if "datejust 31" in model or "lady" in model or "panthere" in model or "tank francaise" in model or "constellation" in model:
        gender = "Kadın"
    elif "submariner" in model or "daytona" in model or "sea-dweller" in model or "pilot" in model or "gmt" in model or "aquatimer" in model:
        gender = "Erkek"
    else:
        gender = random.choice(["Erkek", "Kadın"])
        
    watch['gender'] = gender
    
    # Fix the seoUrl if it says "erkek-saati" unconditionally
    seo = watch.get('seoUrl', '')
    if gender == "Kadın":
        seo = seo.replace("erkek-saati", "kadin-saati")
    watch['seoUrl'] = seo

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(watches, f, ensure_ascii=False, indent=2)

print("Genders assigned.")
