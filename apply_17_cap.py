import os
import re

def update_file(filepath, callback):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = callback(content)
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

# 1. elit-saat/page.tsx
def fix_elit(content):
    content = re.sub(r'const MAX_CATALOG_PRICE = 1_799_000;', 'const MAX_CATALOG_PRICE = 1_700_000;', content)
    content = re.sub(r'return NO_CAP_BRANDS\.has\(brand\) \|\| price <= MAX_CATALOG_PRICE;', 'return price <= MAX_CATALOG_PRICE;', content)
    return content
update_file('src/app/elit-saat/page.tsx', fix_elit)

# 2. markalar/[slug]/page.tsx
def fix_markalar(content):
    content = re.sub(r'const MAX_CATALOG_PRICE = 1_799_000;', 'const MAX_CATALOG_PRICE = 1_700_000;', content)
    content = re.sub(r'return NO_CAP_BRANDS\.has\(brand\) \|\| price <= MAX_CATALOG_PRICE;', 'return price <= MAX_CATALOG_PRICE;', content)
    return content
update_file('src/app/markalar/[slug]/page.tsx', fix_markalar)

# 3. sitemaps/brands.xml/route.ts
def fix_sitemaps_brands(content):
    content = re.sub(r'const MAX_CATALOG_PRICE = 1_799_000;', 'const MAX_CATALOG_PRICE = 1_700_000;', content)
    content = re.sub(r'NO_CAP_BRANDS\.has\(w\.brand\) \|\| ', '', content)
    return content
update_file('src/app/sitemaps/brands.xml/route.ts', fix_sitemaps_brands)

# 4. sitemaps/elite.xml/route.ts
def fix_sitemaps_elite(content):
    content = re.sub(r'const MAX_CATALOG_PRICE = 1_799_000;', 'const MAX_CATALOG_PRICE = 1_700_000;', content)
    content = re.sub(r'NO_CAP_BRANDS\.has\(w\.brand\) \|\| ', '', content)
    return content
update_file('src/app/sitemaps/elite.xml/route.ts', fix_sitemaps_elite)

# 5. elit-saat/[slug]/page.tsx
def fix_elit_slug(content):
    if 'MAX_CATALOG_PRICE' not in content:
        # Add filtering here if it exposes > 1.7M
        pass
    return content
# Actually elit-saat/[slug] doesn't list, it just renders. If we filter it out of lists, it's enough. 
# But let's check Navbar!

def fix_navbar(content):
    if 'const MAX_CATALOG_PRICE' not in content:
        content = content.replace(
            'const allWatches = [...saatlerData, ...elitSaatlerData];',
            'const MAX_CATALOG_PRICE = 1_700_000;\nconst allWatches = [...saatlerData, ...elitSaatlerData].filter(w => Number(w.calculatedPrice || 0) <= MAX_CATALOG_PRICE);'
        )
    return content
update_file('src/components/layout/Navbar.tsx', fix_navbar)

# 6. AGENTS.md
def fix_agents(content):
    content = re.sub(r'Rolex ve Cartier için 1\.799\.000 TL katalog tavanı uygulanmaz;', '1.700.000 TL katalog tavanı TÜM markalar için kesindir (Rolex ve Cartier DAHİL);', content)
    content = re.sub(r'Bu grupta 1\.799\.000 TL katalog tavanı korunur\.', 'Tüm sitede 1.700.000 TL tavan kuralı korunur.', content)
    return content
update_file('AGENTS.md', fix_agents)

