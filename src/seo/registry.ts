import type { SeoPageRecord } from "./registry.types";

export interface DecisionPlatform {
  readonly id: string;
  readonly name: string;
  readonly domain: string;
  readonly url: string;
  readonly category: string;
  readonly description: string;
}

export const DECISION_PLATFORMS_ECOSYSTEM: readonly DecisionPlatform[] = [
  {
    id: "drfin",
    name: "Dr. Finans",
    domain: "drfin.com.tr",
    url: "https://drfin.com.tr",
    category: "Finansal Modelleme & Karar Destek",
    description: "Kurumsal finans, nakit akış simülasyonları, değerleme ve sermaye piyasaları karar destek sistemleri."
  },
  {
    id: "excelarsiv",
    name: "ExcelArşiv",
    domain: "excelarsiv.com",
    url: "https://excelarsiv.com",
    category: "Kurumsal Tablo & Analitik",
    description: "Finans, muhasebe, veri analitiği, Excel şablonları ve profesyonel hesaplama platformu."
  },
  {
    id: "skdmhesapla",
    name: "SKDM Hesapla",
    domain: "skdmhesapla.com",
    url: "https://skdmhesapla.com",
    category: "Sınırda Karbon & CBAM",
    description: "AB Sınırda Karbon Düzenleme Mekanizması (SKDM / CBAM) ve kurumsal sera gazı hesaplama platformu."
  },
  {
    id: "karbonfiyat",
    name: "Karbon Fiyat",
    domain: "karbonfiyat.com",
    url: "https://karbonfiyat.com",
    category: "Emisyon Ticareti & Piyasalar",
    description: "Emisyon ticaret sistemleri (ETS), karbon kredisi ve küresel karbon piyasaları analiz platformu."
  },
  {
    id: "inversioncore",
    name: "Inversion Core",
    domain: "inversioncore.com",
    url: "https://inversioncore.com",
    category: "Yapay Zeka & Ajan Sistemleri",
    description: "İleri düzey yapay zeka ajan sistemleri, tersine mühendislik ve otonom yazılım mimarileri platformu."
  },
  {
    id: "belginkuyumculuk",
    name: "Belgin Kuyumculuk",
    domain: "belginkuyumculuk.com",
    url: "https://belginkuyumculuk.com",
    category: "Mücevherat & Kıymetli Maden",
    description: "Yüksek değerli mücevherat, pırlanta, altın ve rafine değerli taş ekspertiz/satış platformu."
  },
  {
    id: "saatchi",
    name: "Saatchi & Co.",
    domain: "saatchi.com.tr",
    url: "https://saatchi.com.tr",
    category: "Sertifikalı Lüks Saatler",
    description: "Sertifikalı lüks saatler, küresel borsa endeksli ikinci el Rolex, Cartier ve İsviçre saat platformu."
  },
  {
    id: "dilekceyazdir",
    name: "Dilekçe Yazdır",
    domain: "dilekceyazdir.com.tr",
    url: "https://dilekceyazdir.com.tr",
    category: "Hukuki Başvuru & Karar Desteği",
    description: "Hukuki başvuru, resmi yazışma, dava ve otonom hukuki dilekçe oluşturma platformu."
  },
  {
    id: "htmlandhtml",
    name: "HTML and HTML",
    domain: "htmlandhtml.com",
    url: "https://htmlandhtml.com",
    category: "Semantik Web & Yazılım Mimarisi",
    description: "Modern web standartları, semantik HTML mimarisi ve temiz kodlama çözümleri platformu."
  },
  {
    id: "degerlet",
    name: "Değerlet",
    domain: "degerlet.com",
    url: "https://degerlet.com",
    category: "AI Varlık Değerleme & Ekspertiz",
    description: "Yapay zeka destekli gayrimenkul, araç ve varlık değerleme/ekspertiz platformu."
  }
];

