import json
import time
import urllib.parse
from curl_cffi import requests
from bs4 import BeautifulSoup
import random
import concurrent.futures

def get_yahoo_image(brand, model_name):
    query = f"{brand} {model_name} watch isolated white background"
    url = f"https://images.search.yahoo.com/search/images?p={urllib.parse.quote(query)}"
    try:
        r = requests.get(url, impersonate="chrome110", timeout=5)
        soup = BeautifulSoup(r.text, 'html.parser')
        
        imgs = soup.select("img")
        for img in imgs[1:]:
            src = img.get("data-src") or img.get("src")
            # Yahoo image proxies usually have 'yimg.com'
            if src and "yimg.com/fz/api" in src:
                # the images might be small thumbnails (w=96). 
                # Let's try to remove the w=96;h=96 part or replace it with a larger size
                # src is like ...;h=96;w=96/...
                src = src.replace('h=96', 'h=600').replace('w=96', 'w=600')
                return src
    except Exception as e:
        pass
    return ""

def enrich_file(filepath):
    print(f"Enriching {filepath}...", flush=True)
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    updated = 0
    def process_item(args):
        i, item = args
        if not item.get("image"):
            img = get_yahoo_image(item.get("brand", ""), item.get("modelName", ""))
            return i, img
        return i, None

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        results = executor.map(process_item, enumerate(data))
        
        for i, img in results:
            if img:
                data[i]["image"] = img
                updated += 1
                print(f"[{i+1}/{len(data)}] Found: {data[i]['modelName']}", flush=True)
            else:
                print(f"[{i+1}/{len(data)}] Failed: {data[i]['modelName']}", flush=True)

    if updated > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Saved {filepath} with {updated} new images.", flush=True)

enrich_file("src/data/elit-saatler.json")
