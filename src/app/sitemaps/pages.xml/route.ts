import { NextResponse } from 'next/server';

export async function GET() {
  const BASE_URL = 'https://saatchi.com.tr';
  const routes = [
    '',
    '/kurumsal',
    '/iletisim',
    '/biz-kimiz',
    '/mesafeli-satis-sozlesmesi',
    '/on-bilgilendirme-formu'
  ];

  const xmlUrls = routes.map(route => {
    const url = `${BASE_URL}${route}`;
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
