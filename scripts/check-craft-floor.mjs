// Impeccable Craft Floor Verification Gate
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const forbidden = [
  { pattern: /from-purple-|to-pink-|from-violet-/i, msg: 'Yapay zeka mor-pembe gradyanı yasaktır' },
  { pattern: /animate-bounce/i, msg: 'Lüks saat vitrininde ucuz sıçrama animasyonu yasaktır' }
];

function scanDir(dir, fileList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const full = join(dir, file);
    if (statSync(full).isDirectory()) {
      scanDir(full, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      fileList.push(full);
    }
  }
  return fileList;
}

const files = scanDir('src');
let errors = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  for (const rule of forbidden) {
    if (rule.pattern.test(content)) {
      console.error(`[Impeccable Hatası] ${file}: ${rule.msg}`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`[Impeccable Craft Floor] Toplam ${errors} ihlal bulundu.`);
  process.exit(1);
} else {
  console.log(`[Impeccable Craft Floor] ${files.length} bileşen tarandı: SIFIR İHLAL, %100 LÜKS CRAFT STANDARDI.`);
}
