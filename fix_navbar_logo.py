import re

with open('src/components/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'<img\s+src="/logo\.png"\s+alt="Saatchi & Saatchi"\s+className=\{`w-auto object-contain transition-all duration-700 invert brightness-0 \$\{isScrolled \? \'h-7 md:h-8\' : \'h-10 md:h-12\'\}`\}\s*/>',
    r'<Image src="/logo.png" alt="Saatchi & Saatchi" width={180} height={48} className={`w-auto object-contain transition-all duration-700 invert brightness-0 ${isScrolled ? \'h-7 md:h-8\' : \'h-10 md:h-12\'}`} priority />',
    content
)

with open('src/components/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

