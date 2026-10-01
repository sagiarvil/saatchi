import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const root = process.cwd();
  const elitePath = path.join(root, 'src/data/elit-saatler.json');
  const watchesPath = path.join(root, 'src/data/saatler.json');

  const elite = fs.existsSync(elitePath) ? JSON.parse(fs.readFileSync(elitePath, 'utf8')) : [];
  const watches = fs.existsSync(watchesPath) ? JSON.parse(fs.readFileSync(watchesPath, 'utf8')) : [];

  const allItems = [...elite, ...watches];
  const domain = 'https://saatchi.com.tr';
  const pubDate = new Date().toUTCString();

  let rss = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  rss += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">\n`;
  rss += `  <channel>\n`;
  rss += `    <title>SAATCHI &amp; CO. — Lüks Saat Koleksiyonu</title>\n`;
  rss += `    <link>${domain}</link>\n`;
  rss += `    <description>Rolex, Cartier, TAG Heuer, Rado ve dünyanın en seçkin İsviçre saat koleksiyonları. Orijinallik garantisi ve VIP teslimat ile SAATCHI'de.</description>\n`;
  rss += `    <language>tr-tr</language>\n`;
  rss += `    <lastBuildDate>${pubDate}</lastBuildDate>\n`;
  rss += `    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  // En son 50 lüks saati beslemeye ekle
  const feedItems = allItems.slice(0, 60);

  for (const item of feedItems) {
    const isElite = item.catalogTier === 'elite' || item.category === 'Elit Kategori';
    const slug = item.slug || item.id;
    const itemUrl = isElite ? `${domain}/elit-saat/${slug}` : `${domain}/saatler/${slug}`;
    const title = escapeXml(`${item.brand} - ${item.modelName}`);
    const priceText = item.price || (item.calculatedPrice ? `₺${Number(item.calculatedPrice).toLocaleString('tr-TR')}` : '');
    const desc = escapeXml(`${item.description || title} | Fiyat: ${priceText} | Durum: ${item.condition || 'Orijinal Kutulu Sertifikalı'}`);
    const imgUrl = item.image?.startsWith('http') ? item.image : `${domain}${item.image?.startsWith('/') ? '' : '/'}${item.image || ''}`;

    rss += `    <item>\n`;
    rss += `      <title>${title} (${escapeXml(priceText)})</title>\n`;
    rss += `      <link>${itemUrl}</link>\n`;
    rss += `      <guid isPermaLink="true">${itemUrl}</guid>\n`;
    rss += `      <pubDate>${pubDate}</pubDate>\n`;
    rss += `      <description>${desc}</description>\n`;
    if (item.image) {
      rss += `      <enclosure url="${escapeXml(imgUrl)}" type="image/jpeg" length="0" />\n`;
      rss += `      <media:content url="${escapeXml(imgUrl)}" medium="image" />\n`;
    }
    rss += `    </item>\n`;
  }

  rss += `  </channel>\n`;
  rss += `</rss>\n`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
