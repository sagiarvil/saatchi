'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Watch, ShieldCheck, Truck, Award, ArrowRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { getProxiedImageUrl } from '@/utils/imageProxy';

interface WatchItem {
  id: string;
  brand: string;
  modelName: string;
  calculatedPrice: number;
  price: string;
  seoUrl: string;
  image: string;
  ref?: string;
  reference?: string;
  condition?: string;
  kasaCapi?: string;
}

interface Props {
  allWatches: WatchItem[];
}

const BRAND_TABS = [
  { id: "all", label: "Tüm Başyapıtlar" },
  { id: "rolex", label: "Rolex" },
  { id: "cartier", label: "Cartier" },
  { id: "tag-heuer", label: "TAG Heuer" },
  { id: "rado", label: "Rado" },
];

export function FeaturedLuxuryWatches({ allWatches }: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredWatches = useMemo(() => {
    let list = [...allWatches];
    if (activeTab === "rolex") {
      list = list.filter(w => (w.brand || "").toLowerCase().includes("rolex"));
    } else if (activeTab === "cartier") {
      list = list.filter(w => (w.brand || "").toLowerCase().includes("cartier"));
    } else if (activeTab === "tag-heuer") {
      list = list.filter(w => (w.brand || "").toLowerCase().includes("tag heuer"));
    } else if (activeTab === "rado") {
      list = list.filter(w => (w.brand || "").toLowerCase().includes("rado"));
    } else {
      // Tüm başyapıtlar için: En yüksek fiyatlı Rolex, Cartier, TAG Heuer ve Rado modellerinden dengeli ve prestijli bir seçki
      const rolexes = list.filter(w => (w.brand || "").toLowerCase().includes("rolex")).sort((a,b) => b.calculatedPrice - a.calculatedPrice).slice(0, 2);
      const cartiers = list.filter(w => (w.brand || "").toLowerCase().includes("cartier")).sort((a,b) => b.calculatedPrice - a.calculatedPrice).slice(0, 2);
      const tagHeuers = list.filter(w => (w.brand || "").toLowerCase().includes("tag heuer")).sort((a,b) => b.calculatedPrice - a.calculatedPrice).slice(0, 2);
      const rados = list.filter(w => (w.brand || "").toLowerCase().includes("rado")).sort((a,b) => b.calculatedPrice - a.calculatedPrice).slice(0, 2);
      return [...rolexes, ...cartiers, ...tagHeuers, ...rados];
    }
    const sorted = list.sort((a, b) => b.calculatedPrice - a.calculatedPrice);
    const count = sorted.length >= 8 ? 8 : (sorted.length >= 6 ? 6 : (sorted.length >= 4 ? 4 : sorted.length));
    const evenCount = count % 2 === 0 ? count : count - 1;
    return sorted.slice(0, Math.max(evenCount, 2));
  }, [allWatches, activeTab]);

  return (
    <section className="w-full bg-[#FAF8F5] py-14 sm:py-20 md:py-28 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#E8E2D5]">
      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(circle_at_top,rgba(194,167,104,0.16),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[1536px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#846b32]/10 border border-[#846b32]/25 mb-3 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#846b32]" />
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.28em] text-[#846b32]">
              Haute Horlogerie Seçkisi
            </span>
          </div>

          <h3 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-serif font-normal text-[#1A1814] tracking-[0.06em] uppercase mb-3 sm:mb-4"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            Seçkin Saat Başyapıtları
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-[#6E6659] max-w-xl mx-auto font-light tracking-wide px-4">
            Bağımsız ekspertiz onaylı, orijinal sertifikalı ve anında teslime hazır ikonik zaman ölçerler
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5">
            <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#846b32]/50" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#846b32] bg-[#846b32]/20" />
            <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#846b32]/50" />
          </div>
        </div>

        {/* Interactive Luxury Brand Tabs (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 mb-8 sm:mb-12 px-1 py-1">
          {BRAND_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm tracking-[0.12em] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#1F2421] text-[#E8D7B0] shadow-md shadow-black/10 scale-105 border border-[#846b32]/40"
                    : "bg-white/80 text-[#6B6355] hover:text-[#1F2421] hover:bg-white border border-[#E8E2D5]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Symmetrical Luxury Grid (2 columns on mobile, 3-4 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
          {filteredWatches.map((watch) => {
            const refCode = watch.ref || watch.reference || "";
            return (
              <Link 
                href={watch.seoUrl} 
                key={watch.id} 
                className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_35px_-10px_rgba(132,107,50,0.2)] hover:border-[#846b32]/50 transition-all duration-500 hover:-translate-y-1 relative active:scale-[0.98]"
              >
                {/* Watch Presentation Pedestal / Image Stage with Diamond Finish */}
                <div className="w-full aspect-square sm:aspect-[4/5] bg-gradient-to-b from-[#FCFBF8] via-[#F8F5EE] to-[#EFEAE0] relative flex items-center justify-center overflow-hidden border-b border-[#EFECE3]">
                  {/* Subtle radial ambient reflection on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(194,167,104,0.18),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Top Badge: Certified Authentic */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                    <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] tracking-wider uppercase font-semibold text-[#846b32] bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#846b32]/25 shadow-xs">
                      <Award className="w-2.5 h-2.5 text-[#846b32]" />
                      Sertifikalı
                    </span>
                  </div>

                  {/* Top Right Quick Delivery Badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                    <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] tracking-wider uppercase font-semibold text-[#1A1814] bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-black/5 shadow-xs">
                      <Clock className="w-2.5 h-2.5 text-[#846b32]" />
                      Hemen Teslim
                    </span>
                  </div>

                  {/* Main Watch Packshot */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center p-3 sm:p-5 md:p-6 z-0">
                    {watch.image ? (
                      <Image 
                        unoptimized 
                        src={getProxiedImageUrl(watch.image)} 
                        alt={watch.modelName} 
                        fill 
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" 
                        className="object-contain p-2 sm:p-3 group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)]" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#846b32]/30">
                        <Watch className="w-10 h-10 mb-1 opacity-50" />
                        <span className="text-[9px] tracking-widest uppercase font-bold">Özel Koleksiyon</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Action Overlay Tag */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#846b32]/30 flex items-center justify-center text-[#846b32] group-hover:bg-[#846b32] group-hover:text-white transition-all shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
                
                {/* Watch Metadata / Luxury Details */}
                <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow justify-between text-left bg-white">
                  <div>
                    {/* Brand name and Reference */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[#846b32] text-[9px] sm:text-[10px] md:text-xs tracking-[0.22em] uppercase font-bold">
                        {watch.brand}
                      </span>
                      {refCode && (
                        <span className="text-[8px] sm:text-[9px] tracking-wider text-[#9E9585] font-mono truncate max-w-[80px]">
                          Ref. {refCode.slice(0, 10)}
                        </span>
                      )}
                    </div>

                    {/* Model Name */}
                    <h4 
                      className="text-xs sm:text-sm md:text-[15px] font-serif text-[#1F2421] mb-2 sm:mb-3 group-hover:text-[#846b32] transition-colors line-clamp-2 leading-snug font-medium min-h-[2.4em]"
                      title={watch.modelName}
                    >
                      {watch.modelName}
                    </h4>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="pt-2 sm:pt-3 border-t border-[#F2EFE8] flex items-baseline justify-between gap-1">
                    <div>
                      <span className="text-[8px] sm:text-[9px] text-[#8C8474] tracking-wider uppercase block font-medium">
                        Saatchi Satış Fiyatı
                      </span>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-[#1F2421] tracking-tight">
                        {watch.price}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] tracking-wider text-[#846b32] font-semibold uppercase group-hover:translate-x-0.5 transition-transform">
                      İncele
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Global Collection Button */}
        <div className="text-center mt-10 sm:mt-14 md:mt-18">
          <Link 
            href="/elit-saat/koleksiyon" 
            className="inline-flex items-center justify-center gap-3 bg-[#1F2421] hover:bg-[#846b32] text-[#F5EBD4] hover:text-white transition-all duration-300 rounded-full px-8 sm:px-12 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-[#846b32]/20 active:scale-95 border border-[#846b32]/30"
          >
            <span>Tüm Elit Koleksiyonu Keşfet ({allWatches.length} Başyapıt)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Swiss Luxury Heritage & Confidence Badges (Ultra-Optimized for Mobile) */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-[#E8E2D5]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="flex items-center sm:flex-col sm:justify-center gap-3.5 p-4 rounded-xl bg-white/80 border border-[#E8E2D5] shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#846b32]/10 flex items-center justify-center text-[#846b32] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left sm:text-center">
              <h5 className="text-xs sm:text-sm font-bold text-[#1F2421] tracking-wide uppercase">
                %100 Orijinallik Garantisi
              </h5>
              <p className="text-[11px] sm:text-xs text-[#736B5E] mt-0.5">
                Uzman horologlar tarafından doğrulanmış bağımsız ekspertiz raporu
              </p>
            </div>
          </div>

          <div className="flex items-center sm:flex-col sm:justify-center gap-3.5 p-4 rounded-xl bg-white/80 border border-[#E8E2D5] shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#846b32]/10 flex items-center justify-center text-[#846b32] flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-left sm:text-center">
              <h5 className="text-xs sm:text-sm font-bold text-[#1F2421] tracking-wide uppercase">
                Zırhlı & Sigortalı Teslimat
              </h5>
              <p className="text-[11px] sm:text-xs text-[#736B5E] mt-0.5">
                Kapınıza kadar tam değer sigortalı özel lüks lojistik transferi
              </p>
            </div>
          </div>

          <div className="flex items-center sm:flex-col sm:justify-center gap-3.5 p-4 rounded-xl bg-white/80 border border-[#E8E2D5] shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#846b32]/10 flex items-center justify-center text-[#846b32] flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left sm:text-center">
              <h5 className="text-xs sm:text-sm font-bold text-[#1F2421] tracking-wide uppercase">
                VIP Saat Danışmanlığı
              </h5>
              <p className="text-[11px] sm:text-xs text-[#736B5E] mt-0.5">
                Koleksiyon oluşturma ve nadir modeller için kişisel danışman desteği
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
