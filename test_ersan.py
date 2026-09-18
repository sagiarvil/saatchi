import urllib.request
import re

req = urllib.request.Request(
    'https://ersandiamonds.com/koleksiyon?brand=rolex',
    headers={'User-Agent': 'Mozilla/5.0'}
)
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        # Extract model names and images
        # Looking for common patterns like <img src="..." alt="...">
        # or maybe we can just dump a snippet to see the structure
        with open('ersan.html', 'w') as f:
            f.write(html)
        print("Fetched ersan.html successfully.")
except Exception as e:
    print(f"Error: {e}")
