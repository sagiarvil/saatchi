import WatchListClient from '@/app/saatler/WatchListClient';
import elitSaatlerData from '@/data/elit-saatler.json';

export const metadata = {
  title: 'Elit Kategori | Rolex, Cartier, TAG Heuer, Rado | Saatchi',
  description: 'Rolex, Cartier, TAG Heuer ve Rado seçkilerinden oluşan SAATCHI Elit Kategori.',
};

const ELITE_BRANDS = new Set(['Rolex', 'Cartier', 'TAG Heuer', 'Rado']);
const NO_CAP_BRANDS = new Set(['Rolex', 'Cartier']);
const MAX_CATALOG_PRICE = 1_799_000;

export default function ElitSaatlerPage() {
  const allWatches = (elitSaatlerData as any[]).filter((watch) => {
    const brand = String(watch.brand || '');
    const price = Number(watch.calculatedPrice || 0);
    if (!ELITE_BRANDS.has(brand) || price <= 0) return false;
    return NO_CAP_BRANDS.has(brand) || price <= MAX_CATALOG_PRICE;
  });

  return (
    <div className="min-h-screen bg-background border-t border-surface-border">
      <main className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d5f62]">SAATCHI / Elite</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-serif text-foreground mb-3 text-center">Elit Kategori</h1>
        <p className="text-foreground/70 mb-10 text-center max-w-3xl mx-auto">Rolex, Cartier, TAG Heuer ve Rado. Seçili referanslar, doğrulanmış kaynak ve kontrollü fiyat politikasıyla tek koleksiyonda.</p>
        <WatchListClient initialWatches={allWatches} />
      </main>
    </div>
  );
}
