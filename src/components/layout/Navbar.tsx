'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Watch, X, ArrowRight, ShieldCheck } from 'lucide-react';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import { getProxiedImageUrl } from '@/utils/imageProxy';

const allWatches = [...saatlerData, ...elitSaatlerData];


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
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


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled || !isHomePage ? 'bg-[#1a1a1a]/95 backdrop-blur-md py-3 border-b border-white/10' : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
          
          {/* Left: Hamburger Menu */}
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => setMenuOpen(true)}
              className="flex items-center text-white hover:opacity-70 transition-opacity gap-4 md:gap-5"
            >
              <div className="flex flex-col justify-between w-[22px] h-[14px]">
                <span className="w-full h-[1.5px] bg-white"></span>
                <span className="w-full h-[1.5px] bg-white"></span>
                <span className="w-full h-[1.5px] bg-white"></span>
              </div>
              <span 
                className="text-[14px] font-normal tracking-[0.2em] uppercase hidden md:inline-block"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                MENU
              </span>
            </button>
          </div>
          
          {/* Center: Logo */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <Link href="/" className="flex items-center justify-center">
              {}
              <Image src="/logo.png" alt="Saatchi & Saatchi" width={180} height={48} className={`w-auto object-contain transition-all duration-700 invert brightness-0 ${isScrolled ? 'h-7 md:h-8' : 'h-10 md:h-12'}`} priority />
            </Link>
          </div>
          
          {/* Right: Icons */}
          <div className="flex-1 flex justify-end items-center space-x-6 md:space-x-8 text-white">

            <Link href="/elit-saat" className="hover:opacity-70 transition-opacity">
              <Watch className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
            </Link>
            <button onClick={() => setSearchOpen(true)} className="hover:opacity-70 transition-opacity">
              <Search className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
            </button>
          </div>
          
        </div>
      </header>

      {/* Background Overlay for Menu */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-700 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Elegant Left Slide-in Drawer Menu (Patek Style) */}
      <div 
        className={`fixed inset-y-0 left-0 w-full md:w-[480px] bg-white z-[70] transform transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] flex flex-col ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-light" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>Navigation</span>
          <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-black transition-colors p-2">
            <X className="w-6 h-6" strokeWidth={1} />
          </button>
        </div>

        {/* Drawer Links - Rolex Style */}
        <nav className="flex-grow overflow-y-auto px-8 py-10 flex flex-col space-y-6">
          {[
                        { name: "Tüm Markalar", href: "/markalar", type: "main" },
            { name: "Elit Kategori", href: "/elit-saat", type: "highlight" },
            { name: "Rolex", href: "/markalar/rolex", type: "main" },
            { name: "Kurumsal", href: "/kurumsal", type: "sub" },
            { name: "İletişim", href: "/iletisim", type: "sub" }
          ].map((item, idx) => {
            
            // Rolex style classes based on item type
            let textClass = "";
            let inlineStyle = { fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' };

            if (item.type === "main") {
              textClass = "text-[22px] md:text-[26px] text-[#222222] font-bold hover:text-[#555] transition-colors";
            } else if (item.type === "highlight") {
              textClass = "text-[22px] md:text-[26px] text-[#006039] font-bold hover:text-[#004a2c] transition-colors"; // Rolex Green
            } else {
              textClass = "text-[18px] md:text-[20px] text-[#444444] font-normal hover:text-[#222] transition-colors mt-4";
            }

            return (
              <Link 
                key={idx} 
                href={item.href} 
                onClick={() => setMenuOpen(false)}
                className={`block ${textClass}`}
                style={inlineStyle}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="px-8 py-10 bg-gray-50 mt-auto">
           {}
           <Image src="/logo.png" alt="Saatchi & Saatchi" width={120} height={24} className="h-6 w-auto object-contain opacity-50 mb-4" />
           <p className="text-xs text-gray-400 font-serif">© 2026 SAATCHI & SAATCHI. Tüm Hakları Saklıdır.</p>
        </div>
      </div>

      {/* Search Overlay */}
      
      {/* 
        PREMIUM SEARCH MODAL
        Saatchi standard reference 
      */}
      <div className={`fixed inset-0 z-[70] flex items-start justify-center pt-4 md:pt-12 px-4 bg-black/60 backdrop-blur-sm transition-all duration-500 ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {/* Click outside to close */}
        <div className="absolute inset-0" onClick={() => setSearchOpen(false)}></div>
        
        <div className={`relative w-full max-w-4xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 transform ${searchOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-95'}`} style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          
          {/* Top Search Bar */}
          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex-1 flex items-center bg-white border-2 border-slate-800 rounded-xl px-4 py-3 md:py-4 transition-colors focus-within:border-[#0A3D2E]">
                <Search className="w-5 h-5 text-slate-800 shrink-0" strokeWidth={2} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Model, marka, referans veya saat arayın (Örn: Rolex, Patek Philippe, Omega, Richard Mille...)" 
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
              <button onClick={() => setSearchQuery('Richard Mille')} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#0A3D2E] hover:text-[#0A3D2E] transition-colors">Richard Mille</button>
              <button onClick={() => setSearchQuery('Panerai')} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#0A3D2E] hover:text-[#0A3D2E] transition-colors">Panerai</button>
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
                const linkUrl = isElit ? `/elit-saat/${watchSlug}` : `/saatler/${watchSlug}`;
                
                return (
                  <Link 
                    href={linkUrl} 
                    key={idx} 
                    onClick={() => setSearchOpen(false)}
                    className="group flex items-center p-3 md:p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#0A3D2E]/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_30%,_#f8f6f0_100%)] border border-gray-100 rounded-xl p-2 mr-4 md:mr-5 flex items-center justify-center overflow-hidden">
                      {watch.image ? (
                        <Image unoptimized src={getProxiedImageUrl(watch.image)} alt={watch.modelName} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
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
    </>
  );
}
