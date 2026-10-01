export interface WatchBrandModel {
  brand: string;
  models: {
    name: string;
    baseMarketValueTry: number;
    popularYears: string;
    description: string;
  }[];
}

export const SUPPORTED_LUXURY_BRANDS: WatchBrandModel[] = [
  {
    brand: 'Rolex',
    models: [
      { name: 'Submariner Date (126610LN / 116610LN)', baseMarketValueTry: 550000, popularYears: '2015-2024', description: 'İkonik dalgıç saati, seramik bezel, 300m su geçirmezlik' },
      { name: 'Cosmograph Daytona (116500LN / 126500LN)', baseMarketValueTry: 1150000, popularYears: '2016-2024', description: 'Efsanevi yarış kronografı, Cerachrom bezel' },
      { name: 'Datejust 41 (126334 Fluted Jubilee)', baseMarketValueTry: 490000, popularYears: '2017-2024', description: 'Zamansız şıklık, yivli beyaz altın bezel, jübile bilezik' },
      { name: 'GMT-Master II "Pepsi" (126710BLRO)', baseMarketValueTry: 720000, popularYears: '2018-2024', description: 'Çift zaman dilimli, kırmızı-mavi seramik Cerachrom bezel' },
      { name: 'GMT-Master II "Batman" (126710BLNR)', baseMarketValueTry: 650000, popularYears: '2019-2024', description: 'Mavi-siyah seramik bezel, yüksek talep gören seyahat saati' },
      { name: 'Oyster Perpetual 41 (124300)', baseMarketValueTry: 340000, popularYears: '2020-2024', description: 'Minimalist Rolex DNA, canlı kadran seçenekleri' },
      { name: 'Day-Date 40 "President" (228238)', baseMarketValueTry: 1650000, popularYears: '2015-2024', description: 'Liderlerin tercihi, som altın kasa ve president bilezik' }
    ]
  },
  {
    brand: 'Cartier',
    models: [
      { name: 'Santos de Cartier (Büyük Boy WSSA0018)', baseMarketValueTry: 310000, popularYears: '2018-2024', description: 'Tarihin ilk pilot saati, vidalı kare bezel, QuickSwitch' },
      { name: 'Tank Française (WSTA0065)', baseMarketValueTry: 220000, popularYears: '2016-2024', description: 'Fransız zarafeti, entegre metal bilezikli tank form' },
      { name: 'Tank Must de Cartier (WSTA0041)', baseMarketValueTry: 145000, popularYears: '2021-2024', description: 'Modern klasiğin yeniden doğuşu, minimalist deri kayış' },
      { name: 'Ballon Bleu de Cartier (40mm WSBB0040)', baseMarketValueTry: 260000, popularYears: '2017-2024', description: 'Korumalı mavi safir kurma kolu, kubbeli akıcı hatlar' },
      { name: 'Panthère de Cartier (WSPN0007)', baseMarketValueTry: 210000, popularYears: '2018-2024', description: 'Mücevher zarafetinde ikonik bilezik ve kedi gözü formu' }
    ]
  },
  {
    brand: 'TAG Heuer',
    models: [
      { name: 'Carrera Chronograph (Glassbox 39mm)', baseMarketValueTry: 230000, popularYears: '2023-2024', description: 'Kubbe safir camlı modern kronograf başyapıtı' },
      { name: 'Monaco Calibre 11 (Steve McQueen CAW211P)', baseMarketValueTry: 275000, popularYears: '2015-2024', description: 'Kare formlu motor sporları ikonu, sol kurma kolu' },
      { name: 'Aquaracer Professional 300', baseMarketValueTry: 125000, popularYears: '2021-2024', description: 'Dalgıç saati, 12 köşeli tek yönlü bezel' }
    ]
  },
  {
    brand: 'Rado',
    models: [
      { name: 'Captain Cook Automatic (42mm)', baseMarketValueTry: 95000, popularYears: '2020-2024', description: 'Vintage dalgıç tasarımı, yüksek teknoloji seramik bezel' },
      { name: 'True Square Open Heart High-Tech Ceramic', baseMarketValueTry: 110000, popularYears: '2021-2024', description: 'İskelet kadran, monoblok çizilmez plazma seramik kasa' }
    ]
  },
  {
    brand: 'Tissot',
    models: [
      { name: 'PRX Powermatic 80 (40mm)', baseMarketValueTry: 32000, popularYears: '2021-2024', description: '70ler entegre çelik bilezik tasarımı, 80 saat rezerv' },
      { name: 'PRX Chronograph Automatic', baseMarketValueTry: 68000, popularYears: '2022-2024', description: 'Panda kadranlı entegre spor kronograf' },
      { name: 'Seastar 1000 Powermatic 80', baseMarketValueTry: 38000, popularYears: '2020-2024', description: '300m su geçirmez profesyonel su sporları saati' }
    ]
  }
];

export const MATERIAL_MULTIPLIERS: Record<string, { label: string; multiplier: number }> = {
  steel: { label: 'Paslanmaz Çelik (Oystersteel / 316L)', multiplier: 1.0 },
  bicolor: { label: 'Çift Renk / Altın-Çelik (Rolesor)', multiplier: 1.25 },
  yellow_gold: { label: '18 Ayar Sarı Altın', multiplier: 1.75 },
  rose_gold: { label: '18 Ayar Gül Altın (Everose)', multiplier: 1.85 },
  white_gold: { label: '18 Ayar Beyaz Altın', multiplier: 1.90 },
  platinum: { label: '950 Platin', multiplier: 2.35 },
  ceramic: { label: 'Yüksek Teknoloji Seramik', multiplier: 1.20 },
  titanium: { label: 'Grade 5 Titanyum', multiplier: 1.15 }
};

