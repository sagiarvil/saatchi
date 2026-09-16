import WatchListClient from './WatchListClient';
import watches from '@/data/elit-saatler.json';

export default function SaatlerPage() {
  return (
    <div className="min-h-screen bg-background border-t border-surface-border">
      <main className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3 text-center">Lüks Saat Koleksiyonu</h1>
        <p className="text-foreground/70 mb-10 text-center">Dünyanın en prestijli saat markaları Saatchi & Semih Sonbahar güvencesiyle.</p>
        <WatchListClient initialWatches={watches} />
      </main>
    </div>
  );
}
