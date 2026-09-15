import json
import urllib.parse
import re

files = ['src/data/elit-saatler.json', 'src/data/saatler.json']

def optimize_image_url(url):
    if not url:
        return url
        
    # Extract the query 'q=' if it exists
    match = re.search(r'q=([^&]+)', url)
    if match:
        query = match.group(1)
        # Create a direct Bing high-res thumbnail URL
        # Using 4K dimension request (w=3840&h=3840) - Bing will return the max available up to this limit
        # c=7 is crop/quality, fm=webp for compression
        return f"https://tse1.mm.bing.net/th?q={query}&w=2000&h=2000&c=7&rs=1&p=0&dpr=2"
    
    # For Richard Mille / Panerai ones I just added, they had direct TSE URLs with w=400&h=400
    if 'w=400&h=400' in url:
        return url.replace('w=400&h=400', 'w=2000&h=2000')
        
    return url

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        for item in data:
            if 'image' in item:
                item['image'] = optimize_image_url(item['image'])
                
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        print(f"Fixed images in {file_path}")
    except Exception as e:
        print(f"Skipped {file_path}: {e}")

