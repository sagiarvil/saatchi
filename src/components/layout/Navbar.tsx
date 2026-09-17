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
  { no: '01', name: 'Rolex', href: '/markalar/rolex', note: 'Referans seçkisi' },
  { no: '02', name: 'Cartier', href: '/markalar/cartier', note: 'Maison seçkisi' },
  { no: '03', name: 'TAG Heuer', href: '/markalar/tag-heuer', note: 'Sportif saatçilik' },
  { no: '04', name: 'Rado', href: '/markalar/rado', note: 'Malzeme ve tasarım' }
];

const secondaryMenuItems = [
  { no: '05', name: 'Tissot', href: '/markalar/tissot', note: 'İsviçre saatçiliği' },
  { no: '06', name: 'Carren Erkek', href: '/markalar/carren/erkek', note: 'Erkek koleksiyonu' },
  { no: '07', name: 'Carren Kadın', href: '/markalar/carren/kadin', note: 'Kadın koleksiyonu' },
  { no: '08', name: 'Calvin Klein', href: '/markalar/calvin-klein', note: 'Modern tasarım' },
  { no: '09', name: 'Michael Kors', href: '/markalar/michael-kors', note: 'Moda ve lüks' },
  { no: '10', name: 'Versace', href: '/markalar/versace', note: 'İtalyan zarafeti' }
];

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase();
      setSearchResults(allWatches.filter((w) => `${w.brand || ''} ${w.modelName || ''} ${w.id || ''} ${'ref' in w ? String(w.ref ?? '') : ''}`.toLowerCase().includes(q)).slice(0, 20));
    } else setSearchResults([]);
  }, [searchQuery]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen, searchOpen]);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);
  useEffect(() => { if (!searchOpen) { setSearchQuery(''); setSearchResults([]); } }, [searchOpen]);

  return (
    <>
      <header className={`${isHomePage ? 'fixed' : 'sticky'} top-0 z-50 w-full transition-all duration-700 ${isScrolled || !isHomePage ? 'border-b border-white/10 bg-[#171615]/95 py-3 backdrop-blur-xl' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 md:px-12">
          <div className="flex flex-1 justify-start"><button onClick={() => setMenuOpen(true)} aria-label="Menüyü aç" className="group flex items-center gap-4 text-white md:gap-5"><div className="flex h-[14px] w-[22px] flex-col justify-between"><span className="h-px w-full bg-white" /><span className="h-px w-[70%] bg-white transition-all group-hover:w-full" /><span className="h-px w-full bg-white" /></div><span className="hidden text-[12px] font-medium uppercase tracking-[0.24em] md:block">Menü</span></button></div>
          <Link href="/" aria-label="SAATCHI ana sayfa"><Image src="/logo.png" alt="Saatchi & Saatchi" width={180} height={48} className={`w-auto object-contain invert brightness-0 transition-all duration-700 ${isScrolled || !isHomePage ? 'h-7 md:h-8' : 'h-10 md:h-12'}`} priority /></Link>
          <div className="flex flex-1 items-center justify-end gap-6 text-white md:gap-8"><Link href="/elit-saat" aria-label="Koleksiyon"><Watch className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1} /></Link><button onClick={() => setSearchOpen(true)} aria-label="Ara"><Search className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1} /></button></div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] bg-black/75 backdrop-blur-md transition-opacity duration-700 ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`} onClick={() => setMenuOpen(false)} />

      <aside className={`fixed inset-y-0 left-0 z-[70] h-[100dvh] max-h-[100dvh] w-full transform overflow-hidden border-r border-white/10 bg-[#0d0c0b] text-[#f5f0e8] shadow-[40px_0_100px_rgba(0,0,0,.45)] transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] md:w-[82vw] xl:w-[1120px] ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-hidden={!menuOpen}>
        <div className="grid h-full min-h-0 md:grid-cols-[1.12fr_.88fr]">
          <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] border-white/10 md:border-r">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-[clamp(.8rem,2vh,1.5rem)] sm:px-8 md:px-10"><div className="flex items-center gap-4"><Image src="/logo.png" alt="Saatchi & Saatchi" width={125} height={32} className="h-7 w-auto object-contain invert brightness-0" /><span className="hidden text-[9px] uppercase tracking-[0.24em] text-[#746d67] sm:inline">İzmir · Est. 20+ years</span></div><button onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#cfc7be] hover:border-white/25 hover:text-white" aria-label="Menüyü kapat"><X className="h-5 w-5" strokeWidth={1.2} /></button></div>

            <nav className="min-h-0 overflow-hidden px-5 py-[clamp(.6rem,1.5vh,1.5rem)] sm:px-8 md:px-10">
              <div className="h-full overflow-y-auto no-scrollbar pr-2">
                <p className="mb-[clamp(.35rem,1vh,1rem)] text-[9px] font-semibold uppercase tracking-[0.28em] text-[#9c6b6d]">ELİT SAATLER</p>
                <div className="divide-y divide-white/[.07] border-y border-white/[.07] mb-6">
                  {menuItems.map((item) => {
                    const active = pathname === item.href;
                    return <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="group grid grid-cols-[30px_1fr_auto] items-center gap-2 py-[clamp(.38rem,1.1vh,1rem)]"><span className="text-[9px] tracking-[0.18em] text-[#625c57]">{item.no}</span><div className="min-w-0"><span style={{ fontSize: 'clamp(17px, 2.6vh, 27px)' }} className={`block font-medium leading-none tracking-[-0.025em] ${active ? 'text-[#d4b8b8]' : 'text-[#f1ece5] group-hover:text-white'}`}>{item.name}</span><span style={{ fontSize: 'clamp(8px, 1.15vh, 10px)' }} className="mt-[clamp(.15rem,.5vh,.4rem)] block truncate tracking-[0.08em] text-[#7d756f]">{item.note}</span></div><ChevronRight className="h-4 w-4 text-[#6d6560] transition-transform group-hover:translate-x-1 group-hover:text-[#c2a768]" strokeWidth={1.2} /></Link>;
                  })}
                </div>
                
                <p className="mb-[clamp(.35rem,1vh,1rem)] text-[9px] font-semibold uppercase tracking-[0.28em] text-[#9c6b6d]">DİĞER SAAT KATEGORİSİ</p>
                <div className="divide-y divide-white/[.07] border-y border-white/[.07]">
                  {secondaryMenuItems.map((item) => {
                    const active = pathname === item.href;
                    return <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="group grid grid-cols-[30px_1fr_auto] items-center gap-2 py-[clamp(.38rem,1.1vh,1rem)]"><span className="text-[9px] tracking-[0.18em] text-[#625c57]">{item.no}</span><div className="min-w-0"><span style={{ fontSize: 'clamp(17px, 2.6vh, 27px)' }} className={`block font-medium leading-none tracking-[-0.025em] ${active ? 'text-[#d4b8b8]' : 'text-[#f1ece5] group-hover:text-white'}`}>{item.name}</span><span style={{ fontSize: 'clamp(8px, 1.15vh, 10px)' }} className="mt-[clamp(.15rem,.5vh,.4rem)] block truncate tracking-[0.08em] text-[#7d756f]">{item.note}</span></div><ChevronRight className="h-4 w-4 text-[#6d6560] transition-transform group-hover:translate-x-1 group-hover:text-[#c2a768]" strokeWidth={1.2} /></Link>;
                  })}
                </div>
              </div>
            </nav>

            <div className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/10"><Link href="/kurumsal" onClick={() => setMenuOpen(false)} className="group flex min-h-[58px] items-center justify-between bg-[#151312] px-5 py-3 text-sm text-[#e4dcd4] transition-colors hover:bg-[#211719]"><span>Kurumsal</span><ArrowUpRight className="h-4 w-4 text-[#806f68] group-hover:text-[#c2a768]" /></Link><Link href="/iletisim" onClick={() => setMenuOpen(false)} className="group flex min-h-[58px] items-center justify-between bg-[#151312] px-5 py-3 text-sm text-[#e4dcd4] transition-colors hover:bg-[#211719]"><span>İletişim</span><ArrowUpRight className="h-4 w-4 text-[#806f68] group-hover:text-[#c2a768]" /></Link></div>
          </div>

          <div className="hidden min-h-0 flex-col justify-between bg-[radial-gradient(circle_at_72%_14%,rgba(111,31,37,.28),transparent_32%),linear-gradient(160deg,#151311_0%,#0d0c0b_72%)] p-[clamp(1.5rem,4vh,3rem)] md:flex"><div><p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b17a7d]">SAATCHI Concierge</p><h2 style={{ fontSize: 'clamp(28px, 5vh, 48px)' }} className="mt-[clamp(1rem,2.5vh,1.5rem)] max-w-sm font-medium leading-[1.06] tracking-[-0.04em]">Saatinizi değil,<br />seçiminizi konuşalım.</h2><p className="mt-[clamp(1rem,2.5vh,1.5rem)] max-w-sm text-sm leading-7 text-[#999189]">Showroom randevusu, ikinci el değerlendirme, takas ve koleksiyon danışmanlığı için doğrudan ekibimize ulaşın.</p></div><div><div className="border-y border-white/10 py-[clamp(.8rem,2vh,1.25rem)]"><div className="flex items-start gap-3 text-sm leading-6 text-[#c9c0b7]"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#c2a768]" strokeWidth={1.2} /><span>Menderes Caddesi No:231/B<br />Buca / İzmir</span></div></div><a href="https://wa.me/905419305372" target="_blank" rel="noopener noreferrer" className="mt-[clamp(.8rem,2vh,1.5rem)] inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.21em] text-[#e7ddd2]">VIP WhatsApp · +90 541 930 53 72 <ArrowUpRight className="h-4 w-4" /></a><p className="mt-[clamp(1rem,3vh,2rem)] text-[9px] uppercase tracking-[0.18em] text-[#5f5954]">© 2026 SAATCHI & SAATCHI</p></div></div>
        </div>
      </aside>

      <div className={`fixed inset-0 z-[70] flex items-start justify-center bg-black/65 px-4 pt-4 backdrop-blur-md transition-all duration-500 md:pt-12 ${searchOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}><div className="absolute inset-0" onClick={() => setSearchOpen(false)} /><div className={`relative flex max-h-[calc(100vh-2rem)] w-full max-w-4xl transform flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 md:rounded-3xl ${searchOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-95'}`}><div className="border-b border-gray-100 p-4 md:p-6"><div className="flex items-center gap-3"><div className="flex flex-1 items-center rounded-xl border-2 border-slate-800 px-4 py-3 focus-within:border-[#6f2025]"><Search className="h-5 w-5 shrink-0 text-slate-800" /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Model, marka veya referans arayın" className="ml-3 w-full bg-transparent text-base font-medium text-slate-800 outline-none placeholder:text-gray-400" autoFocus={searchOpen} /></div><button onClick={() => setSearchOpen(false)} className="rounded-xl bg-gray-100 p-3 text-slate-800"><X className="h-5 w-5" /></button></div><div className="mt-4 flex gap-2 overflow-x-auto whitespace-nowrap">{['Rolex','Cartier','TAG Heuer','Rado','Tissot'].map((brand) => <button key={brand} onClick={() => setSearchQuery(brand)} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-slate-700">{brand}</button>)}</div></div><div className="flex-1 overflow-y-auto p-4 md:p-6"><div className="mb-4 flex items-center justify-between"><h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{searchQuery ? 'Arama sonuçları' : 'Öne çıkan modeller'}</h4><span className="text-xs text-gray-400">{searchResults.length || (searchQuery ? 0 : 5)} Ürün</span></div><div className="space-y-3">{(searchResults.length ? searchResults : allWatches.slice(0,5)).map((watch, idx) => <Link href={watch.seoUrl} key={idx} onClick={() => setSearchOpen(false)} className="group flex items-center rounded-2xl border border-gray-200 p-3 hover:border-[#6f2025]/35"><div className="relative mr-4 h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-[#fafafa]">{watch.image && <Image unoptimized src={getProxiedImageUrl(watch.image)} alt={watch.modelName} fill sizes="64px" className="object-contain p-1.5" />}</div><div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-wider text-[#846b32]">{watch.brand}</p><p className="truncate text-sm font-semibold text-gray-900">{watch.modelName}</p></div><p className="shrink-0 text-sm font-bold text-[#6f2025]">{watch.price}</p></Link>)}{searchQuery && !searchResults.length && <p className="py-10 text-center text-sm text-gray-500">Uygun model bulunamadı.</p>}</div></div></div></div>
    </>
  );
}
