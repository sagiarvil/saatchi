import Link from 'next/link';
import Image from 'next/image';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';
import { getProxiedImageUrl } from '@/utils/imageProxy';
import CartierFilterClient from '@/components/cartier/CartierFilterClient';
import UniversalTopFilterClient from '@/components/shared/UniversalTopFilterClient';

const MAX_CATALOG_PRICE = 1_700_000;
const MAX_ROLEX_PRICE = 2_000_000;
const ELITE_BRANDS = new Set(['Rolex', 'Cartier', 'TAG Heuer', 'Rado']);
const NO_CAP_BRANDS = new Set(['Rolex', 'Cartier']);

function brandSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function allowedCatalog() {
  return [...(saatlerData as any[]), ...(elitSaatlerData as any[])].filter((watch) => {
    const brand = String(watch.brand || '');
    const price = Number(watch.calculatedPrice || 0);
    if (price <= 0) return false;
    const maxLimit = brand === 'Rolex' ? MAX_ROLEX_PRICE : MAX_CATALOG_PRICE;
    return price <= maxLimit;
  });
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
  const tierLabel = ELITE_BRANDS.has(brandName) ? 'Elit Kategori' : 'Saat Kategorisi';

  return (
    <div className="bg-background min-h-screen py-14 md:py-20 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary text-center">SAATCHI / {tierLabel}</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.16em] text-center">{brandName}</h1>

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
