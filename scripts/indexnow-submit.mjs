import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const key = fs.readFileSync(path.join(root, 'public/indexnow.txt'), 'utf8').trim();
const host = 'saatchi.com.tr';
const keyLocation = `https://${host}/indexnow.txt`;

// En kritik trafik çeken sayfaları IndexNow'a bildir
const urlList = [
  `https://${host}/`,
  `https://${host}/markalar`,
  `https://${host}/saatler/erkek`,
  `https://${host}/saatler/kadin`,
  `https://${host}/sitemap.xml`,
  `https://${host}/llms.txt`,
];

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
