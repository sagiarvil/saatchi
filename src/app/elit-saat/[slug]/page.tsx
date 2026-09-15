import Link from 'next/link';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import LuxuryImageZoom from "@/components/ui/LuxuryImageZoom";
import { ShieldCheck, Truck, Gem, Lock, Phone, ChevronRight, CheckCircle, PackageOpen } from "lucide-react";



export async function generateStaticParams() {
  let slugs = ['limited-edition', 'tourbillon', 'altin-kaplama', 'koleksiyon'];
  
  const watches = (elitSaatlerData as any[]);
  const watchSlugs = watches.map((w: any) => {
    const parts = w.seoUrl.split('/');
    return parts[parts.length - 1];
  });
  slugs = [...slugs, ...watchSlugs];
  
  return slugs.map(slug => ({ slug }));
}

export default async function ElitSaatDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const isCategory = ['limited-edition', 'tourbillon', 'altin-kaplama', 'koleksiyon'].includes(slug);
  let allWatches: any[] = (elitSaatlerData as any[]);

  // --- CATEGORY VIEW ---
  if (isCategory) {
    let filteredWatches = allWatches;
    if (slug === 'tourbillon') {
      filteredWatches = allWatches.filter(w => w.modelName.toLowerCase().includes('tourbillon') || w.description.toLowerCase().includes('tourbillon'));
      if (filteredWatches.length === 0) filteredWatches = allWatches.slice(0, 12);
    } else if (slug === 'altin-kaplama') {
      filteredWatches = allWatches.filter(w => w.modelName.toLowerCase().includes('altın') || w.modelName.toLowerCase().includes('gold') || w.modelName.toLowerCase().includes('rose'));
      if (filteredWatches.length === 0) filteredWatches = allWatches.slice(0, 12);
    } else if (slug === 'koleksiyon') {
      // Return a shuffled copy for the 'koleksiyon' view
      // Since this is static, the shuffle happens once at build time.
      filteredWatches = [...allWatches].sort(() => 0.5 - Math.random());
    }
    
    const categoryTitle = slug === 'limited-edition' ? "Limited Edition" 
                          : slug === 'tourbillon' ? "Tourbillon Koleksiyonu" 
                          : slug === 'koleksiyon' ? "Elit Koleksiyonu Keşfet" 
                          : "Altın / Pırlanta Serisi";

    return (
      <div className="bg-background min-h-screen py-20 border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.2em] text-center">{categoryTitle}</h1>
          <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto font-light">Dünyanın en prestijli, sınırlı üretim ve üst düzey komplikasyonlu saatleri.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredWatches.slice(0, 24).map((watch, idx) => {
              const slugParts = watch.seoUrl.split('/');
              const slug = slugParts[slugParts.length - 1];

              return (
                <Link href={`/elit-saat/${slug}`} key={idx} className="group bg-surface rounded-2xl border border-surface-border overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-500 flex flex-col">
                  <div className="w-full aspect-[4/5] relative overflow-hidden bg-white flex items-center justify-center">
                    <div className="absolute top-4 left-4 z-10 bg-black/80 text-[#C2A768] text-[9px] font-bold tracking-widest px-2 py-1 rounded shadow-sm uppercase border border-[#C2A768]/30">
                      ELİT
                    </div>
                    {watch.image ? (
                      <img src={watch.image} alt={watch.modelName} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 border border-surface-border group-hover:border-[#C2A768]/30 transition-colors">
                        <ShieldCheck className="w-8 h-8 text-[#C2A768]/50 mb-3" strokeWidth={1} />
                        <span className="text-primary text-[10px] tracking-widest uppercase font-bold text-center">{watch.brand || 'LÜKS SAAT'}</span>
                        <span className="text-foreground/40 font-serif text-xs mt-1 text-center">Görsel Hazırlanıyor</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center w-full p-6 flex flex-col flex-grow items-center justify-between">
                    <div>
                      <h3 className="text-primary text-[10px] tracking-[0.2em] uppercase mb-2 font-bold">{watch.brand || 'Bilinmiyor'}</h3>
                      <h4 className="text-sm font-serif text-foreground mb-4 leading-relaxed group-hover:text-primary transition-colors line-clamp-2 min-h-[40px]">{watch.modelName}</h4>
                    </div>
                    <div className="w-full">
                      <div className="h-px w-8 bg-surface-border mx-auto mb-4 group-hover:bg-primary/50 group-hover:w-16 transition-all duration-500"></div>
                      <span className="text-lg font-serif text-foreground font-medium tracking-wide">{watch.price}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- PRODUCT DETAIL VIEW ---
  const watch = allWatches.find((w: any) => w.seoUrl.includes(slug));

  if (!watch) {
    return (
      <div className="bg-background min-h-screen border-t border-surface-border">
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-3xl text-foreground font-serif">Saat Bulunamadı</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#070A09] min-h-screen border-t border-[#1a1a1a] py-12">
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <article className="seo-prerender-pdp" style={{ background: '#0d1613', border: '1px solid rgba(194,167,104,0.3)', borderRadius: '18px', color: '#fff', padding: '24px' }}>
          
          <nav className="pdp-crumbs" style={{ fontSize: '13px', color: '#a3b8b0', marginBottom: '20px' }}>
            <Link href="/" style={{ color: '#C2A768', textDecoration: 'none' }}>Ana Sayfa</Link> / <Link href="/elit-saat" style={{ color: '#C2A768', textDecoration: 'none' }}>Elit Kategori — Lüks Saat Evleri</Link> / <span style={{ color: '#fff' }}>{watch.modelName}</span>
          </nav>

          {/* HERO ANSWER ENGINE (AEO / SSOT KÜNYE) */}
          <div className="hero-answer-engine" style={{ margin: '0 0 24px', background: 'rgba(194,167,104,0.05)', border: '1px solid rgba(194,167,104,0.2)', padding: '16px', borderRadius: '10px' }}>
            <div className="hero-answer-engine-badge flex items-center" style={{ fontSize: '11px', fontWeight: 'bold', color: '#C2A768', letterSpacing: '1px', marginBottom: '8px' }}>
              <span className="dot" style={{ display: 'inline-block', width: '6px', height: '6px', background: '#34D399', borderRadius: '50%', marginRight: '6px' }}></span>
              ONAYLI ÜRÜN KÜNYESİ & EKSPERTİZ BİLGİSİ
            </div>
            <p className="hero-answer-engine-text" style={{ fontSize: '13px', lineHeight: '1.6', color: '#d5e2dc', marginBottom: '12px' }}>
              Bu {watch.modelName} (Ref: {watch.ref || watch.id}) modeli, Saatchi & Semih Sonbahar güvencesiyle sunulmaktadır. Sıfır distribütör garantili ve tescilli kutu-belge tam set olarak sağlanır. 12.000 TL üzeri alımlarda kimlik teyitli VIP teslimat ve Akbank 3D Pay 256-bit SSL ödeme altyapısı geçerlidir.
            </p>
            <div className="hero-answer-engine-meta" style={{ display: 'flex', gap: '16px', fontSize: '12px', flexWrap: 'wrap' }}>
              <span><strong style={{ color: '#C2A768' }}>Fiziki Konum:</strong> Saatchi Showroom</span>
              <span><strong style={{ color: '#C2A768' }}>Fiyat Durumu:</strong> {watch.price} (Canlı Kur)</span>
              <span><strong style={{ color: '#C2A768' }}>Kondisyon:</strong> {watch.condition || 'Sıfır Distribütör Garantili'}</span>
            </div>
          </div>

          <div className="pdp-art-main grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* GALLERY */}
            <div className="pdp-art-gallery" style={{ background: '#070d0b', padding: '20px', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              {watch.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={watch.image} alt={watch.modelName} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} />
              ) : null}
            </div>

            {/* INFO */}
            <div className="pdp-art-info" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="pdp-art-brand" style={{ fontSize: '14px', color: '#C2A768', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>{watch.brand}</span>
              <h1 style={{ fontSize: 'clamp(26px,3vw,38px)', lineHeight: '1.15', margin: 0, color: '#fff' }}>{watch.modelName}</h1>
              <p className="pdp-art-ref" style={{ fontSize: '13px', color: '#8fa099', margin: 0 }}>Ref: {watch.ref || watch.id} • Durum: {watch.condition || 'Sıfır Distribütör Garantili'}</p>
              <div className="pdp-art-price" style={{ fontSize: '32px', fontWeight: 800, color: '#34D399', margin: '8px 0' }}>{watch.price}</div>
              
              <div className="pdp-special-order-info" style={{ background: 'rgba(194,167,104,0.1)', border: '1px solid rgba(194,167,104,0.3)', borderRadius: '8px', padding: '12px 16px', margin: '4px 0 10px', fontSize: '13px', lineHeight: '1.5', color: '#f0e6d2' }}>
                <strong style={{ color: '#C2A768', display: 'block', marginBottom: '2px', fontSize: '13.5px' }}>📦 Özel Sipariş ile Temin Edilir</strong>
                <span style={{ color: '#d5e2dc' }}>Ürün, talebiniz üzerine özel olarak temin edilir. Güncel temin süresi için bizimle iletişime geçebilirsiniz.</span>
              </div>
              <p className="pdp-art-description" style={{ fontSize: '14px', lineHeight: '1.7', color: '#d5e2dc' }}>
                {watch.description || `${watch.modelName}, saat işçiliğinin zirve standardıdır. İsviçre manüfaktür mekanizma ve çizilmeye dayanıklı safir cam ile donatılmıştır.`}
              </p>
              
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/vip-checkout" style={{ background: 'linear-gradient(135deg,#C2A768,#9E8548)', color: '#070A09', fontWeight: 700, padding: '14px 28px', border: 'none', borderRadius: '10px', cursor: 'pointer', textAlign: 'center', flex: 1 }}>
                  Güvenli Satın Al
                </Link>
                <a href="https://wa.me/905419305372" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '14px 24px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  WhatsApp İletişim
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
