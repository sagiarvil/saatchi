const fs = require('fs');

let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

const searchRegex = /<div className=\{`fixed inset-0 bg-black\/95 z-\[70\].*?<\/div>[\s]*<\/div>[\s]*<\/div>[\s]*<\/div>/s;

const newSearchModal = `
      <div className={\`fixed inset-0 z-[70] flex items-start justify-center pt-4 md:pt-12 px-4 bg-black/60 backdrop-blur-sm transition-all duration-500 \${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}\`}>
        {/* Click outside to close */}
        <div className="absolute inset-0" onClick={() => setSearchOpen(false)}></div>
        
        <div className={\`relative w-full max-w-4xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 transform \${searchOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-95'}\`} style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          
          {/* Top Search Bar */}
          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex-1 flex items-center bg-white border-2 border-slate-800 rounded-xl px-4 py-3 md:py-4 transition-colors focus-within:border-[#0A3D2E]">
                <Search className="w-5 h-5 text-slate-800 shrink-0" strokeWidth={2} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Model, marka, referans veya saat arayın (Örn: Rolex, Cartier, Omega...)" 
                  className="w-full bg-transparent border-none text-slate-800 text-base md:text-lg ml-3 focus:outline-none placeholder:text-gray-400 font-medium"
                  autoFocus={searchOpen}
                />
              </div>
              <button 
                onClick={() => setSearchOpen(false)} 
                className="bg-gray-100 hover:bg-gray-200 text-slate-800 p-3 md:p-4 rounded-xl transition-colors shrink-0"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
            
            {/* Popular Tags */}
            <div className="flex items-center gap-3 mt-5 px-1 overflow-x-auto no-scrollbar whitespace-nowrap">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider">POPÜLER:</span>
              <button onClick={() => setSearchQuery('Rolex')} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#0A3D2E] hover:text-[#0A3D2E] transition-colors">Rolex</button>
              <button onClick={() => setSearchQuery('Patek Philippe')} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#0A3D2E] hover:text-[#0A3D2E] transition-colors">Patek Philippe</button>
              <button onClick={() => setSearchQuery('Omega')} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#0A3D2E] hover:text-[#0A3D2E] transition-colors">Omega</button>
            </div>
          </div>
          
          {/* Results Area */}
          <div className="flex-1 overflow-y-auto bg-white p-4 md:p-6 no-scrollbar">
            <div className="flex items-center justify-between mb-4 px-1">
              <h4 className="text-xs font-bold text-gray-500 tracking-wider uppercase">{searchQuery ? 'ARAMA SONUÇLARI' : 'ÖNE ÇIKAN MODELLER & KOLEKSİYON'}</h4>
              <span className="text-xs font-medium text-gray-400">{searchResults.length > 0 ? searchResults.length : (searchQuery ? 0 : 5)} Ürün</span>
            </div>

            <div className="flex flex-col gap-3">
              {(searchResults.length > 0 ? searchResults : allWatches.slice(0, 5)).map((watch, idx) => {
                const slugParts = watch.seoUrl.split('/');
                const watchSlug = slugParts[slugParts.length - 1];
                const isElit = watch.category && watch.category.toLowerCase().includes('elit');
                const linkUrl = isElit ? \`/elit-saat/\${watchSlug}\` : \`/saatler/\${watchSlug}\`;
                
                return (
                  <Link 
                    href={linkUrl} 
                    key={idx} 
                    onClick={() => setSearchOpen(false)}
                    className="group flex items-center p-3 md:p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#0A3D2E]/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_30%,_#f8f6f0_100%)] border border-gray-100 rounded-xl p-2 mr-4 md:mr-5 flex items-center justify-center overflow-hidden">
                      {watch.image ? (
                        <img src={watch.image} alt={watch.modelName} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <Search className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-[10px] md:text-xs font-bold text-[#846b32] uppercase tracking-wider mb-1">{watch.brand}</p>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 truncate">{watch.modelName}</h3>
                      <p className="text-xs text-gray-400 mt-1 truncate">{watch.id || 'REF: SAATCHI'}</p>
                    </div>
                    
                    <div className="shrink-0 text-right pl-2">
                      <p className="text-sm md:text-lg font-extrabold text-[#0A3D2E]">{watch.price}</p>
                    </div>
                  </Link>
                );
              })}
              
              {searchQuery && searchResults.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-gray-500 font-medium">Aradığınız kriterlere uygun model bulunamadı.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
`;

if (searchRegex.test(content)) {
    content = content.replace(searchRegex, newSearchModal);
    fs.writeFileSync('src/components/layout/Navbar.tsx', content);
    console.log("Search updated successfully.");
} else {
    console.log("Regex mismatch, let me find the exact block.");
}
