'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Watch, X, ArrowRight, ShieldCheck } from 'lucide-react';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.png" 
                alt="Saatchi & Saatchi" 
                className={`w-auto object-contain transition-all duration-700 invert brightness-0 ${isScrolled ? 'h-7 md:h-8' : 'h-10 md:h-12'}`} 
              />
            </Link>
          </div>
          
          {/* Right: Icons */}
          <div className="flex-1 flex justify-end items-center space-x-6 md:space-x-8 text-white">
            <Link href="/elit-saat/koleksiyon" className="hover:opacity-70 transition-opacity">
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
            { name: "Erkek Saatleri", href: "/saatler/erkek", type: "main" },
            { name: "Kadın Saatleri", href: "/saatler/kadin", type: "main" },
            { name: "Elit Koleksiyon", href: "/elit-saat/koleksiyon", type: "highlight" },
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
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="/logo.png" alt="Saatchi & Saatchi" className="h-6 w-auto object-contain opacity-50 mb-4" />
           <p className="text-xs text-gray-400 font-serif">© 2026 SAATCHI & SAATCHI. Tüm Hakları Saklıdır.</p>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`fixed inset-0 bg-black/95 z-[70] backdrop-blur-xl transition-all duration-700 flex flex-col items-center ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <button onClick={() => setSearchOpen(false)} className="absolute top-10 right-10 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors p-2">
          <X className="w-8 h-8" strokeWidth={1} />
        </button>
        
        <div className="w-full max-w-5xl px-8 h-full flex flex-col pt-24 pb-12">
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
                  const linkUrl = isElit ? `/elit-saat/${watchSlug}` : `/saatler/${watchSlug}`;
                  
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
        </div>
      </div>
    </>
  );
}
