import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing url parameter', { status: 400 });

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Saatchi/1.0',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch image: ${response.status}`, { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    
    // Create new headers, omitting any restrictive CORS/CORP headers from the original response
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    
    return new NextResponse(buffer, { headers });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Internal Server Error fetching image', { status: 500 });
  }
}
