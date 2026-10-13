import Link from 'next/link';
import type { Metadata } from 'next';
import ZoomImage from '@/components/ZoomImage';
import WatchTechnicalPanel from '@/components/WatchTechnicalPanel';
import { getProxiedImageUrl } from '@/utils/imageProxy';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import { AlertCircle, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const allWatches = [...(saatlerData as any[]), ...(elitSaatlerData as any[])];

  if (['erkek', 'kadin', 'unisex'].includes(slug)) {
    const title = slug === 'kadin' ? 'Kadın Kol Saatleri' : slug === 'erkek' ? 'Erkek Kol Saatleri' : 'Unisex Kol Saatleri';
    return {
      title: `${title} | Saatchi & Co.`,
      description: `${title} koleksiyonu. Seçkin İsviçre ve lüks saat modelleri, %100 orijinallik garantisi ve VIP teslimat ayrıcalığıyla.`,
      alternates: { canonical: `https://saatchi.com.tr/saatler/${slug}` },
      openGraph: {
        title: `${title} | Saatchi & Co.`,
        description: `${title} koleksiyonu. Seçkin İsviçre ve lüks saat modelleri, %100 orijinallik garantisiyle.`,
        url: `https://saatchi.com.tr/saatler/${slug}`,
        siteName: 'SAATCHI & CO.',
      }
    };
  }

  const watch = allWatches.find((w: any) => String(w.seoUrl || '').includes(slug));
  if (!watch) {
    return { title: 'Saat Bulunamadı | Saatchi & Co.' };
  }

  const title = `${watch.brand} ${watch.modelName} | Saatchi & Co.`;
  const desc = `${watch.brand} ${watch.modelName} kol saati. Orijinallik garantisi, sertifikalı ekspertiz onayı ve tam değer sigortalı VIP teslimatla Saatchi'de.`;

  return {
    title,
    description: desc,
    alternates: { canonical: `https://saatchi.com.tr/saatler/${slug}` },
    openGraph: {
      title,
      description: desc,
      url: `https://saatchi.com.tr/saatler/${slug}`,
      siteName: 'SAATCHI & CO.',
      images: watch.image ? [{ url: watch.image.startsWith('http') ? watch.image : `https://saatchi.com.tr${watch.image.startsWith('/') ? '' : '/'}${watch.image}` }] : [],
    }
  };
}

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

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://saatchi.com.tr/saatler/${slug}#product`,
        "name": `${watch.brand} ${watch.modelName}`,
        "description": description,
        "image": watch.image ? (watch.image.startsWith('http') ? watch.image : `https://saatchi.com.tr${watch.image.startsWith('/') ? '' : '/'}${watch.image}`) : "https://saatchi.com.tr/logo.png",
        "brand": {
          "@type": "Brand",
          "name": watch.brand
        },
        "offers": {
          "@type": "Offer",
          "url": `https://saatchi.com.tr/saatler/${slug}`,
          "priceCurrency": "TRY",
          "price": Number(watch.calculatedPrice || 0) > 0 ? Number(watch.calculatedPrice) : 19990,
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "Saatchi & Co.",
            "url": "https://saatchi.com.tr"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://saatchi.com.tr/saatler/${slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Ana Sayfa",
            "item": "https://saatchi.com.tr/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Saatler",
            "item": "https://saatchi.com.tr/saatler"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": watch.modelName,
            "item": `https://saatchi.com.tr/saatler/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen border-t border-[#e8e1d7] bg-[#f6f3ef] py-8 sm:py-12 pb-28 md:pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
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
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#20ba59] transition-all hover:scale-[1.02]"
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
                <Link href={`/odeme?slug=${slug}`} className="flex min-h-[52px] items-center justify-center rounded-md bg-[#171514] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#7f262b]">Satın Al</Link>
                <a href={`https://wa.me/905419305372?text=${waStokMessage}`} target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] items-center justify-center rounded-md border border-[#bcaea3] bg-white px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#382f2a] transition-colors hover:border-[#7f262b] hover:text-[#7f262b]">WhatsApp ile Stok Sor</a>
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

      {/* MOBİL CONVERSION-FIRST STICKY ACTION BAR (SADECE MOBİL) */}
      <aside aria-label="Hızlı Sipariş ve Danışmanlık" className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#846b32]/35 bg-[#141211]/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#c9ad68] truncate">{watch.brand}</p>
            <p className="text-base font-bold tracking-tight text-white">{watch.price}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`https://wa.me/905419305372?text=${waStokMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Danışmanı"
              className="flex h-[46px] items-center justify-center rounded-lg bg-[#25D366] px-3.5 text-xs font-bold text-white shadow-md active:scale-95 transition-all"
            >
              <MessageCircle className="h-4 w-4 mr-1.5" />
              <span>WhatsApp</span>
            </a>
            <Link
              href={`/odeme?slug=${slug}`}
              className="flex h-[46px] items-center justify-center rounded-lg bg-white px-5 text-xs font-bold uppercase tracking-wider text-[#171514] shadow-md hover:bg-[#e8e2d5] active:scale-95 transition-all"
            >
              Satın Al
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
