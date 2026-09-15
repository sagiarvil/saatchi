const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

content = content.replace(
  'placeholder="Model, marka, referans veya saat arayın (Örn: Rolex, Versace, Seiko, TAG Heuer...)"',
  'placeholder="Model, marka, referans veya saat arayın (Örn: Rolex, Patek Philippe, Omega, Richard Mille...)"'
);

content = content.replace(
  '<button onClick={() => setSearchQuery(\'Versace\')} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#0A3D2E] hover:text-[#0A3D2E] transition-colors">Versace</button>',
  '<button onClick={() => setSearchQuery(\'Richard Mille\')} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#0A3D2E] hover:text-[#0A3D2E] transition-colors">Richard Mille</button>'
);

content = content.replace(
  '<button onClick={() => setSearchQuery(\'Seiko\')} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#0A3D2E] hover:text-[#0A3D2E] transition-colors">Seiko</button>',
  '<button onClick={() => setSearchQuery(\'Panerai\')} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#0A3D2E] hover:text-[#0A3D2E] transition-colors">Panerai</button>'
);

fs.writeFileSync('src/components/layout/Navbar.tsx', content);
console.log("Navbar brands updated");
