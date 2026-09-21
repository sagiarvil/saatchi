import { ArrowUpRight, Clock3, MapPin, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import PremiumMap from '@/components/contact/PremiumMap';

const address = 'Menderes Caddesi No:231/B, Buca / İzmir';
const mapsUrl = 'https://share.google/mhx0N9skVc5ZibBPM';

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f4f0e8]">
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(111,31,37,.28),transparent_31%),radial-gradient(circle_at_84%_8%,rgba(194,167,104,.08),transparent_26%),linear-gradient(180deg,#171412_0%,#0d0c0b_100%)]" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#7f262b]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c69a9c]">SAATCHI Concierge · İzmir</p>
                </div>
                <h1 className="max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-[#f7f2ea] sm:text-5xl md:text-6xl lg:text-7xl">
                  Bir saatten önce,<br />doğru görüşme.
                </h1>
                <p className="mt-7 max-w-2xl text-[15px] leading-8 text-[#bdb5ac] md:text-base">
                  Koleksiyon inceleme, ikinci el değerlendirme, takas, randevu ve teslim süreçlerinde doğrudan showroom ekibimizle ilerleyin. Her görüşme satış baskısından önce ürünün niteliğini ve ihtiyacınızı anlamakla başlar.
                </p>
              </div>

              <div className="border-l border-[#7f262b]/80 pl-6 md:pl-8">
                <p className="text-xs uppercase tracking-[0.22em] text-[#827a73]">Showroom çalışma düzeni</p>
                <div className="mt-4 flex items-start gap-3 text-sm leading-7 text-[#d1c9bf]">
                  <Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#c2a768]" strokeWidth={1.3} />
                  <div>
                    <p>Pazartesi – Cumartesi</p>
                    <p className="text-[#928981]">09:00 – 19:00</p>
                  </div>
                </div>
                <p className="mt-5 text-xs leading-6 text-[#8f8780]">Yüksek değerli ürün incelemelerinde beklemeyi azaltmak için randevu önerilir.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-18 lg:px-12 lg:py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8797c]">Doğrudan kanallar</p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">Size en doğal gelen yerden ulaşın.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#928a83]">Tek merkez, üç temas noktası. Showroom, WhatsApp ve müşteri temsilcisi aynı fiziksel işletme yapısına bağlıdır.</p>
          </div>

          <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            <article className="group bg-[#121110] p-7 transition-colors duration-500 hover:bg-[#161413] md:p-9">
              <div className="flex items-center justify-between">
                <MapPin className="h-6 w-6 text-[#c2a768]" strokeWidth={1.2} />
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#6f6862]">01</span>
              </div>
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8c837b]">Fiziksel Showroom</p>
              <h3 className="mt-3 text-2xl font-medium text-[#f4f0e8]">Buca / İzmir</h3>
              <p className="mt-4 min-h-[84px] text-sm leading-7 text-[#a69f97]">{address}<br />Şirinyer / Çarşı Meydanı mevkii</p>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e0d5c9] transition-colors group-hover:text-white">
                Yol tarifi <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>

            <article className="group bg-[linear-gradient(155deg,#1b1514_0%,#131110_58%,#190d0f_100%)] p-7 transition-colors duration-500 md:p-9">
              <div className="flex items-center justify-between">
                <MessageCircle className="h-6 w-6 text-[#c2a768]" strokeWidth={1.2} />
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#6f6862]">02</span>
              </div>
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8c837b]">VIP WhatsApp</p>
              <a href="https://wa.me/905419305372" className="mt-3 block text-2xl font-light tracking-[-0.02em] text-[#f4f0e8] transition-colors hover:text-white">+90 541 930 53 72</a>
              <p className="mt-4 min-h-[84px] text-sm leading-7 text-[#a69f97]">Model, kondisyon, ikinci el değerleme, takas ve showroom randevusu için danışman hattı.</p>
              <a href="https://wa.me/905419305372?text=Merhaba,%20SAATCHI%20showroom%20randevusu%20ve%20saatler%20hakkinda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 bg-[#f4f0e8] px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#171311] transition-colors hover:bg-white">
                Mesaj gönder <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>

            <article className="group bg-[#121110] p-7 transition-colors duration-500 hover:bg-[#161413] md:p-9">
              <div className="flex items-center justify-between">
                <PhoneCall className="h-6 w-6 text-[#c2a768]" strokeWidth={1.2} />
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#6f6862]">03</span>
              </div>
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8c837b]">Müşteri Temsilcisi</p>
              <a href="tel:+905398234141" className="mt-3 block text-2xl font-light tracking-[-0.02em] text-[#f4f0e8] transition-colors hover:text-white">+90 539 823 41 41</a>
              <p className="mt-4 min-h-[84px] text-sm leading-7 text-[#a69f97]">Sipariş durumu, teslim koordinasyonu ve satış sonrası konular için doğrudan destek.</p>
              <a href="mailto:info@saatchi.com.tr" className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e0d5c9] transition-colors group-hover:text-white">
                info@saatchi.com.tr <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          </div>

          <div className="mt-6 flex items-start gap-3 border border-white/8 bg-white/[.025] px-5 py-4 text-xs leading-6 text-[#8f8780]">
            <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#c2a768]" strokeWidth={1.25} />
            <p>Ödeme veya kimlik doğrulama süreçlerinde tek kullanımlık banka şifresi ya da kart güvenlik kodu WhatsApp, telefon veya e-posta üzerinden talep edilmez.</p>
          </div>
        </section>

        <PremiumMap />
      </main>
    </div>
  );
}
