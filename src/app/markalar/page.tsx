import Link from 'next/link';
import { ArrowUpRight, Crown, Gem, Gauge, Layers3, Watch, Sparkles, CircleDot, Clock3, ChevronRight } from 'lucide-react';

const ELITE_BRANDS = [
  { no: '01', name: 'Rolex', slug: 'rolex', eyebrow: 'Elite / Iconic references', note: 'Oyster, Datejust, GMT-Master II ve seçili ikonik referanslar.', Icon: Crown },
  { no: '02', name: 'Cartier', slug: 'cartier', eyebrow: 'Elite / Maison & design', note: 'Tank, Santos ve Cartier tasarım dilini taşıyan seçili modeller.', Icon: Gem },
  { no: '03', name: 'TAG Heuer', slug: 'tag-heuer', eyebrow: 'Elite / Performance', note: 'Formula 1, Aquaracer, Carrera ve Monaco çizgisinden kaynak katalog.', Icon: Gauge },
  { no: '04', name: 'Rado', slug: 'rado', eyebrow: 'Elite / Materials', note: 'Centrix, DiaStar ve modern malzeme yaklaşımını taşıyan seçkiler.', Icon: Layers3 },
];

const WATCH_BRANDS = [
  { no: '05', name: 'Tissot', slug: 'tissot', eyebrow: 'Swiss watchmaking', note: 'PRX, Seastar, Le Locle, Gentleman ve günlük İsviçre saatçiliği.', Icon: Watch },
  { no: '06', name: 'Carren', slug: 'carren', eyebrow: 'Men / Women', note: 'Erkek ve Kadın alt koleksiyonlarıyla ayrı katalog yapısı.', Icon: Clock3 },
  { no: '07', name: 'Calvin Klein', slug: 'calvin-klein', eyebrow: 'Contemporary', note: 'Minimal, modern ve günlük kullanıma odaklı saat seçkisi.', Icon: CircleDot },
  { no: '08', name: 'Michael Kors', slug: 'michael-kors', eyebrow: 'Fashion watch', note: 'Moda odaklı metal, kronograf ve taş detaylı koleksiyon.', Icon: Sparkles },
  { no: '09', name: 'Versace', slug: 'versace', eyebrow: 'Italian luxury', note: 'Medusa imzası ve güçlü İtalyan tasarım diliyle saat seçkisi.', Icon: Gem },
];

function BrandCard({ brand, dense = false }: { brand: (typeof ELITE_BRANDS)[number] | (typeof WATCH_BRANDS)[number]; dense?: boolean }) {
  const Icon = brand.Icon;
  return (
    <Link href={`/markalar/${brand.slug}`} className={`group relative overflow-hidden border border-white/10 bg-[#121110] transition-all duration-700 hover:-translate-y-1 hover:border-[#7f262b]/70 hover:shadow-[0_28px_80px_rgba(0,0,0,.32)] ${dense ? 'min-h-[250px] p-6 sm:p-7' : 'min-h-[310px] p-7 sm:p-8'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(111,31,37,.25),transparent_34%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between"><span className="text-[9px] tracking-[0.24em] text-[#6f6862]">{brand.no}</span><Icon className="h-5 w-5 text-[#8d7850] transition-all duration-700 group-hover:scale-110 group-hover:text-[#c2a768]" strokeWidth={1.1} /></div>
        <div className={dense ? 'mt-12' : 'mt-20'}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#a67678]">{brand.eyebrow}</p>
          <div className="mt-3 flex items-end justify-between gap-6">
            <div><h2 className={`${dense ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'} font-medium tracking-[-0.035em]`}>{brand.name}</h2><p className="mt-4 max-w-sm text-sm leading-6 text-[#8f8780]">{brand.note}</p></div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-[#6d6560] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c2a768]" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MarkalarPage() {
  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f5f0e8]">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(111,31,37,.30),transparent_30%),radial-gradient(circle_at_10%_0%,rgba(194,167,104,.08),transparent_24%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[1fr_420px] lg:items-end lg:px-12">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b98284]">SAATCHI / Saat Evleri</p><h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-6xl">Elite ve Saat.<br />Tek marka evinde iki ayrı dünya.</h1></div>
          <div className="border-l border-[#7f262b] pl-6"><p className="text-sm leading-7 text-[#aaa29a]">Rolex, Cartier, TAG Heuer ve Rado Elit Kategori altında; Tissot, Carren, Calvin Klein, Michael Kors ve Versace Saat kategorisinde konumlanır. Katalog fiyatları doğrulanmış kaynak veriye göre güncellenir.</p><Link href="/elit-saat" className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e4d8cb]">Elit koleksiyona geç <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16 lg:px-12">
        <section>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[#a87678]">01 / Elite</p><h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">Elit Kategori</h2></div><Link href="/elit-saat" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7cec5]">Tüm Elite saatler <ChevronRight className="h-4 w-4" /></Link></div>
          <div className="grid gap-3 lg:grid-cols-2">{ELITE_BRANDS.map((brand) => <BrandCard key={brand.slug} brand={brand} />)}</div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[#a87678]">02 / Saat</p><h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">Saat Kategorisi</h2></div><Link href="/saatler" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7cec5]">Tüm saatler <ChevronRight className="h-4 w-4" /></Link></div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
            {WATCH_BRANDS.map((brand, index) => <div key={brand.slug} className={index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}><BrandCard brand={brand} dense /></div>)}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/markalar/carren/erkek" className="group flex min-h-[74px] items-center justify-between border border-white/10 bg-[#151312] px-5 text-sm text-[#e4dcd4] transition-colors hover:border-[#7f262b]/70"><span>Carren Erkek</span><ArrowUpRight className="h-4 w-4 text-[#806f68] group-hover:text-[#c2a768]" /></Link>
            <Link href="/markalar/carren/kadin" className="group flex min-h-[74px] items-center justify-between border border-white/10 bg-[#151312] px-5 text-sm text-[#e4dcd4] transition-colors hover:border-[#7f262b]/70"><span>Carren Kadın</span><ArrowUpRight className="h-4 w-4 text-[#806f68] group-hover:text-[#c2a768]" /></Link>
          </div>
        </section>

        <section className="mt-14 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8e6668]">Katalog standardı</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.025em] sm:text-3xl">Kaynak doğrulamalı fiyat. Katalog tavanı 1.799.000 TL.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#8d857e]">Kaynakta fiyatı doğrulanamayan ürün yayınlanmaz. Katalog tavanının üzerindeki modeller otomatik olarak listeden çıkarılır.</p></div><Link href="/iletisim" className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#e7dfd6] transition-colors hover:border-[#7f262b] hover:bg-[#7f262b]/10">Concierge ile görüş <ArrowUpRight className="h-4 w-4" /></Link></section>
      </main>
    </div>
  );
}
