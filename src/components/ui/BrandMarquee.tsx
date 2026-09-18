'use client';
import React, { useRef } from 'react';
import Link from 'next/link';

interface BrandItem {
  name: string;
  sub: string;
  origin: string;
  href: string;
  accent: string;
  fontClass: string;
}

const LUXURY_BRANDS: BrandItem[] = [
  {
    name: "ROLEX",
    sub: "OYSTER PERPETUAL",
    origin: "GENÈVE • 1905",
    href: "/markalar/rolex",
    accent: "text-[#006039] group-hover/card:text-[#007a49]",
    fontClass: "font-serif tracking-[0.18em] font-black"
  },
  {
    name: "CARTIER",
    sub: "HAUTE HORLOGERIE",
    origin: "PARIS • 1847",
    href: "/markalar/cartier",
    accent: "text-[#7B1818] group-hover/card:text-[#9E2020]",
    fontClass: "font-serif tracking-[0.22em] font-bold italic"
  },
  {
    name: "TAG HEUER",
    sub: "AVANT-GARDE SWISS",
    origin: "LA CHAUX-DE-FONDS • 1860",
    href: "/markalar/tag-heuer",
    accent: "text-[#0F172A] group-hover/card:text-[#846b32]",
    fontClass: "font-sans tracking-[0.24em] font-black"
  },
  {
    name: "RADO",
    sub: "MASTER OF MATERIALS",
    origin: "LENGNAU • 1917",
    href: "/markalar/rado",
    accent: "text-[#1E293B] group-hover/card:text-[#846b32]",
    fontClass: "font-sans tracking-[0.26em] font-extrabold"
  },
  {
    name: "TISSOT",
    sub: "INNOVATORS BY TRADITION",
    origin: "LE LOCLE • 1853",
    href: "/markalar/tissot",
    accent: "text-[#BA1C24] group-hover/card:text-[#D62832]",
    fontClass: "font-sans tracking-[0.22em] font-bold"
  },
  {
    name: "CARREN",
    sub: "CONTEMPORARY LUXURY",
    origin: "DISTINCTIVE CRAFT",
    href: "/markalar/carren",
    accent: "text-[#846b32] group-hover/card:text-[#A1843F]",
    fontClass: "font-serif tracking-[0.2em] font-bold"
  }
];

export function BrandMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-[#FAF9F5] border-y border-[#E8E4D8] py-8 sm:py-10 md:py-16 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(194,167,104,0.12),transparent_70%)] pointer-events-none" />

      {/* Header section with Swiss Haute Horlogerie Aesthetics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#846b32]/8 border border-[#846b32]/20 mb-2.5 sm:mb-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#846b32] animate-pulse" />
          <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] text-[#846b32]">
            Haute Horlogerie & Maisons
          </span>
        </div>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#1F2421] tracking-[0.06em] md:tracking-[0.12em] font-normal uppercase">
          Dünyanın En Prestijli Saat Evleri
        </h2>
        
        <p className="mt-1.5 sm:mt-2 text-xs md:text-sm text-[#736B5E] max-w-xl mx-auto tracking-wide font-light">
          Otantik lüks, tescilli kronometrik hassasiyet ve asırlık İsviçre zanaatı
        </p>

        <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#846b32]/40" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#846b32]/60 bg-[#FAF9F5]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#846b32]/40" />
        </div>
      </div>

      {/* Luxury Edge Vignette Gradients for infinite flow depth */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-44 bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-44 bg-gradient-to-l from-[#FAF9F5] via-[#FAF9F5]/90 to-transparent z-20 pointer-events-none" />

      {/* Marquee Track Container */}
      <div 
        className="relative w-full flex overflow-x-hidden group/track select-none"
        style={{ WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }}
      >
        <div 
          ref={marqueeRef}
          className="flex items-center w-max luxury-marquee-animation group-hover/track:[animation-play-state:paused]"
        >
          {/* Quadruple duplication for ultra-smooth 60fps infinite seamless flow */}
          {[...LUXURY_BRANDS, ...LUXURY_BRANDS, ...LUXURY_BRANDS, ...LUXURY_BRANDS].map((brand, idx) => (
            <Link
              key={"marquee-brand-" + idx}
              href={brand.href}
              className="group/card mx-2 sm:mx-3 md:mx-4 flex-shrink-0 w-[165px] sm:w-[205px] md:w-[245px] h-[86px] sm:h-[98px] md:h-[110px] bg-gradient-to-b from-[#FFFFFF] via-[#FDFCF9] to-[#F7F5EE] border border-[#E8E2D5] rounded-xl p-2.5 sm:p-3.5 md:p-4 flex flex-col justify-between items-center text-center shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-6px_rgba(132,107,50,0.22)] hover:border-[#846b32]/50 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden active:scale-95"
            >
              {/* Premium Light Sheen reflection sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FFF9EA]/60 to-transparent opacity-0 group-hover/card:opacity-100 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

              {/* Top Origin Micro-Text */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#9E9585] uppercase font-medium">
                  {brand.origin}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#C2A768]/40 group-hover/card:bg-[#846b32] transition-colors" />
              </div>

              {/* Main Brand Name */}
              <div className="py-0.5 sm:py-1">
                <span className={"block text-sm sm:text-base md:text-lg " + brand.fontClass + " " + brand.accent + " transition-transform duration-500 group-hover/card:scale-105"}>
                  {brand.name}
                </span>
              </div>

              {/* Bottom Heritage / Motto Badge */}
              <div className="w-full pt-1 border-t border-[#EFECE3] flex items-center justify-center">
                <span className="text-[8px] sm:text-[9px] tracking-[0.16em] text-[#787163] uppercase font-semibold group-hover/card:text-[#846b32] transition-colors">
                  {brand.sub}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Global CSS for Hardware-Accelerated Fluid Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes luxury-marquee {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .luxury-marquee-animation {
          animation: luxury-marquee 32s linear infinite !important;
          will-change: transform;
        }
        @media (max-width: 640px) {
          .luxury-marquee-animation {
            animation: luxury-marquee 22s linear infinite !important;
          }
        }
      `}} />
    </section>
  );
}
