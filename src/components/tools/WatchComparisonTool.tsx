'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftRight, Check, Minus, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

interface WatchSpec {
  id: string;
  name: string;
  brand: string;
  price: string;
  priceNum: number;
  image: string;
  slug: string;
  caseDiameter: string;
  material: string;
  movement: string;
  powerReserve: string;
  waterResistance: string;
  crystal: string;
  bezel: string;
  targetUser: string;
}

const COMPARABLE_WATCHES: WatchSpec[] = [
  {
    id: 'rolex-submariner',
    name: 'Submariner Date 41',
    brand: 'Rolex',
    price: '₺1.375.000',
    priceNum: 1375000,
    image: '/images/saatler/submariner.png',
    slug: 'rolex-submariner-date',
    caseDiameter: '41 mm',
    material: 'Oystersteel (904L Çelik)',
    movement: 'Otomatik Calibre 3235',
    powerReserve: '70 Saat',
    waterResistance: '300 Metre / 30 Bar',
    crystal: 'Çizilmeye Dayanıklı Safir, Cyclops Lens',
    bezel: 'Tek Yönlü Dönebilen Seramik Cerachrom',
    targetUser: 'Profesyonel Dalış & Günlük Prestij'
  },
  {
    id: 'rolex-daytona',
    name: 'Cosmograph Daytona',
    brand: 'Rolex',
    price: '₺1.980.000',
    priceNum: 1980000,
    image: '/images/saatler/daytona.png',
    slug: 'rolex-cosmograph-daytona',
    caseDiameter: '40 mm',
    material: 'Oystersteel (904L Çelik)',
    movement: 'Otomatik Kronograf Calibre 4131',
    powerReserve: '72 Saat',
    waterResistance: '100 Metre / 10 Bar',
    crystal: 'Çizilmeye Dayanıklı Safir',
    bezel: 'Takimetre Skalalı Siyah Cerachrom Seramik',
    targetUser: 'Motor Sporları & Koleksiyoner'
  },
  {
    id: 'cartier-santos',
    name: 'Santos de Cartier Büyük Boy',
    brand: 'Cartier',
    price: '₺775.000',
    priceNum: 775000,
    image: '/images/saatler/santos.png',
    slug: 'cartier-santos-de-cartier',
    caseDiameter: '39.8 mm (Kare Form)',
    material: 'Cilalı ve Fırçalanmış Paslanmaz Çelik',
    movement: 'Otomatik Calibre 1847 MC',
    powerReserve: '42 Saat',
    waterResistance: '100 Metre / 10 Bar',
    crystal: 'Antirefle Safir Kristal',
    bezel: '8 Adet İkonik Vidaya Sahip Parlak Çelik',
    targetUser: 'Elit İş Yaşamı & Havacılık Mirası'
  },
  {
    id: 'cartier-tank',
    name: 'Tank Française',
    brand: 'Cartier',
    price: '₺550.000',
    priceNum: 550000,
    image: '/images/saatler/tank.png',
    slug: 'cartier-tank-francaise',
    caseDiameter: '36.7 mm x 30.5 mm',
    material: 'Paslanmaz Çelik & Mavi Spinel Taç',
    movement: 'Yüksek Hassasiyetli Otomatik',
    powerReserve: '38 Saat',
    waterResistance: '30 Metre / 3 Bar',
    crystal: 'Çizilmez Düz Safir Kristal',
    bezel: 'Entegre Kasa Tasarımı',
    targetUser: 'Klasik Paris Zarafeti & Zamansız Stil'
  },
  {
    id: 'tag-carrera',
    name: 'Carrera Chronograph Glassbox',
    brand: 'TAG Heuer',
    price: '₺345.000',
    priceNum: 345000,
    image: '/images/saatler/carrera.png',
    slug: 'tag-heuer-carrera-glassbox',
    caseDiameter: '39 mm',
    material: 'Paslanmaz Çelik',
    movement: 'Otomatik Calibre TH20-00',
    powerReserve: '80 Saat',
    waterResistance: '100 Metre / 10 Bar',
    crystal: 'Kubbeli Çift Yönlü Safir Kristal',
    bezel: 'İç Takimetre Skalalı Çerçevesiz Tasarım',
    targetUser: 'Modern Kronograf Tutkunları'
  },
  {
    id: 'rado-captain-cook',
    name: 'Captain Cook High-Tech Ceramic',
    brand: 'Rado',
    price: '₺142.500',
    priceNum: 142500,
    image: '/images/saatler/captain-cook.png',
    slug: 'rado-captain-cook-ceramic',
    caseDiameter: '43 mm',
    material: 'Plazma Yüksek Teknoloji Çizilmez Seramik',
    movement: 'Otomatik Calibre R734 (İskelet)',
    powerReserve: '80 Saat (Nivachron Yay)',
    waterResistance: '300 Metre / 30 Bar',
    crystal: 'Yansıma Önleyici Çift Kubbe Safir',
    bezel: 'Dönebilen Mat Plazma Seramik Bezel',
    targetUser: 'Yenilikçi Materyal & Dayanıklılık'
  }
];

