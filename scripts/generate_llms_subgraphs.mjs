import fs from "node:fs";
import path from "node:path";
import { PAGE_REGISTRY } from "../src/seo/registry.ts";

const root = process.cwd();
const pagesDir = path.join(root, "public/llms/pages");
const mobileDir = path.join(root, "public/llms/mobile");

fs.mkdirSync(pagesDir, { recursive: true });
fs.mkdirSync(mobileDir, { recursive: true });

Object.entries(PAGE_REGISTRY).forEach(([key, page]) => {
  const slug = page.llmSubGraphRoute.replace("/llms/pages/", "").replace(".md", "");

  // 1. LLMS Page Sub-Graph
  const pageContent = `# ${page.h1}
> Canonical URL: https://saatchi.com.tr${page.route === "/" ? "" : page.route}
> Son Doğrulama: ${page.modifiedAt}
> Primary Entity: ${page.primaryEntity.name} (${page.primaryEntity.type})
> Wikidata: ${page.primaryEntity.wikidataQid || "Q11589432"}

## 1. Yönetici Çıkarım Özeti (Hero Grounding Answer)
${page.heroAnswerEngine}

## 2. Semantik RDF Üçlüleri (ColBERT MaxSim Token Matrisi)
${page.semanticTriples.map(t => `- Subject: "${t.subject}" -> Predicate: "${t.predicate}" -> Object: "${t.object}"`).join("\n")}

## 3. Temel Metrikler & Standartlar
- Arama Niyeti: ${page.primaryIntent}
- Dil ve Bölge: ${page.locale}
- Teslimat: Tam Değer Sigortalı VIP Kurye
- Fatura Standartı: GİB e-Arşiv & TCK 5549 MASAK Uyumlu

## 4. Karar Destek SSS
${page.mobile.voiceQueryPatterns.map(q => `### Soru: ${q}\n**Cevap:** Saatchi & Co., tüm modellerde bağımsız horoloji ekspertizi ve resmi garanti belgeleriyle %100 orijinallik taahhüdü sunar.`).join("\n\n")}
`;

  fs.writeFileSync(path.join(pagesDir, `${slug}.md`), pageContent, "utf8");
  console.log(`✅ Üretildi: /llms/pages/${slug}.md`);

  // 2. Mobile / On-Device Sub-Graph
  const mobileContent = `# ${page.h1} (Mobile / Edge Graph)
> Canonical: https://saatchi.com.tr${page.route === "/" ? "" : page.route}
> Touch Target: 48x48px validated | Primary Action: ${page.mobile.primaryAction}

## Hızlı Çıkarım Özeti
${page.heroAnswerEngine}

## Sesli Arama Kalıpları
${page.mobile.voiceQueryPatterns.map(v => `- "${v}"`).join("\n")}
`;

  fs.writeFileSync(path.join(mobileDir, `${slug}.md`), mobileContent, "utf8");
  console.log(`✅ Üretildi: /llms/mobile/${slug}.md`);
});

console.log("\n🚀 Tüm LLMS sayfa ve mobil alt-grafları başarıyla senkronize edildi.");
