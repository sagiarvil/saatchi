import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const elitePath = path.join(root, 'src/data/elit-saatler.json');
const watchesPath = path.join(root, 'src/data/saatler.json');
const paytrPath = path.join(root, 'src/data/saatler_paytr.json');

const MIN_CATALOG_PRICE = 10_000;

let elite = JSON.parse(fs.readFileSync(elitePath, 'utf8'));
let watches = JSON.parse(fs.readFileSync(watchesPath, 'utf8'));

function fmtTry(val) {
  return '₺' + Number(val).toLocaleString('tr-TR');
}

// 1. 10.000 TL altı ürünleri kesin olarak filtrele (fail-closed koruma)
const initialEliteCount = elite.length;
const initialWatchesCount = watches.length;

elite = elite.filter(item => {
  const calc = Number(item.calculatedPrice || 0);
  return calc >= MIN_CATALOG_PRICE;
});

watches = watches.filter(item => {
  const calc = Number(item.calculatedPrice || 0);
  return calc >= MIN_CATALOG_PRICE;
});

const removedCount = (initialEliteCount - elite.length) + (initialWatchesCount - watches.length);
if (removedCount > 0) {
  console.log(`[Pricing Invariants] 10.000 TL altındaki ${removedCount} adet ürün katalogdan temizlendi.`);
}

let syncCount = 0;

for (const list of [elite, watches]) {
  for (const item of list) {
    const calc = Number(item.calculatedPrice || 0);
    const expected = fmtTry(calc);
    if (item.price !== expected) {
      item.price = expected;
      syncCount++;
    }
  }
}

fs.writeFileSync(elitePath, JSON.stringify(elite, null, 2) + '\n', 'utf8');
fs.writeFileSync(watchesPath, JSON.stringify(watches, null, 2) + '\n', 'utf8');

// Rebuild PayTR from synchronized sources
const allItems = [...elite, ...watches];
const paytr = allItems.map(p => ({
  id: p.id,
  modelName: p.modelName,
  brand: p.brand,
  calculatedPrice: p.calculatedPrice,
  stock: p.stock ?? 1,
  sourceUrl: p.sourceUrl,
}));

fs.writeFileSync(paytrPath, JSON.stringify(paytr, null, 2) + '\n', 'utf8');

console.log(`[Pricing Invariants Enforced] Synchronized ${syncCount} price formats across catalog. Total products: ${allItems.length}`);
