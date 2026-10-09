'use strict';
/**
 * Triple-Push Instant Discovery Motoru ($10M Mandate v9.0)
 * Saatchi & Co. Prodüksiyon Yapılandırması
 */
const https = require("https");

const CONFIG = {
  host: "saatchi.com.tr",
  indexNowKey: "fa4891b0d2674e2cb5d2e051c50e0519",
  indexNowEndpoints: [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow"
  ],
  webSubHubs: [
    "https://pubsubhubbub.appspot.com/",
    "https://pubsubhubbub.superfeedr.com/"
  ],
  feeds: [
    "https://saatchi.com.tr/feed.xml",
    "https://saatchi.com.tr/mobile/feed.xml"
  ]
};

async function executeTriplePush(urls = ["https://saatchi.com.tr/"]) {
  console.log(`🚀 [Triple-Push] ${urls.length} adet URL anlık dağıtıma iletiliyor...`);

  // 1. IndexNow Multi-Hub
  const payload = JSON.stringify({
    host: CONFIG.host,
    key: CONFIG.indexNowKey,
    keyLocation: `https://${CONFIG.host}/${CONFIG.indexNowKey}.txt`,
    urlList: urls
  });

  CONFIG.indexNowEndpoints.forEach(endpoint => {
    try {
      const u = new URL(endpoint);
      const req = https.request({
        hostname: u.hostname,
        path: u.pathname,
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) }
      }, res => console.log(`  ✅ [IndexNow: ${u.hostname}] HTTP ${res.statusCode}`));
      req.on("error", err => console.error(`  ❌ [IndexNow: ${u.hostname}] Hata:`, err.message));
      req.write(payload);
      req.end();
    } catch (e) {
      console.error(`  ❌ [IndexNow Hata]:`, e.message);
    }
  });

  // 2. WebSub Hubs Ping
  const params = CONFIG.feeds.map(f => `hub.url=${encodeURIComponent(f)}`).join("&") + "&hub.mode=publish";
  CONFIG.webSubHubs.forEach(hub => {
    try {
      const u = new URL(hub);
      const req = https.request({
        hostname: u.hostname,
        path: u.pathname,
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": Buffer.byteLength(params) }
      }, res => console.log(`  ✅ [WebSub: ${u.hostname}] HTTP ${res.statusCode}`));
      req.on("error", err => console.error(`  ❌ [WebSub: ${u.hostname}] Hata:`, err.message));
      req.write(params);
      req.end();
    } catch (e) {
      console.error(`  ❌ [WebSub Hata]:`, e.message);
    }
  });
}

if (require.main === module) {
  executeTriplePush();
}

module.exports = { executeTriplePush };
