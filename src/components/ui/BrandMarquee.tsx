'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const BRANDS = [
  { name: "ROLEX", font: "font-serif font-bold tracking-[0.1em]", color: "text-[#006039]" },
  { name: "PATEK PHILIPPE", font: "font-serif font-light tracking-[0.15em]", color: "text-[#4A3C31]" },
  { name: "AUDEMARS PIGUET", font: "font-sans font-medium tracking-widest uppercase", color: "text-[#111827]" },
  { name: "VACHERON CONSTANTIN", font: "font-serif font-light tracking-[0.2em] italic", color: "text-[#1F2937]" },
  { name: "OMEGA", font: "font-sans font-bold tracking-widest", color: "text-[#C8102E]" },
  { name: "CARTIER", font: "font-serif font-semibold tracking-[0.1em] italic", color: "text-[#8E2323]" },
  { name: "TAG HEUER", font: "font-sans font-black tracking-widest uppercase", color: "text-[#111827]" },
  { name: "IWC SCHAFFHAUSEN", font: "font-serif font-medium tracking-[0.1em]", color: "text-[#374151]" },
  { name: "HUBLOT", font: "font-sans font-black tracking-[0.15em] uppercase", color: "text-[#111827]" }
];

export function BrandMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mobil Safari'de veya enerji tasarrufu modlarında CSS animasyonları durduğunda bile çalışması için JS tabanlı zorunlu animasyon yedeği
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    // Eğer CSS engellenmişse JS ile zorla kaydır
    let pos = 0;
    const step = () => {
      if (!scrollerRef.current) return;
      pos -= 0.5;
      if (pos <= -50) pos = 0;
      scrollerRef.current.style.transform = `translate3d(${pos}%, 0, 0)`;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  return (
    <div className="w-full py-16 md:py-20 bg-[#F9FAFB] flex flex-col border-y border-[#E5E7EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-10 flex justify-center items-center text-center">
        <h2 className="text-xl md:text-2xl font-serif text-[#4B5563] tracking-[0.25em] uppercase">Dünyanın Zirvesindeki Evler</h2>
      </div>
      
      {/* Marquee Container with explicit 3D transform for hardware acceleration on iOS */}
      <div className="relative w-full flex overflow-x-hidden group" style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}>
        
        {/* Single Track translating by -50% containing 2 sets */}
        <div 
          ref={scrollerRef}
          className="flex whitespace-nowrap items-center w-max"
          style={{
            animation: 'marquee 30s linear infinite',
            // Override user settings forcefully
            animationPlayState: 'running !important',
          }}
        >
          {/* We duplicate the array for a seamless loop */}
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <Link 
              href={`/markalar/${brand.name.toLowerCase().replace(/ /g, '-')}`}
              key={`brand-${idx}`} 
              className="mx-4 flex-shrink-0 w-64 md:w-72 h-32 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-500 shadow-sm hover:shadow-md hover:-translate-y-1 relative overflow-hidden group/item"
            >
              {/* Premium Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/item:opacity-100 -translate-x-full group-hover/item:translate-x-full transition-all duration-1000"></div>
              
              <span className={`text-sm md:text-base ${brand.font} ${brand.color} group-hover/item:scale-105 transition-transform duration-500`}>
                {brand.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
      
      {/* Inline styles to forcefully ensure marquee animation exists and bypasses reduced motion */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .flex.whitespace-nowrap.items-center.w-max {
          animation: marquee 30s linear infinite !important; } @media (prefers-reduced-motion: reduce) { .flex.whitespace-nowrap.items-center.w-max { animation: marquee 30s linear infinite !important; }
        }
      `}} />
    </div>
  );
}
