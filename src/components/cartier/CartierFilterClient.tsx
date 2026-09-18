'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProxiedImageUrl } from '@/utils/imageProxy';

type Watch = any; // Assuming it matches the catalog data

export default function CartierFilterClient({ initialWatches }: { initialWatches: Watch[] }) {
  const [selectedKoleksiyon, setSelectedKoleksiyon] = useState<string[]>([]);
  const [selectedMekanizma, setSelectedMekanizma] = useState<string[]>([]);
  const [selectedMateryal, setSelectedMateryal] = useState<string[]>([]);

  // Parse attributes from modelName
  const watchesWithAttr = useMemo(() => {
    return initialWatches.map(watch => {
      const name = watch.modelName || '';
      const nameUpper = name.toUpperCase();
      
      let koleksiyon = 'Diğer';
      if (nameUpper.includes('TANK')) koleksiyon = 'Tank';
      else if (nameUpper.includes('SANTOS')) koleksiyon = 'Santos de Cartier';
      else if (nameUpper.includes('BALLON BLEU')) koleksiyon = 'Ballon Bleu de Cartier';
      else if (nameUpper.includes('PASHA')) koleksiyon = 'Pasha de Cartier';
      else if (nameUpper.includes('PANTHÈRE') || nameUpper.includes('PANTHERE')) koleksiyon = 'Panthère de Cartier';
      else if (nameUpper.includes('BAIGNOIRE')) koleksiyon = 'Baignoire';
      else if (nameUpper.includes('RONDE')) koleksiyon = 'Ronde de Cartier';

      let mekanizma = 'Bilinmiyor';
      if (nameUpper.includes('OTOMATİK')) mekanizma = 'Otomatik';
      else if (nameUpper.includes('KUVARS') || nameUpper.includes('QUARTZ')) mekanizma = 'Kuvars';
      else if (nameUpper.includes('MANUEL KURMALI')) mekanizma = 'Manuel Kurmalı';

      let materyal = 'Bilinmiyor';
      if (nameUpper.includes('ÇELİK') || nameUpper.includes('CELIK')) materyal = 'Çelik';
      else if (nameUpper.includes('PEMBE ALTIN')) materyal = 'Pembe Altın';
      else if (nameUpper.includes('SARI ALTIN')) materyal = 'Sarı Altın';

      return { ...watch, koleksiyon, mekanizma, materyal };
    });
  }, [initialWatches]);

  const koleksiyonlar = useMemo(() => Array.from(new Set(watchesWithAttr.map(w => w.koleksiyon))).filter(k => k !== 'Diğer').sort(), [watchesWithAttr]);
  const mekanizmalar = useMemo(() => Array.from(new Set(watchesWithAttr.map(w => w.mekanizma))).filter(m => m !== 'Bilinmiyor').sort(), [watchesWithAttr]);
  const materyaller = useMemo(() => Array.from(new Set(watchesWithAttr.map(w => w.materyal))).filter(m => m !== 'Bilinmiyor').sort(), [watchesWithAttr]);

  const filteredWatches = useMemo(() => {
    return watchesWithAttr.filter(w => {
      const matchK = selectedKoleksiyon.length === 0 || selectedKoleksiyon.includes(w.koleksiyon);
      const matchM = selectedMekanizma.length === 0 || selectedMekanizma.includes(w.mekanizma);
      const matchMat = selectedMateryal.length === 0 || selectedMateryal.includes(w.materyal);
      return matchK && matchM && matchMat;
    });
  }, [watchesWithAttr, selectedKoleksiyon, selectedMekanizma, selectedMateryal]);

  const toggleFilter = (setter: any, value: string, current: string[]) => {
    if (current.includes(value)) {
      setter(current.filter((v: string) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
      {/* Sidebar Filters */}
      <div className="w-full md:w-72 flex-shrink-0">
        <div className="md:sticky md:top-28 space-y-10 border border-surface-border p-6 md:p-8 rounded-2xl bg-surface/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2 border-b border-surface-border pb-4">
            <h3 className="font-serif text-lg text-foreground">Filtrele</h3>
            {(selectedKoleksiyon.length > 0 || selectedMekanizma.length > 0 || selectedMateryal.length > 0) && (
              <button onClick={() => { setSelectedKoleksiyon([]); setSelectedMekanizma([]); setSelectedMateryal([]); }} className="text-[10px] uppercase tracking-widest text-[#8d5f62] hover:text-[#b17d80] transition-colors font-bold">Temizle</button>
            )}
          </div>

          {/* Koleksiyon */}
          {koleksiyonlar.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-5">Koleksiyonlar</h4>
              <div className="space-y-4">
                {koleksiyonlar.map(k => (
                  <label key={k} onClick={() => toggleFilter(setSelectedKoleksiyon, k, selectedKoleksiyon)} className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedKoleksiyon.includes(k) ? 'bg-[#8d5f62] border-[#8d5f62]' : 'border-surface-border bg-transparent group-hover:border-[#8d5f62]'}`}>
                      {selectedKoleksiyon.includes(k) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-[13px] transition-colors ${selectedKoleksiyon.includes(k) ? 'text-foreground font-medium' : 'text-foreground/70 group-hover:text-foreground'}`}>{k}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Mekanizma */}
          {mekanizmalar.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-5">Saat Mekanizması</h4>
              <div className="space-y-4">
                {mekanizmalar.map(m => (
                  <label key={m} onClick={() => toggleFilter(setSelectedMekanizma, m, selectedMekanizma)} className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedMekanizma.includes(m) ? 'bg-[#8d5f62] border-[#8d5f62]' : 'border-surface-border bg-transparent group-hover:border-[#8d5f62]'}`}>
                      {selectedMekanizma.includes(m) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-[13px] transition-colors ${selectedMekanizma.includes(m) ? 'text-foreground font-medium' : 'text-foreground/70 group-hover:text-foreground'}`}>{m}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Kasa Malzemesi */}
          {materyaller.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-5">Kasa Malzemesi</h4>
              <div className="space-y-4">
                {materyaller.map(mat => (
                  <label key={mat} onClick={() => toggleFilter(setSelectedMateryal, mat, selectedMateryal)} className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedMateryal.includes(mat) ? 'bg-[#8d5f62] border-[#8d5f62]' : 'border-surface-border bg-transparent group-hover:border-[#8d5f62]'}`}>
                      {selectedMateryal.includes(mat) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-[13px] transition-colors ${selectedMateryal.includes(mat) ? 'text-foreground font-medium' : 'text-foreground/70 group-hover:text-foreground'}`}>{mat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="mb-6 flex justify-between items-center text-sm text-foreground/60">
          <span>{filteredWatches.length} Model Bulundu</span>
        </div>

        {filteredWatches.length === 0 ? (
          <div className="text-center text-foreground/50 py-32 border border-surface-border rounded-2xl bg-surface/30">
            Seçilen filtrelere uygun Cartier modeli bulunamadı. Lütfen filtreleri değiştirin.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredWatches.map((watch, idx) => {
              const watchSlug = String(watch.seoUrl || '').split('/').filter(Boolean).pop() || String(watch.id || idx);
              const linkUrl = `/elit-saat/${watchSlug}`;

              return (
                <Link href={linkUrl} key={String(watch.id || idx)} className="group bg-surface rounded-xl border border-surface-border overflow-hidden hover:shadow-lg hover:border-[#8d5f62]/40 transition-all duration-500 flex flex-col">
                  <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#FAFAFA] flex items-center justify-center">
                    {watch.image ? (
                      <Image unoptimized src={getProxiedImageUrl(watch.image)} alt={watch.modelName} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-8 md:p-12 group-hover:scale-[1.04] transition-transform duration-700 ease-out mix-blend-multiply drop-shadow-sm" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4">
                        <span className="text-[#8d5f62] text-[10px] tracking-widest uppercase font-bold text-center">Cartier</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center p-6 flex flex-col flex-grow items-center justify-between border-t border-surface-border/50">
                    <div>
                      <h2 className="text-[13px] font-sans text-foreground/90 mb-4 leading-relaxed group-hover:text-[#8d5f62] transition-colors line-clamp-2 min-h-[40px] tracking-wide">{watch.modelName}</h2>
                    </div>
                    <div>
                      <p className="text-[15px] font-serif text-foreground">{watch.price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
