import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const DOMAIN = 'https://saatchi.com.tr';
const pubDate = new Date().toUTCString();
const updated = new Date().toISOString();
const today = updated.split('T')[0];

function escapeXml(unsafe) {
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

const elitePath = path.join(root, 'src/data/elit-saatler.json');
const watchesPath = path.join(root, 'src/data/saatler.json');

const elite = fs.existsSync(elitePath) ? JSON.parse(fs.readFileSync(elitePath, 'utf8')) : [];
const watches = fs.existsSync(watchesPath) ? JSON.parse(fs.readFileSync(watchesPath, 'utf8')) : [];
const all = [...elite, ...watches];

function getWatchUrl(item) {
  const isElite = item.catalogTier === 'elite' || item.category === 'Elit Kategori';
  const slug = item.slug || item.id;
  return isElite ? `${DOMAIN}/elit-saat/${slug}` : `${DOMAIN}/saatler/${slug}`;
}

function getWatchImageUrl(item) {
  if (!item.image) return `${DOMAIN}/logo.png`;
  return item.image.startsWith('http') ? item.image : `${DOMAIN}${item.image.startsWith('/') ? '' : '/'}${item.image}`;
}

// 1. SYNC RSS 2.0
function syncRss() {
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
  fs.writeFileSync(path.join(root, 'public/rss.xml'), xml, 'utf8');
  console.log('[Feeds] public/rss.xml senkronize edildi.');
}

// 2. SYNC ATOM 1.0
function syncAtom() {
  let xml = `<?xml version="1.0" encoding="utf-8"?>\n`;
  xml += `<feed xmlns="http://www.w3.org/2005/Atom">\n`;
  xml += `  <title>SAATCHI &amp; CO. — Lüks Saat Akışı</title>\n`;
  xml += `  <subtitle>Dünyanın en seçkin lüks ve elit saat koleksiyonları. Orijinallik garantisi ve küresel referans fiyatları.</subtitle>\n`;
  xml += `  <link href="${DOMAIN}/atom.xml" rel="self" type="application/atom+xml" />\n`;
  xml += `  <link href="${DOMAIN}" rel="alternate" type="text/html" />\n`;
  xml += `  <id>${DOMAIN}/</id>\n`;
  xml += `  <updated>${updated}</updated>\n`;
  xml += `  <author>\n`;
  xml += `    <name>Saatchi &amp; Co.</name>\n`;
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
  fs.writeFileSync(path.join(root, 'public/atom.xml'), xml, 'utf8');
  console.log('[Feeds] public/atom.xml senkronize edildi.');
}

syncRss();
syncAtom();
