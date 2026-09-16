import WatchListClient from '@/app/saatler/WatchListClient';
import elitSaatlerData from '@/data/elit-saatler.json';

export const metadata = {
  title: 'Elit Kategori Lüks Saat Evleri | Saatchi & Semih Sonbahar',
  description: 'Rolex, Omega, Patek Philippe, Audemars Piguet ve dünyanın zirvesindeki lüks saat üreticilerinden eşsiz bir koleksiyon.',
};

export default function ElitSaatlerPage() {
  const allWatches = elitSaatlerData as any[];

  return (
    <div className="min-h-screen bg-background border-t border-surface-border">
      <main className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3 text-center">Elit Kategori Lüks Saat Evleri</h1>
        <p className="text-foreground/70 mb-10 text-center">Dünyanın zirvesindeki lüks saat üreticilerinden eşsiz bir koleksiyon.</p>

        {/* GRID (Reuse the WatchListClient) */}
        <WatchListClient initialWatches={allWatches} />
      </main>
    </div>
  );
}
