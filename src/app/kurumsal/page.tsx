import Link from 'next/link';
import { ArrowUpRight, Check, Gem, ShieldCheck, Sparkles } from 'lucide-react';

const pillars = [
  {
    no: '01',
    title: 'Seçim',
    text: 'Koleksiyon; marka gücü, referans değeri, kondisyon, kutu-belge bütünlüğü ve gerçek müşteri talebi birlikte değerlendirilerek oluşturulur.'
  },
  {
    no: '02',
    title: 'Doğrulama',
    text: 'Her ürün, mevcut kimlik bilgileri ve fiziksel kondisyonu üzerinden siparişe özgü kontrol zincirine alınır. Açıklanmayan varsayımlar yerine kayıtlı veri esas alınır.'
  },
  {
    no: '03',
    title: 'Teslim',
    text: 'Ödeme, kimlik ve teslim kayıtları aynı sipariş kimliği altında ilişkilendirilebilir. Yüksek değerli işlemlerde güvenli teslim ve showroom doğrulaması uygulanabilir.'
  }
];

export default function KurumsalPage() {
  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f4f0e8]">
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(107,31,36,0.28),transparent_34%),radial-gradient(circle_at_12%_0%,rgba(194,167,104,0.08),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:px-12">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#ba8b8d]">SAATCHI / İzmir</p>
              <h1 className="max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-[#f7f2ea] sm:text-5xl md:text-6xl">
                Zamanı değil,<br />değeri seçiyoruz.
              </h1>
            </div>
            <div className="max-w-xl border-l border-[#7f262b] pl-6">
              <p className="text-sm leading-7 text-[#c8c0b7] md:text-[15px]">
                Yirmi yılı aşkın fiziksel ticaret tecrübesini, seçili lüks saatlerde doğrulanabilir ürün bilgisi, kontrollü tahsilat ve kayıtlı teslim disipliniyle birleştiren İzmir merkezli bir saat evi.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8780]">
                <span>Fiziksel showroom</span>
                <span>Seçili koleksiyon</span>
                <span>İşlem güvenliği</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#7f262b]/70 bg-[#7f262b]/10">
                <Gem className="h-5 w-5 text-[#d1b36f]" strokeWidth={1.2} />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a5787a]">Bir mağazadan fazlası</p>
              <h2 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
                Gösterişten önce güven.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#aaa29a]">
                Lüks saatte asıl değer, vitrindeki parlaklık değil; ürünün ne olduğunun, hangi koşulla satıldığının ve kime nasıl teslim edildiğinin açık olmasıdır.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              <div className="bg-[#121110] p-7 sm:p-8">
                <p className="text-4xl font-light tracking-[-0.04em] text-[#f4f0e8]">20+</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8780]">Yıllık fiziksel kök</p>
              </div>
              <div className="bg-[#121110] p-7 sm:p-8">
                <p className="text-4xl font-light tracking-[-0.04em] text-[#f4f0e8]">İzmir</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8780]">Buca merkez showroom</p>
              </div>
              <div className="bg-[#121110] p-7 sm:p-8">
                <p className="text-lg font-medium text-[#f4f0e8]">Rolex · Cartier · TAG Heuer</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8780]">Seçili saat evleri</p>
              </div>
              <div className="bg-[#121110] p-7 sm:p-8">
                <p className="text-lg font-medium text-[#f4f0e8]">Rado · Tissot</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8780]">Koleksiyon disiplini</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#11100f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a5787a]">SAATCHI standardı</p>
                <h2 className="mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">Üç aşamada güven zinciri.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#918a83]">
                Ürün anlatısından teslim tutanağına kadar aynı siparişin birbirini doğrulayan kayıtları.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
              {pillars.map((item) => (
                <div key={item.no} className="group bg-[#0d0c0b] p-7 transition-colors duration-500 hover:bg-[#151211] md:p-9">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.22em] text-[#7f262b]">{item.no}</span>
                    <Check className="h-4 w-4 text-[#d1b36f]/70" strokeWidth={1.2} />
                  </div>
                  <h3 className="mt-8 text-xl font-medium text-[#f4f0e8]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#969088]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <div className="grid gap-10 border border-white/10 bg-[linear-gradient(135deg,#171413_0%,#11100f_58%,#1c1012_100%)] p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <div className="flex items-center gap-3 text-[#d1b36f]">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.3} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">Fiziksel kök · Dijital disiplin</span>
              </div>
              <h2 className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
                Saatinizi ekranda değil, güven zincirinin tamamında değerlendirin.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#aaa29a]">
                Menderes Caddesi No:231/B, Buca / İzmir adresindeki showroom’da ürün inceleme, satış danışmanlığı ve teslim süreçleri için doğrudan ekibimizle görüşebilirsiniz.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/iletisim" className="inline-flex items-center justify-center gap-2 bg-[#f4f0e8] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171311] transition-colors hover:bg-white">
                Showroom & İletişim <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/elit-saat" className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e7dfd5] transition-colors hover:border-[#7f262b] hover:bg-[#7f262b]/10">
                Koleksiyonu Gör <Sparkles className="h-4 w-4" strokeWidth={1.2} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
