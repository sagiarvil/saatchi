'use client';
import React from 'react';

const BRANDS = [
  "ROLEX",
  "PATEK PHILIPPE",
  "AUDEMARS PIGUET",
  "VACHERON CONSTANTIN",
  "OMEGA",
  "CARTIER",
  "TAG HEUER",
  "IWC SCHAFFHAUSEN",
  "HUBLOT"
];

export function BrandMarquee() {
  return (
    <div className="w-full py-20 bg-background flex flex-col border-y border-surface-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12 flex justify-center items-center text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-foreground tracking-[0.2em] uppercase">Seçkin Markalar</h2>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden group">
        
        {/* Single Track translating by -50% containing 2 sets */}
        <div className="animate-marquee flex whitespace-nowrap items-center w-max">
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <div 
              key={`brand-${idx}`} 
              className="mx-4 flex-shrink-0 px-12 h-32 bg-white border border-surface-border flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 shadow-sm"
            >
              <span className="text-lg md:text-xl font-serif tracking-widest text-foreground/80">{brand}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
