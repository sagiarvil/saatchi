import type { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, Building2, CreditCard, LockKeyhole, ReceiptText, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Güvenli Ödeme | SAATCHI',
  description: 'SAATCHI güvenli ödeme, satıcı bilgileri, 3D Secure yaklaşımı, teslim ve tüketici sözleşmeleri.',
  robots: {
    index: true,
    follow: true,
  },
};

const merchant = {
  name: 'SEMİH SONBAHAR - SAATCHI',
  taxOffice: 'Şirinyer V.D.',
  taxNumber: '7740298676',
  chamberRegistryNumber: '492956',
  address: 'Menderes Caddesi No:231/B, Buca / İzmir',
  phone: '+90 541 930 53 72',
  supportPhone: '+90 539 823 41 41',
  email: 'info@saatchi.watch',
};

const steps = [
  {
    title: 'Sipariş ve Tutar Doğrulama',
    text: 'Ödeme öncesinde ürün kimliği, toplam TL bedeli ve teslim yöntemi müşteriye açıkça gösterilir.',
    icon: ReceiptText,
  },
  {
    title: 'Müşteri ve Sözleşme Kontrolü',
    text: 'Fatura/iletişim bilgileri ile zorunlu ön bilgilendirme, mesafeli satış ve teslim koşulları ödeme öncesinde onaylanır.',
    icon: BadgeCheck,
  },
  {
    title: 'Banka / Ödeme Kuruluşu',
    text: 'Kart numarası, CVV/CVC ve son kullanma tarihi SAATCHI sunucusunda toplanmaz; kart girişi bankanın veya yetkili ödeme kuruluşunun güvenli ekranında yapılır.',
    icon: CreditCard,
  },
  {
    title: '3D Secure ve İşlem Sonucu',
    text: 'Uygulanan banka altyapısına göre 3D Secure veya eşdeğer risk doğrulaması tamamlanır; işlem sonucu sipariş kaydıyla ilişkilendirilir.',
    icon: ShieldCheck,
  },
];

export default function SecurePaymentPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#171717]">
      <section className="border-b border-black/10 bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9ad68]">SAATCHI / Güvenli Ödeme</p>
            <h1 className="mt-5 font-serif text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              Güvenli ve doğrulanabilir ödeme akışı
            </h1>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              SAATCHI ödeme süreci; ürün ve toplam tutarın ödeme öncesinde gösterilmesi, zorunlu tüketici bilgilendirmelerinin erişilebilir olması ve kart verisinin banka/ödeme kuruluşu güvenli alanında işlenmesi esasına göre tasarlanmıştır.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">HTTPS / TLS</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">3D Secure uyumlu akış</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Kart verisi SAATCHI&apos;de tutulmaz</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">TL fiyatlandırma</span>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-[0_18px_55px_rgba(0,0,0,0.05)] sm:p-9">
            <div className="flex items-center gap-3">
              <LockKeyhole className="h-5 w-5 text-[#8a6b28]" />
              <h2 className="text-xl font-semibold">Ödeme akışı</h2>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {steps.map(({ title, text, icon: Icon }, index) => (
                <article key={title} className="rounded-xl border border-black/8 bg-[#fbfaf7] p-5">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-[#8a6b28]" />
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-black/35">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-black/60">{text}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-[#b79a57]/35 bg-[#f8f3e8] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#765a20]">Gerçek ödeme işlemleri</p>
              <p className="mt-2 text-sm leading-6 text-black/70">
                Müşteriye oluşturulan kişiye özel, imzalı SAATCHI ödeme bağlantısı üzerinden açılır. Geçerli sipariş bağlantısı olmadan tahsilat başlatılmaz. Banka/ödeme kuruluşu Sanal POS aktivasyonu tamamlandığında güvenli yönlendirme aynı kontrollü akış üzerinden çalışır.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-black/10 bg-[#111] p-7 text-white shadow-[0_18px_55px_rgba(0,0,0,0.08)] sm:p-9">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-[#c9ad68]" />
              <h2 className="text-xl font-semibold">Üye işyeri bilgileri</h2>
            </div>

            <dl className="mt-7 space-y-5 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/40">İşletmeci</dt>
                <dd className="mt-1 font-medium">{merchant.name}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/40">Vergi Dairesi / VKN</dt>
                <dd className="mt-1">{merchant.taxOffice} / {merchant.taxNumber}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/40">Oda Sicil No</dt>
                <dd className="mt-1">{merchant.chamberRegistryNumber}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/40">Adres</dt>
                <dd className="mt-1 leading-6">{merchant.address}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/40">İletişim</dt>
                <dd className="mt-1 leading-6">{merchant.phone}<br />{merchant.supportPhone}<br />{merchant.email}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="mt-8 rounded-2xl border border-black/10 bg-white p-7 sm:p-9">
          <h2 className="text-xl font-semibold">Ödeme öncesi erişilebilir belgeler</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-black/60">
            Aşağıdaki belgeler ödeme yükümlülüğü doğuran işlemden önce müşterinin erişimine açıktır.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['/on-bilgilendirme-formu', 'Ön Bilgilendirme Formu'],
              ['/mesafeli-satis-sozlesmesi', 'Mesafeli Satış Sözleşmesi'],
              ['/iade-degisim-cayma', 'İade, Değişim ve Cayma'],
              ['/gizlilik-politikasi', 'Gizlilik Politikası'],
              ['/kvkk-aydinlatma-metni', 'KVKK Aydınlatma Metni'],
              ['/yuksek-degerli-urun-teslimi', 'Yüksek Değerli Ürün Teslimi'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg border border-black/10 px-4 py-3 text-sm font-medium transition hover:border-[#8a6b28]/40 hover:bg-[#faf7ef]"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-black/10 bg-white p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">Fiyat</p>
            <p className="mt-2 text-sm font-medium">Ürün ve toplam bedel ödeme öncesinde TL olarak gösterilir.</p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">Teslim</p>
            <p className="mt-2 text-sm font-medium">Yüksek değerli ürünlerde showroom teslimi ve kimlik doğrulaması uygulanabilir.</p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">Kart Güvenliği</p>
            <p className="mt-2 text-sm font-medium">PAN, CVV/CVC ve son kullanma tarihi SAATCHI uygulamasında talep edilmez.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
