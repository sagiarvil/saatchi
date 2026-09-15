const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace wrapper
content = content.replace(
  /className="w-full aspect-\[3\/4\] mb-8 relative flex items-center justify-center transition-all duration-700 bg-white overflow-hidden"/g,
  'className="w-full aspect-[4/5] mb-8 relative flex items-center justify-center transition-all duration-700 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_20%,_#f8f6f0_100%)] rounded-2xl border border-black/5 overflow-hidden group-hover:border-[#C2A768]/40 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]"'
);

// Replace the image class
content = content.replace(
  /className="object-contain w-full h-full drop-shadow-xl" \/>/g,
  'className="object-contain w-full h-full mix-blend-multiply drop-shadow-sm" />'
);

fs.writeFileSync('src/app/page.tsx', content);
