import React from 'react';
import { DECISION_PLATFORMS_ECOSYSTEM } from '@/seo/registry';

export function GlobalJsonLd() {
  const ecosystemUrls = DECISION_PLATFORMS_ECOSYSTEM.map(p => p.url);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://saatchi.com.tr/#website",
        "url": "https://saatchi.com.tr/",
        "name": "SAATCHI & CO.",
        "alternateName": [
          "Saatchi",
          "saatchi.com.tr",
          "Saatchi & Co. Lüks Saatler",
          "Saatchi Luxury Watches"
        ],
        "description": "Dünyanın en seçkin lüks ve elit saat koleksiyonları. Orijinallik garantisi, küresel referans borsa fiyatları ve tam değer sigortalı VIP teslimat.",
        "inLanguage": "tr-TR",
        "publisher": {
          "@id": "https://saatchi.com.tr/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://saatchi.com.tr/markalar?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": ["JewelryStore", "Store", "Organization"],
        "@id": "https://saatchi.com.tr/#organization",
        "name": "SAATCHI & CO.",
        "legalName": "Saatchi & Co. Lüks Saat Danışmanlığı",
        "url": "https://saatchi.com.tr",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://saatchi.com.tr/#logo",
          "url": "https://saatchi.com.tr/android-chrome-512x512.png",
          "width": 512,
          "height": 512,
          "caption": "SAATCHI & CO. Lüks Saatler"
        },
        "image": "https://saatchi.com.tr/android-chrome-512x512.png",
        "description": "Rolex, Cartier, TAG Heuer, Rado, Tissot ve seçkin markaların orijinal, bağımsız ekspertiz sertifikalı lüks saat satış platformu.",
        "currenciesAccepted": "TRY, USD, EUR",
        "paymentAccepted": "Credit Card, VIP Link, Bank Transfer",
        "priceRange": "₺₺₺₺",
        "telephone": "+905419305372",
        "email": "destek@saatchi.com.tr",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "TR",
          "addressLocality": "İstanbul"
        },
        "sameAs": [
          "https://www.wikidata.org/wiki/Q11589432",
          "https://instagram.com/saatchiluxury",
          ...ecosystemUrls
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+905419305372",
            "contactType": "customer service",
            "areaServed": "TR",
            "availableLanguage": ["Turkish", "English"]
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://saatchi.com.tr/#webpage",
        "url": "https://saatchi.com.tr/",
        "name": "Saatchi & Co. | Sertifikalı Lüks Saatler & İsviçre Koleksiyonları",
        "description": "Rolex, Cartier, TAG Heuer, Rado ve İsviçre saat modelleri. %100 orijinallik kontrolü, bağımsız ekspertiz ve tam değer sigortalı VIP teslimat güvencesiyle.",
        "isPartOf": { "@id": "https://saatchi.com.tr/#website" },
        "about": { "@id": "https://saatchi.com.tr/#organization" },
        "inLanguage": "tr-TR",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["#aeo-hero-answer", ".hero-answer-engine"]
        },
        "breadcrumb": { "@id": "https://saatchi.com.tr/#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://saatchi.com.tr/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Ana Sayfa",
            "item": "https://saatchi.com.tr/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://saatchi.com.tr/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Saatchi bünyesindeki lüks saatler orijinal mi ve sertifikalı mıdır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. Saatchi envanterindeki tüm lüks saatler seri numarası ve mekanizma incelemesinden geçmiş %100 orijinal ve sertifikalı saatlerdir. Her parça uzman horolog kontrolünden geçer ve orijinal evraklarıyla teslim edilir."
            }
          },
          {
            "@type": "Question",
            "name": "Rolex ve Cartier fiyatları nasıl belirlenmektedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fiyatlar Chrono24 küresel borsa endeksi ve Cartier resmi Türkiye satış kurları temel alınarak şeffaf x2.50 katsayısı ile hesaplanır. Rolex modellerinde 2.000.000 TL, Cartier modellerinde 1.700.000 TL tavan fiyat sınırı uygulanır."
            }
          },
          {
            "@type": "Question",
            "name": "Lüks saat teslimatı nasıl ve hangi güvenceyle yapılır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tüm siparişler tam değer kasko sigortalı özel VIP kurye veya zırhlı lojistik güvencesiyle doğrudan alıcının adresine teslim edilir."
            }
          },
          {
            "@type": "Question",
            "name": "Hangi güvenli ödeme yöntemleri kabul edilmektedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3D Secure 256-bit SSL korumalı kredi kartı, banka havalesi ve müşteri temsilcimizce SMS/WhatsApp üzerinden iletilen tek kullanımlık güvenli VIP ödeme linki altyapısı sunulur."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