export default function WatchComparisonTool() {
  const [watchAId, setWatchAId] = useState<string>('rolex-submariner');
  const [watchBId, setWatchBId] = useState<string>('cartier-santos');

  const watchA = COMPARABLE_WATCHES.find(w => w.id === watchAId) || COMPARABLE_WATCHES[0];
  const watchB = COMPARABLE_WATCHES.find(w => w.id === watchBId) || COMPARABLE_WATCHES[1];

  const specsList = [
    { label: 'Marka & Kategori', getVal: (w: WatchSpec) => `${w.brand} (Elit Lüks)` },
    { label: 'Kasa Çapı & Geometri', getVal: (w: WatchSpec) => w.caseDiameter },
    { label: 'Kasa & Bilezik Materyali', getVal: (w: WatchSpec) => w.material },
    { label: 'Mekanizma & Kalibre', getVal: (w: WatchSpec) => w.movement },
    { label: 'Güç Rezervi', getVal: (w: WatchSpec) => w.powerReserve },
    { label: 'Su Geçirmezlik', getVal: (w: WatchSpec) => w.waterResistance },
    { label: 'Ön Cam Teknolojisi', getVal: (w: WatchSpec) => w.crystal },
    { label: 'Bezel Yapısı', getVal: (w: WatchSpec) => w.bezel },
    { label: 'Karakter & Kullanım Amacı', getVal: (w: WatchSpec) => w.targetUser },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl text-white">
      {/* Başlık */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          Koleksiyoner Kıyaslama Laboratuvarı
        </div>
        <h2 className="text-2xl sm:text-3xl font-light text-white">
          Lüks Saat Karşılaştırma &amp; Teknik Analiz
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm mt-2">
          İki efsanevi başyapıtı kasa mimarisi, kalibre performansı ve küresel değerleme açısından yan yana inceleyin.
        </p>
      </div>

      {/* Model Seçim Başlıkları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sol Saat Seçimi */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
            1. Saat Modelini Seçin
          </label>
          <select
            value={watchAId}
            onChange={(e) => setWatchAId(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
          >
            {COMPARABLE_WATCHES.map((w) => (
              <option key={w.id} value={w.id} disabled={w.id === watchBId}>
                {w.brand} — {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sağ Saat Seçimi */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
            2. Karşılaştırılacak Modeli Seçin
          </label>
          <select
            value={watchBId}
            onChange={(e) => setWatchBId(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
          >
            {COMPARABLE_WATCHES.map((w) => (
              <option key={w.id} value={w.id} disabled={w.id === watchAId}>
                {w.brand} — {w.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kıyaslama Tablosu */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="py-4 px-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider w-1/3">
                Teknik Parametre
              </th>
              <th className="py-4 px-4 text-left text-sm font-medium text-amber-400 w-1/3 bg-neutral-950/40 rounded-t-lg">
                <span className="text-xs text-neutral-400 block">{watchA.brand}</span>
                <span className="text-base text-white font-normal">{watchA.name}</span>
                <span className="text-sm font-semibold text-amber-300 block mt-1">{watchA.price}</span>
              </th>
              <th className="py-4 px-4 text-left text-sm font-medium text-amber-400 w-1/3 bg-neutral-950/40 rounded-t-lg">
                <span className="text-xs text-neutral-400 block">{watchB.brand}</span>
                <span className="text-base text-white font-normal">{watchB.name}</span>
                <span className="text-sm font-semibold text-amber-300 block mt-1">{watchB.price}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 text-xs sm:text-sm">
            {specsList.map((spec, i) => (
              <tr key={i} className="hover:bg-neutral-800/20 transition-colors">
                <td className="py-3.5 px-4 font-medium text-neutral-400">
                  {spec.label}
                </td>
                <td className="py-3.5 px-4 text-neutral-200 bg-neutral-950/20">
                  {spec.getVal(watchA)}
                </td>
                <td className="py-3.5 px-4 text-neutral-200 bg-neutral-950/20">
                  {spec.getVal(watchB)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="py-5 px-4 font-medium text-neutral-400">
                Saatchi İnceleme Linki
              </td>
              <td className="py-5 px-4 bg-neutral-950/40">
                <Link
                  href={`/elit-saat/${watchA.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors"
                >
                  <span>Model Detayı</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </td>
              <td className="py-5 px-4 bg-neutral-950/40">
                <Link
                  href={`/elit-saat/${watchB.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors"
                >
                  <span>Model Detayı</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Alt Bilgi */}
      <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Tüm saatlerimiz orijinal sertifikalı ve Saatchi garantisi altındadır.</span>
        </div>
        <Link
          href="/saat-degerleme"
          className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
        >
          <span>Elinizdeki saati değerleyin</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
