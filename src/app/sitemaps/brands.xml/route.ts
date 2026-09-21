import { NextResponse } from 'next/server';
import saatlerData from '@/data/saatler.json';
import elitSaatlerData from '@/data/elit-saatler.json';

const MAX_CATALOG_PRICE = 1700000;

function brandSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function GET() {
  const BASE_URL = 'https://saatchi.com.tr';
  
  const rootUrl = `${BASE_URL}/markalar`;
  let xmlUrls = `  <url>
    <loc>${rootUrl}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${rootUrl}" />
    <xhtml:link rel="alternate" hreflang="tr" href="${rootUrl}" />
  </url>\n`;

  const allWatches = [...(saatlerData as any[]), ...(elitSaatlerData as any[])].filter(w => 
    Number(w.calculatedPrice || 0) > 0 && Number(w.calculatedPrice || 0) <= MAX_CATALOG_PRICE
  );

  const brandsSet = new Set<string>();
  allWatches.forEach(w => {
    if (w.brand) brandsSet.add(brandSlug(String(w.brand)));
  });

  xmlUrls += Array.from(brandsSet).map(slug => {
    const url = `${BASE_URL}/markalar/${slug}`;
    return `  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />
    <xhtml:link rel="alternate" hreflang="tr" href="${url}" />
  </url>`;
  }).join('\n');

  // Add Carren specific
  const carrenUrls = [
    `${BASE_URL}/markalar/carren/erkek`,
    `${BASE_URL}/markalar/carren/kadin`
  ];
  
  xmlUrls += '\n' + carrenUrls.map(url => `  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />
    <xhtml:link rel="alternate" hreflang="tr" href="${url}" />
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlUrls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=300, must-revalidate'
    }
  });
}
