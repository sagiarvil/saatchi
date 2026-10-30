'use client';

import React, { useState, useMemo } from 'react';
import { 
  SUPPORTED_LUXURY_BRANDS, 
  MATERIAL_MULTIPLIERS, 
  CONDITION_MULTIPLIERS, 
  BOX_PAPERS_MULTIPLIERS,
  calculateWatchValuation
} from '@/lib/valuation-engine';
import { ShieldCheck, ArrowRight, Zap, RefreshCw, Award, CheckCircle2, MessageCircle } from 'lucide-react';

export default function WatchValuationCalculator() {
  const [selectedBrand, setSelectedBrand] = useState<string>('Cartier');
  const [selectedModel, setSelectedModel] = useState<string>(SUPPORTED_LUXURY_BRANDS[0].models[0].name);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('steel');
  const [selectedCondition, setSelectedCondition] = useState<string>('mint');
  const [selectedBoxPapers, setSelectedBoxPapers] = useState<string>('full_set');

  // Marka değiştiğinde ilk modeli seç
  const currentBrandData = useMemo(() => {
    return SUPPORTED_LUXURY_BRANDS.find(b => b.brand === selectedBrand) || SUPPORTED_LUXURY_BRANDS[0];
  }, [selectedBrand]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const brandData = SUPPORTED_LUXURY_BRANDS.find(b => b.brand === brand);
    if (brandData && brandData.models.length > 0) {
      setSelectedModel(brandData.models[0].name);
    }
  };

  const valuation = useMemo(() => {
    return calculateWatchValuation({
      brand: selectedBrand,
      modelName: selectedModel,
      materialKey: selectedMaterial,
      conditionKey: selectedCondition,
      boxPapersKey: selectedBoxPapers,
      yearRange: '2020-2024'
    });
  }, [selectedBrand, selectedModel, selectedMaterial, selectedCondition, selectedBoxPapers]);

  const fmt = (n: number) => `₺${n.toLocaleString('tr-TR')}`;

  return (
    <div className="w-full max-w-5xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl text-white">
      {/* Başlık ve Rozet */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Zap className="w-3.5 h-3.5" />
            Canlı Saat Borsası Endeksli
          </div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            Lüks Saat Değerleme &amp; Nakit Alım Motoru
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Saatinizin güncel küresel piyasa değerini ve Saatchi anlık nakit alım teklifini 30 saniyede öğrenin.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>%100 Gizli &amp; Ücretsiz Ekspertiz</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sol Kolon: Seçim Alanları */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Marka Seçimi */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              1. Saat Markası
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {SUPPORTED_LUXURY_BRANDS.map((b) => (
                <button
                  key={b.brand}
                  type="button"
                  onClick={() => handleBrandChange(b.brand)}
                  className={`py-3 px-2 text-xs font-medium rounded-lg border transition-all text-center ${
                    selectedBrand === b.brand
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {b.brand}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Model Seçimi */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              2. Koleksiyon / Referans Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
              {currentBrandData.models.map((m) => (
                <option key={m.name} value={m.name} className="bg-neutral-900 text-white">
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Materyal Seçimi */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              3. Kasa Materyali
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
              {Object.entries(MATERIAL_MULTIPLIERS).map(([key, val]) => (
                <option key={key} value={key} className="bg-neutral-900 text-white">
                  {val.label}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Kondisyon */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              4. Kozmetik &amp; Mekanik Kondisyon
            </label>
            <div className="space-y-2">
              {Object.entries(CONDITION_MULTIPLIERS).map(([key, val]) => (
                <label
                  key={key}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedCondition === key
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="condition"
                    value={key}
                    checked={selectedCondition === key}
                    onChange={() => setSelectedCondition(key)}
                    className="mt-1 accent-amber-500"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-neutral-200">{val.label}</span>
                    <p className="text-neutral-500 mt-0.5">{val.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 5. Kutu & Evrak */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              5. Orijinal Kutu ve Sertifika Durumu
            </label>
            <select
              value={selectedBoxPapers}
              onChange={(e) => setSelectedBoxPapers(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
              {Object.entries(BOX_PAPERS_MULTIPLIERS).map(([key, val]) => (
                <option key={key} value={key} className="bg-neutral-900 text-white">
                  {val.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sağ Kolon: Canlı Değerleme Kartı */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8">
          <div className="space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">
                Seçilen Model Özeti
              </span>
              <h3 className="text-lg font-medium text-white mt-1">
                {selectedBrand} {selectedModel.split('(')[0]}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {MATERIAL_MULTIPLIERS[selectedMaterial]?.label}
              </p>
            </div>

            {/* Tahmini Piyasa Değeri */}
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-xs font-medium text-neutral-400 block mb-1">
                Tahmini Küresel Piyasa Değeri
              </span>
              <div className="text-2xl sm:text-3xl font-light text-neutral-200">
                {valuation ? fmt(valuation.estimatedMarketValueTry) : '—'}
              </div>
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Chrono24, WatchCharts ve küresel saat borsası ortalaması
              </span>
            </div>

            {/* Saatchi Anlık Nakit Alım Teklifi */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/30 to-amber-900/10 border border-amber-500/40 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-amber-500/20">
                <Award className="w-16 h-16" />
              </div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                Saatchi Doğrudan Nakit Alım Teklifi
              </span>
              <div className="text-2xl sm:text-3xl font-semibold text-amber-300">
                {valuation ? `${fmt(valuation.cashOfferMinTry)} - ${fmt(valuation.cashOfferMaxTry)}` : '—'}
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Fiziksel ekspertiz sonrası aynı gün zırhlı kurye veya mağazamızda anında banka havalesi / EFT ile nakit ödeme.
              </p>
            </div>

            {/* Takas Teklifi */}
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-neutral-400 block">
                  Katalog Saatlerimizle Takas Değeri
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  {valuation ? fmt(valuation.tradeInValueTry) : '—'}
                </span>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                +%10 Avantaj
              </span>
            </div>
          </div>

          {/* CTA Butonları */}
          <div className="pt-6 space-y-3">
            {valuation && (
              <a
                href={valuation.whatsappMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm tracking-wide transition-all shadow-lg hover:shadow-emerald-900/30"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp İle Teklifi Nakite Çevir</span>
              </a>
            )}
            <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Orijinallik Teyidi
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Anında EFT / Nakit
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sigortalı Teslimat
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
