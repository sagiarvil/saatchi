const fs = require('fs');

const content = `import React from 'react';
import Image from "next/image";
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <Image src="/logo.png" alt="Saatchi & Saatchi" width={180} height={48} className="h-12 w-auto mb-6 object-contain invert brightness-0" />
            <p className="text-gray-500 text-sm leading-relaxed">
              Mükemmellik ve zarafetin buluştuğu lüks saat koleksiyonları.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">İletişim & Destek</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>VIP WhatsApp: <br/><span className="text-white">+90 541 930 53 72</span></li>
              <li>Müşteri Hizmetleri: <br/><span className="text-white">+90 539 823 41 41</span></li>
              <li>E-Posta: <br/><span className="text-white">info@saatchi.watch</span></li>
              <li><Link href="/iletisim" className="hover:text-white transition-colors">Showroom Adresimiz</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">Hukuki & Kurumsal</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="space-y-3">
                <li><Link href="/biz-kimiz" className="text-gray-500 hover:text-white transition-colors text-sm">Biz Kimiz (Kurumsal Profil)</Link></li>
                <li><Link href="/mesafeli-satis-sozlesmesi" className="text-gray-500 hover:text-white transition-colors text-sm">Mesafeli Satış Sözleşmesi</Link></li>
                <li><Link href="/on-bilgilendirme-formu" className="text-gray-500 hover:text-white transition-colors text-sm">Ön Bilgilendirme Formu</Link></li>
                <li><Link href="/kvkk-aydinlatma-metni" className="text-gray-500 hover:text-white transition-colors text-sm">KVKK Aydınlatma Metni</Link></li>
                <li><Link href="/musteri-tanima-ve-islem-guvenligi" className="text-gray-500 hover:text-white transition-colors text-sm">MASAK & Müşteri Tanıma</Link></li>
                <li><Link href="/magaza-teslim-tesellum-formu" className="text-gray-500 hover:text-white transition-colors text-sm">Ürün Teslim & Tesellüm Beyanı</Link></li>
              </ul>
              <ul className="space-y-3">
                <li><Link href="/yuksek-degerli-urun-teslimi" className="text-gray-500 hover:text-white transition-colors text-sm">Yüksek Değerli Teslimat</Link></li>
                <li><Link href="/iade-degisim-cayma" className="text-gray-500 hover:text-white transition-colors text-sm">İade, Değişim ve Cayma</Link></li>
                <li><Link href="/gizlilik-politikasi" className="text-gray-500 hover:text-white transition-colors text-sm">Gizlilik Politikası</Link></li>
                <li><Link href="/cerez-politikasi" className="text-gray-500 hover:text-white transition-colors text-sm">Çerez Politikası</Link></li>
                <li><Link href="/hukuki-delil-ve-kayit-politikasi" className="text-gray-500 hover:text-white transition-colors text-sm">Hukuki Delil & Kayıt Politikası</Link></li>
              </ul>
            </div>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[10px] tracking-widest uppercase">
            &copy; {new Date().getFullYear()} SAATCHI - SEMİH SONBAHAR. Tüm Hakları Saklıdır.
          </p>
          <div className="flex gap-4">
            <span className="text-gray-700 text-xs font-mono">SECURE VIP CHECKOUT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync('src/components/layout/Footer.tsx', content, 'utf8');
console.log('Footer updated.');