export const CONDITION_MULTIPLIERS: Record<string, { label: string; multiplier: number; description: string }> = {
  unworn: { label: 'Sıfır / Jelatinli (Unworn)', multiplier: 1.05, description: 'Hiç kullanılmamış, fabrika koruma bantları üzerinde veya sıfır kondisyonda.' },
  mint: { label: 'Kusursuz / Mint (%98+)', multiplier: 0.96, description: 'Gözle görülür kılcal çizik dahi bulunmayan vitrin kondisyonu.' },
  very_good: { label: 'Çok İyi (%90-95)', multiplier: 0.88, description: 'Hafif günlük kullanım izleri, polisaj gerektirmeyen temiz kasa.' },
  good: { label: 'İyi / Düzenli Kullanılmış (%80-89)', multiplier: 0.76, description: 'Belirgin kılcal çizikler, mekanizması sorunsuz çalışan saat.' },
  fair: { label: 'Orta / Bakım Gerektiren (<%80)', multiplier: 0.62, description: 'Derin vuruk veya çizikler mevcut, genel polisaj ve servis ihtiyacı var.' }
};

export const BOX_PAPERS_MULTIPLIERS: Record<string, { label: string; multiplier: number }> = {
  full_set: { label: 'Tam Set (Orijinal Kutu + Garanti Kartı/Sertifika)', multiplier: 1.15 },
  papers_only: { label: 'Yalnız Orijinal Garanti Kartı/Sertifika', multiplier: 1.07 },
  box_only: { label: 'Yalnız Orijinal Kutu', multiplier: 1.02 },
  watch_only: { label: 'Yalnız Saat (Kutu ve Sertifikasız)', multiplier: 0.90 }
};

export interface ValuationInput {
  brand: string;
  modelName: string;
  materialKey: string;
  conditionKey: string;
  boxPapersKey: string;
  yearRange: string;
}

export interface ValuationResult {
  estimatedMarketValueTry: number;
  cashOfferMinTry: number;
  cashOfferMaxTry: number;
  tradeInValueTry: number;
  whatsappMessage: string;
  summary: {
    brand: string;
    model: string;
    material: string;
    condition: string;
    boxPapers: string;
  };
}

export function calculateWatchValuation(input: ValuationInput): ValuationResult | null {
  const brandGroup = SUPPORTED_LUXURY_BRANDS.find(b => b.brand.toLowerCase() === input.brand.toLowerCase());
  if (!brandGroup) return null;

  const model = brandGroup.models.find(m => m.name === input.modelName) || brandGroup.models[0];
  const material = MATERIAL_MULTIPLIERS[input.materialKey] || MATERIAL_MULTIPLIERS.steel;
  const condition = CONDITION_MULTIPLIERS[input.conditionKey] || CONDITION_MULTIPLIERS.mint;
  const boxPapers = BOX_PAPERS_MULTIPLIERS[input.boxPapersKey] || BOX_PAPERS_MULTIPLIERS.full_set;

  // Temel piyasa değeri hesabı
  const rawMarketValue = model.baseMarketValueTry * material.multiplier * condition.multiplier * boxPapers.multiplier;
  
  // Yuvarlama (En yakın 1.000 TL)
  const estimatedMarketValueTry = Math.round(rawMarketValue / 1000) * 1000;
  
  // Saatchi anlık nakit alım marjı: Piyasa değerinin %80 - %86'sı
  const cashOfferMinTry = Math.round((estimatedMarketValueTry * 0.80) / 1000) * 1000;
  const cashOfferMaxTry = Math.round((estimatedMarketValueTry * 0.86) / 1000) * 1000;
  
  // Takas avantajı: Nakit alıma göre +%10 daha fazla takas kredisi
  const tradeInValueTry = Math.round((cashOfferMaxTry * 1.10) / 1000) * 1000;

  const fmt = (n: number) => `₺${n.toLocaleString('tr-TR')}`;

  const messageText = `Merhaba Saatchi & Co., web sitenizdeki Ekspertiz Motoru üzerinden saatim için anlık değerleme aldım:%0A%0A` +
    `• Marka: ${brandGroup.brand}%0A` +
    `• Model: ${model.name}%0A` +
    `• Materyal: ${material.label}%0A` +
    `• Kondisyon: ${condition.label}%0A` +
    `• Kutu / Evrak: ${boxPapers.label}%0A` +
    `• Tahmini Piyasa Değeri: ${fmt(estimatedMarketValueTry)}%0A` +
    `• Saatchi Nakit Alım Teklif Aralığı: ${fmt(cashOfferMinTry)} - ${fmt(cashOfferMaxTry)}%0A%0A` +
    `Saatimi ekspertiz yaptırıp hemen nakite çevirmek / takas etmek istiyorum. Görselleri iletiyorum.`;

  return {
    estimatedMarketValueTry,
    cashOfferMinTry,
    cashOfferMaxTry,
    tradeInValueTry,
    whatsappMessage: `https://wa.me/905300000000?text=${messageText}`,
    summary: {
      brand: brandGroup.brand,
      model: model.name,
      material: material.label,
      condition: condition.label,
      boxPapers: boxPapers.label
    }
  };
}
