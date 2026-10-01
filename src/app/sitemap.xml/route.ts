import { NextResponse } from 'next/server';
import { generateSitemapXml } from '@/lib/feed-generator';

export async function GET() {
  const xml = generateSitemapXml();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
