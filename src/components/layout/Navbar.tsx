'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronRight, MapPin, Search, Watch, X } from 'lucide-react';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import { getProxiedImageUrl } from '@/utils/imageProxy';

const allWatches = [...saatlerData, ...elitSaatlerData] as any[];

type MenuGroupId = 'elite' | 'other';
type MenuBrand = { name: string; href: string; source: string };
type MenuGroup = { id: MenuGroupId; title: string; note: string; brands: readonly MenuBrand[] };

const MENU_GROUPS: readonly MenuGroup[] = [
  {
    id: 'elite',
    title: 'Elit Saatler',
    note: 'İkonik saat evleri ve seçkin referanslar',
    brands: [
      { name: 'Rolex', href: '/markalar/rolex', source: 'Global referans seçkisi' },
      { name: 'Cartier', href: '/markalar/cartier', source: 'Maison seçkisi' },
      { name: 'TAG Heuer', href: '/markalar/tag-heuer', source: 'Konyalı Saat kaynağı' },
      { name: 'Rado', href: '/markalar/rado', source: 'Konyalı Saat kaynağı' },
    ],
  },
  {
    id: 'other',
    title: 'Diğer Saat Kategorisi',
    note: 'Günlük, sportif ve moda saatleri',
    brands: [
      { name: 'Tissot', href: '/markalar/tissot', source: 'Konyalı Saat kaynağı' },
      { name: 'Carren', href: '/markalar/carren', source: 'Carren · Erkek / Kadın' },
      { name: 'Calvin Klein', href: '/markalar/calvin-klein', source: 'Saat&Saat kaynağı' },
      { name: 'Michael Kors', href: '/markalar/michael-kors', source: 'Saat&Saat kaynağı' },
      { name: 'Versace', href: '/markalar/versace', source: 'Saat&Saat kaynağı' },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<MenuGroupId>('elite');
  const [activeBrand, setActiveBrand] = useState('Rolex');

  const activeGroup = MENU_GROUPS.find((group) => group.id === activeGroupId) ?? MENU_GROUPS[0];
  const activeBrandMeta = activeGroup.brands.find((brand) => brand.name === activeBrand) ?? activeGroup.brands[0];
  const activeProducts = useMemo(
    () => allWatches.filter((watch) => String(watch.brand || '').trim() === activeBrand),
    [activeBrand],
  );
  const brandCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const watch of allWatches) {
      const brand = String(watch.brand || '').trim();
      if (brand) counts.set(brand, (counts.get(brand) ?? 0) + 1);
    }
    return counts;
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase();
      setSearchResults(
        allWatches
          .filter((watch) => `${watch.brand || ''} ${watch.modelName || ''} ${watch.id || ''} ${'ref' in watch ? String(watch.ref ?? '') : ''}`.toLowerCase().includes(q))
          .slice(0, 40),
      );
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen, searchOpen]);

  const selectGroup = (groupId: MenuGroupId) => {
    const group = MENU_GROUPS.find((candidate) => candidate.id === groupId) ?? MENU_GROUPS[0];
    setActiveGroupId(groupId);
    setActiveBrand(group.brands[0].name);
  };

  return (
    <>
      <header className={`${isHomePage ? 'fixed' : 'sticky'} top-0 z-50 w-full transition-all duration-700 ${isScrolled || !isHomePage ? 'border-b border-white/10 bg-[#171615]/95 py-3 backdrop-blur-xl' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 md:px-12">
          <div className="flex flex-1 justify-start">
            <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={menuOpen} aria-controls="saatchi-premium-menu" className="group flex items-center gap-4 text-white md:gap-5">
              <div className="flex h-[14px] w-[22px] flex-col justify-between" aria-hidden="true">
                <span className="h-px w-full bg-white transition-transform duration-300 group-hover:translate-x-1" />
                <span className="h-px w-[70%] bg-white transition-all duration-300 group-hover:w-full" />
                <span className="h-px w-full bg-white transition-transform duration-300 group-hover:-translate-x-1" />
              </div>
              <span className="hidden text-[12px] font-medium uppercase tracking-[0.24em] md:block">Menü</span>
            </button>
          </div>

          <Link href="/" aria-label="SAATCHI ana sayfa">
            <Image src="/logo.png" alt="Saatchi & Saatchi" width={180} height={48} className={`w-auto object-contain invert brightness-0 transition-all duration-700 ${isScrolled || !isHomePage ? 'h-7 md:h-8' : 'h-10 md:h-12'}`} priority />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-6 text-white md:gap-8">
            <Link href="/elit-saat" aria-label="Koleksiyon" className="transition-opacity hover:opacity-65"><Watch className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1} /></Link>
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Ara" className="transition-opacity hover:opacity-65"><Search className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1} /></button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] bg-black/80 transition-opacity duration-500 ${menuOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />

      <aside id="saatchi-premium-menu" className={`fixed inset-y-0 left-0 z-[70] h-[100dvh] w-full transform overflow-hidden border-r border-white/10 bg-[#0b0a09] text-[#f5f0e8] shadow-[40px_0_120px_rgba(0,0,0,.7)] transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] md:w-[94vw] xl:w-[1360px] ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-hidden={!menuOpen}>
        <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] bg-[#0b0a09]">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#0b0a09] px-5 py-4 sm:px-8 md:px-10 md:py-5">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Saatchi & Saatchi" width={125} height={32} className="h-7 w-auto object-contain invert brightness-0" />
              <span className="hidden text-[9px] uppercase tracking-[0.24em] text-[#746d67] sm:inline">İzmir · Est. 20+ years</span>
            </div>
            <button type="button" onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#151311] text-[#d7cec4] transition-colors hover:border-white/35 hover:text-white" aria-label="Menüyü kapat"><X className="h-5 w-5" strokeWidth={1.2} /></button>
          </div>

          <div className="grid min-h-0 grid-rows-[minmax(0,42%)_minmax(0,58%)] bg-[#0b0a09] lg:grid-cols-[330px_minmax(0,1fr)] lg:grid-rows-1 xl:grid-cols-[350px_minmax(0,1fr)_300px]">
            <nav className="min-h-0 overflow-y-auto border-b border-white/10 bg-[#11100f] px-5 py-4 sm:px-8 lg:border-b-0 lg:border-r lg:px-7 lg:py-5" aria-label="Saat kategorileri">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b99064]">Koleksiyonlar</p>
                <Link href="/markalar" onClick={() => setMenuOpen(false)} className="text-[9px] uppercase tracking-[0.18em] text-[#77706a] hover:text-white">Tümü</Link>
              </div>

              <div className="space-y-2.5">
                {MENU_GROUPS.map((group, groupIndex) => {
                  const selected = group.id === activeGroupId;
                  return (
                    <section key={group.id} className={`overflow-hidden rounded-2xl border ${selected ? 'border-[#846b32]/55 bg-[#171410]' : 'border-white/[.08] bg-[#0d0c0b]'}`}>
                      <button type="button" onClick={() => selectGroup(group.id)} className="flex w-full items-start gap-3 px-4 py-2.5 text-left" aria-expanded={selected}>
                        <span className="pt-1 text-[9px] tracking-[0.16em] text-[#6d655e]">0{groupIndex + 1}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[17px] font-medium leading-tight tracking-[-0.02em] text-[#f2ece5]">{group.title}</span>
                          <span className="mt-1 block text-[9px] leading-4 tracking-[0.04em] text-[#80776f]">{group.note}</span>
                        </span>
                        <ChevronRight className={`mt-1 h-4 w-4 shrink-0 text-[#9a856b] transition-transform ${selected ? 'rotate-90' : ''}`} strokeWidth={1.2} />
                      </button>

                      {selected && (
                        <div className="border-t border-white/[.07] px-2 py-1.5">
                          {group.brands.map((brand) => {
                            const active = activeBrand === brand.name;
                            const count = brandCounts.get(brand.name) ?? 0;
                            return (
                              <button key={brand.name} type="button" onClick={() => setActiveBrand(brand.name)} className={`grid w-full grid-cols-[1fr_auto] items-center gap-3 rounded-xl px-3 py-1.5 text-left transition-colors ${active ? 'bg-[#846b32]/15 text-white' : 'text-[#c7bfb6] hover:bg-white/[.04] hover:text-white'}`}>
                                <span className="min-w-0"><span className="block truncate text-[13px] font-medium">{brand.name}</span><span className="mt-0.5 block truncate text-[8px] uppercase tracking-[0.13em] text-[#716a64]">{brand.source}</span></span>
                                <span className="text-[9px] tabular-nums text-[#8f8274]">{count}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </nav>

            <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] bg-[#0b0a09]" aria-label={`${activeBrand} ürünleri`}>
              <div className="border-b border-white/[.08] px-5 py-3 sm:px-8 md:px-10 lg:py-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a38363]">{activeGroup.title}</p>
                    <h2 className="mt-1 text-[clamp(23px,3vw,40px)] font-medium leading-none tracking-[-0.035em] text-white">{activeBrand}</h2>
                    <p className="mt-1.5 text-[9px] tracking-[0.05em] text-[#77706a] sm:text-[10px]">{activeBrandMeta.source}</p>
                  </div>
                  <Link href={activeBrandMeta.href} onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#c8ad7f] hover:text-white">Marka sayfası <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                </div>
              </div>

              <div className="min-h-0 overflow-y-auto overscroll-contain px-3 py-1.5 sm:px-6 md:px-8">
                <div className="divide-y divide-white/[.055]">
                  {activeProducts.map((watch) => (
                    <Link key={String(watch.id || watch.seoUrl)} href={watch.seoUrl} onClick={() => setMenuOpen(false)} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-2 py-2 sm:px-3 hover:bg-white/[.035]">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-medium leading-[1.12] tracking-[-0.01em] text-[#ddd6ce] transition-colors group-hover:text-white sm:text-[12px]">{watch.modelName}</p>
                        <p className="mt-0.5 truncate text-[8px] uppercase tracking-[0.14em] text-[#69625d]">{watch.reference || watch.ref || watch.id}</p>
                      </div>
                      <span className="whitespace-nowrap text-[9px] font-medium tabular-nums text-[#a98d68] sm:text-[10px]">{watch.price}</span>
                    </Link>
                  ))}
                  {!activeProducts.length && <p className="px-3 py-8 text-sm text-[#8b837c]">Bu marka için katalog ürünü bulunamadı.</p>}
                </div>
              </div>
            </section>

            <aside className="hidden min-h-0 flex-col justify-between border-l border-white/10 bg-[radial-gradient(circle_at_72%_14%,rgba(132,107,50,.22),transparent_34%),linear-gradient(160deg,#171410_0%,#0d0c0b_72%)] p-7 xl:flex">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c2a768]">SAATCHI Concierge</p>
                <h3 className="mt-5 text-[31px] font-medium leading-[1.06] tracking-[-0.04em] text-[#f5f0e8]">Saatinizi değil,<br />seçiminizi konuşalım.</h3>
                <p className="mt-5 text-[12px] leading-6 text-[#999189]">Showroom randevusu, ikinci el değerlendirme, takas ve koleksiyon danışmanlığı için doğrudan ekibimize ulaşın.</p>
              </div>
              <div>
                <div className="border-y border-white/10 py-4"><div className="flex items-start gap-3 text-[12px] leading-5 text-[#c9c0b7]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c2a768]" strokeWidth={1.2} /><span>Menderes Caddesi No:231/B<br />Buca / İzmir</span></div></div>
                <a href="https://wa.me/905419305372" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#e7ddd2] hover:text-white">VIP WhatsApp · +90 541 930 53 72 <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/10">
            <Link href="/kurumsal" onClick={() => setMenuOpen(false)} className="group flex min-h-[54px] items-center justify-between bg-[#151312] px-5 py-3 text-sm text-[#e4dcd4] transition-colors hover:bg-[#211719]"><span>Kurumsal</span><ArrowUpRight className="h-4 w-4 text-[#806f68] group-hover:text-[#c2a768]" /></Link>
            <Link href="/iletisim" onClick={() => setMenuOpen(false)} className="group flex min-h-[54px] items-center justify-between bg-[#151312] px-5 py-3 text-sm text-[#e4dcd4] transition-colors hover:bg-[#211719]"><span>İletişim</span><ArrowUpRight className="h-4 w-4 text-[#806f68] group-hover:text-[#c2a768]" /></Link>
          </div>
        </div>
      </aside>

      <div className={`fixed inset-0 z-[70] flex items-start justify-center bg-black/70 px-4 pt-4 backdrop-blur-md transition-all duration-500 md:pt-12 ${searchOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}>
        <div className="absolute inset-0" onClick={() => setSearchOpen(false)} />
        <div className={`relative flex max-h-[calc(100vh-2rem)] w-full max-w-4xl transform flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 md:rounded-3xl ${searchOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-95'}`}>
          <div className="border-b border-gray-100 p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="flex flex-1 items-center rounded-xl border-2 border-slate-800 px-4 py-3 focus-within:border-[#6f2025]"><Search className="h-5 w-5 shrink-0 text-slate-800" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Model, marka veya referans arayın" className="ml-3 w-full bg-transparent text-base font-medium text-slate-800 outline-none placeholder:text-gray-400" autoFocus={searchOpen} /></div>
              <button type="button" onClick={() => setSearchOpen(false)} className="rounded-xl bg-gray-100 p-3 text-slate-800" aria-label="Aramayı kapat"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto whitespace-nowrap">{MENU_GROUPS.flatMap((group) => group.brands).map((brand) => <button type="button" key={brand.name} onClick={() => setSearchQuery(brand.name)} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-slate-700">{brand.name}</button>)}</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between"><h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{searchQuery ? 'Arama sonuçları' : 'Öne çıkan modeller'}</h4><span className="text-xs text-gray-400">{searchResults.length || (searchQuery ? 0 : 5)} Ürün</span></div>
            <div className="space-y-3">{(searchResults.length ? searchResults : allWatches.slice(0, 5)).map((watch, index) => <Link href={watch.seoUrl} key={String(watch.id || index)} onClick={() => setSearchOpen(false)} className="group flex items-center rounded-2xl border border-gray-200 p-3 hover:border-[#6f2025]/35"><div className="relative mr-4 h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-[#fafafa]">{watch.image && <Image unoptimized src={getProxiedImageUrl(watch.image)} alt={watch.modelName} fill sizes="64px" className="object-contain p-1.5" />}</div><div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-wider text-[#846b32]">{watch.brand}</p><p className="truncate text-sm font-semibold text-gray-900">{watch.modelName}</p></div><p className="shrink-0 text-sm font-bold text-[#6f2025]">{watch.price}</p></Link>)}{searchQuery && !searchResults.length && <p className="py-10 text-center text-sm text-gray-500">Uygun model bulunamadı.</p>}</div>
          </div>
        </div>
      </div>
    </>
  );
}
