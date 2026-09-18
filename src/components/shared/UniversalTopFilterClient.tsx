'use client';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProxiedImageUrl } from '@/utils/imageProxy';

type Watch = any;

const KNOWN_COLLECTIONS = [
  'Datejust', 'Submariner', 'GMT-Master', 'Daytona', 'Explorer', 'Oyster Perpetual', 'Yacht-Master', 'Day-Date', 'Sky-Dweller',
  'Carrera', 'Aquaracer', 'Formula 1', 'Monaco', 'Link', 'Autavia',
  'Centrix', 'True', 'Captain Cook', 'Florence', 'Integral', 'HyperChrome',
  'PRX', 'Seastar', 'Le Locle', 'Gentleman', 'T-Touch', 'T-Classic', 'T-Sport'
];

export default function UniversalTopFilterClient({ initialWatches, isBrandPage = false }: { initialWatches: Watch[], isBrandPage?: boolean }) {
  const [filterBrand, setFilterBrand] = useState<string[]>([]);
  const [filterCollection, setFilterCollection] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.filter-dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const enrichedWatches = useMemo(() => {
    return initialWatches.map(w => {
      let col = 'Diğer';
      for (const known of KNOWN_COLLECTIONS) {
        if (w.modelName && w.modelName.toUpperCase().includes(known.toUpperCase())) {
          col = known;
          break;
        }
      }
      return { ...w, collection: col };
    });
  }, [initialWatches]);

  const availableBrands = useMemo(() => Array.from(new Set(enrichedWatches.map(w => w.brand))).filter(Boolean).sort(), [enrichedWatches]);
  const availableCollections = useMemo(() => Array.from(new Set(enrichedWatches.map(w => w.collection))).filter(c => c !== 'Diğer').sort(), [enrichedWatches]);

  const filteredAndSorted = useMemo(() => {
    let result = enrichedWatches.filter(w => {
      if (filterBrand.length > 0 && !filterBrand.includes(w.brand)) return false;
      if (filterCollection.length > 0 && !filterCollection.includes(w.collection)) return false;
      if (filterPrice.length > 0) {
        const p = Number(w.calculatedPrice || 0);
        const match = filterPrice.some(range => {
          if (range === 'low') return p <= 250000;
          if (range === 'mid') return p > 250000 && p <= 750000;
          if (range === 'high') return p > 750000;
          return false;
        });
        if (!match) return false;
      }
      return true;
    });

    if (sortOrder === 'price-asc') result.sort((a, b) => Number(a.calculatedPrice || 0) - Number(b.calculatedPrice || 0));
    else if (sortOrder === 'price-desc') result.sort((a, b) => Number(b.calculatedPrice || 0) - Number(a.calculatedPrice || 0));

    return result;
  }, [enrichedWatches, filterBrand, filterCollection, filterPrice, sortOrder]);

  const toggleFilter = (setter: any, value: string, current: string[]) => {
    if (current.includes(value)) setter(current.filter((v: string) => v !== value));
    else setter([...current, value]);
  };

  const getActiveFiltersCount = () => filterBrand.length + filterCollection.length + filterPrice.length;

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const clearAll = () => {
    setFilterBrand([]);
    setFilterCollection([]);
    setFilterPrice([]);
    setSortOrder('default');
    setActiveDropdown(null);
  };

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const DropdownButton = ({ title, activeCount, name }: { title: string, activeCount: number, name: string }) => (
    <button onClick={(e) => toggleDropdown(name, e)} className={`flex items-center gap-2 px-5 py-3 border rounded-full text-[11px] font-bold tracking-widest uppercase transition-all shadow-sm ${activeDropdown === name || activeCount > 0 ? 'border-primary text-primary bg-primary/5' : 'border-surface-border text-foreground/80 hover:border-foreground/30 hover:text-foreground bg-surface'}`}>
      {title}
      {activeCount > 0 && <span className="bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px]">{activeCount}</span>}
      <svg className={`w-3.5 h-3.5 transition-transform opacity-70 ${activeDropdown === name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </button>
  );

  return (
    <div className="w-full flex flex-col relative">
      {/* DESKTOP FILTER BAR */}
      <div className="hidden md:flex flex-col mb-10 pb-6 border-b border-surface-border filter-dropdown-container relative z-30">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            
            {!isBrandPage && availableBrands.length > 1 && (
              <div className="relative">
                <DropdownButton title="Marka" activeCount={filterBrand.length} name="brand" />
                {activeDropdown === 'brand' && (
                  <div className="absolute top-[120%] left-0 w-64 bg-surface border border-surface-border rounded-xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                      {availableBrands.map(b => (
                        <label key={b as string} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-4 h-4 border flex items-center justify-center rounded-[3px] transition-colors ${filterBrand.includes(b as string) ? 'bg-primary border-primary' : 'border-surface-border group-hover:border-primary/50'}`}>
                            {filterBrand.includes(b as string) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className="text-sm text-foreground/80 group-hover:text-foreground">{b as string}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {availableCollections.length > 0 && (
              <div className="relative">
                <DropdownButton title="Koleksiyon" activeCount={filterCollection.length} name="collection" />
                {activeDropdown === 'collection' && (
                  <div className="absolute top-[120%] left-0 w-64 bg-surface border border-surface-border rounded-xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2">
                      {availableCollections.map(c => (
                        <label key={c as string} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-4 h-4 border flex items-center justify-center rounded-[3px] transition-colors ${filterCollection.includes(c as string) ? 'bg-primary border-primary' : 'border-surface-border group-hover:border-primary/50'}`}>
                            {filterCollection.includes(c as string) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className="text-sm text-foreground/80 group-hover:text-foreground">{c as string}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="relative">
              <DropdownButton title="Fiyat" activeCount={filterPrice.length} name="price" />
              {activeDropdown === 'price' && (
                <div className="absolute top-[120%] left-0 w-64 bg-surface border border-surface-border rounded-xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex flex-col gap-4">
                    {[ {l: 'low', t: '250.000 ₺ altı'}, {l: 'mid', t: '250.000 ₺ - 750.000 ₺'}, {l: 'high', t: '750.000 ₺ üzeri'} ].map(p => (
                      <label key={p.l} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 border flex items-center justify-center rounded-[3px] transition-colors ${filterPrice.includes(p.l) ? 'bg-primary border-primary' : 'border-surface-border group-hover:border-primary/50'}`}>
                          {filterPrice.includes(p.l) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className="text-sm text-foreground/80 group-hover:text-foreground">{p.t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <DropdownButton title="Sıralama" activeCount={sortOrder !== 'default' ? 1 : 0} name="sort" />
              {activeDropdown === 'sort' && (
                <div className="absolute top-[120%] left-0 w-56 bg-surface border border-surface-border rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex flex-col gap-1">
                    {[ {v: 'default', t: 'Önerilen'}, {v: 'price-asc', t: 'Fiyat: Artan'}, {v: 'price-desc', t: 'Fiyat: Azalan'} ].map(s => (
                      <button key={s.v} onClick={() => { setSortOrder(s.v); setActiveDropdown(null); }} className={`px-4 py-2.5 text-left text-sm rounded-lg transition-colors ${sortOrder === s.v ? 'bg-primary/5 text-primary font-bold' : 'text-foreground/80 hover:bg-surface-border/50 hover:text-foreground'}`}>
                        {s.t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="flex items-center gap-5">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/40">{filteredAndSorted.length} MODEL</span>
            {getActiveFiltersCount() > 0 && (
              <button onClick={clearAll} className="text-[10px] font-bold tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors underline underline-offset-4">Temizle</button>
            )}
          </div>
        </div>
        
        {/* Active Filters Summary */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {filterBrand.map(b => (
              <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-border/50 rounded-full text-[11px] font-semibold text-foreground/80">
                {b} <button onClick={() => toggleFilter(setFilterBrand, b, filterBrand)} className="hover:text-foreground ml-1">×</button>
              </span>
            ))}
            {filterCollection.map(c => (
              <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-border/50 rounded-full text-[11px] font-semibold text-foreground/80">
                {c} <button onClick={() => toggleFilter(setFilterCollection, c, filterCollection)} className="hover:text-foreground ml-1">×</button>
              </span>
            ))}
            {filterPrice.map(p => (
              <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-border/50 rounded-full text-[11px] font-semibold text-foreground/80">
                {p === 'low' ? '250k altı' : p === 'mid' ? '250k-750k' : '750k üzeri'} 
                <button onClick={() => toggleFilter(setFilterPrice, p, filterPrice)} className="hover:text-foreground ml-1">×</button>
              </span>
            ))}
            {sortOrder !== 'default' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-border/50 rounded-full text-[11px] font-semibold text-foreground/80">
                {sortOrder === 'price-asc' ? 'Artan' : 'Azalan'} 
                <button onClick={() => setSortOrder('default')} className="hover:text-foreground ml-1">×</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* MOBILE FILTER BAR */}
      <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-surface-border sticky top-16 z-30 bg-background/95 backdrop-blur-md pt-2">
        <button onClick={() => setIsMobileOpen(true)} className="flex items-center gap-2.5 px-5 py-2.5 bg-foreground text-background rounded-full text-[11px] font-bold tracking-widest uppercase shadow-md active:scale-95 transition-transform">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          Filtrele {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
        </button>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/50">{filteredAndSorted.length} MODEL</span>
      </div>

      {/* MOBILE FILTER MODAL */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background md:hidden animate-in slide-in-from-bottom-8 duration-300">
          <div className="flex items-center justify-between p-5 border-b border-surface-border">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-foreground">Filtrele</h2>
            <button onClick={() => setIsMobileOpen(false)} className="p-2 text-foreground/60 hover:text-foreground bg-surface rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 pb-28">
            
            {!isBrandPage && availableBrands.length > 1 && (
              <div className="mb-10">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-5">Marka</h3>
                <div className="flex flex-col gap-4">
                  {availableBrands.map(b => (
                    <label key={b as string} className="flex items-center gap-4 cursor-pointer group">
                      <div className={`w-5 h-5 border flex items-center justify-center rounded-[4px] transition-colors ${filterBrand.includes(b as string) ? 'bg-primary border-primary' : 'border-surface-border group-hover:border-primary/50'}`}>
                        {filterBrand.includes(b as string) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-[15px] font-medium text-foreground/90">{b as string}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {availableCollections.length > 0 && (
              <div className="mb-10">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-5">Koleksiyon</h3>
                <div className="flex flex-col gap-4">
                  {availableCollections.map(c => (
                    <label key={c as string} className="flex items-center gap-4 cursor-pointer group">
                      <div className={`w-5 h-5 border flex items-center justify-center rounded-[4px] transition-colors ${filterCollection.includes(c as string) ? 'bg-primary border-primary' : 'border-surface-border group-hover:border-primary/50'}`}>
                        {filterCollection.includes(c as string) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-[15px] font-medium text-foreground/90">{c as string}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-5">Fiyat</h3>
              <div className="flex flex-col gap-4">
                {[ {l: 'low', t: '250.000 ₺ altı'}, {l: 'mid', t: '250.000 ₺ - 750.000 ₺'}, {l: 'high', t: '750.000 ₺ üzeri'} ].map(p => (
                  <label key={p.l} className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-5 h-5 border flex items-center justify-center rounded-[4px] transition-colors ${filterPrice.includes(p.l) ? 'bg-primary border-primary' : 'border-surface-border group-hover:border-primary/50'}`}>
                      {filterPrice.includes(p.l) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-[15px] font-medium text-foreground/90">{p.t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-5">Sıralama</h3>
              <div className="flex flex-col gap-2">
                {[ {v: 'default', t: 'Önerilen'}, {v: 'price-asc', t: 'Fiyat: Düşükten Yükseğe'}, {v: 'price-desc', t: 'Fiyat: Yüksekten Düşüğe'} ].map(s => (
                  <button key={s.v} onClick={() => setSortOrder(s.v)} className={`w-full px-5 py-3.5 border rounded-xl text-[14px] font-bold transition-colors ${sortOrder === s.v ? 'bg-primary border-primary text-white' : 'border-surface-border text-foreground/80 bg-surface/50'}`}>
                    {s.t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 p-5 bg-background/95 backdrop-blur-md border-t border-surface-border flex gap-4 z-50">
            <button onClick={clearAll} className="px-2 py-4 text-[12px] font-bold uppercase tracking-widest text-foreground/60 w-1/3">Temizle</button>
            <button onClick={() => setIsMobileOpen(false)} className="py-4 bg-foreground text-background rounded-xl text-[12px] font-bold uppercase tracking-widest w-2/3 shadow-xl flex items-center justify-center gap-2">
              Sonuçları Göster <span className="bg-background/20 px-2 py-0.5 rounded-full text-[10px]">{filteredAndSorted.length}</span>
            </button>
          </div>
        </div>
      )}

      {/* GRID */}
      {filteredAndSorted.length === 0 ? (
        <div className="text-center text-foreground/50 py-32 border border-surface-border rounded-2xl bg-surface/30">
          <svg className="w-12 h-12 mx-auto mb-4 text-foreground/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <p className="font-serif text-lg">Sonuç Bulunamadı</p>
          <p className="text-sm mt-2">Lütfen filtreleri esneterek tekrar deneyin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {filteredAndSorted.map((watch, idx) => {
            const watchSlug = String(watch.seoUrl || '').split('/').filter(Boolean).pop() || String(watch.id || idx);
            const isElit = String(watch.category || '').toLowerCase().includes('elit') || ['Rolex', 'Cartier', 'TAG Heuer', 'Rado'].includes(String(watch.brand || ''));
            const linkUrl = isElit ? `/elit-saat/${watchSlug}` : `/saatler/${watchSlug}`;

            return (
              <Link href={linkUrl} key={String(watch.id || idx)} className="group bg-surface rounded-xl md:rounded-2xl border border-surface-border overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-primary/30 transition-all duration-500 flex flex-col relative">
                <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#FAFAFA] flex items-center justify-center border-b border-surface-border/50">
                  <div className="absolute top-4 left-4 z-10 bg-foreground text-background text-[9px] font-bold tracking-[0.25em] px-2.5 py-1 rounded-[3px] uppercase opacity-90">{isElit ? 'ELITE' : 'SAAT'}</div>
                  {watch.image ? (
                    <Image unoptimized src={getProxiedImageUrl(watch.image)} alt={watch.modelName} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-6 md:p-10 group-hover:scale-[1.05] transition-transform duration-700 ease-out mix-blend-multiply drop-shadow-sm" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4">
                      <span className="text-foreground/30 text-[10px] tracking-widest uppercase font-bold text-center">{watch.brand || 'SAATCHI'}</span>
                    </div>
                  )}
                </div>
                <div className="text-center p-5 md:p-6 flex flex-col flex-grow items-center justify-between">
                  <div className="w-full">
                    <p className="text-primary text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase mb-2 md:mb-3">{watch.brand}</p>
                    <h2 className="text-xs md:text-[15px] font-serif font-medium text-foreground/90 mb-4 leading-relaxed group-hover:text-primary transition-colors line-clamp-2 min-h-[36px] md:min-h-[46px]">{watch.modelName}</h2>
                  </div>
                  <div className="w-full pt-4 border-t border-surface-border/60 mt-auto">
                    <p className="text-[14px] md:text-[16px] font-serif text-foreground font-semibold">{watch.price}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
