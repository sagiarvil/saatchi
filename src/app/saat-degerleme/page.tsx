import React from 'react';
import type { Metadata } from 'next';
import WatchValuationCalculator from '@/components/tools/WatchValuationCalculator';
import { ShieldCheck, Banknote, Truck, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GiantWatermark } from '@/components/ui/GiantWatermark';

export const metadata: Metadata = {
  title: 'Lüks Saat Değerleme & Ekspertiz Motoru — SAATCHI',
  description: 'Cartier, TAG Heuer ve İsviçre saatlerinizin gerçek piyasa değerini anında hesaplayın. Saatchi güvencesiyle aynı gün nakit alım teklifi ve takas fırsatı.',
  keywords: [
    'saat değerleme',
    'cartier saat fiyat hesaplama',
    'tag heuer saatim ne kadar eder',
    'ikinci el lüks saat ekspertiz',
    'saat satmak istiyorum',
    'lüks saat nakit alım',
    'ikinci el saat alan yerler'
  ],
  openGraph: {
    title: 'Lüks Saat Değerleme & Anlık Nakit Alım Motoru | SAATCHI',
    description: 'Saatlerinizin küresel borsa endeksli piyasa değerini 30 saniyede öğrenin. Saatchi anında nakit alım garantisi.',
    url: 'https://saatchi.com.tr/saat-degerleme',
    type: 'website'
  },
  alternates: {
    canonical: 'https://saatchi.com.tr/saat-degerleme'
  }
};

export default function SaatDegerlemePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Saatchi Lüks Saat Değerleme Motoru',
        operatingSystem: 'All',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'TRY'
        },
        description: 'Rolex, Cartier, TAG Heuer ve diğer elit saat modelleri için anlık küresel borsa endeksli ekspertiz ve değerleme algoritması.'
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Saatchi lüks saat alımında ödemeyi ne zaman yapar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Fiziksel ekspertiz teyidi tamamlandığı anda, banka hesabınıza havale / EFT veya nakit olarak aynı gün içerisinde anında ödeme gerçekleştirilir.'
            }
          },
          {
            '@type': 'Question',
            name: 'Kutusu veya garanti belgesi olmayan saatleri alıyor musunuz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet, orijinal kutu veya garanti kartı bulunmayan saatler de uzman horologlarımız tarafından seri numarası ve mekanizma orijinallik kontrolünden geçirilerek değerinde satın alınır.'
            }
          },
          {
            '@type': 'Question',
            name: 'Değerleme fiyatları neye göre belirlenir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Fiyatlandırma Chrono24 küresel saat borsası, güncel döviz kurları, saatin kondisyonu, üretim yılı ve piyasadaki arz-talep dengesi dikkate alınarak şeffaf şekilde hesaplanır.'
            }
          }
        ]
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
          <span className="text-neutral-300">Saat Değerleme &amp; Ekspertiz</span>
        </nav>

        {/* Hero Metni */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Dev Stacked Dynamic Watermark */}
          <GiantWatermark text="VALUATION" theme="gold" align="center" className="mb-4 sm:mb-6" />

          <span className="text-amber-500 text-xs font-semibold tracking-widest uppercase block mb-3">
            SAATCHI PRESTIGE VALUATION ENGINE
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            Lüks Saatinizin Gerçek Değerini Keşfedin
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Rolex, Cartier ve İsviçre başyapıtlarınız için küresel piyasa verileriyle desteklenen 
            ekspertiz algoritması. Anında değerleme raporu alın, dilerseniz aynı gün nakite çevirin.
          </p>
        </div>

        {/* İnteraktif Hesaplama Motoru */}
        <WatchValuationCalculator />

        {/* 3 Adımda Kolay Süreç */}
        <div className="mt-24 border-t border-neutral-800/80 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-3">
              Saatchi Güvencesiyle 3 Adımda Saatinizi Satın
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Uzun bekleme süreleri, aracı komisyonları veya değer kaybı olmadan doğrudan kurumsal alım.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-group">
            <div className="fade-up-item bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-medium text-white mb-2">1. Anlık Değerleme Alın</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Yukarıdaki motordan saatinizin model ve kondisyon bilgilerini seçerek 30 saniyede gerçek piyasa değerini görün.
              </p>
            </div>

            <div className="fade-up-item bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-medium text-white mb-2">2. VIP Ekspertiz Onayı</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                WhatsApp üzerinden saatinizin net fotoğraflarını iletin. Horolog uzmanlarımız 15 dakika içinde nihai teklifi iletsin.
              </p>
            </div>

            <div className="fade-up-item bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Banknote className="w-6 h-6" />
              </div>
              <h3 className="text-base font-medium text-white mb-2">3. Anında Nakit Ödeme</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Zırhlı kurye veya mağazamızda saatinizi teslim edin, banka hesabınıza dakikalar içinde tam tutar aktarılsın.
              </p>
            </div>
          </div>
        </div>

        {/* SSS Bölümü */}
        <div className="mt-20 border-t border-neutral-800/80 pt-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-light text-white mb-6 text-center">
              Sıkça Sorulan Sorular
            </h2>

            <div className="space-y-4">
              <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">
                  Değerleme algoritması hangi verileri kullanıyor?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Algoritmamız Chrono24, uluslararası saat açık artırmaları ve küresel borsa fiyat endekslerini baz alır. Saatin kasa materyali, revizyon durumu ve kutu-evrak varlığına göre matematiksel bir katsayı uygular.
                </p>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">
                  Takas seçeneğinde nasıl bir avantaj sağlanıyor?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Mevcut saatinizi Saatchi koleksiyonundaki başka bir modelle değiştirmek istediğinizde, nakit teklifimizin üzerine %10 ek takas kredisi tanımlanır.
                </p>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">
                  Şehir dışından saat satışı yapabilir miyim?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Evet. Türkiye&apos;nin her yerinden tam sigortalı VIP zırhlı kargo hizmetimizle saatiniz adresinizden teslim alınır ve ekspertiz sonrası derhal ödemeniz yapılır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
