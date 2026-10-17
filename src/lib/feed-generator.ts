import fs from 'node:fs';
import path from 'node:path';

export interface WatchItem {
  id: string;
  brand: string;
  modelName: string;
  calculatedPrice: number;
  price?: string;
  seoUrl?: string;
  slug?: string;
  image?: string;
  category?: string;
  condition?: string;
  description?: string;
  catalogTier?: string;
}

export const DOMAIN = 'https://saatchi.com.tr';

export function escapeXml(unsafe: string): string {
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

export function loadAllWatches(): { elite: WatchItem[]; watches: WatchItem[]; all: WatchItem[] } {
  const root = process.cwd();
  const elitePath = path.join(root, 'src/data/elit-saatler.json');
  const watchesPath = path.join(root, 'src/data/saatler.json');

  const elite: WatchItem[] = fs.existsSync(elitePath) ? JSON.parse(fs.readFileSync(elitePath, 'utf8')) : [];
  const watches: WatchItem[] = fs.existsSync(watchesPath) ? JSON.parse(fs.readFileSync(watchesPath, 'utf8')) : [];
  return { elite, watches, all: [...elite, ...watches] };
}

export function getWatchUrl(item: WatchItem): string {
  const isElite = item.catalogTier === 'elite' || item.category === 'Elit Kategori';
  const slug = item.slug || item.id;
  return isElite ? `${DOMAIN}/elit-saat/${slug}` : `${DOMAIN}/saatler/${slug}`;
}

export function getWatchImageUrl(item: WatchItem): string {
  if (!item.image) return `${DOMAIN}/logo.png`;
  return item.image.startsWith('http') ? item.image : `${DOMAIN}${item.image.startsWith('/') ? '' : '/'}${item.image}`;
}

// 1. RSS 2.0 GENERATOR
export function generateRss2Xml(): string {
  const { all } = loadAllWatches();
  const pubDate = new Date().toUTCString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">\n`;
  xml += `  <channel>\n`;
  xml += `    <title>SAATCHI &amp; CO. — Lüks Saat Koleksiyonu</title>\n`;
  xml += `    <link>${DOMAIN}</link>\n`;
  xml += `    <description>Rolex, Cartier, TAG Heuer, Rado ve dünyanın en seçkin İsviçre saat koleksiyonları. Orijinallik garantisi ve VIP teslimat ile SAATCHI'de.</description>\n`;
  xml += `    <language>tr-tr</language>\n`;
  xml += `    <lastBuildDate>${pubDate}</lastBuildDate>\n`;
  xml += `    <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  for (const item of all.slice(0, 100)) {
    const itemUrl = getWatchUrl(item);
    const imgUrl = getWatchImageUrl(item);
    const title = escapeXml(`${item.brand} - ${item.modelName}`);
    const priceText = item.price || (item.calculatedPrice ? `₺${Number(item.calculatedPrice).toLocaleString('tr-TR')}` : '');
    const desc = escapeXml(`${item.description || title} | Fiyat: ${priceText} | Durum: ${item.condition || 'Orijinal Kutulu Sertifikalı'}`);

    xml += `    <item>\n`;
    xml += `      <title>${title} (${escapeXml(priceText)})</title>\n`;
    xml += `      <link>${itemUrl}</link>\n`;
    xml += `      <guid isPermaLink="true">${itemUrl}</guid>\n`;
    xml += `      <pubDate>${pubDate}</pubDate>\n`;
    xml += `      <description>${desc}</description>\n`;
    if (item.image) {
      xml += `      <enclosure url="${escapeXml(imgUrl)}" type="image/jpeg" length="0" />\n`;
      xml += `      <media:content url="${escapeXml(imgUrl)}" medium="image" />\n`;
    }
    xml += `    </item>\n`;
  }

  xml += `  </channel>\n`;
  xml += `</rss>\n`;
  return xml;
}

// 2. ATOM 1.0 (RFC 4287) GENERATOR
export function generateAtomXml(): string {
  const { all } = loadAllWatches();
  const updated = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="utf-8"?>\n`;
  xml += `<feed xmlns="http://www.w3.org/2005/Atom">\n`;
  xml += `  <title>SAATCHI &amp; CO. — Lüks Saat Akışı</title>\n`;
  xml += `  <subtitle>Dünyanın en seçkin lüks ve elit saat koleksiyonları. Orijinallik garantisi ve küresel referans fiyatları.</subtitle>\n`;
  xml += `  <link href="${DOMAIN}/atom.xml" rel="self" type="application/atom+xml" />\n`;
  xml += `  <link href="${DOMAIN}" rel="alternate" type="text/html" />\n`;
  xml += `  <id>${DOMAIN}/</id>\n`;
  xml += `  <updated>${updated}</updated>\n`;
  xml += `  <author>\n`;
  xml += `    <name>SAATCHI</name>\n`;
  xml += `    <uri>${DOMAIN}</uri>\n`;
  xml += `  </author>\n`;

  for (const item of all.slice(0, 100)) {
    const itemUrl = getWatchUrl(item);
    const title = escapeXml(`${item.brand} - ${item.modelName}`);
    const priceText = item.price || (item.calculatedPrice ? `₺${Number(item.calculatedPrice).toLocaleString('tr-TR')}` : '');
    const desc = escapeXml(`${item.description || title} | Fiyat: ${priceText} | Durum: ${item.condition || 'Orijinal Kutulu Sertifikalı'}`);

    xml += `  <entry>\n`;
    xml += `    <title>${title} (${escapeXml(priceText)})</title>\n`;
    xml += `    <link href="${itemUrl}" />\n`;
    xml += `    <id>${itemUrl}</id>\n`;
    xml += `    <updated>${updated}</updated>\n`;
    xml += `    <summary>${desc}</summary>\n`;
    xml += `  </entry>\n`;
  }

  xml += `</feed>\n`;
  return xml;
}

// 3. SITEMAP XML GENERATOR (SYNCHRONIZED WITH CATALOG)
export function generateSitemapXml(): string {
  const { elite, watches } = loadAllWatches();
  const today = new Date().toISOString().split('T')[0];

  const staticUrls = [
    { loc: `${DOMAIN}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${DOMAIN}/markalar`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${DOMAIN}/saatler/kadin`, changefreq: 'daily', priority: '0.9' },
    { loc: `${DOMAIN}/saatler/erkek`, changefreq: 'daily', priority: '0.9' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const item of staticUrls) {
    xml += `  <url>\n`;
    xml += `    <loc>${item.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const item of [...elite, ...watches]) {
    const itemUrl = getWatchUrl(item);
    const imgUrl = getWatchImageUrl(item);
    const title = escapeXml(`${item.brand} ${item.modelName} Lüks Saat`);

    xml += `  <url>\n`;
    xml += `    <loc>${itemUrl}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    if (item.image) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
      xml += `      <image:title>${title}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(item.description || title)}</image:caption>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}
