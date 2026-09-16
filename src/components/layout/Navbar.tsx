'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronRight, MapPin, Search, Watch, X } from 'lucide-react';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import { getProxiedImageUrl } from '@/utils/imageProxy';

const allWatches = [...saatlerData, ...elitSaatlerData];

const menuItems = [
  { no: '01', name: 'Koleksiyon', href: '/elit-saat', note: 'Seçili lüks saatler' },
  { no: '02', name: 'Tüm Markalar', href: '/markalar', note: 'Saat evlerini keşfedin' },
  { no: '03', name: 'Rolex', href: '/markalar/rolex', note: 'Referans seçkisi' },
  { no: '04', name: 'Cartier', href: '/markalar/cartier', note: 'Maison seçkisi' },
  { no: '05', name: 'TAG Heuer', href: '/markalar/tag-heuer', note: 'Sportif saatçilik' },
  { no: '06', name: 'Rado', href: '/markalar/rado', note: 'Malzeme ve tasarım' },
  { no: '07', name: 'Tissot', href: '/markalar/tissot', note: 'İsviçre saatçiliği' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase();
      const results = allWatches.filter((w) => {
        const haystack = `${w.brand || ''} ${w.modelName || ''} ${w.id || ''} ${'ref' in w ? String(w.ref ?? '') : ''}`.toLowerCase();
        return haystack.includes(q);
      }).slice(0, 20);
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`${isHomePage ? 'fixed' : 'sticky'} top-0 z-50 w-full transition-all duration-700 ${isScrolled || !isHomePage ? 'border-b border-white/10 bg-[#171615]/95 py-3 backdrop-blur-xl' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 md:px-12">
          <div className="flex flex-1 justify-start">
            <button onClick={() => setMenuOpen(true)} aria-label="Menüyü aç" className="group flex items-center gap-4 text-white md:gap-5">
              <div className="flex h-[14px] w-[22px] flex-col justify-between">
                <span className="h-px w-full bg-white transition-transform duration-300 group-hover:translate-x-1" />
                <span className="h-px w-[70%] bg-white transition-all duration-300 group-hover:w-full" />
                <span className="h-px w-full bg-white transition-transform duration-300 group-hover:-translate-x-1" />
              </div>
              <span className="hidden text-[12px] font-medium uppercase tracking-[0.24em] md:inline-block">Menü</span>
            </button>
          </div>

          <div className="flex shrink-0 items-center justify-center">
            <Link href="/" className="flex items-center justify-center" aria-label="SAATCHI ana sayfa">
              <Image src="/logo.png" alt="Saatchi & Saatchi" width={180} height={48} className={`w-auto object-contain invert brightness-0 transition-all duration-700 ${isScrolled || !isHomePage ? 'h-7 md:h-8' : 'h-10 md:h-12'}`} priority />
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-6 text-white md:space-x-8">
            <Link href="/elit-saat" className="transition-opacity hover:opacity-65" aria-label="Koleksiyon"><Watch className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1} /></Link>
            <button onClick={() => setSearchOpen(true)} className="transition-opacity hover:opacity-65" aria-label="Ara"><Search className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1} /></button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] bg-black/75 backdrop-blur-md transition-all duration-700 ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`} onClick={() => setMenuOpen(false)} />

      <aside className={`fixed inset-y-0 left-0 z-[70] w-full transform overflow-hidden border-r border-white/10 bg-[#0d0c0b] text-[#f5f0e8] shadow-[40px_0_100px_rgba(0,0,0,.45)] transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] md:w-[78vw] xl:w-[1120px] ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-hidden={!menuOpen}>
        <div className="grid h-full grid-rows-[auto_1fr] md:grid-cols-[1.12fr_.88fr] md:grid-rows-[1fr]">
          <div className="flex min-h-0 flex-col border-white/10 md:border-r">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-6 sm:px-8 md:px-10">
              <div className="flex items-center gap-4">
                <Image src="/logo.png" alt="Saatchi & Saatchi" width={125} height={32} className="h-7 w-auto object-contain invert brightness-0" />
                <span className="hidden text-[9px] uppercase tracking-[0.24em] text-[#746d67] sm:inline">İzmir · Est. 20+ years</span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#cfc7be] transition-colors hover:border-white/25 hover:text-white" aria-label="Menüyü kapat"><X className="h-5 w-5" strokeWidth={1.2} /></button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 md:px-10 md:py-8">
              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#9c6b6d]">Koleksiyon ve markalar</p>
              <div className="divide-y divide-white/[.07] border-y border-white/[.07]">
                {menuItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="group grid grid-cols-[34px_1fr_auto] items-center gap-2 py-4 sm:py-5">
                      <span className="text-[9px] tracking-[0.18em] text-[#625c57]">{item.no}</span>
                      <div>
                        <span className={`block text-[23px] font-medium leading-none tracking-[-0.025em] transition-colors sm:text-[27px] ${active ? 'text-[#d4b8b8]' : 'text-[#f1ece5] group-hover:text-white'}`}>{item.name}</span>
                        <span className="mt-1.5 block text-[10px] tracking-[0.08em] text-[#7d756f]">{item.note}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#6d6560] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#c2a768]" strokeWidth={1.2} />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-px bg-white/10">
                <Link href="/kurumsal" onClick={() => setMenuOpen(false)} className="bg-[#121110] px-5 py-4 text-sm text-[#d9d1c8] transition-colors hover:bg-[#171413] hover:text-white">Kurumsal</Link>
                <Link href="/iletisim" onClick={() => setMenuOpen(false)} className="bg-[#121110] px-5 py-4 text-sm text-[#d9d1c8] transition-colors hover:bg-[#171413] hover:text-white">İletişim</Link>
              </div>
            </nav>
          </div>

          <div className="hidden min-h-0 flex-col justify-between bg-[radial-gradient(circle_at_72%_14%,rgba(111,31,37,.28),transparent_32%),linear-gradient(160deg,#151311_0%,#0d0c0b_72%)] p-10 md:flex xl:p-12">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b17a7d]">SAATCHI Concierge</p>
              <h2 className="mt-5 max-w-sm text-4xl font-medium leading-[1.06] tracking-[-0.04em] text-[#f5f0e8] xl:text-5xl">Saatinizi değil,<br />seçiminizi konuşalım.</h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#999189]">Showroom randevusu, ikinci el değerlendirme, takas ve koleksiyon danışmanlığı için doğrudan ekibimize ulaşın.</p>
            </div>

            <div>
              <div className="border-y border-white/10 py-5">
                <div className="flex items-start gap-3 text-sm leading-6 text-[#c9c0b7]"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#c2a768]" strokeWidth={1.2} /><span>Menderes Caddesi No:231/B<br />Buca / İzmir</span></div>
              </div>
              <a href="https://wa.me/905419305372" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.21em] text-[#e7ddd2] transition-colors hover:text-white">VIP WhatsApp · +90 541 930 53 72 <ArrowUpRight className="h-4 w-4" /></a>
              <p className="mt-8 text-[9px] uppercase tracking-[0.18em] text-[#5f5954]">© 2026 SAATCHI & SAATCHI</p>
            </div>
          </div>
        </div>
      </aside>

      <div className={`fixed inset-0 z-[70] flex items-start justify-center bg-black/65 px-4 pt-4 backdrop-blur-md transition-all duration-500 md:pt-12 ${searchOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}>
        <div className="absolute inset-0" onClick={() => setSearchOpen(false)} />
        <div className={`relative flex max-h-[calc(100vh-2rem)] w-full max-w-4xl transform flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 md:rounded-3xl ${searchOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-95'}`}>
          <div className="border-b border-gray-100 p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex flex-1 items-center rounded-xl border-2 border-slate-800 bg-white px-4 py-3 transition-colors focus-within:border-[#6f2025] md:py-4">
                <Search className="h-5 w-5 shrink-0 text-slate-800" strokeWidth={2} />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Model, marka veya referans arayın" className="ml-3 w-full border-none bg-transparent text-base font-medium text-slate-800 placeholder:text-gray-400 focus:outline-none md:text-lg" autoFocus={searchOpen} />
              </div>
              <button onClick={() => setSearchOpen(false)} className="shrink-0 rounded-xl bg-gray-100 p-3 text-slate-800 transition-colors hover:bg-gray-200 md:p-4" aria-label="Aramayı kapat"><X className="h-5 w-5" strokeWidth={2} /></button>
            </div>
            <div className="mt-5 flex items-center gap-3 overflow-x-auto whitespace-nowrap px-1">
              <span className="text-[10px] font-bold tracking-wider text-gray-500">POPÜLER:</span>
              {['Rolex', 'Cartier', 'TAG Heuer', 'Rado', 'Tissot'].map((brand) => <button key={brand} onClick={() => setSearchQuery(brand)} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-[#6f2025] hover:text-[#6f2025]">{brand}</button>)}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between px-1"><h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{searchQuery ? 'Arama sonuçları' : 'Öne çıkan modeller'}</h4><span className="text-xs font-medium text-gray-400">{searchResults.length > 0 ? searchResults.length : (searchQuery ? 0 : 5)} Ürün</span></div>
            <div className="flex flex-col gap-3">
              {(searchResults.length > 0 ? searchResults : allWatches.slice(0, 5)).map((watch, idx) => (
                <Link href={watch.seoUrl} key={idx} onClick={() => setSearchOpen(false)} className="group flex items-center rounded-2xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:border-[#6f2025]/35 hover:shadow-[0_8px_30px_rgb(0,0,0,.04)] md:p-4">
                  <div className="relative mr-4 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-[radial-gradient(circle_at_50%_50%,_#fff_30%,_#f8f6f0_100%)] p-2 md:mr-5 md:h-20 md:w-20">
                    {watch.image ? <Image unoptimized src={getProxiedImageUrl(watch.image)} alt={watch.modelName} fill sizes="80px" className="object-contain p-2 transition-transform duration-500 group-hover:scale-110" /> : <Search className="h-6 w-6 text-gray-300" />}
                  </div>
                  <div className="min-w-0 flex-1 pr-4"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#846b32] md:text-xs">{watch.brand}</p><h3 className="truncate text-sm font-bold text-gray-900 md:text-base">{watch.modelName}</h3><p className="mt-1 truncate text-xs text-gray-400">{watch.id || 'REF: SAATCHI'}</p></div>
                  <div className="shrink-0 pl-2 text-right"><p className="text-sm font-extrabold text-[#6f2025] md:text-lg">{watch.price}</p></div>
                </Link>
              ))}
              {searchQuery && searchResults.length === 0 && <div className="py-12 text-center"><p className="font-medium text-gray-500">Aradığınız kriterlere uygun model bulunamadı.</p></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
