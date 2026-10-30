import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import { getProxiedImageUrl } from '@/utils/imageProxy';
import CartierFilterClient from '@/components/cartier/CartierFilterClient';
import UniversalTopFilterClient from '@/components/shared/UniversalTopFilterClient';

const MAX_CATALOG_PRICE = 1_700_000;
const ELITE_BRANDS = new Set(['Cartier', 'TAG Heuer', 'Rado']);
const NO_CAP_BRANDS = new Set(['Cartier']);

function brandSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function allowedCatalog() {
  return [...(saatlerData as any[]), ...(elitSaatlerData as any[])].filter((watch) => {
    const brand = String(watch.brand || '');
    const price = Number(watch.calculatedPrice || 0);
    if (price <= 0) return false;
    return price <= MAX_CATALOG_PRICE;
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brandWatches = allowedCatalog().filter((watch) => watch.brand && brandSlug(String(watch.brand)) === slug);
  const brandName = brandWatches.length > 0 ? String(brandWatches[0].brand) : slug.toUpperCase();

  const title = `${brandName} Saat Modelleri & Koleksiyonu | SAATCHI`;
  const desc = `Sertifikalı ${brandName} kol saatleri. Küresel borsa endeksli şeffaf fiyatlar, bağımsız ekspertiz garantisi ve tam değer sigortalı VIP teslimatla.`;

  return {
    title,
    description: desc,
    alternates: { canonical: `https://saatchi.com.tr/markalar/${slug}` },
    openGraph: {
      title,
      description: desc,
      url: `https://saatchi.com.tr/markalar/${slug}`,
      siteName: 'SAATCHI',
    }
  };
}

export async function generateStaticParams() {
  const brandsSet = new Set<string>();
  allowedCatalog().forEach((watch) => {
    if (watch.brand) brandsSet.add(brandSlug(String(watch.brand)));
  });
  return Array.from(brandsSet).map((slug) => ({ slug }));
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brandWatches = allowedCatalog().filter((watch) => watch.brand && brandSlug(String(watch.brand)) === slug);
  const brandName = brandWatches.length > 0 ? String(brandWatches[0].brand) : slug.toUpperCase();
  const tierLabel = ELITE_BRANDS.has(brandName) ? 'Elit Kategori · 2. El' : 'Saat Koleksiyonu';

  const brandSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://saatchi.com.tr/markalar/${slug}#webpage`,
        "url": `https://saatchi.com.tr/markalar/${slug}`,
        "name": `${brandName} Saat Koleksiyonu`,
        "description": `Sertifikalı ${brandName} kol saatleri. Küresel borsa endeksli şeffaf fiyatlar ve tam değer sigortalı VIP teslimat.`,
        "inLanguage": "tr-TR"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://saatchi.com.tr/markalar/${slug}#breadcrumb`,
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
            "name": "Markalar",
            "item": "https://saatchi.com.tr/markalar"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": brandName,
            "item": `https://saatchi.com.tr/markalar/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-background min-h-screen py-14 md:py-20 border-t border-surface-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary text-center">SAATCHI / {tierLabel}</p>
        <div className="flex items-center justify-center gap-3 mt-3 mb-4 flex-wrap">
          <h1 className="text-3xl md:text-5xl font-serif text-foreground uppercase tracking-[0.16em] text-center">{brandName}</h1>
          {ELITE_BRANDS.has(brandName) && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#1C1917] border border-[#C5A059]/40 px-3 py-1 rounded-full shadow-xs">2. El</span>
          )}
        </div>

        {brandWatches.length === 0 ? (
          <div className="text-center text-foreground/50 py-20">Bu marka için kaynak fiyatı doğrulanmış aktif model bulunamadı.</div>
        ) : slug === 'cartier' ? (
          <div className="mt-8">
            <CartierFilterClient initialWatches={brandWatches} />
          </div>
        ) : (
          <div className="mt-8">
            <UniversalTopFilterClient initialWatches={brandWatches} isBrandPage={true} />
          </div>
        )}
      </div>
    </div>
  );
}
