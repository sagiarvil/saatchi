with open('src/app/markalar/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_statement = "import { getProxiedImageUrl } from '@/utils/imageProxy';\nimport CartierFilterClient from '@/components/cartier/CartierFilterClient';"

if "import CartierFilterClient" not in content:
    content = content.replace("import { getProxiedImageUrl } from '@/utils/imageProxy';", import_statement)

cartier_logic = """
        {brandWatches.length === 0 ? (
          <div className="text-center text-foreground/50 py-20">Bu marka için kaynak fiyatı doğrulanmış aktif model bulunamadı.</div>
        ) : slug === 'cartier' ? (
          <div className="mt-8">
            <CartierFilterClient initialWatches={brandWatches} />
          </div>
        ) : (
"""

if "slug === 'cartier' ?" not in content:
    content = content.replace("""
        {brandWatches.length === 0 ? (
          <div className="text-center text-foreground/50 py-20">Bu marka için kaynak fiyatı doğrulanmış aktif model bulunamadı.</div>
        ) : (""", cartier_logic)

with open('src/app/markalar/[slug]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
