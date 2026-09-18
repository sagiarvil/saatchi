import re
with open('src/app/sitemaps/brands.xml/route.ts', 'r') as f: c = f.read()
c = c.replace('MAX_CATALOG_PRICE = 1799000', 'MAX_CATALOG_PRICE = 1700000')
with open('src/app/sitemaps/brands.xml/route.ts', 'w') as f: f.write(c)

with open('src/app/sitemaps/elite.xml/route.ts', 'r') as f: c = f.read()
c = c.replace('MAX_CATALOG_PRICE = 1799000', 'MAX_CATALOG_PRICE = 1700000')
with open('src/app/sitemaps/elite.xml/route.ts', 'w') as f: f.write(c)
