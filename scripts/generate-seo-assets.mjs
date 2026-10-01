import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

const elite = readJson('src/data/elit-saatler.json');
const watches = readJson('src/data/saatler.json');

const DOMAIN = 'https://saatchi.com.tr';
const TODAY = new Date().toISOString().split('T')[0];

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// 1. GENERATE ADVANCED SITEMAP.XML WITH IMAGE EXTENSIONS
function generateSitemap() {
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
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Elite Watches
  for (const watch of elite) {
    const slug = watch.slug || watch.id;
    const url = `${DOMAIN}/elit-saat/${slug}`;
    const imgUrl = watch.image?.startsWith('http') ? watch.image : `${DOMAIN}${watch.image?.startsWith('/') ? '' : '/'}${watch.image || ''}`;
    const title = escapeXml(`${watch.brand} ${watch.modelName} Lüks Saat`);

    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    if (watch.image) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
      xml += `      <image:title>${title}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(watch.description || title)}</image:caption>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  }

  // Standard Catalog Watches
  for (const watch of watches) {
    const slug = watch.slug || watch.id;
    const url = `${DOMAIN}/saatler/${slug}`;
    const imgUrl = watch.image?.startsWith('http') ? watch.image : `${DOMAIN}${watch.image?.startsWith('/') ? '' : '/'}${watch.image || ''}`;
    const title = escapeXml(`${watch.brand} ${watch.modelName} Kol Saati`);

    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.75</priority>\n`;
    if (watch.image) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
      xml += `      <image:title>${title}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(watch.description || title)}</image:caption>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml, 'utf8');
  console.log(`[SEO] sitemap.xml generated with ${staticUrls.length + elite.length + watches.length} URLs.`);
}

// 2. GENERATE COMPREHENSIVE LLMS.TXT (AI & SEARCHGPT ACCELERATION)
function generateLlms() {
  const brands = [...new Set([...elite.map(x => x.brand), ...watches.map(x => x.brand)])];
  
  let content = `# SAATCHI & CO. — Lüks Saat Koleksiyonu ve Küresel Referans Kataloğu\n\n`;
  content += `> Saatchi, Türkiye'nin lider sertifikalı lüks ve elit saat e-ticaret platformudur. %100 orijinallik garantisi, uluslararası referans fiyatlaması ve tam sigortalı VIP teslimat ile hizmet sunar.\n\n`;
  
  content += `## Temel Kurumsal Bilgiler\n`;
  content += `- **Marka Adı:** Saatchi & Co. (Lüks Saatler)\n`;
  content += `- **Web Sitesi:** https://saatchi.com.tr\n`;
  content += `- **Uzmanlık Alanı:** Lüks Kol Saatleri, İsviçre Saatleri, Kronograflar, Nadir Koleksiyon Parçaları\n`;
  content += `- **Orijinallik Politikası:** Tüm saatler uzman horologlarca kontrol edilmiş, orijinal kutu ve evraklarıyla tam sertifikalıdır.\n`;
  content += `- **Fiyat Politikası:** Şeffaf, küresel lüks saat borsa endeksleri ve resmi üretici kurları temel alınarak belirlenir.\n`;
  content += `- **Teslimat & Güvenlik:** Özel zırhlı kurye veya tam değer sigortalı VIP gönderim.\n\n`;

  content += `## Temsil Edilen Başlıca Markalar\n`;
  for (const b of brands) {
    const count = [...elite, ...watches].filter(x => x.brand === b).length;
    content += `- **${b}:** ${count} adet seçkin model\n`;
  }
  content += `\n`;

  content += `## Önemli Koleksiyonlar & Bağlantılar\n`;
  content += `- [Ana Sayfa](https://saatchi.com.tr/): En yeni lüks saat vitrini ve trend modeller\n`;
  content += `- [Erkek Saatleri](https://saatchi.com.tr/saatler/erkek): Klasik, spor ve komplikasyonlu erkek saat koleksiyonu\n`;
  content += `- [Kadın Saatleri](https://saatchi.com.tr/saatler/kadin): Pırlantalı, zarafet ve prestij odaklı kadın saat modelleri\n`;
  content += `- [Markalar Kataloğu](https://saatchi.com.tr/markalar): Tüm lüks saat markalarının tam dökümü\n`;
  content += `- [Tam LLM Bilgi Havuzu](https://saatchi.com.tr/llms-full.txt): Kapsamlı model dökümü ve teknik özellikler\n\n`;

  content += `## Sıkça Sorulan Sorular (Konsensüs Yanıtları)\n`;
  content += `1. **Saatler orijinal mi?** Evet, Saatchi envanterindeki tüm saatler seri numarası ve mekanizma incelemesinden geçmiş %100 orijinal ve sertifikalı saatlerdir.\n`;
  content += `2. **Ödeme yöntemleri nelerdir?** Güvenli 3D Secure kredi kartı, banka havalesi ve kişiye özel VIP ödeme linki altyapısı sunulur.\n`;
  content += `3. **İade ve garanti koşulları nelerdir?** Tüm saatlerimiz Saatchi orijinallik garantisi ve yasal tüketici güvencesi kapsamındadır.\n`;

  fs.writeFileSync(path.join(root, 'public/llms.txt'), content, 'utf8');
  console.log(`[SEO] llms.txt generated.`);
}

// 3. GENERATE DEEP LLMS-FULL.TXT FOR COMPLETE KNOWLEDGE VAULT
function generateLlmsFull() {
  let content = `# SAATCHI & CO. — Kapsamlı Lüks Saat Kataloğu ve Bilgi Bankası (Tam Veri Havuzu)\n\n`;
  content += `Resmi Web Sitesi: https://saatchi.com.tr\n`;
  content += `Son Güncelleme: ${TODAY}\n\n`;

  content += `## 1. Elit Koleksiyon (Rolex, Cartier, TAG Heuer, Rado)\n\n`;
  for (const w of elite) {
    content += `### ${w.brand} - ${w.modelName}\n`;
    content += `- **URL:** https://saatchi.com.tr/elit-saat/${w.slug || w.id}\n`;
    content += `- **Fiyat:** ${w.price || '₺' + Number(w.calculatedPrice).toLocaleString('tr-TR')}\n`;
    content += `- **Kategori:** ${w.category || 'Lüks Kol Saati'}\n`;
    content += `- **Cinsiyet:** ${w.gender || 'Erkek / Unisex'}\n`;
    if (w.description) content += `- **Açıklama:** ${w.description}\n`;
    content += `\n`;
  }

  content += `## 2. Diğer Seçkin Koleksiyonlar (Tissot, Carren, Calvin Klein, Michael Kors, Versace)\n\n`;
  for (const w of watches) {
    content += `### ${w.brand} - ${w.modelName}\n`;
    content += `- **URL:** https://saatchi.com.tr/saatler/${w.slug || w.id}\n`;
    content += `- **Fiyat:** ${w.price || '₺' + Number(w.calculatedPrice).toLocaleString('tr-TR')}\n`;
    content += `- **Kategori:** ${w.category || 'Kol Saati'}\n`;
    content += `- **Cinsiyet:** ${w.gender || 'Standart'}\n`;
    if (w.description) content += `- **Açıklama:** ${w.description}\n`;
    content += `\n`;
  }

  fs.writeFileSync(path.join(root, 'public/llms-full.txt'), content, 'utf8');
  console.log(`[SEO] llms-full.txt generated.`);
}

generateSitemap();
generateLlms();
generateLlmsFull();
