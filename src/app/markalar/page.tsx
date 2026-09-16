import Link from 'next/link';

const BRANDS = [
  { name: 'Rolex', slug: 'rolex' },
  { name: 'Cartier', slug: 'cartier' },
  { name: 'TAG Heuer', slug: 'tag-heuer' },
  { name: 'Rado', slug: 'rado' },
  { name: 'Tissot', slug: 'tissot' }
];

export default function MarkalarPage() {
  return (
    <div className="bg-background min-h-screen border-t border-surface-border">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.2em] text-center">
          Markalar
        </h1>

        <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto font-light">
          Saatchi seçkisindeki saat markalarını keşfedin.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {BRANDS.map((brand) => (
            <Link
              href={`/markalar/${brand.slug}`}
              key={brand.slug}
              className="group bg-surface border border-surface-border p-8 hover:shadow-2xl hover:border-primary transition-all duration-500 flex items-center justify-center h-32"
            >
              <h2 className="text-foreground font-serif tracking-widest uppercase text-center group-hover:text-primary transition-colors text-sm md:text-base">
                {brand.name}
              </h2>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
