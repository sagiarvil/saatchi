import React from 'react';

export function GlobalJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://saatchi.com.tr/#website",
        "url": "https://saatchi.com.tr",
        "name": "Saatchi & Co. Lüks Saatler",
        "description": "Dünyanın en seçkin lüks ve elit saat koleksiyonları. Orijinallik garantisi ve küresel referans fiyatları.",
        "inLanguage": "tr-TR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://saatchi.com.tr/markalar?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": ["JewelryStore", "Store", "Organization"],
        "@id": "https://saatchi.com.tr/#organization",
        "name": "Saatchi & Co.",
        "url": "https://saatchi.com.tr",
        "logo": "https://saatchi.com.tr/logo.png",
        "image": "https://saatchi.com.tr/logo.png",
        "description": "Rolex, Cartier, TAG Heuer, Rado, Tissot ve seçkin markaların orijinal, sertifikalı lüks saat satış platformu.",
        "currenciesAccepted": "TRY, USD, EUR",
        "paymentAccepted": "Credit Card, VIP Link, Bank Transfer",
        "priceRange": "₺₺₺₺",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "TR",
          "addressLocality": "İstanbul"
        },
        "sameAs": [
          "https://instagram.com/saatchiluxury"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://saatchi.com.tr/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Saatchi'deki lüks saatler orijinal mi ve sertifikası var mı?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. Saatchi envanterinde yer alan tüm saatler %100 orijinaldir; uzman horologlarca kontrol edilmiş, orijinallik belgesi ve kutusuyla birlikte tam garantiyle teslim edilir."
            }
          },
          {
            "@type": "Question",
            "name": "Fiyatlar nasıl belirlenmektedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fiyatlarımız küresel lüks saat endeksi (Chrono24 ve resmi İsviçre üretici listeleri) verilerine dayalı olarak, resmi ithalat ve gümrük marjları dahil şeffaf biçimde Türk Lirası olarak hesaplanır."
            }
          },
          {
            "@type": "Question",
            "name": "Siparişler nasıl teslim edilir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tüm siparişler tam değer sigortalı özel VIP kurye veya zırhlı lojistik güvencesiyle doğrudan alıcının adresine teslim edilir."
            }
          },
          {
            "@type": "Question",
            "name": "Hangi ödeme yöntemleri geçerlidir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3D Secure güvenli kredi kartı ödemesi, banka havalesi ve müşteri temsilcimizce iletilen kişiye özel VIP ödeme linki geçerlidir."
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
