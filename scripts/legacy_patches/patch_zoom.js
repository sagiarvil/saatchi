const fs = require('fs');

let content = fs.readFileSync('src/components/ui/LuxuryImageZoom.tsx', 'utf8');

// Replace the base image class
content = content.replace(
  /className="w-full h-full object-contain"/g,
  'className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm"'
);

// Replace container bg
content = content.replace(
  /className="relative w-full aspect-square max-w-lg cursor-none bg-white flex items-center justify-center group"/g,
  'className="relative w-full aspect-square max-w-lg cursor-none bg-[radial-gradient(circle_at_50%_50%,_#ffffff_30%,_#f8f6f0_100%)] rounded-2xl border border-black/5 flex items-center justify-center group overflow-hidden"'
);

fs.writeFileSync('src/components/ui/LuxuryImageZoom.tsx', content);