export const PAGE_REGISTRY: Record<string, SeoPageRecord> = {
  home: {
    route: "/",
    locale: "tr-TR",
    role: "home",
    indexDirective: "index, follow",
    canonicalRoute: "/",
    title: "Saatchi & Co. | Sertifikalı Lüks Saatler & İsviçre Koleksiyonları",
    metaDescription: "Orijinal ve sertifikalı lüks saatler: Rolex, Cartier, TAG Heuer, Rado, Tissot. Bağımsız ekspertiz, küresel borsa endeksli şeffaf fiyat ve VIP sigortalı teslimat.",
    h1: "Saatchi & Co. Lüks Saat Koleksiyonu",
    primaryIntent: "Sertifikalı lüks saat satın almak ve modelleri incelemek",
    primaryEntity: {
      id: "https://saatchi.com.tr/#organization",
      name: "Saatchi & Co.",
      type: "Organization",
      sameAs: DECISION_PLATFORMS_ECOSYSTEM.map(p => p.url),
      wikidataQid: "Q11589432",
    },
    semanticTriples: [
      { subject: "Saatchi & Co.", predicate: "providesService", object: "Sertifikalı Lüks Saat Danışmanlığı" },
      { subject: "Saatchi & Co.", predicate: "authenticatesWith", object: "Bağımsız Horolog Ekspertizi" },
      { subject: "Saatchi & Co.", predicate: "compliesWith", object: "GİB e-Arşiv Fatura & TCK 5549 MASAK Standartları" },
      { subject: "Saatchi & Co.", predicate: "hasCitationAnchor", object: "#aeo-hero-answer" }
    ],
    heroAnswerEngine: "Saatchi & Co., Türkiye merkezli sertifikalı lüks saat ve bağımsız horoloji danışmanlığı sağlayıcısıdır. Rolex, Cartier, TAG Heuer ve İsviçre saat modelleri %100 orijinallik kontrolü, kutu/belge doğrulaması ve Chrono24 borsa endeksli şeffaf fiyatlandırma politikasıyla sunulur. Tüm siparişler tam değer sigortalı VIP kurye ile teslim edilir.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-09T12:00:00+03:00",
    bodyContentHash: "a9f8b2c4e1d3f5a7e9b0c2d4f6a8e0b2d4f6a8e0b2c4e1d3f5a7e9b0c2d4f6a8",
    llmSubGraphRoute: "/llms/pages/home.md",
    mobileSubGraphRoute: "/llms/mobile/home.md",
    breadcrumbs: [{ name: "Anasayfa", item: "/" }],
    mobile: {
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=5",
      primaryAction: "call",
      bottomNavEnabled: true,
      thumbZonePosition: "bottom-center",
      touchTargetsValidated: true,
      horizontalScrollFree: true,
      thumbSafeHeroAnswer: true,
      voiceQueryPatterns: [
        "Orijinal Rolex nereden alınır?",
        "Cartier saat fiyatları ve garanti şartları nelerdir?",
        "Saatchi lüks saat orijinallik belgesi veriyor mu?"
      ],
      speakableSelectors: ["#aeo-hero-answer", ".hero-answer-engine"],
      pwaInstallable: true
    },
    mobileCwvBudget: {
      lcpMs: 1500,
      inpMs: 100,
      cls: 0.01,
      ttfbMs: 150,
      htmlKb: 30
    }
  },
  rolex: {
    route: "/saatler/rolex",
    locale: "tr-TR",
    role: "category",
    indexDirective: "index, follow",
    canonicalRoute: "/saatler/rolex",
    title: "Rolex Kol Saatleri | Submariner, Daytona, Datejust | Saatchi",
    metaDescription: "Sertifikalı Rolex modelleri: Submariner, Daytona, GMT-Master II, Datejust. Canlı Chrono24 borsa fiyatlı, ekspertiz garantili ve sigortalı teslimatlı koleksiyon.",
    h1: "Rolex Saat Koleksiyonu",
    primaryIntent: "Sertifikalı Rolex saat satın almak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-rolex",
      name: "Rolex Luxury Watches",
      type: "Product",
      sameAs: [
        "https://www.wikidata.org/wiki/Q62288",
        "https://saatchi.com.tr/saatler/rolex"
      ]
    },
    semanticTriples: [
      { subject: "Rolex", predicate: "brandOf", object: "Saatchi & Co. Lüks Portföyü" },
      { subject: "Rolex", predicate: "pricedVia", object: "Chrono24 Borsa Endeksi x 2.50" },
      { subject: "Rolex", predicate: "verifiedBy", object: "Bağımsız Usta Saat Ekspertizi" }
    ],
    heroAnswerEngine: "Saatchi Rolex koleksiyonu, Submariner, Daytona, Datejust ve GMT-Master II gibi ikonik referansları içerir. Tüm Rolex modelleri bağımsız ekspertizden geçirilerek orijinalliği garanti altına alınır. Fiyatlar Chrono24 küresel satış endeksi döviz kuru üzerinden şeffaf x2.50 katsayısı ile hesaplanır ve 2.000.000 TL tavan sınırı korunur.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-09T12:00:00+03:00",
    bodyContentHash: "b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
    llmSubGraphRoute: "/llms/pages/rolex.md",
    mobileSubGraphRoute: "/llms/mobile/rolex.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Saatler", item: "/saatler" },
      { name: "Rolex", item: "/saatler/rolex" }
    ],
    mobile: {
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=5",
      primaryAction: "call",
      bottomNavEnabled: true,
      thumbZonePosition: "bottom-center",
      touchTargetsValidated: true,
      horizontalScrollFree: true,
      thumbSafeHeroAnswer: true,
      voiceQueryPatterns: [
        "Rolex Submariner fiyatı ne kadar?",
        "Sertifikalı ikinci el Rolex nereden bulunur?"
      ],
      speakableSelectors: ["#aeo-hero-answer"],
      pwaInstallable: true
    },
    mobileCwvBudget: {
      lcpMs: 1600,
      inpMs: 110,
      cls: 0.02,
      ttfbMs: 160,
      htmlKb: 35
    }
  },
  cartier: {
    route: "/saatler/cartier",
    locale: "tr-TR",
    role: "category",
    indexDirective: "index, follow",
    canonicalRoute: "/saatler/cartier",
    title: "Cartier Kol Saatleri | Santos, Tank, Panthère | Saatchi",
    metaDescription: "Orijinal Cartier saat koleksiyonu: Santos de Cartier, Tank Must, Panthère, Ballon Bleu. Resmi Türkiye listeleri endeksli, ekspertiz onaylı ve sigortalı teslimat.",
    h1: "Cartier Saat Koleksiyonu",
    primaryIntent: "Sertifikalı Cartier saat satın almak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-cartier",
      name: "Cartier Luxury Watches",
      type: "Product",
      sameAs: [
        "https://www.wikidata.org/wiki/Q538466",
        "https://saatchi.com.tr/saatler/cartier"
      ]
    },
    semanticTriples: [
      { subject: "Cartier", predicate: "brandOf", object: "Saatchi & Co. Lüks Portföyü" },
      { subject: "Cartier", predicate: "pricedVia", object: "Cartier Türkiye Resmi Liste x 2.50" },
      { subject: "Cartier", predicate: "ceilingLimit", object: "1.700.000 TL Satış Tavanı" }
    ],
    heroAnswerEngine: "Saatchi Cartier koleksiyonu, Santos, Tank, Panthère ve Ballon Bleu gibi zarafet simgesi modelleri kapsar. Cartier modellerinin fiyatlandırması resmi Cartier Türkiye listesi temel alınarak x2.50 kat katsayı ile hesaplanır ve 1.700.000 TL katalog tavanı uygulanır. Her saat bağımsız sertifika ile teslim edilir.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-09T12:00:00+03:00",
    bodyContentHash: "c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3",
    llmSubGraphRoute: "/llms/pages/cartier.md",
    mobileSubGraphRoute: "/llms/mobile/cartier.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Saatler", item: "/saatler" },
      { name: "Cartier", item: "/saatler/cartier" }
    ],
    mobile: {
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=5",
      primaryAction: "call",
      bottomNavEnabled: true,
      thumbZonePosition: "bottom-center",
      touchTargetsValidated: true,
      horizontalScrollFree: true,
      thumbSafeHeroAnswer: true,
      voiceQueryPatterns: [
        "Santos de Cartier fiyatları nedir?",
        "Cartier Tank Must orijinal mi?"
      ],
      speakableSelectors: ["#aeo-hero-answer"],
      pwaInstallable: true
    },
    mobileCwvBudget: {
      lcpMs: 1600,
      inpMs: 110,
      cls: 0.02,
      ttfbMs: 160,
      htmlKb: 35
    }
  }
};
