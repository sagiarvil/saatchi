import React from 'react';
import type { Metadata } from 'next';
import WatchComparisonTool from '@/components/tools/WatchComparisonTool';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lüks Saat Karşılaştırma & Model Kıyaslama — SAATCHI',
  description: 'Cartier, TAG Heuer ve Rado modellerini teknik özellikleri, kasa çapları, mekanizmaları ve fiyat endeksleriyle yan yana karşılaştırın.',
  keywords: [
    'saat karşılaştırma',
    'cartier santos vs tank',
    'tag heuer vs rado',
    'lüks saat kıyaslama',
    'mekanizma karşılaştırma',
    'saat özellikleri kıyasla'
  ],
  openGraph: {
    title: 'Lüks Saat Karşılaştırma Laboratuvarı | SAATCHI',
    description: 'En prestijli lüks saat modellerini yan yana karşılaştırın. Kasa çapı, su geçirmezlik, kalibre ve fiyat analizi.',
    url: 'https://saatchi.com.tr/karsilastir',
    type: 'website'
  },
  alternates: {
    canonical: 'https://saatchi.com.tr/karsilastir'
  }
};

export default function KarsilastirPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Saatchi Lüks Saat Karşılaştırma Laboratuvarı',
        url: 'https://saatchi.com.tr/karsilastir',
        description: 'Rolex, Cartier ve İsviçre saat modellerini teknik ve estetik parametrelerle yan yana inceleme ve kıyaslama aracı.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-neutral-300">Lüks Saat Karşılaştırma</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-500 text-xs font-semibold tracking-widest uppercase block mb-3">
            SAATCHI HOROLOGY LAB
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            Lüks Saat Karşılaştırma Laboratuvarı
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Hangi başyapıtın sizin yaşam tarzınıza ve yatırım hedefinize en uygun olduğunu keşfetmek için 
            efsanevi modelleri yan yana teknik olarak kıyaslayın.
          </p>
        </div>

        {/* Karşılaştırma Aracı */}
        <WatchComparisonTool />
      </div>
    </div>
  );
}
