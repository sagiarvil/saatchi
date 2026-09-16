'use client';

import { useState } from 'react';
import { ArrowUpRight, MapPin, MousePointer2, Navigation, ShieldCheck } from 'lucide-react';

const mapsUrl = 'https://share.google/mhx0N9skVc5ZibBPM';
const mapEmbed = 'https://www.google.com/maps?q=Menderes%20Caddesi%20No%3A231%2FB%20Buca%20Izmir&output=embed';

export default function PremiumMap() {
  const [interactive, setInteractive] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-24 lg:px-12">
      <div className="overflow-hidden border border-white/10 bg-[#100f0e] shadow-[0_30px_90px_rgba(0,0,0,.28)]">
        <div className="grid gap-6 border-b border-white/10 px-6 py-7 md:grid-cols-[1fr_auto] md:items-end md:px-9 md:py-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c49a9b]">
              <Navigation className="h-4 w-4" strokeWidth={1.25} />
              Showroom / Buca · İzmir
            </div>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-[#f5f0e8] md:text-3xl">Şirinyer’in merkezinde, fiziksel bir saat evi.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#aaa29a]">Menderes Caddesi No:231/B · Ürün inceleme, randevu ve teslim süreçleri için showroom konumumuz.</p>
          </div>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#7f262b]/70 bg-[#7f262b]/10 px-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f2e9df] transition-all hover:border-[#b26a6e] hover:bg-[#7f262b]/20">
            Yol tarifini aç <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative h-[390px] overflow-hidden bg-[#171513] sm:h-[470px] lg:h-[540px]">
          <iframe
            src={mapEmbed}
            title="SAATCHI Showroom - Menderes Caddesi No:231/B, Buca İzmir"
            className={`h-full w-full transition-all duration-700 ${interactive ? 'grayscale-0 opacity-100' : 'grayscale opacity-[.52]'}`}
            style={{ border: 0, pointerEvents: interactive ? 'auto' : 'none' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${interactive ? 'opacity-0' : 'opacity-100'} bg-[radial-gradient(circle_at_50%_46%,transparent_0%,rgba(13,12,11,.06)_40%,rgba(13,12,11,.40)_100%)]`} />

          {!interactive && (
            <button
              type="button"
              onClick={() => setInteractive(true)}
              className="absolute inset-0 flex cursor-pointer items-center justify-center p-6 text-center"
              aria-label="Haritayı etkileşimli hale getir"
            >
              <span className="max-w-sm border border-white/15 bg-[#0d0c0b]/88 px-7 py-6 text-[#f4f0e8] shadow-2xl backdrop-blur-xl transition-transform duration-300 hover:scale-[1.015]">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#c2a768]/40 bg-[#c2a768]/10">
                  <MapPin className="h-5 w-5 text-[#d2b774]" strokeWidth={1.25} />
                </span>
                <span className="mt-4 block text-sm font-medium">Showroom haritası</span>
                <span className="mt-2 block text-xs leading-6 text-[#aaa29a]">Haritada gezinmek ve yakınlaştırmak için etkinleştirin. Sayfa kaydırması yanlışlıkla yakalanmaz.</span>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8c6b0]">
                  <MousePointer2 className="h-4 w-4" /> Haritayı etkinleştir
                </span>
              </span>
            </button>
          )}

          {interactive && (
            <button
              type="button"
              onClick={() => setInteractive(false)}
              className="absolute bottom-5 left-5 inline-flex items-center gap-2 border border-white/15 bg-black/75 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-colors hover:bg-black/90"
            >
              <ShieldCheck className="h-4 w-4 text-[#c2a768]" strokeWidth={1.25} />
              Harita etkileşimini kilitle
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
