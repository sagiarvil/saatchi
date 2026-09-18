const fs = require('fs');
let code = fs.readFileSync('src/components/ui/HeroSlider.tsx', 'utf8');

// Remove overlays completely for a test
code = code.replace(
  /<div data-hero-overlay="true"[^>]+mix-blend-multiply"[ ]*\/>/g,
  '{/* Removed mix-blend overlay */}'
);
code = code.replace(
  /<div data-hero-overlay="true"[^>]+via-black\/35 to-black\/85"[ ]*\/>/g,
  '{/* Removed radial overlay */}'
);
code = code.replace(
  /<div data-hero-overlay="true"[^>]+from-black\/80 via-black\/30 to-transparent"[ ]*\/>/g,
  '{/* Removed gradient overlay */}'
);

// Also remove contrast/saturate/brightness from video just in case they black it out
code = code.replace(/contrast-\[1\.15\] saturate-\[0\.80\] brightness-\[0\.75\]/g, '');

fs.writeFileSync('src/components/ui/HeroSlider.tsx', code);
console.log("Removed overlays and video filters");
