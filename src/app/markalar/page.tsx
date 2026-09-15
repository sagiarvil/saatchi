import Link from 'next/link';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';

export default async function MarkalarPage() {
  let allWatches: any[] = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];
  // Extract unique brands
  const brandsSet = new Set<string>();
  allWatches.forEach(w => {
    if (w.brand) brandsSet.add(w.brand);
  });
  const brands = Array.from(brandsSet).sort();

  return (
    <div className="bg-background min-h-screen border-t border-surface-border">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.2em] text-center">Tüm Markalar</h1>
        <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto font-light">Dünyanın en prestijli saat üreticilerinin koleksiyonlarını keşfedin.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brands.map((brand, idx) => {
            const brandSlug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return (
              <Link href={`/markalar/${brandSlug}`} key={idx} className="group bg-surface border border-surface-border p-8 hover:shadow-2xl hover:border-primary transition-all duration-500 flex items-center justify-center h-32">
                <h3 className="text-foreground font-serif tracking-widest uppercase text-center group-hover:text-primary transition-colors text-sm md:text-base">
                  {brand}
                </h3>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  );
}
