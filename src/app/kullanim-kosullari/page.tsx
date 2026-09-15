import React from 'react';

export const metadata = {
  title: 'Kullanım Koşulları | SAATCHI',
};

export default function KullanimPage() {
  return (
    <main className="min-h-screen bg-black text-[#e5e5e5] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-serif text-[#D4AF37] mb-8 border-b border-[#333] pb-4">KULLANIM KOŞULLARI</h1>
        
        <div className="prose prose-invert prose-gold max-w-none space-y-6 text-sm/relaxed text-gray-300">
          <p><strong>1. GİRİŞ</strong></p>
          <p>saatchi.watch internet sitesini ("Site") ziyaret ettiğiniz veya bu Site'den hizmet aldığınız için teşekkür ederiz. Site'yi kullanarak aşağıda belirtilen kullanım koşullarını kabul etmiş sayılırsınız. SAATCHI- SEMİH SONBAHAR, işbu kullanım koşullarında haber vermeksizin tek taraflı değişiklik yapma hakkını saklı tutar.</p>

          <p><strong>2. FİKRİ MÜLKİYET HAKLARI</strong></p>
          <p>Site'de yer alan unvan, işletme adı, marka, patent, logo, tasarım, bilgi ve yöntem gibi tescilli veya tescilsiz tüm fikri mülkiyet hakları SAATCHI- SEMİH SONBAHAR'a veya belirtilen ilgilisine aittir. İşbu Site'nin ziyaret edilmesi veya bu Site'deki hizmetlerden yararlanılması söz konusu fikri mülkiyet hakları konusunda hiçbir hak vermez.</p>

          <p><strong>3. GÜVENLİK VE KÖTÜYE KULLANIM</strong></p>
          <p>Kullanıcılar, Site'nin güvenliğini tehdit edecek veya altyapısına (Cloudflare Edge ağı dahil) aşırı yük getirecek eylemlerde bulunamaz, tersine mühendislik (reverse engineering) yapamazlar. Tüm ihlal girişimleri loglanarak yasal mercilere raporlanacaktır.</p>

          <p><strong>4. SİTE İÇERİĞİ VE ÜRÜN BİLGİLERİ</strong></p>
          <p>SAATCHI- SEMİH SONBAHAR, yayınlanan ürünlerin fiyat ve teknik özelliklerini değiştirme hakkına sahiptir. Lüks ve ithal saatlerde yaşanabilecek stok veya ani fiyat dalgalanmalarından doğacak tipografik veya sistemsel fiyat hatalarında siparişi iptal etme ve iade etme hakkını saklı tutar.</p>

          <p><strong>5. VIP MÜŞTERİ HİZMETLERİ</strong></p>
          <p>Saat satın alımlarında 7/24 hizmet veren VIP WhatsApp Destek Hattımız üzerinden ( +90 541 930 53 72 ) doğrudan satış temsilcinize ulaşabilir, siparişin her aşamasında kişiselleştirilmiş hizmet alabilirsiniz.</p>
        </div>
      </div>
    </main>
  );
}
