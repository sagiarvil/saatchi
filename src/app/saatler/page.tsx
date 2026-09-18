import UniversalTopFilterClient from '@/components/shared/UniversalTopFilterClient';
import watches from '@/data/saatler.json';

export const metadata = {
  title: 'Saat Koleksiyonu | Saatchi & Semih Sonbahar',
  description: 'Tissot, Carren, Calvin Klein, Michael Kors ve Versace saat modellerini keşfedin.',
};

export default function SaatlerPage() {
  const allWatches = (watches as any[]).filter((watch) => Number(watch.calculatedPrice || 0) <= 1700000);

  return (
    <div className="min-h-screen bg-background border-t border-surface-border">
      <main className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">SAATCHI / Saat</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-serif text-foreground mb-3 text-center">Saat Koleksiyonu</h1>
        <p className="text-foreground/70 mb-10 text-center max-w-3xl mx-auto">Tissot, Carren, Calvin Klein, Michael Kors ve Versace seçkisi. Referans kaynak fiyatları SAATCHI fiyatlama kuralı ile güncellenir.</p>
        <UniversalTopFilterClient initialWatches={allWatches} />
      </main>
    </div>
  );
}
