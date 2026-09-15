import os
import re

files_to_fix = [
    'src/app/elit-saat/[slug]/page.tsx',
    'src/app/markalar/[slug]/page.tsx',
    'src/app/saatler/WatchListClient.tsx',
    'src/app/saatler/[slug]/page.tsx',
    'src/app/page.tsx',
    'src/components/layout/Navbar.tsx',
    'src/components/layout/Footer.tsx',
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if next/image is imported
    if 'import Image from' not in content:
        # Add import at the top (after other imports)
        content = re.sub(r'(import .*?;?\n)', r'\1import Image from "next/image";\n', content, count=1)
    
    # Replace image tags with Next.js Image component where appropriate
    # 1. Object cover -> object-contain + padding
    # 2. Add fill + sizes
    
    # Let's just use string replacements for specific known bad patterns
    content = content.replace('/* eslint-disable-next-line @next/next/no-img-element */', '')
    content = content.replace('{/* eslint-disable-next-line @next/next/no-img-element */}', '')
    
    # Pattern 1: class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
    content = re.sub(
        r'<img\s+src=\{([^}]+)\}\s+alt=\{([^}]+)\}\s+className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"\s*/>',
        r'<Image src={\1} alt={\2} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out" />',
        content
    )
    
    # Pattern 2: (Navbar)
    content = re.sub(
        r'<img\s+src=\{([^}]+)\}\s+alt=\{([^}]+)\}\s+className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"\s*/>',
        r'<Image src={\1} alt={\2} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" />',
        content
    )

    # Pattern 3: (Page.tsx)
    content = re.sub(
        r'<img\s+src=\{([^}]+)\}\s+alt=\{([^}]+)\}\s+className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"\s*/>',
        r'<Image src={\1} alt={\2} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out" />',
        content
    )

    # Pattern 4: style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
    content = re.sub(
        r'<img\s+src=\{([^}]+)\}\s+alt=\{([^}]+)\}\s+style=\{\{ maxWidth: \'100%\', maxHeight: \'500px\', objectFit: \'contain\' \}\}\s*/>',
        r'<div className="relative w-full h-[500px]"><Image src={\1} alt={\2} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" priority /></div>',
        content
    )

    # Pattern 5: logo in Footer and Navbar
    content = re.sub(
        r'<img\s+src="/logo\.png"\s+alt="Saatchi & Saatchi"\s+className="h-12 w-auto mb-6 object-contain invert brightness-0"\s*/>',
        r'<Image src="/logo.png" alt="Saatchi & Saatchi" width={180} height={48} className="h-12 w-auto mb-6 object-contain invert brightness-0" />',
        content
    )
    content = re.sub(
        r'<img\s+src="/logo\.png"\s+alt="Saatchi & Saatchi"\s+className="h-6 w-auto object-contain opacity-50 mb-4"\s*/>',
        r'<Image src="/logo.png" alt="Saatchi & Saatchi" width={120} height={24} className="h-6 w-auto object-contain opacity-50 mb-4" />',
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filepath}")

