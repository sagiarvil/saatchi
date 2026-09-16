import Link from 'next/link';
import { ArrowUpRight, Check, Gem, ShieldCheck, Sparkles } from 'lucide-react';

const pillars = [
  { no: '01', title: 'Seçim', text: 'Marka gücü, referans niteliği, kondisyon, kutu-belge bütünlüğü ve gerçek piyasa talebi birlikte değerlendirilir.' },
  { no: '02', title: 'Doğrulama', text: 'Ürün kimliği, fiziksel durum ve mevcut evraklar satış anlatısından bağımsız bir kontrol zincirinde ele alınır.' },
  { no: '03', title: 'İşlem', text: 'Sipariş, tahsilat, fatura ve müşteri kayıtları aynı işlem kimliği altında birbirini doğrulayacak şekilde kurgulanır.' },
  { no: '04', title: 'Teslim', text: 'Yüksek değerli ürünlerde showroom doğrulaması, kimlik kontrolü ve kayıtlı teslim disiplini uygulanabilir.' },
];

export default function KurumsalPage() {
  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f4f0e8]">
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(107,31,36,.30),transparent_31%),radial-gradient(circle_at_14%_0%,rgba(194,167,104,.09),transparent_28%),linear-gradient(180deg,#171311_0%,#0d0c0b_100%)]" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#7f262b]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.31em] text-[#c49a9b]">SAATCHI · İzmir</p>
                </div>
                <h1 className="max-w-5xl text-4xl font-medium leading-[1.01] tracking-[-0.05em] text-[#f7f2ea] sm:text-5xl md:text-6xl lg:text-7xl">
                  Saat satmaktan önce,<br />güven inşa ediyoruz.
                </h1>
              </div>
              <div className="border-l border-[#7f262b]/80 pl-6 md:pl-8">
                <p className="text-[15px] leading-8 text-[#c2bab1]">
                  Yirmi yılı aşkın fiziksel ticaret tecrübesini, seçili lüks saatlerde şeffaf ürün anlatımı, kontrollü tahsilat ve kayıtlı teslim disipliniyle birleştiren İzmir merkezli bir saat evi.
                </p>
                <p className="mt-5 text-xs leading-6 text-[#8e867f]">Showroom kökü · Dijital sipariş disiplini · İkinci el uzmanlığı</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#7f262b]/60 bg-[#7f262b]/10">
                <Gem className="h-5 w-5 text-[#d1b36f]" strokeWidth={1.2} />
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.29em] text-[#a8797c]">Bir mağazadan fazlası</p>
              <h2 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">Gösterişten önce doğruluk.</h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#aaa29a]">Lüks bir saatin değeri yalnız markasında değil; ne olduğunun, hangi kondisyonla sunulduğunun, ödeme ve teslim sürecinin nasıl kayıt altına alındığının açıklığında yatar.</p>
            </div>

            <div className="border border-white/10 bg-[#11100f]">
              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                <div className="bg-[#121110] p-8"><p className="text-4xl font-light tracking-[-0.04em]">20+</p><p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8780]">Yıllık fiziksel ticaret kökü</p></div>
                <div className="bg-[#121110] p-8"><p className="text-4xl font-light tracking-[-0.04em]">İzmir</p><p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8780]">Buca / Şirinyer showroom</p></div>
                <div className="bg-[#121110] p-8"><p className="text-lg font-medium">Rolex · Cartier · TAG Heuer</p><p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8780]">Seçili global saat evleri</p></div>
                <div className="bg-[#121110] p-8"><p className="text-lg font-medium">Rado · Tissot</p><p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8f8780]">Koleksiyon ve ikinci el odağı</p></div>
              </div>
              <div className="border-t border-white/10 px-8 py-7 text-sm leading-7 text-[#9e968e]">SAATCHI; ilgili saat markalarının resmî distribütörü veya yetkili satıcısı olduğunu, açıkça belirtilmedikçe, iddia etmez. Marka isimleri ürün tanımlama amacıyla kullanılır.</div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#11100f]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
            <div className="mb-10 grid gap-6 md:grid-cols-[1fr_480px] md:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.29em] text-[#a8797c]">SAATCHI standardı</p>
                <h2 className="mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">Dört aşamada işlem güveni.</h2>
              </div>
              <p className="text-sm leading-7 text-[#918a83]">Ürünün vitrinden müşteriye kadar izlediği yolun her aşamasında, belirsizliği azaltan bir kontrol noktası.</p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
              {pillars.map((item) => (
                <article key={item.no} className="group bg-[#0d0c0b] p-8 transition-colors duration-500 hover:bg-[#151211]">
                  <div className="flex items-center justify-between"><span className="text-[10px] tracking-[0.22em] text-[#8c4b50]">{item.no}</span><Check className="h-4 w-4 text-[#d1b36f]/70" strokeWidth={1.2} /></div>
                  <h3 className="mt-8 text-xl font-medium">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#969088]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.29em] text-[#a8797c]">İkinci el · koleksiyon · miras</p>
              <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">Bazı saatler zamanı göstermez; zamanı taşır.</h2>
              <p className="mt-6 max-w-xl text-sm leading-8 text-[#aaa29a]">Rolex, Cartier, TAG Heuer, Rado, Tissot ve diğer köklü saat evlerinin seçili modelleri yalnız kullanım nesnesi değil; tasarım dili, üretim dönemi, referans geçmişi ve ikinci el likiditesiyle koleksiyon değeri taşıyan varlıklardır. Bu değer her modelde aynı değildir; fakat doğru referans, doğru kondisyon ve doğru fiyatlama bir saatin ikinci hayatını belirler.</p>
              <p className="mt-5 max-w-xl text-sm leading-8 text-[#8f8780]">SAATCHI’nin yaklaşımı, “yatırım garantisi” vaat etmek değil; ürünün niteliklerini, geçmişini ve mevcut piyasa bağlamını mümkün olduğunca açık sunmaktır.</p>
            </div>
            <div className="border border-white/10 bg-[linear-gradient(145deg,#171413_0%,#11100f_58%,#1b0f11_100%)] p-8 sm:p-10">
              <div className="flex items-center gap-3 text-[#d1b36f]"><ShieldCheck className="h-5 w-5" strokeWidth={1.25} /><span className="text-[10px] font-semibold uppercase tracking-[0.24em]">Fiziksel kök · dijital disiplin</span></div>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.025em]">Menderes Caddesi No:231/B</h3>
              <p className="mt-4 text-sm leading-7 text-[#aaa29a]">Buca / İzmir showroom’da ürün inceleme, ikinci el değerlendirme, satış danışmanlığı ve teslim süreçleri için ekibimizle doğrudan görüşebilirsiniz.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/iletisim" className="inline-flex items-center justify-center gap-2 bg-[#f4f0e8] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#171311] transition-colors hover:bg-white">Showroom & İletişim <ArrowUpRight className="h-4 w-4" /></Link>
                <Link href="/elit-saat" className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e7dfd5] transition-colors hover:border-[#7f262b] hover:bg-[#7f262b]/10">Koleksiyonu Gör <Sparkles className="h-4 w-4" strokeWidth={1.2} /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
