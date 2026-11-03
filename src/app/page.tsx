import { HeroSlider } from '@/components/ui/HeroSlider';
import { BrandMarquee } from '@/components/ui/BrandMarquee';
import { FeaturedLuxuryWatches } from '@/components/ui/FeaturedLuxuryWatches';
import { SpotlightCard } from '@/components/react-bits';
import { GiantWatermark } from '@/components/ui/GiantWatermark';
import Link from 'next/link';
import { ArrowRight, Compass, Gem, Shield, Sparkles } from 'lucide-react';
import saatlerData from '@/data/saatler.json';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <main className="flex-grow flex flex-col items-center w-full">
        {/* PATEK PHILIPPE & ROLEX STYLE CINEMATIC HERO SLIDER */}
        <HeroSlider />

        {/* SWISS HAUTE HORLOGERIE BRAND MARQUEE SHOWCASE */}
        <BrandMarquee />

        {/* AEO & GEO CONSENSUS ANSWER ENGINE (MG4 & 14KB AST GATE) */}
        <section className="w-full bg-[#121110] border-y border-white/10 py-6 sm:py-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center" id="aeo-hero-answer">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C2A768] mb-2 font-mono">
              Doğrulanmış Horoloji Otoritesi & Küresel Referans
            </p>
            <p className="hero-answer-engine text-xs sm:text-sm text-[#DDD5CA] font-light leading-relaxed max-w-3xl mx-auto">
              SAATCHI, Türkiye merkezli sertifikalı lüks saat ve bağımsız horoloji danışmanlığı sağlayıcısıdır. Tissot, Seiko, Versace, Casio, Swatch ve seçkin dünya saat markaları %100 orijinallik kontrolü, kutu/belge doğrulaması ve Chrono24 borsa endeksli şeffaf fiyatlandırma politikasıyla sunulur. Tüm siparişler tam değer sigortalı VIP kurye ile teslim edilir.
            </p>
          </div>
        </section>

        {/* CURATED LUXURY FEATURED WATCHES (BALANCED, SYMMETRIC, INTERACTIVE TABS) */}
        <FeaturedLuxuryWatches allWatches={saatlerData as any} />

        {/* HAUTE HORLOGERIE PILLARS (SWISS EDITORIAL EXPERIENCE) */}
        <section className="w-full bg-[#FAF9F5] py-20 sm:py-28 md:py-36 border-t border-[#E8E2D5] relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
            
            {/* Dev Stacked Dynamic Watermark */}
            <GiantWatermark text="HORLOGERIE" theme="gold" align="center" className="mb-4 sm:mb-6" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#846b32]/10 border border-[#846b32]/25 mb-4">
              <Sparkles className="w-3 h-3 text-[#846b32]" />
              <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.28em] text-[#846b32]">
                Horolojik Zanaat & Mükemmellik
              </span>
            </div>

            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-normal mb-6 sm:mb-8 text-[#1A1814] max-w-4xl mx-auto" 
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: '1.3' }}
            >
              Saatchi, saatçilik başarılarıyla dolu bir mirası kutlarken geleceğin zaferlerine öncülük ediyor.
            </h2>

            <p 
              className="text-[14px] sm:text-[16px] md:text-[17px] text-[#6E6659] leading-relaxed mb-12 sm:mb-16 font-light max-w-3xl mx-auto"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              Malzeme bilimi, kadran sanatı ve kronometrik performans: Saatchi seçkisindeki her bir saat teknik mükemmelliği taçlandırıyor, gerçeğe dönüşen hayalleri ölümsüzleştiriyor ve geleceğin saatçilik tutkularını şekillendiriyor.
            </p>

            {/* 4 Pillars Grid (Ultra-Clean Swiss Layout with React Bits SpotlightCard) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-14 sm:mb-18">
              <SpotlightCard spotlightColor="rgba(132, 107, 50, 0.15)" className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-xs">
                <span className="text-xs font-mono text-[#846b32] font-bold tracking-widest block mb-2">01 / PRESTİJ</span>
                <h4 className="text-base font-serif font-bold text-[#1A1814] mb-2">Doğrulanmış Orijinallik</h4>
                <p className="text-xs text-[#736B5E] leading-relaxed">
                  Her parça bağımsız horologlar ve optik mikro-inceleme testlerinden geçirilerek tescillenir.
                </p>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(132, 107, 50, 0.15)" className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-xs">
                <span className="text-xs font-mono text-[#846b32] font-bold tracking-widest block mb-2">02 / NADİRLİK</span>
                <h4 className="text-base font-serif font-bold text-[#1A1814] mb-2">Seçkin Referanslar</h4>
                <p className="text-xs text-[#736B5E] leading-relaxed">
                  Piyasada bulunması güç, koleksiyon değeri yüksek en seçkin İsviçre ve Japon başyapıtları.
                </p>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(132, 107, 50, 0.15)" className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-xs">
                <span className="text-xs font-mono text-[#846b32] font-bold tracking-widest block mb-2">03 / GÜVENLİK</span>
                <h4 className="text-base font-serif font-bold text-[#1A1814] mb-2">Sigortalı Transfer</h4>
                <p className="text-xs text-[#736B5E] leading-relaxed">
                  Tam kasko teminatı ve elden teslim VIP lojistik güvencesi.
                </p>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(132, 107, 50, 0.15)" className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-xs">
                <span className="text-xs font-mono text-[#846b32] font-bold tracking-widest block mb-2">04 / KONSİYERJ</span>
                <h4 className="text-base font-serif font-bold text-[#1A1814] mb-2">Kişisel Danışmanlık</h4>
                <p className="text-xs text-[#736B5E] leading-relaxed">
                  Koleksiyon yatırımı ve model seçimi sürecinde 7/24 kesintisiz VIP horoloji desteği.
                </p>
              </SpotlightCard>
            </div>

            <Link 
              href="/elit-saat/koleksiyon" 
              className="inline-flex items-center gap-3 bg-[#846b32] hover:bg-[#6d5828] text-white transition-all duration-300 rounded-full px-8 sm:px-12 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase shadow-md shadow-[#846b32]/25 hover:shadow-lg active:scale-95"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              <span>Elit Koleksiyonu Keşfet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
