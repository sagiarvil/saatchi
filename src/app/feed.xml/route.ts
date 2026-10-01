import { NextResponse } from 'next/server';
import { generateRss2Xml } from '@/lib/feed-generator';

export async function GET() {
  const xml = generateRss2Xml();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
