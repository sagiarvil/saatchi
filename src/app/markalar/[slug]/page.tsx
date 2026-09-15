import Link from 'next/link';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';

export async function generateStaticParams() {
  let allWatches: any[] = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];

  const brandsSet = new Set<string>();
  allWatches.forEach(w => {
    if (w.brand) {
      brandsSet.add(w.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  });

  return Array.from(brandsSet).map(slug => ({ slug }));
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  let allWatches: any[] = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];

  const brandWatches = allWatches.filter(w => 
    w.brand && w.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
  );

  const brandName = brandWatches.length > 0 ? brandWatches[0].brand : slug.toUpperCase();

  return (
    <div className="bg-background min-h-screen py-20 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.2em] text-center">{brandName}</h1>
        <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto font-light">Bu markaya ait seçkin koleksiyonu keşfedin.</p>
        
        {brandWatches.length === 0 ? (
          <div className="text-center text-foreground/50 py-20">Bu markaya ait ürün bulunamadı.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brandWatches.map((watch, idx) => {
              const slugParts = watch.seoUrl.split('/');
              const watchSlug = slugParts[slugParts.length - 1];
              // Determine if it's elit or normal
              const isElit = watch.category && watch.category.toLowerCase().includes('elit');
              const linkUrl = isElit ? `/elit-saat/${watchSlug}` : `/saatler/${watchSlug}`;
              
              return (
                <Link href={linkUrl} key={idx} className="group bg-surface rounded-2xl border border-surface-border p-4 hover:shadow-xl hover:border-primary/40 transition-all duration-500 flex flex-col items-center">
                  <div className="w-full aspect-square mb-6 relative overflow-hidden flex items-center justify-center rounded-xl bg-surface">
                    {watch.image ? (
                      <img src={watch.image} alt={watch.modelName} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-surface flex flex-col items-center justify-center p-4 border border-surface-border group-hover:border-[#C2A768]/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#C2A768]/50 mb-3"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                        <span className="text-primary text-[10px] tracking-widest uppercase font-bold text-center">{watch.brand || 'LÜKS SAAT'}</span>
                        <span className="text-foreground/40 font-serif text-xs mt-1 text-center">Görsel Hazırlanıyor</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center w-full">
                    <p className="text-primary text-[10px] tracking-[0.2em] uppercase mb-2">{watch.brand}</p>
                    <h2 className="text-sm font-serif text-foreground mb-4 leading-relaxed group-hover:text-primary transition-colors line-clamp-2 h-10">
                      {watch.modelName}
                    </h2>
                    <div className="h-px w-12 bg-surface-border mx-auto mb-4 group-hover:bg-primary/50 transition-colors"></div>
                    <p className="text-lg font-serif text-foreground">{watch.price}</p>
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
