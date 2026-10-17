import Link from 'next/link';
import type { Metadata } from 'next';
import ZoomImage from '@/components/ZoomImage';
import WatchTechnicalPanel from '@/components/WatchTechnicalPanel';
import elitSaatlerData from '@/data/elit-saatler.json';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import { getProxiedImageUrl } from '@/utils/imageProxy';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const allWatches = elitSaatlerData as any[];
  const isCategory = ['limited-edition', 'tourbillon', 'altin-kaplama', 'koleksiyon'].includes(slug);

  if (isCategory) {
    const title = slug === 'limited-edition' ? 'Limited Edition Lüks Saatler' : slug === 'tourbillon' ? 'Tourbillon Lüks Saat Koleksiyonu' : slug === 'koleksiyon' ? 'Elit Lüks Saat Koleksiyonu' : 'Altın & Pırlanta Lüks Saatler';
    return {
      title: `${title} | SAATCHI`,
      description: `${title}. Rolex, Cartier, TAG Heuer bağımsız ekspertiz onaylı, sertifikalı ve VIP teslimatlı seçkin modeller.`,
      alternates: { canonical: `https://saatchi.com.tr/elit-saat/${slug}` },
      openGraph: {
        title: `${title} | SAATCHI`,
        description: `${title}. Rolex, Cartier, TAG Heuer bağımsız ekspertiz onaylı, sertifikalı ve VIP teslimatlı seçkin modeller.`,
        url: `https://saatchi.com.tr/elit-saat/${slug}`,
        siteName: 'SAATCHI',
      }
    };
  }

  const watch = allWatches.find((w: any) => String(w.seoUrl || '').includes(slug));
  if (!watch) {
    return { title: 'Saat Bulunamadı | SAATCHI' };
  }

  const title = `${watch.brand} ${watch.modelName} | SAATCHI`;
  const desc = `${watch.brand} ${watch.modelName} lüks kol saati. Orijinallik sertifikası, bağımsız ekspertiz onayı ve tam değer sigortalı VIP kurye teslimatıyla Saatchi'de.`;

  return {
    title,
    description: desc,
    alternates: { canonical: `https://saatchi.com.tr/elit-saat/${slug}` },
    openGraph: {
      title,
      description: desc,
      url: `https://saatchi.com.tr/elit-saat/${slug}`,
      siteName: 'SAATCHI',
      images: watch.image ? [{ url: watch.image.startsWith('http') ? watch.image : `https://saatchi.com.tr${watch.image.startsWith('/') ? '' : '/'}${watch.image}` }] : [],
    }
  };
}

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

  const waMessage = encodeURIComponent(`Merhaba, ${watch.brand} ${watch.modelName} (Ref: ${watch.ref || watch.id || ''}) hakkında detaylı bilgi ve teslimat sürecini öğrenmek istiyorum.`);

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://saatchi.com.tr/elit-saat/${slug}#product`,
        "name": `${watch.brand} ${watch.modelName}`,
        "description": description,
        "image": watch.image ? (watch.image.startsWith('http') ? watch.image : `https://saatchi.com.tr${watch.image.startsWith('/') ? '' : '/'}${watch.image}`) : "https://saatchi.com.tr/logo.png",
        "brand": {
          "@type": "Brand",
          "name": watch.brand
        },
        "offers": {
          "@type": "Offer",
          "url": `https://saatchi.com.tr/elit-saat/${slug}`,
          "priceCurrency": "TRY",
          "price": Number(watch.calculatedPrice || 0) > 0 ? Number(watch.calculatedPrice) : 500000,
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/UsedCondition",
          "seller": {
            "@type": "Organization",
            "name": "SAATCHI",
            "url": "https://saatchi.com.tr"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://saatchi.com.tr/elit-saat/${slug}#breadcrumb`,
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
            "name": "Elit Koleksiyon",
            "item": "https://saatchi.com.tr/elit-saat"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": watch.modelName,
            "item": `https://saatchi.com.tr/elit-saat/${slug}`
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
                <Link href={`/odeme?slug=${slug}`} className="flex min-h-[52px] items-center justify-center rounded-md bg-[#171514] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#7f262b]">Satın Al</Link>
                <a href={`https://wa.me/905419305372?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] items-center justify-center rounded-md border border-[#bcaea3] bg-white px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#382f2a] transition-colors hover:border-[#7f262b] hover:text-[#7f262b]">VIP WhatsApp</a>
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
              href={`https://wa.me/905419305372?text=${waMessage}`}
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
