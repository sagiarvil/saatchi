import json
import time
from duckduckgo_search import DDGS

with open('src/data/elit-saatler.json', 'r', encoding='utf-8') as f:
    watches = json.load(f)

ddgs = DDGS()

for w in watches:
    if w.get('brand') == 'Cartier':
        name = w.get('modelName')
        # Try to find a cartier.com image
        query = f"{name} site:cartier.com/dw/image"
        print(f"Searching for: {name}")
        
        try:
            results = ddgs.images(
                keywords=f"{name} watch",
                max_results=5
            )
            # Find the best image that comes from cartier.com, if possible
            best_img = None
            for r in results:
                url = r.get('image', '')
                # Cartier official images often have transparent backgrounds and high res
                if 'cartier.com' in url or 'ctfassets' in url or 'watchmaster' in url or 'chrono24' in url:
                    if 'cartier.com' in url:
                        best_img = url
                        break
                    if not best_img:
                        best_img = url
            
            if not best_img and results:
                best_img = results[0].get('image')
                
            if best_img:
                print(f"Found image: {best_img}")
                w['image'] = best_img
            else:
                print("No image found.")
        except Exception as e:
            print(f"Error searching {name}: {e}")
            
        time.sleep(1) # sleep to avoid rate limits

with open('src/data/elit-saatler.json', 'w', encoding='utf-8') as f:
    json.dump(watches, f, ensure_ascii=False, indent=2)

print("Finished updating images.")
