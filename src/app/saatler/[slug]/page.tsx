import Link from 'next/link';
import ZoomImage from '@/components/ZoomImage';
import WatchTechnicalPanel from '@/components/WatchTechnicalPanel';
import { getProxiedImageUrl } from '@/utils/imageProxy';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import { AlertCircle, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  let slugs = ['erkek', 'kadin', 'unisex'];
  const allWatches = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];
  const watchSlugs = allWatches
    .map((w: any) => String(w.seoUrl || '').split('/').pop())
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
  slugs = [...slugs, ...watchSlugs];
  return slugs.map((slug) => ({ slug }));
}

export default async function SaatlerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allWatches = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];

  const watch = allWatches.find((w: any) => String(w.seoUrl || '').includes(slug));
  if (!watch) {
    return <div className="flex min-h-[70vh] items-center justify-center bg-[#f6f3ef]"><h1 className="text-3xl font-medium text-[#171514]">Saat Bulunamadı</h1></div>;
  }

  const isElite = ['Rolex', 'Cartier', 'TAG Heuer', 'Rado'].includes(String(watch.brand || ''));

  const description = watch.description?.trim()
    ? watch.description
    : `${watch.modelName} için referans, kondisyon, kutu/belge kapsamı ve teknik bilgiler satış öncesinde ürün bazında teyit edilir.`;

  const waStokMessage = encodeURIComponent(`Merhaba, ${watch.brand} ${watch.modelName} için sipariş öncesi stok durumunu öğrenmek istiyorum.`);

  return (
    <div className="min-h-screen border-t border-[#e8e1d7] bg-[#f6f3ef] py-8 sm:py-12">
      <main className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8">
        <article className="rounded-[22px] border border-[#e5ddd2] bg-[#fffdfa] p-5 text-[#211d1a] shadow-[0_18px_60px_rgba(36,25,18,.06)] sm:p-7 lg:p-9">
          <nav className="mb-6 text-xs text-[#847b74]">
            <Link href="/" className="text-[#7f262b]">Ana Sayfa</Link> <span className="px-2">/</span>
            <Link href="/saatler" className="text-[#7f262b]">Saatler</Link> <span className="px-2">/</span>
            <span className="font-medium text-[#2a2522]">{watch.modelName}</span>
          </nav>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-[#ece6de] bg-white p-5">
              <ZoomImage src={getProxiedImageUrl(watch.image) || '/images/placeholder.jpg'} alt={watch.modelName} />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7f262b]">{watch.brand}</p>
              <h1 className="mt-3 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#171514] sm:text-4xl">{watch.modelName}</h1>
              <p className="mt-3 text-xs leading-6 text-[#7a716b]">Ref: {watch.ref || watch.id || 'Ürün bazında teyit'} · Kondisyon: {watch.condition || 'Ürün bazında teyit'}</p>
              <div className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-[#171514]">{watch.price}</div>

              {/* Elit saatler dışındaki modeller için belirgin stok sorunuz bandı */}
              {!isElite ? (
                <div className="mt-6 rounded-2xl border-2 border-[#b78a38]/80 bg-gradient-to-r from-[#fefbf6] via-[#fbf5e8] to-[#fbf0d9] p-5 shadow-[0_8px_24px_rgba(183,138,56,0.12)]">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#846b32]/15 text-[#846b32]">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#846b32] animate-pulse"></span>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#846b32]">
                          Lütfen Sipariş Öncesi Stok Sorunuz
                        </p>
                      </div>
                      <p className="mt-1.5 text-xs leading-5 text-[#5c4a22]">
                        Bu model için anlık stok, teslimat ve temin durumu sipariş öncesinde teyit edilmelidir. Lütfen satın alma / sipariş adımından önce WhatsApp hattımız üzerinden stok durumunu sorunuz.
                      </p>
                      <div className="mt-3">
                        <a
                          href={`https://wa.me/905419305372?text=${waStokMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#20ba59] transition-all hover:scale-[1.02]"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp ile Stok Sor
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 border-l-2 border-[#7f262b] bg-[#f7f1ed] px-5 py-4 text-sm leading-6 text-[#625a54]">
                  Ürün stok ve temin durumu satış öncesinde teyit edilir. Teknik özellikler katalogda kayıtlı değilse varsayım yapılmaz.
                </div>
              )}

              <p className="mt-6 text-sm leading-7 text-[#625a54]">{description}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Link href={`/odeme?slug=${slug}`} className="flex min-h-[52px] items-center justify-center bg-[#171514] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#7f262b]">Satın Al</Link>
                <a href={`https://wa.me/905419305372?text=${waStokMessage}`} target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] items-center justify-center border border-[#bcaea3] bg-white px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#382f2a] transition-colors hover:border-[#7f262b] hover:text-[#7f262b]">WhatsApp ile Stok Sor</a>
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
