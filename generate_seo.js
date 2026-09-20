const fs = require('fs');

const domain = 'https://saatchi.com.tr';

// 1. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Allow: /saatler/
Allow: /elit-saat/
Allow: /markalar/

Sitemap: ${domain}/sitemap.xml
`;
fs.writeFileSync('public/robots.txt', robotsTxt);

// 2. Generate llms.txt
const llmsTxt = `# Saatchi Lüks Saat Koleksiyonu
Dünyanın en prestijli, sınırlı üretim ve üst düzey komplikasyonlu saatleri.

## Hakkımızda
Saatchi, %100 orijinal ve sertifikalı ikinci el lüks saatleri güvenle satın alabileceğiniz Türkiye'nin en seçkin platformudur.

## Özel Koleksiyonlar
- Rolex
- Patek Philippe
- Audemars Piguet
- Richard Mille
- Hublot
- Omega

## Fiyatlandırma ve Gümrük
Saatchi'de yer alan tüm saat fiyatları küresel Chrono24 endeksi üzerinden Türkiye gümrük ve vergi oranları hesaplanarak standart %150 marj (x2.5) ile TL cinsinden şeffaf olarak listelenir.

## İletişim & Güvenlik
VIP Ödeme linki ile güvenli ödeme.
Siparişler özel kurye veya tam kasko teminatı ile sigortalı gönderilir.
`;
fs.writeFileSync('public/llms.txt', llmsTxt);

// 3. Sitemap generator
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/markalar</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/saatler/kadin</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/saatler/erkek</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

// Add some elite watches to sitemap
try {
    const elit = JSON.parse(fs.readFileSync('src/data/elit-saatler.json', 'utf8'));
    elit.slice(0, 100).forEach(w => {
        const slugParts = w.seoUrl.split('/');
        const slug = slugParts[slugParts.length - 1];
        sitemapXml += `  <url>\n    <loc>${domain}/elit-saat/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });
} catch(e) {}

sitemapXml += `</urlset>`;
fs.writeFileSync('public/sitemap.xml', sitemapXml);

console.log("SEO and LLM assets generated successfully.");
