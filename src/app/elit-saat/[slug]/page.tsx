import Link from 'next/link';
import ZoomImage from '@/components/ZoomImage';
import WatchTechnicalPanel from '@/components/WatchTechnicalPanel';
import elitSaatlerData from '@/data/elit-saatler.json';
import { ShieldCheck } from 'lucide-react';
import { getProxiedImageUrl } from '@/utils/imageProxy';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  let slugs = ['limited-edition', 'tourbillon', 'altin-kaplama', 'koleksiyon'];
  const watches = elitSaatlerData as any[];
  const watchSlugs = watches
    .map((w: any) => String(w.seoUrl || '').split('/').pop())
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
  slugs = [...slugs, ...watchSlugs];
  return slugs.map((slug) => ({ slug }));
}

export default async function ElitSaatDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isCategory = ['limited-edition', 'tourbillon', 'altin-kaplama', 'koleksiyon'].includes(slug);
  const allWatches = elitSaatlerData as any[];

  if (isCategory) {
    let filteredWatches = allWatches;
    if (slug === 'tourbillon') {
      filteredWatches = allWatches.filter((w) => String(w.modelName || '').toLowerCase().includes('tourbillon') || String(w.description || '').toLowerCase().includes('tourbillon'));
      if (!filteredWatches.length) filteredWatches = allWatches.slice(0, 12);
    } else if (slug === 'altin-kaplama') {
      filteredWatches = allWatches.filter((w) => /altın|gold|rose/i.test(String(w.modelName || '')));
      if (!filteredWatches.length) filteredWatches = allWatches.slice(0, 12);
    } else if (slug === 'koleksiyon') {
      filteredWatches = [...allWatches];
    }

    const categoryTitle = slug === 'limited-edition' ? 'Limited Edition' : slug === 'tourbillon' ? 'Tourbillon Koleksiyonu' : slug === 'koleksiyon' ? 'Elit Koleksiyon' : 'Altın / Pırlanta Serisi';

    return (
      <div className="min-h-screen border-t border-white/10 bg-[#0d0c0b] py-16 text-[#f5f0e8]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a87678]">SAATCHI / Curated Watches</p>
          <h1 className="mt-4 text-center text-4xl font-medium tracking-[-0.04em] sm:text-5xl">{categoryTitle}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-[#948c85]">Seçili referanslar, kondisyon ve temin durumuna göre güncellenen özel koleksiyon.</p>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {filteredWatches.slice(0, 24).map((watch, idx) => {
              const watchSlug = String(watch.seoUrl || '').split('/').pop();
              return (
                <Link href={`/elit-saat/${watchSlug}`} key={`${watch.id || idx}`} className="group overflow-hidden border border-white/10 bg-[#121110] transition-all duration-500 hover:-translate-y-1 hover:border-[#7f262b]/70 hover:shadow-[0_24px_70px_rgba(0,0,0,.35)]">
                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-white p-5">
                    <div className="absolute left-4 top-4 z-10 border border-[#c2a768]/30 bg-black/80 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#c2a768]">ELİT</div>
                    {watch.image ? <img src={getProxiedImageUrl(watch.image)} alt={watch.modelName} loading="lazy" decoding="async" className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" /> : <ShieldCheck className="h-9 w-9 text-[#c2a768]/50" strokeWidth={1} />}
                  </div>
                  <div className="p-5 text-center">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#a87678]">{watch.brand}</p>
                    <h2 className="mt-2 min-h-[42px] text-sm leading-6 text-[#f0eae3]">{watch.modelName}</h2>
                    <div className="mx-auto my-4 h-px w-10 bg-white/10 transition-all duration-500 group-hover:w-16 group-hover:bg-[#7f262b]" />
                    <p className="text-base font-medium text-white">{watch.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const watch = allWatches.find((w: any) => String(w.seoUrl || '').includes(slug));
  if (!watch) {
    return <div className="flex min-h-[70vh] items-center justify-center bg-[#f6f3ef]"><h1 className="text-3xl font-medium text-[#171514]">Saat Bulunamadı</h1></div>;
  }

  const description = watch.description?.trim()
    ? watch.description
    : `${watch.modelName} için referans, kondisyon, kutu/belge kapsamı ve teknik bilgiler satış öncesinde ürün bazında teyit edilir.`;

  return (
    <div className="min-h-screen border-t border-[#e8e1d7] bg-[#f6f3ef] py-8 sm:py-12">
      <main className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8">
        <article className="rounded-[22px] border border-[#e5ddd2] bg-[#fffdfa] p-5 text-[#211d1a] shadow-[0_18px_60px_rgba(36,25,18,.06)] sm:p-7 lg:p-9">
          <nav className="mb-6 text-xs text-[#847b74]">
            <Link href="/" className="text-[#7f262b]">Ana Sayfa</Link> <span className="px-2">/</span>
            <Link href="/elit-saat" className="text-[#7f262b]">Elit Koleksiyon</Link> <span className="px-2">/</span>
            <span className="font-medium text-[#2a2522]">{watch.modelName}</span>
          </nav>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-[#ece6de] bg-white p-5">
              {watch.image ? <ZoomImage src={getProxiedImageUrl(watch.image)} alt={watch.modelName} /> : null}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7f262b]">{watch.brand}</p>
              <h1 className="mt-3 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#171514] sm:text-4xl">{watch.modelName}</h1>
              <p className="mt-3 text-xs leading-6 text-[#7a716b]">Ref: {watch.ref || watch.id || 'Ürün bazında teyit'} · Kondisyon: {watch.condition || 'Ürün bazında teyit'}</p>
              <div className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-[#171514]">{watch.price}</div>

              <div className="mt-6 border-l-2 border-[#7f262b] bg-[#f7f1ed] px-5 py-4 text-sm leading-6 text-[#625a54]">
                Özel koleksiyon ürünlerinde stok, temin ve teslim kapsamı işlem öncesinde teyit edilir. Teknik veri katalogda yoksa varsayım yapılmaz.
              </div>

              <p className="mt-6 text-sm leading-7 text-[#625a54]">{description}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Link href={`/odeme?slug=${slug}`} className="flex min-h-[52px] items-center justify-center bg-[#171514] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#7f262b]">Satın Al</Link>
                <a href="https://wa.me/905419305372" target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] items-center justify-center border border-[#bcaea3] bg-white px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#382f2a] transition-colors hover:border-[#7f262b] hover:text-[#7f262b]">WhatsApp</a>
              </div>
            </div>
          </div>

          <WatchTechnicalPanel watch={watch} />

          <div className="mt-6 rounded-2xl border border-[#e5ddd2] bg-[#f8f4ef] p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7f262b]">Satın alma notu</p>
            <p className="mt-2 text-sm leading-6 text-[#665e58]">Fiyat, stok ve temin bilgileri piyasa koşullarına göre değişebilir. Nihai ürün kapsamı, teslim yöntemi ve varsa garanti/sertifika detayları ödeme öncesinde yazılı olarak teyit edilir.</p>
          </div>
        </article>
      </main>
    </div>
  );
}
