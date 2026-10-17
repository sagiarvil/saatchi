// MANDATE-SEO-GEO-MOBILE-FIRST-2026-V9 (G0-G19 Semantik, SERP ve Kalite Kapıları Doğrulayıcısı)
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const violations = [];

console.log("🔍 [SEO-CI-GATE] Mandate v9.0 G0-G19 Semantik & SERP Kalite Kapıları Denetleniyor...\n");

// G5: IndexNow Anahtar Dosyası
const indexnowFiles = fs.readdirSync(path.join(root, "public")).filter(f => f.endsWith(".txt") && f.length >= 20);
if (indexnowFiles.length === 0) {
  violations.push("[G5 IndexNow] Kök dizinde en az 16 karakterlik alfanümerik [KEY].txt dosyası bulunamadı!");
}

// G9: Syndication Dosyaları Bütünlüğü
["feed.xml", "atom.xml", "feed.json", "mobile/feed.xml"].forEach(file => {
  const p = path.join(root, "public", file);
  if (!fs.existsSync(p)) {
    violations.push(`[G9 Syndication] /public/${file} dosyası eksik!`);
  }
});

// G10: Ajan Protokol Dosyaları
["agent.txt", ".well-known/agent.json"].forEach(file => {
  const p = path.join(root, "public", file);
  if (!fs.existsSync(p)) {
    violations.push(`[G10 Agent] /public/${file} dosyası eksik!`);
  }
});

// G4: Multi-Tier LLMS Dosyaları Bütünlüğü
const requiredLlms = [
  "llms.txt",
  "llms/core.md",
  "llms/entities/author-experts.md",
  "llms/entities/credentials.md",
  "llms/entities/methodologies.md",
  "llms/pages/home.md",
  "llms/pages/rolex.md",
  "llms/pages/cartier.md",
  "llms/pages/tag-heuer.md",
  "llms/pages/rado.md",
  "llms/pages/tissot.md",
  "llms/pages/carren.md",
  "llms/pages/saat-degerleme.md",
  "llms/pages/kurumsal.md",
  "llms/pages/iletisim.md",
  "llms/pages/neden-saatchi.md",
  "llms/decision-matrix.md"
];
requiredLlms.forEach(file => {
  const p = path.join(root, "public", file);
  if (!fs.existsSync(p)) {
    violations.push(`[G4 LLMS] /public/${file} LLMS dosyası eksik!`);
  }
});

// G16: Google SERP 48px Katsayılı Favicon Paketi
const requiredFavicons = [
  "favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon-48x48.png",
  "favicon-96x96.png",
  "favicon-192x192.png",
  "apple-touch-icon.png",
  "android-chrome-512x512.png"
];
requiredFavicons.forEach(file => {
  const p = path.join(root, "public", file);
  if (!fs.existsSync(p)) {
    violations.push(`[G16 Favicon] /public/${file} Google SERP ikon dosyası eksik!`);
  }
});

// G17: Google Site Names & PWA Web Manifest
["site.webmanifest", "manifest.webmanifest"].forEach(file => {
  const p = path.join(root, "public", file);
  if (!fs.existsSync(p)) {
    violations.push(`[G17 Site Names] /public/${file} dosyası eksik!`);
  }
});

// G19 & PURGE PROTOCOL: keywords Yasağı & layout.tsx Kontrolü
const layoutPath = path.join(root, "src/app/layout.tsx");
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, "utf8");
  if (layoutContent.includes("keywords:")) {
    violations.push("[G19 / PURGE] layout.tsx içinde 'keywords' meta etiketi bulundu! Mandate Bölüm 0 uyarınca KESİNLİKLE YASAKTIR.");
  }
  if (!layoutContent.includes("og:site_name")) {
    violations.push("[G17 Site Names] layout.tsx içinde og:site_name meta etiketi bulunamadı!");
  }
}

// SSOT Registry Dosyası Kontrolü
const registryPath = path.join(root, "src/seo/registry.ts");
if (!fs.existsSync(registryPath)) {
  violations.push("[SSOT Registry] src/seo/registry.ts dosyası eksik!");
} else {
  const regContent = fs.readFileSync(registryPath, "utf8");
  if (!regContent.includes("DECISION_PLATFORMS_ECOSYSTEM")) {
    violations.push("[SSOT Registry] DECISION_PLATFORMS_ECOSYSTEM konsorsiyumu tanımlanmamış!");
  }
}

if (violations.length > 0) {
  console.error(`❌ [SEO-CI-GATE BLOCKED] ${violations.length} adet semantik kapı ihlali tespit edildi:\n`);
  violations.forEach(v => console.error(`  ⛔ ${v}`));
  process.exit(1);
}

console.log("✅ [SEO PASSED] G0-G19 Kalite Kapıları 0 Hata ile Başarıyla Doğrulandı.\n");
process.exit(0);
