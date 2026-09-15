import React from 'react';

export const metadata = {
  title: 'İade ve Değişim Koşulları | SAATCHI',
};

export default function IadePage() {
  return (
    <main className="min-h-screen bg-black text-[#e5e5e5] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-serif text-[#D4AF37] mb-8 border-b border-[#333] pb-4">İADE VE DEĞİŞİM KOŞULLARI</h1>
        
        <div className="prose prose-invert prose-gold max-w-none space-y-6 text-sm/relaxed text-gray-300">
          <p><strong>1. İADE ŞARTLARI</strong></p>
          <p>SAATCHI- SEMİH SONBAHAR'dan satın aldığınız stokta bulunan ürünleri, teslimat tarihinden itibaren 14 (on dört) gün içerisinde kullanılmamış, etiketleri koparılmamış, garanti belgesi ve kutu içeriği eksiksiz olarak orijinal faturasıyla birlikte iade edebilirsiniz.</p>

          <p><strong>2. İADESİ KABUL EDİLMEYEN ÜRÜNLER (ÖZEL SİPARİŞLER)</strong></p>
          <p>Aşağıdaki lüks ve VIP ürün koşullarında, yasa gereği ve firmamız politikası gereği iade alınamamaktadır:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Yurtdışından (Örn: İsviçre Butiklerinden) tamamen müşterinin talebi üzerine ithal edilen "Özel Sipariş" (Elit Kategori) ürünleri,</li>
            <li>Müşterinin bilek ölçüsüne göre kordonu kısaltılmış, ayarlanmış veya baklası çıkarılmış saatler,</li>
            <li>Arka kapağına veya klipsine isme özel lazer/gravür işlemi yapılmış saatler,</li>
            <li>Kutusu zarar görmüş, sertifikası kaybedilmiş veya garanti kaşesi kişiye özel vurulmuş saatler,</li>
            <li>Jelatinleri sökülmüş, çizilmiş veya kılcal deformasyon oluşmuş, tekrar sıfır (brand new) olarak satılabilirlik özelliğini yitirmiş saatler.</li>
          </ul>

          <p><strong>3. DEĞİŞİM VE EKSPERTİZ SÜRECİ</strong></p>
          <p>İade veya değişim talebiyle firmamıza ulaşan ürünler, uzman saat ekspertiz ekibimiz tarafından detaylı bir mekanizma ve kondisyon testine tabi tutulur. İnceleme sonucunda kullanım hatası, çizik veya kozmetik kusur bulunmayan ürünler için iade işlemi başlatılır.</p>

          <p><strong>4. İADE BEDELİNİN ÖDENMESİ</strong></p>
          <p>İadenin onaylanmasının ardından, ödeme yaptığınız yönteme sadık kalınarak (Kredi kartı ise karta, Havale/EFT ise ilgili IBAN numarasına) 3-7 iş günü içerisinde yasal iade süreciniz tamamlanır.</p>
        </div>
      </div>
    </main>
  );
}
