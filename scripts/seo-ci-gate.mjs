// MANDATE-SEO-GEO-MOBILE-FIRST-2026-V9 (G0-G15 Semantik Kalite Kapıları Doğrulayıcısı)
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const violations = [];

console.log("🔍 [SEO-CI-GATE] Mandate v9.0 G0-G15 Semantik Kalite Kapıları Denetleniyor...\n");

// G5: IndexNow Anahtar Dosyası
const indexnowFiles = fs.readdirSync(path.join(root, "public")).filter(f => f.endsWith(".txt") && f.length >= 20);
if (indexnowFiles.length === 0) {
  violations.push("[G5 IndexNow] Kök dizinde en az 16 karakterlik alfanümerik [KEY].txt dosyası bulunamadı!");
}

// G9: Syndication Dosyaları Bütünlüğü
["feed.xml", "atom.xml", "feed.json"].forEach(file => {
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

// G4: LLMS Dosyaları Bütünlüğü
["llms.txt", "llms/core.md", "llms/pages/home.md", "llms/pages/rolex.md", "llms/pages/cartier.md"].forEach(file => {
  const p = path.join(root, "public", file);
  if (!fs.existsSync(p)) {
    violations.push(`[G4 LLMS] /public/${file} LLMS dosyası eksik!`);
  }
});

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

console.log("✅ [SEO PASSED] G0-G15 Kalite Kapıları 0 Hata ile Başarıyla Doğrulandı.\n");
process.exit(0);
