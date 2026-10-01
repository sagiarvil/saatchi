import { NextResponse } from 'next/server';
import { generateAtomXml } from '@/lib/feed-generator';

export async function GET() {
  const xml = generateAtomXml();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
