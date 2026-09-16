import os
import re

files_to_fix = [
    "src/app/elit-saat/[slug]/page.tsx",
    "src/app/markalar/[slug]/page.tsx",
    "src/app/saatler/WatchListClient.tsx",
    "src/app/saatler/[slug]/page.tsx",
    "src/app/page.tsx",
    "src/components/layout/Navbar.tsx",
    "src/components/ui/LuxuryImageZoom.tsx"
]

import_statement = "import { getProxiedImageUrl } from '@/utils/imageProxy';\n"

for path in files_to_fix:
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add import if not present
    if "getProxiedImageUrl" not in content:
        # Find last import
        imports_end = [m.end() for m in re.finditer(r"import .*?from .*?;?\n", content)]
        if imports_end:
            insert_pos = imports_end[-1]
            content = content[:insert_pos] + import_statement + content[insert_pos:]
        else:
            content = import_statement + content

    # Replace <Image src={watch.image} -> <Image unoptimized src={getProxiedImageUrl(watch.image)}
    content = re.sub(r'<Image([^>]*)src=\{watch\.image\}', r'<Image unoptimized\1src={getProxiedImageUrl(watch.image)}', content)
    
    # Replace <img src={watch.image} -> <img src={getProxiedImageUrl(watch.image)}
    content = re.sub(r'<img([^>]*)src=\{watch\.image\}', r'<img\1src={getProxiedImageUrl(watch.image)}', content)
    
    # Replace <img src={watch.image || '/images/placeholder.jpg'} -> <img src={getProxiedImageUrl(watch.image) || '/images/placeholder.jpg'}
    content = re.sub(r'<img([^>]*)src=\{watch\.image \|\| ([^\}]+)\}', r'<img\1src={getProxiedImageUrl(watch.image) || \2}', content)

    # For LuxuryImageZoom.tsx
    if "LuxuryImageZoom" in path:
        content = re.sub(r'<Image([^>]*)src=\{src\}', r'<Image unoptimized\1src={getProxiedImageUrl(src)}', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done")
