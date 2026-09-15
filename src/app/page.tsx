import { Watch } from "lucide-react";

import { Navbar } from '@/components/layout/Navbar';
import { BrandMarquee } from '@/components/ui/BrandMarquee';
import { HeroSlider } from '@/components/ui/HeroSlider';
import Link from 'next/link';
import elitSaatler from '@/data/elit-saatler.json';

export default function Home() {
  // Sadece Chrono24 (Elit) veritabanından en özel 3 saati alıyoruz
  const featuredWatches = [...elitSaatler]
    .sort((a, b) => b.calculatedPrice - a.calculatedPrice)
    .slice(0, 3);

  return (
    <div className="bg-background min-h-screen">
      
      
      <main className="flex-grow flex flex-col items-center w-full">
        
        {/* PATEK PHILIPPE STYLE CINEMATIC HERO SLIDER */}
        <HeroSlider />

        {/* BRAND MARQUEE */}
        <BrandMarquee />

        {/* ELEGANT FEATURED WATCHES */}
        <section className="w-full bg-surface py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-3xl md:text-[34px] font-bold text-[#846b32] mb-6" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                Seçkin Modeller
              </h3>
              <div className="h-[1px] w-16 bg-[#846b32]/50 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {featuredWatches.map((watch) => (
                <Link href={watch.seoUrl} key={watch.id} className="group cursor-pointer flex flex-col items-center">
                  <div className="w-full aspect-[4/5] mb-8 relative flex items-center justify-center transition-all duration-700 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_20%,_#f8f6f0_100%)] rounded-2xl border border-black/5 overflow-hidden group-hover:border-[#C2A768]/40 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Saat Görseli */}
                    <div className="w-48 h-48 sm:w-64 sm:h-64 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-700 z-0">
                      <div className="relative aspect-[4/5] bg-white overflow-hidden p-6 flex items-center justify-center w-full h-full">
                        {watch.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={watch.image}
                            alt={watch.modelName}
                            className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-[#C2A768]/30">
                            <Watch className="w-12 h-12 mb-2 opacity-50" />
                            <span className="text-[10px] tracking-widest uppercase font-bold">Görsel Yok</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="absolute bottom-6 left-0 right-0 text-center z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-primary text-xs tracking-widest uppercase border-b border-primary pb-1 font-semibold">İncele</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mb-2">{watch.brand}</p>
                    <h4 className="text-lg font-serif text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{watch.modelName}</h4>
                    <p className="text-primary font-semibold">{watch.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Rolex Style Typography Section */}
        <section className="w-full bg-white py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 
              className="text-2xl md:text-[32px] font-bold mb-8 text-[#846b32]" 
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: '1.4' }}
            >
              Saatchi celebrates a century of watchmaking accomplishments and paves the way for future triumphs.
            </h2>
            <p 
              className="text-[15px] md:text-[17px] text-[#666666] leading-relaxed mb-12"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              Materials science, dial-making artistry and horological performance: the watches presented this year enshrine technical excellence, immortalize dreams come true and shape the watchmaking emotions of tomorrow. Through these timepieces, the brand ushers in a new era of achievement and innovation, stamped with an even more exacting Superlative Chronometer certification symbolized, as ever, by the green seal.
            </p>
            <Link 
              href="/elit-saat/koleksiyon" 
              className="inline-block bg-[#846b32] hover:bg-[#6d5828] text-white transition-colors rounded-full px-12 py-4 text-sm font-bold tracking-wider uppercase"
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
