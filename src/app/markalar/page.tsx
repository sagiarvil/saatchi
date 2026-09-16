import Link from 'next/link';
import { ArrowUpRight, Crown, Gem, Gauge, Layers3, Watch } from 'lucide-react';

const BRANDS = [
  { no: '01', name: 'Rolex', slug: 'rolex', eyebrow: 'Iconic references', note: 'Araç saatlerinden klasik modellere uzanan seçili referanslar.', Icon: Crown },
  { no: '02', name: 'Cartier', slug: 'cartier', eyebrow: 'Maison & design', note: 'Kuyumculuk çizgisini saat tasarımıyla buluşturan imza modeller.', Icon: Gem },
  { no: '03', name: 'TAG Heuer', slug: 'tag-heuer', eyebrow: 'Performance', note: 'Sportif karakter, kronograf geleneği ve modern İsviçre saatçiliği.', Icon: Gauge },
  { no: '04', name: 'Rado', slug: 'rado', eyebrow: 'Materials', note: 'Malzeme araştırması, çağdaş yüzeyler ve tasarım odaklı koleksiyon.', Icon: Layers3 },
  { no: '05', name: 'Tissot', slug: 'tissot', eyebrow: 'Swiss watchmaking', note: 'Günlük kullanım ile klasik İsviçre saat geleneğini birleştiren seçki.', Icon: Watch },
];

export default function MarkalarPage() {
  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f5f0e8]">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(111,31,37,.30),transparent_30%),radial-gradient(circle_at_10%_0%,rgba(194,167,104,.08),transparent_24%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[1fr_420px] lg:items-end lg:px-12">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b98284]">SAATCHI / Saat Evleri</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-6xl">Beş marka.<br />Beş farklı karakter.</h1>
          </div>
          <div className="border-l border-[#7f262b] pl-6">
            <p className="text-sm leading-7 text-[#aaa29a]">Koleksiyon, marka logolarını sıralamak yerine her saat evinin karakterini ayrı bir seçki olarak ele alır. Model ve referanslar stok, kondisyon ve temin durumuna göre değişebilir.</p>
            <Link href="/elit-saat" className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e4d8cb]">Tüm koleksiyonu gör <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16 lg:px-12">
        <div className="grid gap-3 lg:grid-cols-12">
          {BRANDS.map((brand, index) => {
            const Icon = brand.Icon;
            const wide = index < 2 ? 'lg:col-span-6' : 'lg:col-span-4';
            return (
              <Link key={brand.slug} href={`/markalar/${brand.slug}`} className={`group relative min-h-[280px] overflow-hidden border border-white/10 bg-[#121110] p-7 transition-all duration-700 hover:-translate-y-1 hover:border-[#7f262b]/70 hover:shadow-[0_28px_80px_rgba(0,0,0,.32)] sm:p-8 ${wide}`}>
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_80%_20%,rgba(111,31,37,.25),transparent_36%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between"><span className="text-[9px] tracking-[0.24em] text-[#6f6862]">{brand.no}</span><Icon className="h-5 w-5 text-[#8d7850] transition-transform duration-700 group-hover:scale-110 group-hover:text-[#c2a768]" strokeWidth={1.1} /></div>
                  <div className="mt-16">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#a67678]">{brand.eyebrow}</p>
                    <div className="mt-3 flex items-end justify-between gap-6"><div><h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl">{brand.name}</h2><p className="mt-4 max-w-sm text-sm leading-6 text-[#8f8780]">{brand.note}</p></div><ArrowUpRight className="h-5 w-5 shrink-0 text-[#6d6560] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c2a768]" /></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="mt-12 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8e6668]">Concierge seçimi</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.025em] sm:text-3xl">Belirli bir referans mı arıyorsunuz?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#8d857e]">Stokta görünmeyen veya özel olarak aradığınız model için doğrudan danışman ekibiyle görüşebilirsiniz.</p></div>
          <Link href="/iletisim" className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#e7dfd6] transition-colors hover:border-[#7f262b] hover:bg-[#7f262b]/10">Concierge ile görüş <ArrowUpRight className="h-4 w-4" /></Link>
        </section>
      </main>
    </div>
  );
}
