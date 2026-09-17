import { NextResponse } from 'next/server';
import saatlerData from '@/data/saatler.json';

export async function GET() {
  const BASE_URL = 'https://saatchi.watch';
  
  // Prepend root /saatler
  const rootUrl = `${BASE_URL}/saatler`;
  let xmlUrls = `  <url>
    <loc>${rootUrl}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${rootUrl}" />
    <xhtml:link rel="alternate" hreflang="tr" href="${rootUrl}" />
  </url>\n`;

  // Only index valid items
  const validWatches = (saatlerData as any[]).filter(w => w.seoUrl && Number(w.calculatedPrice || 0) <= 1700000);

  xmlUrls += validWatches.map(watch => {
    const slug = String(watch.seoUrl).split('/').pop();
    const url = `${BASE_URL}/saatler/${slug}`;
    return `  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />
    <xhtml:link rel="alternate" hreflang="tr" href="${url}" />
  </url>`;
  }).join('\n');

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
