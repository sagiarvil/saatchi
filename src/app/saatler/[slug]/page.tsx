import Link from 'next/link';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import LuxuryImageZoom from "@/components/ui/LuxuryImageZoom";
import WatchListClient from "../WatchListClient";
import { LuxuryWatchStory } from "@/components/ui/LuxuryWatchStory";
import { ShieldCheck, Truck, Gem, Lock, Phone, ChevronRight, CheckCircle, PackageOpen } from "lucide-react";



export async function generateStaticParams() {
  let slugs = ['erkek', 'kadin', 'unisex']; // Category slugs
  let allWatches: any[] = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];

  const watchSlugs = allWatches.map((w: any) => {
    const parts = w.seoUrl.split('/');
    return parts[parts.length - 1];
  });
  slugs = [...slugs, ...watchSlugs];

  
  return slugs.map(slug => ({ slug }));
}

export default async function SaatDetailOrCategory({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const isCategory = ['erkek', 'kadin', 'unisex'].includes(slug);
  let allWatches: any[] = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];

  // --- CATEGORY VIEW ---
  if (isCategory) {
    let filteredWatches = allWatches;
    // Basic mock filtering based on text or seoUrl
    if (slug === 'kadin') {
      filteredWatches = allWatches.filter(w => 
        w.seoUrl.toLowerCase().includes('kadin') || 
        w.modelName.toLowerCase().includes('kadın') || 
        w.modelName.toLowerCase().includes('lady') || 
        (w.category && w.category.toLowerCase().includes('kadın'))
      );
    } else if (slug === 'erkek') {
      filteredWatches = allWatches.filter(w => 
        (w.category && w.category.toLowerCase().includes('erkek')) ||
        (!w.seoUrl.toLowerCase().includes('kadin') && !w.modelName.toLowerCase().includes('kadın') && !w.modelName.toLowerCase().includes('lady') && (!w.category || !w.category.toLowerCase().includes('kadın')))
      );
    } else if (slug === 'unisex') {
      filteredWatches = allWatches.filter(w => w.seoUrl.toLowerCase().includes('unisex'));
    }
    
    // Ensure we don't show empty pages
    if (filteredWatches.length === 0) {
      filteredWatches = allWatches.slice(0, 12);
    }    
    const categoryTitle = slug === 'erkek' ? "Erkek Saatleri" : slug === 'kadin' ? "Kadın Saatleri" : "Unisex Saatler";

    return (
      <div className="bg-background min-h-screen py-20 border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.2em] text-center">{categoryTitle}</h1>
          <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto font-light">Zamanın ruhunu yansıtan eşsiz tasarımlar. Saatchi güvencesiyle lüksün doruklarına ulaşın.</p>
          
          <WatchListClient 
            initialWatches={allWatches} 
            initialGender={slug === 'erkek' ? 'Erkek' : slug === 'kadin' ? 'Kadın' : ''} 
          />
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
          <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-transparent">
            {watch.image ? (
              <LuxuryImageZoom src={watch.image} alt={watch.modelName} />
            ) : (
              <div className="w-64 h-64 bg-surface rounded-full flex items-center justify-center border border-surface-border drop-shadow-2xl">
                <span className="text-foreground/40 font-serif">Görsel Yok</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {/* MAISON HEADER & TRUST BANNER */}
            <div className="mb-6 pb-6 border-b border-surface-border">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] font-extrabold text-primary uppercase block mb-3">
                🏛️ SAATCHI & SEMİH SONBAHAR HAUTE HORLOGERIE
              </span>
              <h2 className="text-primary tracking-[0.2em] uppercase text-xs sm:text-sm mb-3 font-bold flex items-center gap-2">
                {watch.brand} <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block"></span> <span className="text-foreground/50 font-normal">Authentic</span>
              </h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight tracking-tight">
                {watch.modelName}
              </h1>
              <p className="text-xs text-foreground/50 font-medium tracking-wide flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-primary" /> 256-Bit EV SSL & 3D Secure Doğrudan Tahsilat Protokolü
              </p>
            </div>

            <p className="text-foreground/80 font-light leading-relaxed mb-8 text-sm sm:text-base text-justify">
              {watch.description || `${watch.brand} mühendisliğinin sınırlarını zorlayan bu ikonik tasarım, Saatchi & Semih Sonbahar güvencesiyle modern lüksün manifestosu olarak bileğinizi süslüyor. Zamanın ötesinde bir prestij ve güç yansıması.`}
            </p>

            {/* Specifications Section */}
            <div className="mb-8 bg-[#FAF8F5] border border-[#EAE5D9] rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#EAE5D9]/60">
                <h3 className="text-sm font-extrabold tracking-widest uppercase text-foreground/90 flex items-center gap-2">
                  <Gem className="w-4 h-4 text-primary" /> Teknik Detaylar
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {(watch.features && watch.features.length > 0) ? (
                  watch.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start text-[13px] text-foreground/80 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start text-[13px] text-foreground/80 font-medium"><PackageOpen className="w-3.5 h-3.5 text-primary mr-2.5 mt-0.5 flex-shrink-0" /> <span className="leading-snug">Orijinal Kutu & Uluslararası Sertifika</span></li>
                    <li className="flex items-start text-[13px] text-foreground/80 font-medium"><ShieldCheck className="w-3.5 h-3.5 text-primary mr-2.5 mt-0.5 flex-shrink-0" /> <span className="leading-snug">2 Yıl Saatchi & Marka Garantisi</span></li>
                    <li className="flex items-start text-[13px] text-foreground/80 font-medium"><Gem className="w-3.5 h-3.5 text-primary mr-2.5 mt-0.5 flex-shrink-0" /> <span className="leading-snug">Çizilmeye Dirençli Safir Cam</span></li>
                    <li className="flex items-start text-[13px] text-foreground/80 font-medium"><CheckCircle className="w-3.5 h-3.5 text-primary mr-2.5 mt-0.5 flex-shrink-0" /> <span className="leading-snug">Paslanmaz Çelik & Altın Detaylar</span></li>
                    <li className="flex items-start text-[13px] text-foreground/80 font-medium"><CheckCircle className="w-3.5 h-3.5 text-primary mr-2.5 mt-0.5 flex-shrink-0" /> <span className="leading-snug">Su Geçirmezlik (Dalgıç Standartları)</span></li>
                  </>
                )}
              </ul>
            </div>

            {/* Price & Action Area */}
            <div className="bg-white border border-surface-border p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-[#EAF5ED] text-[#15803D] text-[10px] font-extrabold px-3 py-1 rounded-bl-lg border-b border-l border-[#15803D]/20 flex items-center gap-1 uppercase tracking-wider">
                <Truck className="w-3 h-3" /> Sigortalı Ücretsiz Kargo
              </div>
              
              <div className="flex flex-col mb-6 pt-2">
                <span className="text-foreground/50 text-[11px] tracking-widest uppercase font-bold mb-1">VIP Satış Fiyatı</span>
                <span className="text-4xl md:text-5xl font-serif text-foreground font-medium">{watch.price}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/vip-checkout" className="flex-1 relative overflow-hidden bg-gradient-to-br from-[#C2A768] to-[#9E8548] text-white font-extrabold tracking-widest uppercase text-xs sm:text-sm py-4 px-6 rounded-lg text-center shadow-[0_4px_14px_0_rgba(194,167,104,0.39)] hover:shadow-[0_6px_20px_rgba(194,167,104,0.23)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  Hemen Satın Al
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <a href="https://wa.me/905419305372" target="_blank" rel="noopener noreferrer" className="flex-1 bg-black/5 hover:bg-black/10 border border-black/10 text-foreground px-6 py-4 rounded-lg font-bold tracking-widest uppercase text-xs sm:text-sm text-center transition-all duration-300 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Minor Metadata */}
            <div className="flex items-center justify-between text-[11px] text-foreground/50 uppercase tracking-widest border-t border-surface-border pt-4">
              <span>Kategori: <strong className="text-foreground">{watch.category}</strong></span>
            </div>
          </div>
        </div>
        <LuxuryWatchStory watch={watch} />
      </main>
    </div>
  );
}
