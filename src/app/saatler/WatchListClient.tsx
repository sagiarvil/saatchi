'use client';
import { useState, useMemo } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { getProxiedImageUrl } from '@/utils/imageProxy';

export default function WatchListClient({ initialWatches, initialGender = '' }: { initialWatches: any[], initialGender?: string }) {
  const [filterBrand, setFilterBrand] = useState('');
  const [filterGender, setFilterGender] = useState(initialGender);
  const [filterPrice, setFilterPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const brands = Array.from(new Set(initialWatches.map(w => w.brand))).sort();

  const filtered = useMemo(() => {
    return initialWatches.filter(w => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchStr = `${w.brand || ''} ${w.modelName || ''} ${w.id || ''} ${w.ref || ''}`.toLowerCase();
        if (!searchStr.includes(query)) return false;
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
  }, [initialWatches, filterBrand, filterGender, filterPrice, searchQuery]);

  return (
    <div className="flex flex-col">
      {/* EVRENSEL LÜKS SAAT FİLTRELEME ALANI (TÜM SAATLER) */}
      <div className="relative bg-white border border-[#C2A768]/35 rounded-[16px] px-6 py-5 mb-7 shadow-[0_8px_30px_rgba(5,51,47,0.04),0_1px_4px_rgba(0,0,0,0.02)] backdrop-blur-md overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#042926] via-[#C2A768] to-[#042926]"></div>
        
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <div className="relative flex-1 min-w-[320px] flex items-center">
            <svg className="absolute left-3.5 text-[#C2A768] pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              className="w-full h-[46px] pl-[42px] pr-10 bg-[#FAF8F5] border border-[#05332f]/10 rounded-[10px] text-sm text-[#1C1917] transition-all focus:outline-none focus:bg-white focus:border-[#C2A768] focus:shadow-[0_0_0_3px_rgba(194,167,104,0.2)]" 
              placeholder="Model, marka, referans kodu ara..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-wrap">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mr-2">Marka:</label>
              <select className="h-[42px] bg-[#FAF8F5] border border-[#05332f]/10 rounded-[8px] text-[13px] font-semibold text-[#1C1917] px-3 outline-none focus:border-[#C2A768] min-w-[140px]" value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
                <option value="">⭐ Tüm Markalar</option>
                {brands.map(b => (
                  <option key={b as string} value={b as string}>{b as string}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mr-2">Fiyat:</label>
              <select className="h-[42px] bg-[#FAF8F5] border border-[#05332f]/10 rounded-[8px] text-[13px] font-semibold text-[#1C1917] px-3 outline-none focus:border-[#C2A768] min-w-[140px]" value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
                <option value="">Tüm Fiyatlar</option>
                <option value="low">500.000 ₺ ve altı</option>
                <option value="mid">500.000 ₺ - 1.500.000 ₺</option>
                <option value="high">1.500.000 ₺ ve üzeri</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mr-2">Sıralama:</label>
              <select className="h-[42px] bg-[#FAF8F5] border border-[#05332f]/10 rounded-[8px] text-[13px] font-semibold text-[#1C1917] px-3 outline-none focus:border-[#C2A768] min-w-[140px]">
                <option value="default">Öne Çıkanlar</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap items-center mt-3.5 mb-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <button className={`inline-flex items-center justify-center gap-1.5 px-[18px] py-2 rounded-full text-[12.5px] font-bold tracking-wide transition-all border ${!filterBrand ? 'bg-[#042926] text-white border-[#042926]' : 'bg-white text-[#1C1917] border-[#C2A768]/45 hover:border-[#C2A768]'}`} onClick={() => setFilterBrand('')}>
            ⭐ Tümü ({initialWatches.length})
          </button>
          {brands.map((b) => (
            <button key={b as string} className={`inline-flex items-center justify-center gap-1.5 px-[18px] py-2 rounded-full text-[12.5px] font-bold tracking-wide transition-all border ${filterBrand === b ? 'bg-[#042926] text-white border-[#042926]' : 'bg-white text-[#1C1917] border-[#C2A768]/45 hover:border-[#C2A768]'}`} onClick={() => setFilterBrand(b as string)}>
              {b as string}
            </button>
          ))}
        </div>

        <div className="h-px w-full bg-[#C2A768]/30 mb-4 rounded-full"></div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f1f5f9] rounded-lg">
            <span className="text-[12.5px] font-bold text-[#334155]">⏱️ {filtered.length} Model Listeleniyor</span>
          </div>
          {(filterBrand || filterPrice || filterGender || searchQuery) && (
            <button className="text-[11px] font-bold tracking-wider uppercase text-red-600 px-3 py-1.5 border border-red-200 rounded-lg hover:bg-red-50 transition-colors" onClick={() => { setFilterBrand(''); setFilterPrice(''); setFilterGender(''); setSearchQuery(''); }}>
              Filtreleri Temizle ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-[26px]">
        {filtered.map(watch => (
          <Link key={watch.id} href={watch.seoUrl} className="group relative flex flex-col bg-[#FFFFFF] border border-[#E1DCD2]/90 rounded-[12px] md:rounded-[14px] overflow-hidden transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_36px_-4px_rgba(28,43,38,0.10),0_0_0_1px_rgba(197,160,89,0.55)] hover:-translate-y-[6px] hover:border-[#C5A059]/60 shadow-[0_4px_14px_rgba(0,0,0,0.04)]">
            <div className="relative w-full pt-[100%] bg-[radial-gradient(circle_at_50%_50%,#ffffff_30%,#f7f5f0_100%)] border-b border-[#F0ECE4]/85 overflow-hidden">
              {watch.image ? (
                <img src={getProxiedImageUrl(watch.image)} alt={watch.modelName} className="absolute inset-0 w-full h-full object-contain p-[14px] transition-transform duration-500 ease-out group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-foreground/40 font-serif">Görsel Yok</div>
              )}
            </div>
            <div className="flex flex-col flex-1 px-[10px] py-[14px] text-left items-start justify-between">
              <div className="w-full">
                <h3 className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-[#8A7039] mb-1">{watch.brand}</h3>
                <p className="text-[13px] md:text-[15.5px] font-semibold text-[#1C1917] leading-snug mb-1 md:mb-2 line-clamp-2 min-h-[36px] md:min-h-[44px]">{watch.modelName}</p>
                <p className="text-[10.5px] md:text-[11.5px] font-medium text-[#9CA3AF] mb-3 truncate">{watch.id}</p>
              </div>
              <div className="text-[16px] md:text-[18px] font-bold text-[#042926] tracking-tight mt-auto">
                {watch.price}
              </div>
              <div className="text-[14px] text-[#042926]">→</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
