import WatchListClient from '@/app/saatler/WatchListClient';
import elitSaatlerData from '@/data/elit-saatler.json';

export const metadata = {
  title: 'Elit Kategori Lüks Saat Evleri | Saatchi & Semih Sonbahar',
  description: 'Rolex, Omega, Patek Philippe, Audemars Piguet ve dünyanın zirvesindeki lüks saat üreticilerinden eşsiz bir koleksiyon.',
};

export default function ElitSaatlerPage() {
  const allWatches = elitSaatlerData as any[];

  return (
    <div className="bg-background min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">

        {/* GRID (Reuse the WatchListClient we fixed earlier) */}
        <WatchListClient initialWatches={allWatches} />
      </div>
    </div>
  );
}
