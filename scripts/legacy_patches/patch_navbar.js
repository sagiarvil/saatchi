const fs = require('fs');

let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

// 1. Add imports for data
const importData = `
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';

const allWatches = [...saatlerData, ...elitSaatlerData];
`;
content = content.replace("import { Menu, Search, Watch, X, ArrowRight } from 'lucide-react';", "import { Menu, Search, Watch, X, ArrowRight, ShieldCheck } from 'lucide-react';" + importData);


// 2. Add search query state
const stateQuery = `
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase();
      const results = allWatches.filter(w => 
        (w.brand && w.brand.toLowerCase().includes(q)) || 
        (w.modelName && w.modelName.toLowerCase().includes(q))
      ).slice(0, 20);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchOpen]);
`;

content = content.replace("const isHomePage = pathname === '/';", "const isHomePage = pathname === '/';" + stateQuery);


// 3. Update the search overlay UI
const oldSearchUI = `<div className="w-full max-w-3xl px-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-light mb-6 text-center" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
            Arama
          </p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Model veya Koleksiyon Arayın..." 
              className="w-full bg-transparent border-b border-white/30 text-white text-2xl md:text-4xl py-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/20 font-light text-center"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              autoFocus={searchOpen}
            />
          </div>
        </div>`;

const newSearchUI = `<div className="w-full max-w-5xl px-8 h-full flex flex-col pt-24 pb-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-light mb-6 text-center shrink-0" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
            Arama
          </p>
          <div className="relative shrink-0 mb-8 max-w-3xl mx-auto w-full">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Model veya Koleksiyon Arayın..." 
              className="w-full bg-transparent border-b border-white/30 text-white text-2xl md:text-4xl py-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/20 font-light text-center"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              autoFocus={searchOpen}
            />
          </div>
          
          {/* Search Results Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar w-full">
            {searchResults.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-20">
                {searchResults.map((watch, idx) => {
                  const slugParts = watch.seoUrl.split('/');
                  const watchSlug = slugParts[slugParts.length - 1];
                  const isElit = watch.category && watch.category.toLowerCase().includes('elit');
                  const linkUrl = isElit ? \`/elit-saat/\${watchSlug}\` : \`/saatler/\${watchSlug}\`;
                  
                  return (
                    <Link 
                      href={linkUrl} 
                      key={idx} 
                      onClick={() => setSearchOpen(false)}
                      className="group flex flex-col items-center bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition-all duration-300"
                    >
                      <div className="w-full aspect-square mb-4 relative flex items-center justify-center bg-white">
                        {watch.image ? (
                          <img src={watch.image} alt={watch.modelName} className="w-full h-full object-contain p-2" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-[#C2A768]/50 mb-2" strokeWidth={1} />
                            <span className="text-foreground/40 font-serif text-[10px]">Görsel Yok</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-[#C2A768] text-[9px] tracking-widest uppercase mb-1 text-center font-bold">{watch.brand}</h3>
                      <h4 className="text-white font-serif text-xs text-center line-clamp-2 leading-tight">{watch.modelName}</h4>
                    </Link>
                  );
                })}
              </div>
            )}
            
            {searchQuery.length > 1 && searchResults.length === 0 && (
              <div className="text-center text-white/40 font-light mt-10">
                Sonuç bulunamadı. Lütfen farklı bir arama yapın.
              </div>
            )}
          </div>
        </div>`;

content = content.replace(oldSearchUI, newSearchUI);

// Fix overlapping flex classes in the parent container
content = content.replace('flex flex-col justify-center items-center ${searchOpen', 'flex flex-col items-center ${searchOpen');

fs.writeFileSync('src/components/layout/Navbar.tsx', content);
