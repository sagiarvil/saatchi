import WatchListClient from '@/app/saatler/WatchListClient';
import watches from '@/data/saatler.json';

export const metadata = {
  title: 'Carren Kadın Saatleri | Saatchi',
  description: 'Carren kadın saat modelleri ve kaynak doğrulamalı SAATCHI seçkisi.',
};

export default function CarrenWomenPage() {
  const filtered = (watches as any[]).filter((watch) =>
    watch.brand === 'Carren' && watch.gender === 'Kadın' && Number(watch.calculatedPrice || 0) <= 1700000
  );

  return (
    <div className="min-h-screen bg-background border-t border-surface-border">
      <main className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d5f62]">SAATCHI / Carren</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-serif text-foreground mb-3 text-center">Carren Kadın</h1>

        <WatchListClient initialWatches={filtered} initialGender="Kadın" />
      </main>
    </div>
  );
}
