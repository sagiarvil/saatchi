import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Saatchi & Saatchi" className="h-12 w-auto mb-6 object-contain invert brightness-0" />
            <p className="text-gray-500 text-sm leading-relaxed">
              Mükemmellik ve zarafetin buluştuğu lüks saat koleksiyonları.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">Kurumsal</h4>
            <ul className="space-y-4">
              <li><Link href="/kurumsal" className="text-gray-500 hover:text-white transition-colors text-sm">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="text-gray-500 hover:text-white transition-colors text-sm">İletişim & Showroom</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">Yasal</h4>
            <ul className="space-y-4">
              <li><Link href="/mesafeli-satis-sozlesmesi" className="text-gray-500 hover:text-white transition-colors text-sm">Mesafeli Satış Sözleşmesi</Link></li>
              <li><Link href="/gizlilik-ve-cerez-politikasi" className="text-gray-500 hover:text-white transition-colors text-sm">Gizlilik (KVKK) ve Çerezler</Link></li>
              <li><Link href="/iade-ve-degisim" className="text-gray-500 hover:text-white transition-colors text-sm">İade ve Değişim Koşulları</Link></li>
              <li><Link href="/kullanim-kosullari" className="text-gray-500 hover:text-white transition-colors text-sm">Kullanım Koşulları</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">İletişim</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>VIP WhatsApp: +90 541 930 53 72</li>
              <li>Müşteri Hizmetleri: +90 539 823 41 41</li>
              <li>info@saatchi.watch</li>
            </ul>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-600 text-[10px] tracking-widest uppercase">
            &copy; {new Date().getFullYear()} SAATCHI- SEMİH SONBAHAR. Tüm Hakları Saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
