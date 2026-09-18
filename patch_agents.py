with open('AGENTS.md', 'r', encoding='utf-8') as f:
    content = f.read()

old_rule = "## 9. Rolex Görsel Senkronizasyon Kuralı (Ersan Diamonds)\nRolex ürün görselleri (image) yalnızca `https://ersandiamonds.com/koleksiyon?brand=rolex` adresinden, **SADECE TAM EŞLEŞMELİ** (exact match) ürün adları bulunarak alınacaktır. Uydurma, tahmini veya bulanık (fuzzy) eşleştirme ile görsel atanması kesinlikle yasaktır. Bu işlem `scripts/sync-rolex-ersan-images.py` betiği ile otomatize edilmiştir."

new_rule = "## 9. Rolex ve Cartier Görsel Senkronizasyon Kuralı (Ersan Diamonds)\nRolex ve Cartier ürün görselleri (image) yalnızca `https://ersandiamonds.com/koleksiyon?brand=rolex` ve `?brand=cartier` adreslerinden, **SADECE TAM EŞLEŞMELİ** (exact match) ürün adları bulunarak alınacaktır. Uydurma, tahmini veya bulanık (fuzzy) eşleştirme ile görsel atanması kesinlikle yasaktır. Bu işlem `scripts/sync-ersan-images.py` betiği ile otomatize edilmiştir."

content = content.replace(old_rule, new_rule)

with open('AGENTS.md', 'w', encoding='utf-8') as f:
    f.write(content)
