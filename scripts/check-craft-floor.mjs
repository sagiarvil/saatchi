// Impeccable Craft Floor Engine Runner
import { execSync } from 'child_process';
import { homedir } from 'os';
import { join } from 'path';

const impeccableBin = join(homedir(), '.gemini/config/skills/impeccable/scripts/impeccable');

console.log('[Impeccable Craft Floor] Gerçek Impeccable analiz motoru çalıştırılıyor...');

try {
  const output = execSync(`"${impeccableBin}" detect src/app src/components`, {
    encoding: 'utf8',
    stdio: 'pipe',
  });
  console.log(output);
  console.log('[Impeccable Craft Floor] SIFIR HATA — TÜM ARAYÜZ VE CRAFT KURALLARI DOĞRULANDI: PASS');
  process.exit(0);
} catch (err) {
  console.error('[Impeccable Craft Floor] Tasarım veya craft ihlalleri tespit edildi:');
  if (err.stdout) console.error(err.stdout);
  if (err.stderr) console.error(err.stderr);
  process.exit(err.status || 1);
}
