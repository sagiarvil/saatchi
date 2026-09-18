with open('AGENTS.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove Rule 9 completely
import re
# Find the start of Rule 9 and end of it (before Rule 10)
content = re.sub(r'## 9\. Rolex Görsel Senkronizasyon Kuralı \(Ersan Diamonds\).*?(?=## 10\.)', '', content, flags=re.DOTALL)

# Add New Rule for Rolex
new_rolex_rule = """
## 12. Rolex Fiyatlama ve Kaynak Kuralı (YENİ KURAL)
- **Veri Kaynağı:** Rolex saatlerin fiyatları, görselleri ve model bilgileri SADECE `https://www.chrono24.com.tr/rolex/index.htm` adresinden alınacaktır. Ersan Diamonds veya eski kaynaklar tamamen iptal edilmiştir.
- **Fiyatlama Formülü:** Chrono24'ten alınan Türkiye fiyatının üzerine doğrudan **2.5 katı** (x2.5) artış yansıtılarak Saatchi satış fiyatı hesaplanacaktır.
- **Fiyat Tavanı (Max Limit):** Tüm markalarda olduğu gibi, Rolex için de satış fiyatı 1.700.000 TL'yi aşan HİÇBİR saat web sitemize eklenmeyecektir. Limit üstü saatler listeden çıkarılır.
"""

if "## 12. Rolex Fiyatlama" not in content:
    content += new_rolex_rule

with open('AGENTS.md', 'w', encoding='utf-8') as f:
    f.write(content)
