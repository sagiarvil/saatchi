import re

with open('src/app/saatler/WatchListClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_component = """'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getProxiedImageUrl } from '@/utils/imageProxy';
import { Filter, X, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';

export default function WatchListClient({ initialWatches, initialGender }: { initialWatches: any[], initialGender?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterGender, setFilterGender] = useState(initialGender || '');
  const [sortOption, setSortOption] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const brands = useMemo(() => Array.from(new Set(initialWatches.map(w => w.brand))).filter(Boolean).sort(), [initialWatches]);
  
  const filtered = useMemo(() => {
    let result = initialWatches.filter((w) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const text = `${w.modelName} ${w.brand} ${w.id} ${w.ref || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      if (filterBrand && w.brand !== filterBrand) return false;
      if (filterGender && w.gender !== filterGender) return false;
      if (filterPrice) {
        if (filterPrice === 'low' && w.calculatedPrice > 500000) return false;
        if (filterPrice === 'mid' && (w.calculatedPrice <= 500000 || w.calculatedPrice > 1500000)) return false;
        if (filterPrice === 'high' && w.calculatedPrice <= 1500000) return false;
      }
      return true;
    });

    if (sortOption === 'price-asc') {
      result = result.sort((a, b) => (a.calculatedPrice || 0) - (b.calculatedPrice || 0));
    } else if (sortOption === 'price-desc') {
      result = result.sort((a, b) => (b.calculatedPrice || 0) - (a.calculatedPrice || 0));
    }

    return result;
  }, [initialWatches, filterBrand, filterGender, filterPrice, searchQuery, sortOption]);

  const activeFilterCount = (filterBrand ? 1 : 0) + (filterPrice ? 1 : 0) + (filterGender && filterGender !== initialGender ? 1 : 0) + (searchQuery ? 1 : 0);

  const clearAll = () => {
    setFilterBrand('');
    setFilterPrice('');
    if (!initialGender) setFilterGender('');
    setSearchQuery('');
  };

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileFilterOpen]);

  const FilterContent = () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-[0.2em] mb-4">Arama</h3>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-[#846b32] focus:ring-1 focus:ring-[#846b32]" 
            placeholder="Model, marka ara..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-[0.2em] mb-4">Marka</h3>
        <div className="flex flex-col gap-2.5 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${!filterBrand ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-gray-300 group-hover:border-gray-400'}`}>
              {!filterBrand && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-sm ${!filterBrand ? 'font-medium text-[#1a1a1a]' : 'text-gray-600'}`}>Tüm Markalar</span>
          </label>
          {brands.map(b => (
            <label key={b as string} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${filterBrand === b ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                {filterBrand === b && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className={`text-sm ${filterBrand === b ? 'font-medium text-[#1a1a1a]' : 'text-gray-600'}`}>{b as string}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-[0.2em] mb-4">Fiyat Aralığı</h3>
        <div className="flex flex-col gap-2.5">
          {[
            { id: '', label: 'Tüm Fiyatlar' },
            { id: 'low', label: '500.000 ₺ ve altı' },
            { id: 'mid', label: '500.000 ₺ - 1.500.000 ₺' },
            { id: 'high', label: '1.500.000 ₺ ve üzeri' }
          ].map(opt => (
            <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filterPrice === opt.id ? 'border-[#1a1a1a]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                {filterPrice === opt.id && <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />}
              </div>
              <span className={`text-sm ${filterPrice === opt.id ? 'font-medium text-[#1a1a1a]' : 'text-gray-600'}`}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {!initialGender && (
        <div>
          <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-[0.2em] mb-4">Cinsiyet</h3>
          <div className="flex flex-col gap-2.5">
            {[
              { id: '', label: 'Tümü' },
              { id: 'Erkek', label: 'Erkek' },
              { id: 'Kadın', label: 'Kadın' },
              { id: 'Unisex', label: 'Unisex' }
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filterGender === opt.id ? 'border-[#1a1a1a]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                  {filterGender === opt.id && <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />}
                </div>
                <span className={`text-sm ${filterGender === opt.id ? 'font-medium text-[#1a1a1a]' : 'text-gray-600'}`}>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mt-6">
      
      {/* MOBILE FILTER MODAL */}
      <div className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileFilterOpen(false)} />
      
      <div className={`fixed inset-y-0 right-0 z-50 w-[85vw] max-w-[360px] bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden flex flex-col ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-serif tracking-wide text-[#1a1a1a]">Filtreler</h2>
          <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <FilterContent />
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button onClick={clearAll} className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Temizle
          </button>
          <button onClick={() => setIsMobileFilterOpen(false)} className="flex-1 px-4 py-3 text-sm font-medium text-white bg-[#1a1a1a] rounded-lg hover:bg-black transition-colors">
            Sonuçları Gör ({filtered.length})
          </button>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:block w-[240px] lg:w-[260px] flex-shrink-0">
        <div className="sticky top-[100px]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-serif tracking-wide text-[#1a1a1a]">Filtrele</h2>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="text-xs font-medium text-[#846b32] hover:text-[#6a5528] transition-colors">
                Tümünü Temizle
              </button>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* MAIN CONTENT (GRID) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 h-10 px-4 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtrele
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center bg-[#1a1a1a] text-white text-[10px] rounded-full ml-1">{activeFilterCount}</span>
              )}
            </button>
            <span className="text-sm text-gray-500 font-light hidden sm:block">
              {filtered.length} sonuç bulundu
            </span>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest hidden sm:block">Sırala</label>
            <div className="relative">
              <select 
                className="h-10 pl-4 pr-10 bg-white border border-gray-200 rounded-full text-sm font-medium text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#846b32] shadow-sm cursor-pointer"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Öne Çıkanlar</option>
                <option value="price-asc">Artan Fiyat</option>
                <option value="price-desc">Azalan Fiyat</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ACTIVE FILTERS CHIP BAR */}
        {activeFilterCount > 0 && (
          <div className="hidden md:flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-black"><X className="w-3 h-3" /></button>
              </span>
            )}
            {filterBrand && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
                {filterBrand}
                <button onClick={() => setFilterBrand('')} className="hover:text-black"><X className="w-3 h-3" /></button>
              </span>
            )}
            {filterPrice && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
                {filterPrice === 'low' ? '500K ₺ Altı' : filterPrice === 'mid' ? '500K - 1.5M ₺' : '1.5M ₺ Üzeri'}
                <button onClick={() => setFilterPrice('')} className="hover:text-black"><X className="w-3 h-3" /></button>
              </span>
            )}
            {filterGender && filterGender !== initialGender && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
                {filterGender}
                <button onClick={() => setFilterGender('')} className="hover:text-black"><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <div className="w-16 h-16 mb-4 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
              <Filter className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-lg font-serif text-[#1a1a1a] mb-2">Sonuç Bulunamadı</h3>
            <p className="text-sm text-gray-500 max-w-md mb-6">Seçtiğiniz filtrelere uygun saat bulunmuyor. Farklı kombinasyonlar deneyebilirsiniz.</p>
            <button onClick={clearAll} className="px-6 py-2.5 bg-[#1a1a1a] text-white text-sm font-medium rounded-full hover:bg-black transition-colors">
              Filtreleri Temizle
            </button>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(watch => (
            <Link key={watch.id} href={watch.seoUrl} className="group flex flex-col bg-white border border-[#E1DCD2]/90 rounded-none overflow-hidden transition-all duration-[450ms] ease-out hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08),0_0_0_1px_rgba(132,107,50,0.4)] hover:-translate-y-1">
              <div className="relative w-full aspect-[4/5] bg-[radial-gradient(circle_at_50%_50%,#ffffff_30%,#f9f8f6_100%)] border-b border-[#F0ECE4]/85 overflow-hidden">
                {watch.image ? (
                  <img src={getProxiedImageUrl(watch.image)} alt={watch.modelName} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-foreground/40 font-serif">Görsel Yok</div>
                )}
              </div>
              <div className="flex flex-col flex-1 px-4 py-5 text-left">
                <h3 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#846b32] mb-1.5">{watch.brand}</h3>
                <p className="text-[13px] md:text-[14px] font-medium text-[#1a1a1a] leading-relaxed mb-3 line-clamp-2 flex-1">{watch.modelName}</p>
                <div className="text-[15px] md:text-[17px] font-serif text-[#1a1a1a] tracking-tight mt-auto flex items-center justify-between">
                  {watch.price}
                  <span className="text-gray-300 group-hover:text-[#846b32] transition-colors">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
"""

with open('src/app/saatler/WatchListClient.tsx', 'w', encoding='utf-8') as f:
    f.write(new_component)

print("Updated WatchListClient.tsx successfully")
