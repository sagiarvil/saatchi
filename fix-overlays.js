const fs = require('fs');
let code = fs.readFileSync('src/components/ui/HeroSlider.tsx', 'utf8');
code = code.replace(
  '<div data-hero-overlay="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-2/3 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />',
  '<div data-hero-overlay="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/2 md:h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />'
);
fs.writeFileSync('src/components/ui/HeroSlider.tsx', code);
