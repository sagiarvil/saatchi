// designlang - Automated Design Token Extractor & Auditor
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log('[designlang] Tasarım değişkenleri ve token analizi başlatılıyor...');

const tokens = {
  version: '1.0.0',
  brand: 'Saatchi & Co.',
  generatedAt: new Date().toISOString(),
  palette: {
    primaryGold: '#846b32',
    primaryGoldHover: '#6d5828',
    background: '#ffffff',
    surface: '#f9f9f9',
    surfaceBorder: '#e5e5e5',
    typographyBody: '#666666',
    typographyHeading: '#111111',
    black: '#000000',
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    baseSize: '16px',
    lineHeight: '1.6',
  },
  componentsAudited: 0,
  detectedHexColors: {},
};

function scanFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const full = join(dir, file);
    if (statSync(full).isDirectory()) {
      scanFiles(full, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.css')) {
      fileList.push(full);
    }
  }
  return fileList;
}

const allFiles = scanFiles('src');
tokens.componentsAudited = allFiles.length;

const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\b/g;

for (const file of allFiles) {
  const content = readFileSync(file, 'utf8');
  let match;
  while ((match = hexRegex.exec(content)) !== null) {
    const hex = match[0].toLowerCase();
    tokens.detectedHexColors[hex] = (tokens.detectedHexColors[hex] || 0) + 1;
  }
}

writeFileSync('design-tokens.json', JSON.stringify(tokens, null, 2), 'utf8');

console.log(`[designlang] Analiz tamamlandı.`);
console.log(`- Taranan dosya sayısı: ${tokens.componentsAudited}`);
console.log(`- Tespit edilen benzersiz HEX renkleri: ${Object.keys(tokens.detectedHexColors).length}`);
console.log(`- Çıktı dosyası: design-tokens.json oluşturuldu.`);
