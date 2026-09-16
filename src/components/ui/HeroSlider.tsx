'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Force videos to play on all devices, bypassing Low Power Mode constraints safely
  useEffect(() => {
    const playVideos = () => {
      videoRefs.current.forEach(video => {
        if (video && video.paused) {
          // Play returns a promise. Catch to avoid unhandled rejections if OS blocks it.
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Silently catch OS blocks
            });
          }
        }
      });
    };

    // Try to play immediately
    playVideos();
    
    // Some devices require user interaction to unlock media playback
    // Use passive listeners and avoid high-frequency events like mousemove
    const events = ['touchstart', 'touchend', 'click', 'scroll'];
    events.forEach(event => {
      window.addEventListener(event, playVideos, { once: false, passive: true });
    });

    // Check periodically in case it gets paused by the OS (e.g. exiting fullscreen or tab switch)
    const interval = setInterval(playVideos, 3000);

    return () => {
      events.forEach(event => window.removeEventListener(event, playVideos));
      clearInterval(interval);
    };
  }, []); // Empty dependency array so it only mounts once

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 7000); // 7s auto-slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Video with Mobile-Safe Fallback */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#111] to-[#222]">
            <div
              ref={(el) => { if (el) videoRefs.current[index] = el.querySelector('video'); }}
              dangerouslySetInnerHTML={{
                __html: `
                  <video
                    autoplay
                    loop
                    muted
                    playsinline
                    webkit-playsinline="true"
                    preload="auto"
                    class="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2 opacity-100 contrast-[1.15] saturate-[0.80] brightness-[0.75] transition-opacity duration-700"
                    style="-webkit-mask-image: -webkit-radial-gradient(white, black);"
                  >
                    <source src="${slide.video}" type="video/mp4" />
                  </video>
                `
              }}
              className="absolute inset-0 w-full h-full"
            />
            
            {/* Cinematic Hollywood Filter & Radial Vignette */}
            <div className="absolute inset-0 bg-[#0a0a0a]/30 pointer-events-none mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 pointer-events-none"></div>
            
            {/* Text Protection Gradient optimized for mobile */}
            <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/100 via-black/70 to-transparent pointer-events-none"></div>
          </div>

          {/* Hero Content - Bottom Left Aligned with Mobile Optimizations */}
          <div className="absolute inset-0 flex flex-col justify-end items-start text-left px-5 sm:px-8 md:px-12 pb-16 sm:pb-20 md:pb-16 w-full max-w-[1600px] mx-auto z-20">
            {slide.subtitle && (
              <h2 
                className={`text-white/90 tracking-[0.25em] uppercase text-[10px] sm:text-[11px] md:text-[12px] font-bold mb-3 md:mb-4 transform transition-all duration-1000 delay-300 ${index === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                <span className="inline-block w-2 h-2 bg-[#846b32] rounded-full mr-3 animate-pulse"></span>
                {slide.subtitle}
              </h2>
            )}

            <h1 
              className={`text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-thin text-white mb-4 sm:mb-6 leading-[1.05] max-w-3xl transform transition-all duration-1000 delay-500 whitespace-pre-line ${index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 200, letterSpacing: '0.01em', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              {slide.title}
            </h1>

            <p 
              className={`text-[14px] sm:text-[16px] md:text-[18px] text-white/90 mb-8 sm:mb-10 max-w-xl leading-relaxed transform transition-all duration-1000 delay-[700ms] ${index === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ fontFamily: '"Times New Roman", Times, serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              {slide.desc}
            </p>

            <div className={`transform transition-all duration-1000 delay-[900ms] ${index === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} w-full sm:w-auto`}>
              <Link
                href={slide.link}
                className="bg-white text-black hover:bg-gray-100 uppercase tracking-[0.15em] text-[11px] md:text-[12px] px-8 py-4 sm:px-10 sm:py-4 rounded-full transition-all duration-500 flex items-center justify-center font-bold w-full sm:w-auto shadow-xl"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                {slide.btnText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Controls - Vertical on the Right (Hidden on very small screens, bottom on mobile) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-8 md:top-1/2 md:-translate-y-1/2 z-30 flex flex-row md:flex-col gap-3 md:gap-4">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-500 ${
              index === current 
                ? "w-8 h-1.5 md:w-1.5 md:h-8 bg-white" 
                : "w-2 h-2 md:w-1.5 md:h-1.5 bg-white/40 hover:bg-white/70 border border-transparent"
            }`}
            aria-label={`Slayt ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
