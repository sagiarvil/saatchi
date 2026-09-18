import Link from 'next/link';
import Image from 'next/image';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import { getProxiedImageUrl } from '@/utils/imageProxy';

const MAX_CATALOG_PRICE = 1_700_000;
const ELITE_BRANDS = new Set(['Rolex', 'Cartier', 'TAG Heuer', 'Rado']);
const NO_CAP_BRANDS = new Set(['Rolex', 'Cartier']);

function brandSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function allowedCatalog() {
  return [...(saatlerData as any[]), ...(elitSaatlerData as any[])].filter((watch) => {
    const brand = String(watch.brand || '');
    const price = Number(watch.calculatedPrice || 0);
    if (price <= 0) return false;
    return price <= MAX_CATALOG_PRICE;
  });
}

export async function generateStaticParams() {
  const brandsSet = new Set<string>();
  allowedCatalog().forEach((watch) => {
    if (watch.brand) brandsSet.add(brandSlug(String(watch.brand)));
  });
  return Array.from(brandsSet).map((slug) => ({ slug }));
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brandWatches = allowedCatalog().filter((watch) => watch.brand && brandSlug(String(watch.brand)) === slug);
  const brandName = brandWatches.length > 0 ? String(brandWatches[0].brand) : slug.toUpperCase();
  const tierLabel = ELITE_BRANDS.has(brandName) ? 'Elit Kategori' : 'Saat Kategorisi';

  return (
    <div className="bg-background min-h-screen py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d5f62] text-center">SAATCHI / {tierLabel}</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.16em] text-center">{brandName}</h1>


        {brandWatches.length === 0 ? (
          <div className="text-center text-foreground/50 py-20">Bu marka için kaynak fiyatı doğrulanmış aktif model bulunamadı.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brandWatches.map((watch, idx) => {
              const watchSlug = String(watch.seoUrl || '').split('/').filter(Boolean).pop() || String(watch.id || idx);
              const isElit = String(watch.category || '').toLowerCase().includes('elit') || ELITE_BRANDS.has(String(watch.brand || ''));
              const linkUrl = isElit ? `/elit-saat/${watchSlug}` : `/saatler/${watchSlug}`;

              return (
                <Link href={linkUrl} key={String(watch.id || idx)} className="group bg-surface rounded-2xl border border-surface-border overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-500 flex flex-col">
                  <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#FAFAFA] flex items-center justify-center">
                    <div className="absolute top-4 left-4 z-10 bg-[#846b32] text-white text-[9px] font-bold tracking-widest px-2 py-1 rounded shadow-sm uppercase">{isElit ? 'ELITE' : 'SAAT'}</div>
                    {watch.image ? (
                      <Image unoptimized src={getProxiedImageUrl(watch.image)} alt={watch.modelName} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-4 md:p-6 group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 border border-surface-border group-hover:border-[#C2A768]/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#C2A768]/50 mb-3"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                        <span className="text-primary text-[10px] tracking-widest uppercase font-bold text-center">{watch.brand || 'SAATCHI'}</span>
                        <span className="text-foreground/40 font-serif text-xs mt-1 text-center">Görsel Kaynakta Bekleniyor</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center w-full p-6 flex flex-col flex-grow items-center justify-between">
                    <div>
                      <p className="text-primary text-[10px] tracking-[0.2em] uppercase mb-2">{watch.brand}</p>
                      <h2 className="text-sm font-serif text-foreground mb-4 leading-relaxed group-hover:text-primary transition-colors line-clamp-2 min-h-[40px]">{watch.modelName}</h2>
                    </div>
                    <div>
                      <div className="h-px w-8 bg-surface-border mx-auto mb-4 group-hover:bg-primary/50 group-hover:w-16 transition-all duration-500" />
                      <p className="text-lg font-serif text-foreground">{watch.price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
