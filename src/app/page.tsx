import { HeroSlider } from '@/components/ui/HeroSlider';
import { BrandMarquee } from '@/components/ui/BrandMarquee';
import { FeaturedLuxuryWatches } from '@/components/ui/FeaturedLuxuryWatches';
import Link from 'next/link';
import elitSaatler from '@/data/elit-saatler.json';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <main className="flex-grow flex flex-col items-center w-full">
        {/* PATEK PHILIPPE & ROLEX STYLE CINEMATIC HERO SLIDER */}
        <HeroSlider />

        {/* SWISS HAUTE HORLOGERIE BRAND MARQUEE SHOWCASE */}
        <BrandMarquee />

        {/* CURATED LUXURY FEATURED WATCHES (BALANCED, SYMMETRIC, INTERACTIVE TABS) */}
        <FeaturedLuxuryWatches allWatches={elitSaatler as any} />

        {/* Rolex Style Typography Section */}
        <section className="w-full bg-[#FAF9F5] py-20 sm:py-28 md:py-36 border-t border-[#E8E2D5]">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
            <div className="inline-block mb-3">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#846b32]">
                Zanaat & Mükemmellik
              </span>
            </div>

            <h2 
              className="text-2xl sm:text-3xl md:text-[34px] font-serif font-normal mb-6 sm:mb-8 text-[#1A1814]" 
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: '1.35' }}
            >
              Saatchi, saatçilik başarılarıyla dolu bir yüzyılı kutlarken gelecekteki zaferlerin de temellerini atıyor.
            </h2>

            <p 
              className="text-[14px] sm:text-[15px] md:text-[17px] text-[#6E6659] leading-relaxed mb-8 sm:mb-12 font-light"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              Malzeme bilimi, kadran sanatı ve horolojik performans: Bu yıl sunulan saatler teknik mükemmelliği taçlandırıyor, gerçeğe dönüşen hayalleri ölümsüzleştiriyor ve geleceğin saatçilik duygularını şekillendiriyor. Marka, daima yeşil mühürle simgelenen ve çok daha zorlu Üstün Kronometre sertifikasını taşıyan bu zaman ölçerlerle, başarı ve inovasyon dolu yeni bir çağın kapılarını aralıyor.
            </p>

            <Link 
              href="/elit-saat/koleksiyon" 
              className="inline-block bg-[#846b32] hover:bg-[#6d5828] text-white transition-all duration-300 rounded-full px-8 sm:px-12 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase shadow-md shadow-[#846b32]/20 hover:shadow-lg active:scale-95"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              Koleksiyonu Keşfet
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
