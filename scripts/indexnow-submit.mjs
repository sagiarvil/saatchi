import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const key = fs.readFileSync(path.join(root, 'public/indexnow.txt'), 'utf8').trim();
const host = 'saatchi.com.tr';
const keyLocation = `https://${host}/indexnow.txt`;

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const elite = readJson('src/data/elit-saatler.json');
const watches = readJson('src/data/saatler.json');

const staticUrls = [
  `https://${host}/`,
  `https://${host}/elit-saat`,
  `https://${host}/elit-saat/koleksiyon`,
  `https://${host}/saatler`,
  `https://${host}/saatler/erkek`,
  `https://${host}/saatler/kadin`,
  `https://${host}/saatler/unisex`,
  `https://${host}/markalar`,
  `https://${host}/markalar/rolex`,
  `https://${host}/markalar/cartier`,
  `https://${host}/markalar/tag-heuer`,
  `https://${host}/markalar/rado`,
  `https://${host}/markalar/tissot`,
  `https://${host}/markalar/carren`,
  `https://${host}/markalar/carren/erkek`,
  `https://${host}/markalar/carren/kadin`,
  `https://${host}/markalar/gucci`,
  `https://${host}/markalar/seiko`,
  `https://${host}/neden-saatchi`,
  `https://${host}/saat-degerleme`,
  `https://${host}/kurumsal`,
  `https://${host}/iletisim`,
  `https://${host}/sitemap.xml`,
  `https://${host}/llms.txt`,
];

const eliteUrls = elite.map(w => {
  if (w.seoUrl && w.seoUrl.startsWith('/')) return `https://${host}${w.seoUrl}`;
  return `https://${host}/elit-saat/${w.slug || w.id}`;
});

const standardUrls = watches.slice(0, 1500).map(w => {
  if (w.seoUrl && w.seoUrl.startsWith('/')) return `https://${host}${w.seoUrl}`;
  return `https://${host}/saatler/${w.slug || w.id}`;
});

const urlList = Array.from(new Set([...staticUrls, ...eliteUrls, ...standardUrls]));

const payload = {
  host,
  key,
  keyLocation,
  urlList
};

async function submitIndexNow() {
  console.log(`[IndexNow] ${urlList.length} URL IndexNow konsorsiyumuna (Bing, Yandex, Seznam, Naver) bildiriliyor...`);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.log(`[IndexNow] HTTP Durumu: ${res.status} ${res.statusText}`);
    if (res.status === 200 || res.status === 202) {
      console.log('[IndexNow] Başarıyla iletildi.');
    } else {
      console.log('[IndexNow] Yanıt kodu:', res.status);
    }
  } catch (err) {
    console.error('[IndexNow] Gönderim hatası (çevrimdışı/ağ engeli olabilir):', err.message);
  }
}

submitIndexNow();
