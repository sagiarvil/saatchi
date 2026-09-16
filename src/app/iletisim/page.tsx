import { ArrowUpRight, Clock3, MapPin, MessageCircle, Navigation, PhoneCall, ShieldCheck } from 'lucide-react';

const address = 'Menderes Caddesi No:231/B, Buca / İzmir';
const mapsUrl = 'https://share.google/mhx0N9skVc5ZibBPM';
const mapEmbed = 'https://www.google.com/maps?q=Menderes%20Caddesi%20No%3A231%2FB%20Buca%20Izmir&output=embed';

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f4f0e8]">
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(107,31,36,0.22),transparent_32%),linear-gradient(180deg,#151311_0%,#0d0c0b_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[1fr_420px] lg:items-end lg:px-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b78284]">Concierge / İzmir</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.03] tracking-[-0.04em] sm:text-5xl md:text-6xl">
                Doğrudan, sakin,<br />kişisel iletişim.
              </h1>
            </div>
            <div className="border-l border-[#7f262b] pl-6">
              <p className="text-sm leading-7 text-[#bfb7ae]">
                Ürün inceleme, showroom randevusu, takas ve yüksek değerli teslim süreçlerinde aracı katman olmadan doğrudan ekibimize ulaşın.
              </p>
              <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#827a73]">
                <Clock3 className="h-4 w-4 text-[#c2a768]" strokeWidth={1.3} />
                Pazartesi – Cumartesi · 09:00 – 19:00
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16 lg:px-12">
          <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            <article className="bg-[#121110] p-7 md:p-8">
              <MapPin className="h-6 w-6 text-[#c2a768]" strokeWidth={1.2} />
              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8c837b]">Fiziksel Showroom</p>
              <h2 className="mt-3 text-xl font-medium text-[#f4f0e8]">Buca / İzmir</h2>
              <p className="mt-4 text-sm leading-7 text-[#a69f97]">{address}<br />Şirinyer / Çarşı Meydanı mevkii</p>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d4c7b8] transition-colors hover:text-white">
                Yol tarifi <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>

            <article className="bg-[linear-gradient(160deg,#1a1514_0%,#121110_60%,#1a0d0f_100%)] p-7 md:p-8">
              <MessageCircle className="h-6 w-6 text-[#c2a768]" strokeWidth={1.2} />
              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8c837b]">VIP WhatsApp</p>
              <a href="https://wa.me/905419305372" className="mt-3 block text-2xl font-light tracking-[-0.02em] text-[#f4f0e8] transition-colors hover:text-white">+90 541 930 53 72</a>
              <p className="mt-4 text-sm leading-7 text-[#a69f97]">Model, kondisyon, takas ve randevu için doğrudan danışman hattı.</p>
              <a href="https://wa.me/905419305372?text=Merhaba,%20SAATCHI%20showroom%20randevusu%20ve%20saatler%20hakkinda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 bg-[#f4f0e8] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#171311] transition-colors hover:bg-white">
                Mesaj gönder <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>

            <article className="bg-[#121110] p-7 md:p-8">
              <PhoneCall className="h-6 w-6 text-[#c2a768]" strokeWidth={1.2} />
              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8c837b]">Müşteri Temsilcisi</p>
              <a href="tel:+905398234141" className="mt-3 block text-2xl font-light tracking-[-0.02em] text-[#f4f0e8] transition-colors hover:text-white">+90 539 823 41 41</a>
              <p className="mt-4 text-sm leading-7 text-[#a69f97]">Özel danışmanlık, sipariş durumu ve showroom koordinasyonu.</p>
              <a href="mailto:info@saatchi.watch" className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d4c7b8] transition-colors hover:text-white">
                info@saatchi.watch <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 md:pb-20 lg:px-12">
          <div className="overflow-hidden border border-white/10 bg-[#11100f]">
            <div className="flex flex-col gap-5 border-b border-white/10 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b78284]">
                  <Navigation className="h-4 w-4" strokeWidth={1.3} />
                  Doğrulanmış showroom konumu
                </div>
                <h2 className="mt-2 text-xl font-medium text-[#f4f0e8]">Menderes Caddesi No:231/B</h2>
                <p className="mt-1 text-sm text-[#8f8780]">Buca / İzmir · Şirinyer Çarşı aksı</p>
              </div>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e6ddd2] transition-colors hover:border-[#7f262b] hover:bg-[#7f262b]/10">
                Google Maps’te aç <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="group relative h-[360px] overflow-hidden bg-[#181614] sm:h-[420px] lg:h-[460px]">
              <iframe
                src={mapEmbed}
                title="SAATCHI Showroom - Buca İzmir"
                className="h-full w-full grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,12,11,0.18)_0%,transparent_26%,transparent_70%,rgba(13,12,11,0.22)_100%)]" />
              <div className="pointer-events-none absolute bottom-5 left-5 hidden items-center gap-2 border border-white/15 bg-black/70 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-[#f4f0e8] backdrop-blur-md sm:flex">
                <ShieldCheck className="h-4 w-4 text-[#c2a768]" strokeWidth={1.2} />
                Showroom konumu · etkileşim için haritayı kullanın
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
