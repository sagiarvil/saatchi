'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const SLIDES = [
  {
    id: 1,
    video: "/videos/hero1.mp4",
    subtitle: "SAATCHI AYRICALIĞI",
    title: "Zamanın Ötesinde\nBir Miras",
    desc: "Kusursuz İsviçre mühendisliği ve Saatchi'nin eşsiz tasarım vizyonuyla şekillenen Masterpiece koleksiyonunu keşfedin.",
    link: "/elit-saat/koleksiyon",
    btnText: "Koleksiyonu Keşfet"
  },
  {
    id: 2,
    video: "/videos/hero2.mp4",
    subtitle: "ELİT KATEGORİ",
    title: "Mükemmelliğin\nYeni Standardı",
    desc: "Dünyanın en prestijli markalarından derlenen, kişiye özel sertifikalı ve VIP teslimatlı seçkin modeller.",
    link: "/elit-saat/koleksiyon",
    btnText: "Elit Seriyi İncele"
  },
  {
    id: 3,
    video: "/videos/hero3.mp4",
    subtitle: "ÖZEL KOLEKSİYON",
    title: "Sadece Sizin\nİçin Tasarlandı",
    desc: "Karakterinizi yansıtan eşsiz detaylar. SAATCHI - SEMİH SONBAHAR güvencesiyle elit dünyaya adım atın.",
    link: "/kurumsal",
    btnText: "Markamızı Keşfedin"
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  
  // Force videos to play on all devices, bypassing Low Power Mode / Reduce Motion constraints by attaching to any interaction
  useEffect(() => {
    const playVideos = () => {
      document.querySelectorAll('video').forEach(video => {
        if (video.paused) {
          video.play().catch(() => {
            // Silently catch OS blocks
          });
        }
      });
    };

    // Try to play immediately
    playVideos();
    
    // Some devices require user interaction to unlock media playback
    const events = ['touchstart', 'touchend', 'click', 'scroll', 'mousemove'];
    events.forEach(event => {
      window.addEventListener(event, playVideos, { once: false, passive: true });
    });

    // Also brute-force attempt every 2 seconds for aggressive overrides
    const interval = setInterval(playVideos, 2000);

    return () => {
      events.forEach(event => window.removeEventListener(event, playVideos));
      clearInterval(interval);
    };
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 7000); // 7s auto-slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Video (Self-hosted to prevent 403) */}
          <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload={index === 0 ? "auto" : "none"}
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2 opacity-100 contrast-[1.15] saturate-[0.80] brightness-[0.75] transition-opacity duration-700"
            >
              <source src={slide.video} type="video/mp4" />
            </video>
            
            {/* Cinematic Hollywood Filter & Radial Vignette */}
            <div className="absolute inset-0 bg-[#0a0a0a]/30 pointer-events-none mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 pointer-events-none"></div>
            
            {/* Text Protection Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none"></div>
          </div>

          {/* Hero Content - Bottom Left Aligned (Patek Exact Layout) */}
          <div className="absolute inset-0 flex flex-col justify-end items-start text-left px-6 md:px-12 pb-12 md:pb-16 w-full max-w-[1600px] mx-auto">
            {slide.subtitle && (
              <h2 
                className={`text-white/90 tracking-[0.2em] uppercase text-[9px] md:text-[10px] font-normal mb-2 transform transition-all duration-1000 delay-300 ${index === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                {slide.subtitle}
              </h2>
            )}

            <h1 
              className={`text-[32px] md:text-[40px] lg:text-[44px] font-thin text-white mb-5 leading-tight max-w-3xl transform transition-all duration-1000 delay-500 whitespace-pre-line ${index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 200, letterSpacing: '0.02em' }}
            >
              {slide.title}
            </h1>

            <p 
              className={`text-[13px] md:text-[15px] text-white/90 mb-8 max-w-xl leading-relaxed transform transition-all duration-1000 delay-[700ms] ${index === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              {slide.desc}
            </p>

            <div className={`transform transition-all duration-1000 delay-[900ms] ${index === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <Link
                href={slide.link}
                className="bg-white text-gray-900 hover:bg-gray-100 uppercase tracking-[0.15em] text-[9px] md:text-[10px] px-6 py-3 rounded-full transition-all duration-500 inline-block"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400 }}
              >
                {slide.btnText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Controls - Vertical on the Right */}
      <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-1.5 h-1.5 rounded-full border border-white transition-all duration-500 ${
              index === current ? "bg-white scale-125" : "bg-transparent hover:bg-white/50"
            }`}
            aria-label={`Slayt ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
