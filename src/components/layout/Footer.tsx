import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Phone, MapPin, FileText, Network, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: "Biz Kimiz (Kurumsal)", href: "/biz-kimiz" },
    { label: "Güvenli Ödeme", href: "/odeme" },
    { label: "Mesafeli Satış Sözleşmesi", href: "/mesafeli-satis-sozlesmesi" },
    { label: "Ön Bilgilendirme Formu", href: "/on-bilgilendirme-formu" },
    { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
    { label: "MASAK & Müşteri Tanıma", href: "/musteri-tanima-ve-islem-guvenligi" },
    { label: "Yüksek Değerli Teslimat", href: "/yuksek-degerli-urun-teslimi" },
    { label: "İade, Değişim ve Cayma", href: "/iade-degisim-cayma" },
    { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
    { label: "Çerez Politikası", href: "/cerez-politikasi" },
    { label: "Hukuki Delil & Kayıt", href: "/hukuki-delil-ve-kayit-politikasi" },
    { label: "Teslim & Tesellüm Beyanı", href: "/magaza-teslim-tesellum-formu" }
  ];

  const decisionPlatforms = [
    { name: "Dr. Finans", domain: "drfin.com.tr", url: "https://drfin.com.tr", desc: "Finansal Modelleme & Karar Destek" },
    { name: "ExcelArşiv", domain: "excelarsiv.com", url: "https://excelarsiv.com", desc: "Finans & Kurumsal Tablo Şablonları" },
    { name: "SKDM Hesapla", domain: "skdmhesapla.com", url: "https://skdmhesapla.com", desc: "CBAM & Sınırda Karbon Analizi" },
    { name: "Karbon Fiyat", domain: "karbonfiyat.com", url: "https://karbonfiyat.com", desc: "ETS & Küresel Emisyon Piyasaları" },
    { name: "Inversion Core", domain: "inversioncore.com", url: "https://inversioncore.com", desc: "AI Ajan & Yazılım Sistemleri" },
    { name: "Belgin Kuyumculuk", domain: "belginkuyumculuk.com", url: "https://belginkuyumculuk.com", desc: "Mücevherat & Rafine Kıymetli Maden" },
    { name: "Saatchi & Co.", domain: "saatchi.com.tr", url: "https://saatchi.com.tr", desc: "Sertifikalı Lüks Saat Danışmanlığı" },
    { name: "Dilekçe Yazdır", domain: "dilekceyazdir.com.tr", url: "https://dilekceyazdir.com.tr", desc: "Hukuki Belge & Karar Desteği" },
    { name: "HTML and HTML", domain: "htmlandhtml.com", url: "https://htmlandhtml.com", desc: "Semantik Web & Arayüz Mimarisi" },
    { name: "Değerlet", domain: "degerlet.com", url: "https://degerlet.com", desc: "AI Varlık Değerleme & Ekspertiz" }
  ];

  return (
    <footer className="bg-[#0C0B0A] text-[#E8E2D5] border-t border-white/10 mt-auto relative overflow-hidden">
      {/* Ambient subtle gold lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(194,167,104,0.06),transparent_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:pt-16 sm:pb-12 relative z-10">
        
        {/* Top Section: Brand & Quick VIP Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-white/10">
          
          {/* Brand Identity */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/logo.png" 
                alt="Saatchi & Saatchi" 
                width={200} 
                height={50} 
                className="h-9 sm:h-10 w-auto object-contain invert brightness-0" 
              />
            </Link>
            <p className="text-xs sm:text-sm text-[#9E9585] max-w-md font-light leading-relaxed mb-5">
              İsviçre Haute Horlogerie ve küresel lüks saat dünyasının en seçkin referansları. Bağımsız ekspertiz güvencesi ve köklü güven mirası.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#846b32]" />
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#C2A768] font-medium">
                İzmir Showroom · Randevu ile Kabul
              </span>
            </div>
          </div>

          {/* VIP Direct Channels */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a 
                href="https://wa.me/905419305372" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#846b32]/50 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#846b32]/15 text-[#C2A768] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-[#9E9585] block font-medium">VIP WhatsApp</span>
                  <span className="text-xs font-semibold text-white truncate block group-hover:text-[#C2A768] transition-colors">+90 541 930 53 72</span>
                </div>
              </a>

              <a 
                href="tel:+905398234141"
                className="group p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#846b32]/50 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#846b32]/15 text-[#C2A768] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-[#9E9585] block font-medium">Müşteri Hattı</span>
                  <span className="text-xs font-semibold text-white truncate block group-hover:text-[#C2A768] transition-colors">+90 539 823 41 41</span>
                </div>
              </a>

              <Link 
                href="/iletisim"
                className="group p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#846b32]/50 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#846b32]/15 text-[#C2A768] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-[#9E9585] block font-medium">Özel Showroom</span>
                  <span className="text-xs font-semibold text-white truncate block group-hover:text-[#C2A768] transition-colors">Harita & Konum</span>
                </div>
              </Link>
            </div>
          </div>

        </div>

        {/* Middle Section: Compact Legal & Corporate Grid */}
        <div className="py-8 sm:py-10 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#846b32]" />
              <h4 className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white font-serif">
                Hukuki Çerçeve & Güvenlik Politikaları
              </h4>
            </div>
            <span className="text-[10px] text-[#736B5E] tracking-wider uppercase font-mono">
              GİB e-Arşiv Fatura · TCK 5549 Uyumlu
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2.5">
            {legalLinks.map((link, idx) => (
              <Link 
                key={idx}
                href={link.href}
                className="text-[11px] sm:text-xs text-[#8F8778] hover:text-[#C2A768] transition-colors truncate py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1 h-1 rounded-full bg-[#846b32]/40 group-hover:bg-[#846b32] transition-colors flex-shrink-0" />
                <span className="truncate">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Strategic Cross-Ecosystem & Decision Support Platforms Network */}
        <div className="py-8 sm:py-10 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#C2A768]" />
              <h4 className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white font-serif">
                Stratejik Karar Destek & Değerleme Ekosistemi
              </h4>
            </div>
            <span className="text-[10px] text-[#736B5E] tracking-wider uppercase font-mono">
              Konsorsiyum & Çapraz Karar Ağları
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {decisionPlatforms.map((plat, idx) => (
              <a
                key={idx}
                href={plat.url}
                target="_blank"
                rel="noopener"
                className="group p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-[#846b32]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-medium text-[#E8E2D5] group-hover:text-[#C2A768] transition-colors truncate">
                    {plat.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#736B5E] group-hover:text-[#C2A768] transition-colors flex-shrink-0" />
                </div>
                <span className="text-[10px] text-[#8F8778] line-clamp-1">
                  {plat.desc}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright, Credentials & Micro Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <Link href="/odeme" className="sr-only">Güvenli Ödeme</Link>
            <p className="text-[#6E675B] text-[10px] sm:text-[11px] tracking-wider uppercase">
              &copy; {currentYear} SAATCHI & SAATCHI · SEMİH SONBAHAR. TÜM HAKLARI SAKLIDIR.
            </p>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-[#C2A768] text-[10px] font-mono tracking-widest">
              LÜKS SAAT DANIŞMANLIĞI
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[#6E675B] font-mono">
            <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-[#9E9585]">
              256-BIT SSL ENCRYPTED
            </span>
            <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-[#C2A768]">
              SECURE VIP CHECKOUT
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
