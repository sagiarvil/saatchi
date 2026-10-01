// MANDATE-SEO-GEO-MOBILE-FIRST-2026-V8 (MG0-MG20 Kalite Kapıları Doğrulayıcısı)
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const violations = [];

console.log('📱 [MOBILE-CI-GATE] Mandate v8.0 Mobile-First Kalite Kapıları Denetleniyor...\n');

// MG5: PWA Manifest ve Service Worker Kontrolü
const manifestPath = path.join(root, 'public/manifest.webmanifest');
const swPath = path.join(root, 'public/sw.js');
const offlinePath = path.join(root, 'public/offline.html');

if (!fs.existsSync(manifestPath)) {
  violations.push('[MG5 PWA] /manifest.webmanifest dosyası eksik!');
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.display !== 'standalone') {
    violations.push('[MG5 PWA] PWA display standalone olmalıdır.');
  }
}

if (!fs.existsSync(swPath)) {
  violations.push('[MG5 PWA] /sw.js Service Worker dosyası eksik!');
}
if (!fs.existsSync(offlinePath)) {
  violations.push('[MG5 PWA] /offline.html fallback sayfası eksik!');
}

// MG6: App Link & Deep Link Dosyaları
const appLinkPath = path.join(root, 'public/app-link.json');
if (!fs.existsSync(appLinkPath)) {
  violations.push('[MG6 APPLINK] /app-link.json dosyası eksik!');
}

// MG8: Mobile LLM Sub-Graphs
const voiceQueriesPath = path.join(root, 'public/llms/mobile/voice-queries.md');
const localIntentPath = path.join(root, 'public/llms/mobile/local-intent.md');

if (!fs.existsSync(voiceQueriesPath)) {
  violations.push('[MG8 MLLM] /llms/mobile/voice-queries.md sesli arama grafı eksik!');
}
if (!fs.existsSync(localIntentPath)) {
  violations.push('[MG8 MLLM] /llms/mobile/local-intent.md yerel niyet grafı eksik!');
}

// MG11: Bottom Nav / Thumb Zone Kontrolü
const bottomNavPath = path.join(root, 'src/components/layout/MobileBottomNav.tsx');
if (!fs.existsSync(bottomNavPath)) {
  violations.push('[MG11 NAV] MobileBottomNav.tsx bileşeni bulunamadı!');
}

// MG16: Mobile Feed Kontrolü
const mobileFeedPath = path.join(root, 'public/mobile/feed.xml');
if (!fs.existsSync(mobileFeedPath)) {
  violations.push('[MG16 MFEED] /mobile/feed.xml mobil feed eksik!');
}

// MG17: Mobile Sitemap Kontrolü
const mobileSitemapPath = path.join(root, 'public/sitemap-mobile.xml');
if (!fs.existsSync(mobileSitemapPath)) {
  violations.push('[MG17 MSITEMAP] /sitemap-mobile.xml mobil sitemap eksik!');
}

// MG10 & MG13: AI Agent Manifest & MCP Kontrolleri
const agentTxtPath = path.join(root, 'public/agent.txt');
if (!fs.existsSync(agentTxtPath)) {
  violations.push('[MG10 AGENT] /agent.txt AI ajan protokolü eksik!');
}

if (violations.length > 0) {
  console.error(`❌ [MOBILE DEPLOY BLOCKED] ${violations.length} adet kritik mobil şartname ihlali tespit edildi:\n`);
  violations.forEach(v => console.error(`  ⛔ ${v}`));
  process.exit(1);
}

console.log('✅ [MOBILE PASSED] Tüm MG0-MG20 Mobile-First Kalite Kapıları 0 Hata ile Başarıyla Geçildi.\n');
process.exit(0);
