import React from 'react';

export const metadata = {
  title: 'Gizlilik ve Çerez Politikası | SAATCHI',
  description: 'SAATCHI- SEMİH SONBAHAR Gizlilik ve KVKK Politikaları.',
};

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-black text-[#e5e5e5] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-serif text-[#D4AF37] mb-8 border-b border-[#333] pb-4">GİZLİLİK VE ÇEREZ POLİTİKASI (KVKK)</h1>
        
        <div className="prose prose-invert prose-gold max-w-none space-y-6 text-sm/relaxed text-gray-300">
          <p><strong>1. VERİ SORUMLUSU KİMLİĞİ</strong></p>
          <p>SAATCHI- SEMİH SONBAHAR olarak kişisel verilerinizin güvenliğine ve gizliliğine son derece önem vermekteyiz. 6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında işliyor ve muhafaza ediyoruz.</p>

          <p><strong>2. KİŞİSEL VERİLERİN İŞLENME AMACI</strong></p>
          <p>Toplanan kişisel verileriniz (Ad, Soyad, Telefon, VIP teslimat adresi, E-posta, IP Adresi, T.C. Kimlik veya Vergi Numarası, Ödeme verileri vb.) şu amaçlarla işlenmektedir:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Lüks saat siparişlerinizin onaylanması ve VIP teslimat süreçlerinin yönetimi,</li>
            <li>MASAK kuralları ve yüksek tutarlı işlemlerde yasal yükümlülüklerin yerine getirilmesi,</li>
            <li>Size özel elit kampanya ve ürün sunumlarının (açık rızanız doğrultusunda) yapılması,</li>
            <li>Muhasebe ve finansal faturalandırma süreçlerinin yürütülmesi.</li>
          </ul>

          <p><strong>3. KİŞİSEL VERİLERİN KİMLERE AKTARILACAĞI</strong></p>
          <p>Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda; VIP kurye/kargo şirketlerimize, ödeme altyapı sağlayıcılarımıza (Sanal POS, Bankalar), mali müşavirlerimize ve kanunen yetkili kamu kurumlarına KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri aktarım şartları ve amaçları çerçevesinde aktarılabilecektir. Kesinlikle 3. taraf reklam şirketlerine veri satışı yapılmaz.</p>

          <p><strong>4. ÇEREZ (COOKIE) POLİTİKASI</strong></p>
          <p>saatchi.watch, ziyaretçilerinin deneyimini iyileştirmek, güvenlik duvarını aktif tutmak (Cloudflare vb.) ve analiz yapmak amacıyla çerezler kullanmaktadır. Kesinlikle gerekli (Zorunlu) çerezler sistemin güvenliği için daima aktiftir. Performans ve analiz çerezleri tarayıcı ayarlarından kapatılabilir.</p>

          <p><strong>5. HAKLARINIZ</strong></p>
          <p>KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, amacına uygun kullanılıp kullanılmadığını bilme, eksikse düzeltilmesini isteme haklarına sahipsiniz. Başvurularınızı <strong>info@saatchi.watch</strong> adresine yazılı olarak iletebilirsiniz.</p>
        </div>
      </div>
    </main>
  );
}
