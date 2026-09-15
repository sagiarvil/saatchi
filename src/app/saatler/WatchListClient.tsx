'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function WatchListClient({ initialWatches }: { initialWatches: any[] }) {
  const [filterBrand, setFilterBrand] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  const brands = Array.from(new Set(initialWatches.map(w => w.brand))).sort();

  const filtered = useMemo(() => {
    return initialWatches.filter(w => {
      if (filterBrand && w.brand !== filterBrand) return false;
      if (filterGender && w.gender !== filterGender) return false;
      if (filterPrice) {
        if (filterPrice === 'low' && w.calculatedPrice > 500000) return false;
        if (filterPrice === 'mid' && (w.calculatedPrice <= 500000 || w.calculatedPrice > 1500000)) return false;
        if (filterPrice === 'high' && w.calculatedPrice <= 1500000) return false;
      }
      return true;
    });
  }, [initialWatches, filterBrand, filterGender, filterPrice]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-8">
        <div>
          <h3 className="font-serif text-lg text-foreground mb-4 border-b border-surface-border pb-2">Cinsiyet</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer hover:text-primary">
              <input type="radio" name="gender" checked={filterGender === ''} onChange={() => setFilterGender('')} /> Tüm Saatler
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer hover:text-primary">
              <input type="radio" name="gender" checked={filterGender === 'Erkek'} onChange={() => setFilterGender('Erkek')} /> Erkek Saatleri
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer hover:text-primary">
              <input type="radio" name="gender" checked={filterGender === 'Kadın'} onChange={() => setFilterGender('Kadın')} /> Kadın Saatleri
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg text-foreground mb-4 border-b border-surface-border pb-2">Marka</h3>
          <select 
            className="w-full p-3 bg-surface border border-surface-border rounded text-sm text-foreground focus:outline-none focus:border-primary"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">Tüm Markalar</option>
            {brands.map(b => (
              <option key={b as string} value={b as string}>{b as string}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-serif text-lg text-foreground mb-4 border-b border-surface-border pb-2">Fiyat Aralığı</h3>
          <select 
            className="w-full p-3 bg-surface border border-surface-border rounded text-sm text-foreground focus:outline-none focus:border-primary"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value="">Tüm Fiyatlar</option>
            <option value="low">500.000 ₺ ve altı</option>
            <option value="mid">500.000 ₺ - 1.500.000 ₺</option>
            <option value="high">1.500.000 ₺ ve üzeri</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1">
        <div className="mb-4 text-sm text-foreground/60">{filtered.length} sonuç bulundu.</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(watch => (
            <Link key={watch.id} href={watch.seoUrl} className="group bg-surface border border-surface-border rounded-xl p-4 flex flex-col hover:border-primary hover:shadow-xl transition-all duration-300">
              <div className="w-full aspect-square relative mb-4 rounded-lg overflow-hidden bg-white flex items-center justify-center p-4">
                {watch.image ? (
                  <img src={watch.image} alt={watch.modelName} className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="text-xs text-foreground/40 font-serif">Görsel Yok</div>
                )}
                {watch.gender && (
                  <span className="absolute top-2 left-2 bg-primary text-white text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm">
                    {watch.gender}
                  </span>
                )}
              </div>
              <h3 className="text-primary text-[10px] tracking-widest uppercase mb-1 font-bold text-center">{watch.brand}</h3>
              <h4 className="text-foreground font-serif text-center mb-3 line-clamp-2 h-10 leading-tight text-sm">{watch.modelName}</h4>
              <div className="mt-auto pt-3 border-t border-surface-border text-center">
                <span className="text-base font-serif text-foreground font-semibold">{watch.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
