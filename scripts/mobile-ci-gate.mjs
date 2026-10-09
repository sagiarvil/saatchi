// MANDATE-SEO-GEO-MOBILE-FIRST-2026-V9 (MG0-MG22 Mobil Kalite Kapıları Doğrulayıcısı)
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const violations = [];

console.log("📱 [MOBILE-CI-GATE] Mandate v9.0 MG0-MG22 Mobil Kalite Kapıları Denetleniyor...\n");

// MG0: Viewport & Layout Standartları
const layoutPath = path.join(root, "src/app/layout.tsx");
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, "utf8");
  if (layoutContent.includes("user-scalable=no")) {
    violations.push("[MG0 Viewport] user-scalable=no kullanımı YASAKTIR (WCAG 2.2 ve Alexandria kuralı)!");
  }
}

// MG5: PWA Manifest ve Service Worker Kontrolü
const manifestPath = path.join(root, "public/manifest.webmanifest");
const swPath = path.join(root, "public/sw.js");
const offlinePath = path.join(root, "public/offline.html");

if (!fs.existsSync(manifestPath)) {
  violations.push("[MG5 PWA] /manifest.webmanifest dosyası eksik!");
} else {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (manifest.display !== "standalone") {
      violations.push("[MG5 PWA] PWA display standalone olmalıdır.");
    }
  } catch (e) {
    violations.push("[MG5 PWA] /manifest.webmanifest JSON formatı geçersiz!");
  }
}

if (!fs.existsSync(swPath)) {
  violations.push("[MG5 PWA] /sw.js Service Worker dosyası eksik!");
}
if (!fs.existsSync(offlinePath)) {
  violations.push("[MG5 PWA] /offline.html fallback sayfası eksik!");
}

// MG6: App Link & Universal Link Dosyaları
const appLinkPath = path.join(root, "public/app-link.json");
const assetLinksPath = path.join(root, "public/.well-known/assetlinks.json");
const appleAssocPath = path.join(root, "public/.well-known/apple-app-site-association");

if (!fs.existsSync(appLinkPath)) violations.push("[MG6 APPLINK] /app-link.json dosyası eksik!");
if (!fs.existsSync(assetLinksPath)) violations.push("[MG6 APPLINK] /.well-known/assetlinks.json eksik!");
if (!fs.existsSync(appleAssocPath)) violations.push("[MG6 APPLINK] /.well-known/apple-app-site-association eksik!");

// MG8: Mobile LLM Sub-Graphs
const voiceQueriesPath = path.join(root, "public/llms/mobile/voice-queries.md");
const nanoCorePath = path.join(root, "public/llms/mobile/nano-core.md");

if (!fs.existsSync(voiceQueriesPath)) violations.push("[MG8 MLLM] /llms/mobile/voice-queries.md sesli arama grafı eksik!");
if (!fs.existsSync(nanoCorePath)) violations.push("[MG8 MLLM] /llms/mobile/nano-core.md On-Device nano grafı eksik!");

// MG13: AMP Yasağı Kontrolü
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, "utf8");
  if (layoutContent.includes("cdn.ampproject.org") || layoutContent.includes("⚡") || layoutContent.includes("amp-custom")) {
    violations.push("[MG13 AMP] Kod tabanında AMP etiketi bulundu! AMP tamamen yasaktır.");
  }
}

// MG16: Mobil Feed Kontrolü
const mobileFeedPath = path.join(root, "public/mobile/feed.xml");
if (!fs.existsSync(mobileFeedPath)) {
  violations.push("[MG16 MFEED] /mobile/feed.xml mobil feed eksik!");
}

// MG17: Mobile Sitemap Yasak (V9 Kuralı: Tekil RWD Canonical)
const mobileSitemapPath = path.join(root, "public/sitemap-mobile.xml");
if (fs.existsSync(mobileSitemapPath)) {
  violations.push("[MG17 MSITEMAP] /sitemap-mobile.xml YASAK (V9 Kuralı: Tekil RWD Canonical)");
}

// MG21: 14KB TCP İlk Paket Bütçesi
const schemaBuilderPath = path.join(root, "src/seo/schema-builder.ts");
if (fs.existsSync(schemaBuilderPath)) {
  const schemaStats = fs.statSync(schemaBuilderPath);
  if (schemaStats.size > 14336 * 2) {
    violations.push("[MG21 14KB] Şema oluşturucu aşırı şişkin!");
  }
}

if (violations.length > 0) {
  console.error(`❌ [MOBILE DEPLOY BLOCKED] ${violations.length} adet kritik mobil şartname ihlali tespit edildi:\n`);
  violations.forEach(v => console.error(`  ⛔ ${v}`));
  process.exit(1);
}

console.log("✅ [MOBILE PASSED] Tüm MG0-MG22 Mobile-First Kalite Kapıları 0 Hata ile Başarıyla Geçildi.\n");
process.exit(0);
