import WatchListClient from './WatchListClient';
import watches from '@/data/elit-saatler.json';

export default function SaatlerPage() {
  return (
    <div className="min-h-screen bg-background border-t border-surface-border">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-serif text-foreground mb-4">Lüks Saat Koleksiyonu</h1>
        <p className="text-foreground/70 mb-12">Dünyanın en prestijli saat markaları Saatchi & Semih Sonbahar güvencesiyle.</p>
        <WatchListClient initialWatches={watches} />
      </main>
    </div>
  );
}
