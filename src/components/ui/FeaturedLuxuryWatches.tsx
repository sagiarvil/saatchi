'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Watch, ShieldCheck, Truck, Award, ArrowRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { getProxiedImageUrl } from '@/utils/imageProxy';
import { useGsapScrollReveal } from '@/lib/gsap';
import { GiantWatermark } from '@/components/ui/GiantWatermark';

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
  { id: "tissot", label: "Tissot" },
  { id: "seiko", label: "Seiko" },
  { id: "versace", label: "Versace" },
  { id: "casio", label: "Casio" },
  { id: "carren", label: "Carren" },
];

export function FeaturedLuxuryWatches({ allWatches }: Props) {
  const [activeTab, setActiveTab] = useState("all");
  const sectionRef = useGsapScrollReveal<HTMLElement>({ y: 20, duration: 0.8 });

  const filteredWatches = useMemo(() => {
    let list = [...(allWatches || [])];
    if (activeTab === "tissot") {
      list = list.filter(w => (w.brand || "").toLowerCase().includes("tissot"));
    } else if (activeTab === "seiko") {
      list = list.filter(w => (w.brand || "").toLowerCase().includes("seiko"));
    } else if (activeTab === "versace") {
      list = list.filter(w => (w.brand || "").toLowerCase().includes("versace"));
    } else if (activeTab === "casio") {
      list = list.filter(w => (w.brand || "").toLowerCase().includes("casio"));
    } else if (activeTab === "carren") {
      list = list.filter(w => (w.brand || "").toLowerCase().includes("carren"));
    } else {
      // Tüm başyapıtlar için dengeli ve prestijli seçki
      const tissots = list.filter(w => (w.brand || "").toLowerCase().includes("tissot")).slice(0, 3);
      const seikos = list.filter(w => (w.brand || "").toLowerCase().includes("seiko")).slice(0, 3);
      const versaces = list.filter(w => (w.brand || "").toLowerCase().includes("versace")).slice(0, 3);
      const casios = list.filter(w => (w.brand || "").toLowerCase().includes("casio")).slice(0, 3);
      list = [...tissots, ...seikos, ...versaces, ...casios];
    }
    return list.slice(0, 12);
  }, [allWatches, activeTab]);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-[#0A0A0A] text-white relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(194,167,104,0.12),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#846b32]/10 border border-[#846b32]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C2A768]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C2A768]">
              Küratörlü Saat Koleksiyonu
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F5F2EB] tracking-wide uppercase">
            Öne Çıkan Başyapıtlar
          </h2>
          <p className="mt-3 text-sm text-[#A8A29E] font-light leading-relaxed">
            Hassas işçilik, tescilli orijinallik ve zamansız tasarım kodlarıyla donatılmış ikonik modeller.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {BRAND_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#846b32] text-white shadow-[0_0_20px_rgba(132,107,50,0.4)]'
                    : 'bg-white/5 text-[#A8A29E] hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredWatches.map(watch => (
            <Link
              key={watch.id}
              href={watch.seoUrl || `/saatler/${watch.id}`}
              className="group bg-[#121110] border border-white/10 hover:border-[#846b32]/50 rounded-xl overflow-hidden transition-all duration-500 flex flex-col hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
            >
              <div className="relative aspect-square w-full bg-[#181716] overflow-hidden flex items-center justify-center p-6">
                <Image
                  src={getProxiedImageUrl(watch.image)}
                  alt={watch.modelName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase tracking-wider text-[#C2A768] font-medium border border-white/10">
                  {watch.brand}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between bg-gradient-to-b from-[#121110] to-[#0D0C0B]">
                <div>
                  <h3 className="text-sm font-medium text-[#EDE8DF] line-clamp-2 group-hover:text-[#C2A768] transition-colors leading-snug">
                    {watch.modelName}
                  </h3>
                  {watch.ref && (
                    <p className="text-[11px] text-[#736B5E] mt-1 font-mono">
                      Ref. {watch.ref}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#736B5E]">Fiyat</span>
                    <span className="text-base font-semibold text-[#F5F2EB] font-mono">
                      {watch.price}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#846b32] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
