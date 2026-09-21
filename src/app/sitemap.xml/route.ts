import { NextResponse } from 'next/server';

export async function GET() {
  const BASE_URL = 'https://saatchi.com.tr';
  
  // A sitemapindex should ideally have lastmod. 
  // We use the current date (start of day) to avoid constant cache invalidation 
  // but ensure Google sees it as fresh.
  const dateStr = new Date().toISOString().split('T')[0];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemaps/pages.xml</loc>
    <lastmod>${dateStr}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemaps/watches.xml</loc>
    <lastmod>${dateStr}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemaps/elite.xml</loc>
    <lastmod>${dateStr}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemaps/brands.xml</loc>
    <lastmod>${dateStr}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=300, must-revalidate'
    }
  });
}
