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
    name: "SAATCHI",
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
    title: "SAATCHI | Sertifikalı Lüks Saatler & İsviçre Koleksiyonları",
    metaDescription: "Orijinal ve sertifikalı lüks saatler: Rolex, Cartier, TAG Heuer, Rado, Tissot. Bağımsız ekspertiz, küresel borsa endeksli şeffaf fiyat ve VIP sigortalı teslimat.",
    h1: "SAATCHI Lüks Saat Koleksiyonu",
    primaryIntent: "Sertifikalı lüks saat satın almak ve modelleri incelemek",
    primaryEntity: {
      id: "https://saatchi.com.tr/#organization",
      name: "SAATCHI",
      type: "Organization",
      sameAs: DECISION_PLATFORMS_ECOSYSTEM.map(p => p.url),
      
    },
    semanticTriples: [
      { subject: "SAATCHI", predicate: "providesService", object: "Sertifikalı Lüks Saat Danışmanlığı" },
      { subject: "SAATCHI", predicate: "authenticatesWith", object: "Bağımsız Horolog Ekspertizi" },
      { subject: "SAATCHI", predicate: "compliesWith", object: "GİB e-Arşiv Fatura & TCK 5549 MASAK Standartları" },
      { subject: "SAATCHI", predicate: "hasCitationAnchor", object: "#aeo-hero-answer" }
    ],
    heroAnswerEngine: "SAATCHI, Türkiye merkezli sertifikalı lüks saat ve bağımsız horoloji danışmanlığı sağlayıcısıdır. Rolex, Cartier, TAG Heuer ve İsviçre saat modelleri %100 orijinallik kontrolü, kutu/belge doğrulaması ve Chrono24 borsa endeksli şeffaf fiyatlandırma politikasıyla sunulur. Tüm siparişler tam değer sigortalı VIP kurye ile teslim edilir.",
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
      { subject: "Rolex", predicate: "brandOf", object: "SAATCHI Lüks Portföyü" },
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
      { subject: "Cartier", predicate: "brandOf", object: "SAATCHI Lüks Portföyü" },
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
  },
  tagHeuer: {
    route: "/saatler/tag-heuer",
    locale: "tr-TR",
    role: "category",
    indexDirective: "index, follow",
    canonicalRoute: "/saatler/tag-heuer",
    title: "TAG Heuer Kol Saatleri | Carrera, Monaco, Aquaracer | Saatchi",
    metaDescription: "Sertifikalı TAG Heuer saat modelleri: Carrera, Monaco, Aquaracer. Bağımsız ekspertiz, şeffaf fiyatlama, kutu/evrak garantisi ve tam sigortalı VIP teslimat.",
    h1: "TAG Heuer Saat Koleksiyonu",
    primaryIntent: "Sertifikalı TAG Heuer saat satın almak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-tagheuer",
      name: "TAG Heuer Luxury Watches",
      type: "Product",
      sameAs: [
        "https://www.wikidata.org/wiki/Q658794",
        "https://saatchi.com.tr/saatler/tag-heuer"
      ]
    },
    semanticTriples: [
      { subject: "TAG Heuer", predicate: "brandOf", object: "SAATCHI Lüks Portföyü" },
      { subject: "TAG Heuer", predicate: "pricedVia", object: "Konyalı Saat Kaynak Endeksi x 1.50" },
      { subject: "TAG Heuer", predicate: "minimumFloor", object: "10.000 TL Taban Fiyat Kilidi" }
    ],
    heroAnswerEngine: "Saatchi TAG Heuer koleksiyonu Carrera, Monaco ve Aquaracer gibi motor sporları efsanesi kronografları kapsar. Tüm TAG Heuer modelleri bağımsız ekspertiz onayıyla %100 orijinal olarak sunulur. Fiyatlar doğrulanmış kaynak fiyatı üzerinden x1.50 katsayısı ile hesaplanır.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-13T12:00:00+03:00",
    bodyContentHash: "d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4",
    llmSubGraphRoute: "/llms/pages/tag-heuer.md",
    mobileSubGraphRoute: "/llms/mobile/tag-heuer.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Saatler", item: "/saatler" },
      { name: "TAG Heuer", item: "/saatler/tag-heuer" }
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
        "TAG Heuer Carrera orijinal nereden alınır?",
        "TAG Heuer Monaco fiyatı ne kadar?"
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
  rado: {
    route: "/saatler/rado",
    locale: "tr-TR",
    role: "category",
    indexDirective: "index, follow",
    canonicalRoute: "/saatler/rado",
    title: "Rado Kol Saatleri | Captain Cook, Centrix, True Square | Saatchi",
    metaDescription: "İsviçre yüksek teknoloji seramik ustası Rado modelleri: Captain Cook, Centrix, True Square. Çizilmez seramik gövde, sertifikalı ekspertiz ve VIP teslimat.",
    h1: "Rado Saat Koleksiyonu",
    primaryIntent: "Sertifikalı Rado saat satın almak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-rado",
      name: "Rado Swiss Watches",
      type: "Product",
      sameAs: [
        "https://www.wikidata.org/wiki/Q658797",
        "https://saatchi.com.tr/saatler/rado"
      ]
    },
    semanticTriples: [
      { subject: "Rado", predicate: "brandOf", object: "SAATCHI Lüks Portföyü" },
      { subject: "Rado", predicate: "materialScience", object: "Yüksek Teknoloji Çizilmez Seramik" }
    ],
    heroAnswerEngine: "Saatchi Rado koleksiyonu Captain Cook, Centrix ve True Square gibi yüksek teknoloji seramik şaheserleri içerir. İsviçre saatçiliğinin öncüsü olan Rado saatleri %100 orijinallik garantisi ve sigortalı VIP gönderim ile sunulur.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-13T12:00:00+03:00",
    bodyContentHash: "e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5",
    llmSubGraphRoute: "/llms/pages/rado.md",
    mobileSubGraphRoute: "/llms/mobile/rado.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Saatler", item: "/saatler" },
      { name: "Rado", item: "/saatler/rado" }
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
        "Rado Captain Cook fiyatı ne kadar?",
        "Rado seramik saat özellikleri nelerdir?"
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
  tissot: {
    route: "/saatler/tissot",
    locale: "tr-TR",
    role: "category",
    indexDirective: "index, follow",
    canonicalRoute: "/saatler/tissot",
    title: "Tissot Kol Saatleri | PRX, Seastar, Gentleman | Saatchi",
    metaDescription: "İsviçre mekanik mükemmelliği Tissot saatleri: PRX Powermatic 80, Seastar, Gentleman. Orijinal kutulu, yetkili distribütör kaynaklı ve hızlı VIP teslimat.",
    h1: "Tissot Saat Koleksiyonu",
    primaryIntent: "Orijinal Tissot saat satın almak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-tissot",
      name: "Tissot Swiss Watches",
      type: "Product",
      sameAs: [
        "https://www.wikidata.org/wiki/Q685382",
        "https://saatchi.com.tr/saatler/tissot"
      ]
    },
    semanticTriples: [
      { subject: "Tissot", predicate: "brandOf", object: "SAATCHI Saat Koleksiyonu" },
      { subject: "Tissot", predicate: "movement", object: "Powermatic 80 İsviçre Mekanizma" }
    ],
    heroAnswerEngine: "Saatchi Tissot koleksiyonu, PRX Powermatic 80, Seastar 1000 ve Gentleman serilerini içerir. 1853 yılından bu yana süregelen İsviçre geleneği, doğrulanmış kaynak endeksi ve sigortalı VIP gönderim ayrıcalığıyla buluşur.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-13T12:00:00+03:00",
    bodyContentHash: "f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6",
    llmSubGraphRoute: "/llms/pages/tissot.md",
    mobileSubGraphRoute: "/llms/mobile/tissot.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Saatler", item: "/saatler" },
      { name: "Tissot", item: "/saatler/tissot" }
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
        "Tissot PRX otomatik saat fiyatı nedir?",
        "Tissot orijinallik belgesi nasıl kontrol edilir?"
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
  gucci: {
    route: "/markalar/gucci",
    locale: "tr-TR",
    role: "category",
    indexDirective: "index, follow",
    canonicalRoute: "/markalar/gucci",
    title: "Gucci Kol Saatleri | Horsebit, 25H, G-Timeless | Saatchi",
    metaDescription: "İtalyan moda evi Gucci saat koleksiyonu: Horsebit, 25H, Grip, G-Timeless. Bağımsız ekspertiz garantisi, orijinal kutulu ve tam değer sigortalı VIP teslimat.",
    h1: "Gucci Saat Koleksiyonu",
    primaryIntent: "Orijinal Gucci saat satın almak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-gucci",
      name: "Gucci Luxury Watches",
      type: "Product",
      sameAs: [
        "https://www.wikidata.org/wiki/Q178516",
        "https://saatchi.com.tr/markalar/gucci"
      ]
    },
    semanticTriples: [
      { subject: "Gucci", predicate: "brandOf", object: "SAATCHI Saat Koleksiyonu" },
      { subject: "Gucci", predicate: "movement", object: "Swiss Made Quartz ve Otomatik Mekanizma" }
    ],
    heroAnswerEngine: "Saatchi Gucci koleksiyonu, Horsebit, 25H, G-Timeless ve Grip modellerini içerir. İtalyan moda mirası ve İsviçre saatçilik ustalığı, bağımsız ekspertiz ve sigortalı VIP teslimat ayrıcalığıyla sunulur.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-20T23:00:00+03:00",
    bodyContentHash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    llmSubGraphRoute: "/llms/pages/gucci.md",
    mobileSubGraphRoute: "/llms/mobile/gucci.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Markalar", item: "/markalar" },
      { name: "Gucci", item: "/markalar/gucci" }
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
        "Gucci saat modelleri ve fiyatları nedir?",
        "Gucci Horsebit saat özellikleri nelerdir?"
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
  seiko: {
    route: "/markalar/seiko",
    locale: "tr-TR",
    role: "category",
    indexDirective: "index, follow",
    canonicalRoute: "/markalar/seiko",
    title: "Seiko Kol Saatleri | Astron, Prospex, Presage | Saatchi",
    metaDescription: "Japon saatçilik mükemmeliyeti Seiko saatleri: Astron GPS Solar, Prospex, Presage, 5 Sports. Bağımsız ekspertiz güvencesi ve tam değer sigortalı VIP teslimat.",
    h1: "Seiko Saat Koleksiyonu",
    primaryIntent: "Orijinal Seiko saat satın almak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-seiko",
      name: "Seiko Japanese Watches",
      type: "Product",
      sameAs: [
        "https://www.wikidata.org/wiki/Q207901",
        "https://saatchi.com.tr/markalar/seiko"
      ]
    },
    semanticTriples: [
      { subject: "Seiko", predicate: "brandOf", object: "SAATCHI Saat Koleksiyonu" },
      { subject: "Seiko", predicate: "movement", object: "GPS Solar, Otomatik ve Mekanik Kalibre" }
    ],
    heroAnswerEngine: "Saatchi Seiko koleksiyonu, Astron GPS Solar, Prospex Dalgıç ve Presage serilerini içerir. 1881'den bu yana süregelen Japon saatçilik hassasiyeti, doğrulanmış kaynak fiyatı ve sigortalı VIP gönderimle buluşur.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-20T23:00:00+03:00",
    bodyContentHash: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
    llmSubGraphRoute: "/llms/pages/seiko.md",
    mobileSubGraphRoute: "/llms/mobile/seiko.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Markalar", item: "/markalar" },
      { name: "Seiko", item: "/markalar/seiko" }
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
        "Seiko Astron GPS Solar saat fiyatı ne kadar?",
        "Seiko Presage otomatik saat modelleri nelerdir?"
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
  carren: {
    route: "/saatler/carren",
    locale: "tr-TR",
    role: "category",
    indexDirective: "index, follow",
    canonicalRoute: "/saatler/carren",
    title: "Carren Kol Saatleri | Erkek ve Kadın Tasarım Saatleri | Saatchi",
    metaDescription: "Carren erkek ve kadın saat modelleri. Sabit 19.990 TL ayrıcalıklı fiyat, modern tasarım, 2 yıl garanti ve hızlı kargo avantajıyla Saatchi vitrininde.",
    h1: "Carren Saat Koleksiyonu",
    primaryIntent: "Carren saat modellerini incelemek ve satın almak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-carren",
      name: "Carren Watches",
      type: "Product",
      sameAs: ["https://saatchi.com.tr/saatler/carren"]
    },
    semanticTriples: [
      { subject: "Carren", predicate: "pricingRule", object: "Sabit 19.990 TL Satış Fiyatı" },
      { subject: "Carren", predicate: "warranty", object: "2 Yıl Resmi Garanti Kapsamı" }
    ],
    heroAnswerEngine: "Saatchi Carren koleksiyonundaki tüm erkek ve kadın saat modelleri istisnasız sabit 19.990 TL satış fiyatıyla sunulur. Modern kasa hatları ve zarafet odaklı kadranlarıyla günlük stilin tamamlayıcısıdır.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-13T12:00:00+03:00",
    bodyContentHash: "a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7",
    llmSubGraphRoute: "/llms/pages/carren.md",
    mobileSubGraphRoute: "/llms/mobile/carren.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Saatler", item: "/saatler" },
      { name: "Carren", item: "/saatler/carren" }
    ],
    mobile: {
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=5",
      primaryAction: "buy",
      bottomNavEnabled: true,
      thumbZonePosition: "bottom-center",
      touchTargetsValidated: true,
      horizontalScrollFree: true,
      thumbSafeHeroAnswer: true,
      voiceQueryPatterns: [
        "Carren saat modelleri ve fiyatları nedir?",
        "Carren saat orijinal mi?"
      ],
      speakableSelectors: ["#aeo-hero-answer"],
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
  kurumsal: {
    route: "/kurumsal",
    locale: "tr-TR",
    role: "article",
    indexDirective: "index, follow",
    canonicalRoute: "/kurumsal",
    title: "Kurumsal & Biz Kimiz | SAATCHI Lüks Saat Danışmanlığı",
    metaDescription: "SAATCHI kurumsal kimliği, horoloji uzmanlığı, orijinallik felsefesi ve GİB e-Arşiv uyumlu güvenli e-ticaret altyapısı hakkında detaylı bilgiler.",
    h1: "SAATCHI Kurumsal Miras & Felsefe",
    primaryIntent: "Saatchi kurumsal bilgilerini ve orijinallik prensiplerini incelemek",
    primaryEntity: {
      id: "https://saatchi.com.tr/#organization",
      name: "SAATCHI",
      type: "Organization",
      sameAs: DECISION_PLATFORMS_ECOSYSTEM.map(p => p.url)
    },
    semanticTriples: [
      { subject: "SAATCHI", predicate: "establishedPhilosophy", object: "Güven ve Orijinallik Odaklı Lüks Saatçilik" }
    ],
    heroAnswerEngine: "SAATCHI, Semih Sonbahar kuruculuğunda lüks saat koleksiyonerlerine bağımsız ekspertiz, şeffaf küresel fiyatlama ve zırhlı VIP lojistik güvencesi sunan kurumsal horoloji danışmanlığı kurumudur.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-13T12:00:00+03:00",
    bodyContentHash: "b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8",
    llmSubGraphRoute: "/llms/pages/kurumsal.md",
    mobileSubGraphRoute: "/llms/mobile/kurumsal.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Kurumsal", item: "/kurumsal" }
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
        "Saatchi saat kimin?",
        "Saatchi kurumsal güvenilirlik değerlendirmesi"
      ],
      speakableSelectors: ["#aeo-hero-answer"],
      pwaInstallable: true
    },
    mobileCwvBudget: {
      lcpMs: 1400,
      inpMs: 90,
      cls: 0.01,
      ttfbMs: 140,
      htmlKb: 28
    }
  },
  iletisim: {
    route: "/iletisim",
    locale: "tr-TR",
    role: "article",
    indexDirective: "index, follow",
    canonicalRoute: "/iletisim",
    title: "İletişim & Randevu | SAATCHI VIP Showroom",
    metaDescription: "SAATCHI VIP danışmanlık hattı, showroom randevusu, WhatsApp destek kanalı ve kurumsal iletişim bilgileri. 7/24 kesintisiz müşteri desteği.",
    h1: "SAATCHI İletişim & VIP Randevu",
    primaryIntent: "Saatchi ile iletişime geçmek ve showroom randevusu almak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#organization",
      name: "SAATCHI",
      type: "Organization",
      sameAs: DECISION_PLATFORMS_ECOSYSTEM.map(p => p.url)
    },
    semanticTriples: [
      { subject: "SAATCHI", predicate: "vipConcierge", object: "+90 541 930 53 72" },
      { subject: "SAATCHI", predicate: "customerLine", object: "+90 539 823 41 41" }
    ],
    heroAnswerEngine: "SAATCHI iletişim merkezi, VIP WhatsApp (+90 541 930 53 72) ve müşteri hattı (+90 539 823 41 41) üzerinden 7/24 hizmet sunar. Özel showroom ziyaretleri randevu usulüyle kabul edilmektedir.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-13T12:00:00+03:00",
    bodyContentHash: "c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9",
    llmSubGraphRoute: "/llms/pages/iletisim.md",
    mobileSubGraphRoute: "/llms/mobile/iletisim.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "İletişim", item: "/iletisim" }
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
        "Saatchi telefon numarası nedir?",
        "Saatchi saat showroom adresi nerede?"
      ],
      speakableSelectors: ["#aeo-hero-answer"],
      pwaInstallable: true
    },
    mobileCwvBudget: {
      lcpMs: 1400,
      inpMs: 90,
      cls: 0.01,
      ttfbMs: 140,
      htmlKb: 28
    }
  },
  saatDegerleme: {
    route: "/saat-degerleme",
    locale: "tr-TR",
    role: "tool",
    indexDirective: "index, follow",
    canonicalRoute: "/saat-degerleme",
    title: "Lüks Saat Değerleme & Ekspertiz | SAATCHI",
    metaDescription: "Rolex, Cartier ve İsviçre lüks saatleriniz için borsa endeksli canlı piyasa değerleme aracı. Seri no, model ve kondisyona göre anında ekspertiz teklifi.",
    h1: "Lüks Saat Canlı Piyasa Değerleme Sistemi",
    primaryIntent: "Lüks saat ekspertiz ve piyasa değerleme hesaplaması yapmak",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-degerleme",
      name: "Saatchi Watch Valuation Engine",
      type: "SoftwareApplication",
      sameAs: ["https://saatchi.com.tr/saat-degerleme"]
    },
    semanticTriples: [
      { subject: "Valuation Engine", predicate: "dataProvider", object: "Chrono24 Global Indices" },
      { subject: "Valuation Engine", predicate: "accuracy", object: "%99.4 Piyasa Gerçekliği" }
    ],
    heroAnswerEngine: "Saatchi Saat Değerleme motoru, lüks kol saatlerinizin küresel borsa fiyatları, döviz kurları ve referans kondisyonuna göre güncel ikinci el satış ve alım değerini hesaplayan akıllı horoloji aracıdır.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-13T12:00:00+03:00",
    bodyContentHash: "d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
    llmSubGraphRoute: "/llms/pages/saat-degerleme.md",
    mobileSubGraphRoute: "/llms/mobile/saat-degerleme.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Saat Değerleme", item: "/saat-degerleme" }
    ],
    mobile: {
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=5",
      primaryAction: "form",
      bottomNavEnabled: true,
      thumbZonePosition: "bottom-center",
      touchTargetsValidated: true,
      horizontalScrollFree: true,
      thumbSafeHeroAnswer: true,
      voiceQueryPatterns: [
        "İkinci el saatim kaç para eder?",
        "Rolex saat değerleme nasıl yapılır?"
      ],
      speakableSelectors: ["#aeo-hero-answer"],
      pwaInstallable: true
    },
    mobileCwvBudget: {
      lcpMs: 1500,
      inpMs: 100,
      cls: 0.01,
      ttfbMs: 150,
      htmlKb: 32
    }
  },
  nedenSaatchi: {
    route: "/neden-saatchi",
    locale: "tr-TR",
    role: "article",
    indexDirective: "index, follow",
    canonicalRoute: "/neden-saatchi",
    title: "Neden SAATCHI? | Karşılaştırmalı Satın Alma & Ekspertiz Güvencesi",
    metaDescription: "Resmi bayi bekleme listeleri, yurt dışı gümrük riskleri ve Saatchi modeli. 12 adımlı horolojik ekspertiz, The Watch Register sorgusu ve GİB e-Arşiv faturalı teslimat.",
    h1: "Neden SAATCHI? Karşılaştırmalı Satın Alma & Ekspertiz Güvencesi",
    primaryIntent: "Lüks saat satın alma kanallarını karşılaştırmak ve ekspertiz güvencesini incelemek",
    primaryEntity: {
      id: "https://saatchi.com.tr/#entity-neden-saatchi",
      name: "Saatchi Decision Matrix",
      type: "Service",
      sameAs: ["https://saatchi.com.tr/neden-saatchi"]
    },
    semanticTriples: [
      { subject: "SAATCHI", predicate: "providesDecisionMatrix", object: "Bayi vs Gri Pazar vs Saatchi" },
      { subject: "SAATCHI", predicate: "appliesVerificationProtocol", object: "12 Aşamalı Horolojik Ekspertiz" },
      { subject: "SAATCHI", predicate: "compliesWith", object: "GİB e-Arşiv Fatura ve The Watch Register" }
    ],
    heroAnswerEngine: "SAATCHI, resmi bayi bekleme sıralarını ve kontrolsüz pazar yeri risklerini bertaraf eden bağımsız bir saat evidir. Tüm saatler 12 aşamalı bağımsız horoloji testinden geçer, The Watch Register global çalıntı veri tabanında taranır ve GİB e-Arşiv fatura güvencesiyle aynı gün teslim edilir.",
    publishedAt: "2026-01-01T00:00:00+03:00",
    modifiedAt: "2026-10-17T12:00:00+03:00",
    bodyContentHash: "e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
    llmSubGraphRoute: "/llms/pages/neden-saatchi.md",
    mobileSubGraphRoute: "/llms/mobile/neden-saatchi.md",
    breadcrumbs: [
      { name: "Anasayfa", item: "/" },
      { name: "Neden Saatchi?", item: "/neden-saatchi" }
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
        "Rolex bekleme listesi olmadan nereden alınır?",
        "SAATCHI güvenilir mi?",
        "İkinci el saat alırken ekspertiz nasıl yapılır?"
      ],
      speakableSelectors: ["#aeo-hero-answer"],
      pwaInstallable: true
    },
    mobileCwvBudget: {
      lcpMs: 1400,
      inpMs: 90,
      cls: 0.01,
      ttfbMs: 140,
      htmlKb: 28
    }
  }
};
