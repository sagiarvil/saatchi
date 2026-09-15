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
                <Link href={`/elit-saat/${slug}`} key={idx} className="group bg-surface rounded-2xl border border-surface-border p-4 hover:shadow-xl hover:border-primary/40 transition-all duration-500 flex flex-col items-center">
                  <div className="w-full aspect-square mb-6 relative overflow-hidden flex items-center justify-center rounded-xl bg-surface">
                    {watch.image ? (
                      <img src={watch.image} alt={watch.modelName} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-surface flex flex-col items-center justify-center p-4 border border-surface-border group-hover:border-[#C2A768]/30 transition-colors">
                        <ShieldCheck className="w-8 h-8 text-[#C2A768]/50 mb-3" strokeWidth={1} />
                        <span className="text-primary text-[10px] tracking-widest uppercase font-bold text-center">{watch.brand || 'LÜKS SAAT'}</span>
                        <span className="text-foreground/40 font-serif text-xs mt-1 text-center">Görsel Hazırlanıyor</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-primary text-[10px] tracking-widest uppercase mb-2 text-center font-bold">{watch.brand || 'Bilinmiyor'}</h3>
                  <h4 className="text-foreground font-serif text-center mb-4 line-clamp-2 h-12 leading-tight">{watch.modelName}</h4>
                  <div className="mt-auto pt-4 border-t border-surface-border w-full text-center">
                    <span className="text-lg font-serif text-foreground font-semibold">{watch.price}</span>
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
    <div className="bg-background min-h-screen border-t border-surface-border">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/2 relative flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl">
            {watch.image ? (
              <LuxuryImageZoom 
                src={watch.image} 
                alt={watch.modelName} 
              />
            ) : (
              <div className="w-full h-full min-h-[450px] bg-[#FAFAFA] flex flex-col items-center justify-center p-8 border border-gray-100 shadow-inner">
                <ShieldCheck className="w-16 h-16 text-[#C2A768]/30 mb-6" strokeWidth={1} />
                <span className="text-primary text-sm tracking-[0.3em] uppercase font-bold text-center">{watch.brand || 'LÜKS SAAT'}</span>
                <span className="text-foreground/50 font-serif text-lg mt-3 text-center">Özel Sipariş - Görsel Hazırlanıyor</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {/* ULTRA LUXURY MAISON HEADER */}
            <div className="mb-6 pb-6 border-b border-surface-border">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] font-extrabold text-[#C2A768] uppercase block mb-3">
                👑 SAATCHI & SEMİH SONBAHAR HAUTE HORLOGERIE | ELITE COLLECTION
              </span>
              <h2 className="text-[#C2A768] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3 font-bold flex items-center gap-2">
                {watch.brand} <span className="w-1.5 h-1.5 bg-[#C2A768] rounded-full inline-block"></span> <span className="text-foreground/50 font-normal">Authentic</span>
              </h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight tracking-tight">
                {watch.modelName}
              </h1>
              <p className="text-xs text-foreground/50 font-medium tracking-wide flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#C2A768]" /> 256-Bit EV SSL & 3D Secure Doğrudan Tahsilat Protokolü
              </p>
            </div>

            <p className="text-foreground/80 font-light leading-relaxed mb-8 text-sm sm:text-base text-justify">
              {watch.description || `Saat işçiliğinin zirvesi. ${watch.brand} geleneğini ve modern lüksü tek bir kasada birleştiren bu master-piece, sadece zamanı değil; taşıyanın gücünü ve prestijini de simgeliyor.`}
            </p>

            {/* Specifications Section - Dark/Gold Theme */}
            <div className="mb-8 bg-[#0a0a0a] border border-[#222] rounded-xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C2A768] to-[#9E8548]"></div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#333]">
                <h3 className="text-sm font-extrabold tracking-widest uppercase text-[#C2A768] flex items-center gap-2">
                  <Gem className="w-4 h-4 text-[#C2A768]" /> Üst Düzey Donanım
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {(watch.features && watch.features.length > 0) ? (
                  watch.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start text-[13px] text-[#e0e0e0] font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C2A768] mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start text-[13px] text-[#e0e0e0] font-medium"><PackageOpen className="w-3.5 h-3.5 text-[#C2A768] mr-2.5 mt-0.5 flex-shrink-0" /> <span className="leading-snug">VIP Ahşap Kutu & Uluslararası Sertifika</span></li>
                    <li className="flex items-start text-[13px] text-[#e0e0e0] font-medium"><Gem className="w-3.5 h-3.5 text-[#C2A768] mr-2.5 mt-0.5 flex-shrink-0" /> <span className="leading-snug">Çizilmeye Dirençli Safir Cam</span></li>
                    <li className="flex items-start text-[13px] text-[#e0e0e0] font-medium"><CheckCircle className="w-3.5 h-3.5 text-[#C2A768] mr-2.5 mt-0.5 flex-shrink-0" /> <span className="leading-snug">18K Som Altın / Titanyum Detaylar</span></li>
                    <li className="flex items-start text-[13px] text-[#e0e0e0] font-medium"><CheckCircle className="w-3.5 h-3.5 text-[#C2A768] mr-2.5 mt-0.5 flex-shrink-0" /> <span className="leading-snug">El Yapımı İsviçre Mekanizması</span></li>
                  </>
                )}
              </ul>
            </div>

            {/* Price & Action Area */}
            <div className="bg-white border border-surface-border p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-black text-[#C2A768] text-[10px] font-extrabold px-3 py-1 rounded-bl-lg flex items-center gap-1 uppercase tracking-wider">
              </div>
              
              <div className="flex flex-col mb-6 pt-2">
                <span className="text-foreground/50 text-[11px] tracking-widest uppercase font-bold mb-1">VIP Satış Fiyatı</span>
                <span className="text-4xl md:text-5xl font-serif text-foreground font-medium">{watch.price}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/vip-checkout" className="flex-1 relative overflow-hidden bg-gradient-to-br from-[#111] to-[#333] text-[#C2A768] font-extrabold tracking-widest uppercase text-xs sm:text-sm py-4 px-6 rounded-lg text-center shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-[#C2A768]/30">
                  Hemen Satın Al
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <a href="https://wa.me/905419305372" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-br from-[#C2A768] to-[#9E8548] text-white px-6 py-4 rounded-lg font-bold tracking-widest uppercase text-xs sm:text-sm text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                  <Phone className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Minor Metadata */}
            <div className="flex items-center justify-between text-[11px] text-foreground/50 uppercase tracking-widest border-t border-surface-border pt-4">
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
