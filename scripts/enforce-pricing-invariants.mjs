import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const elitePath = path.join(root, 'src/data/elit-saatler.json');
const watchesPath = path.join(root, 'src/data/saatler.json');
const paytrPath = path.join(root, 'src/data/saatler_paytr.json');

const MIN_CATALOG_PRICE = 10_000;
const MAX_CATALOG_PRICE = 1_700_000;
const MAX_ROLEX_PRICE = 2_000_000;

let elite = JSON.parse(fs.readFileSync(elitePath, 'utf8'));
let watches = JSON.parse(fs.readFileSync(watchesPath, 'utf8'));

function fmtTry(val) {
  return '₺' + Number(val).toLocaleString('tr-TR');
}

// 1. 10.000 TL altı ve tavanı aşan ürünleri kesin olarak filtrele (fail-closed koruma)
const initialEliteCount = elite.length;
const initialWatchesCount = watches.length;

elite = elite.filter(item => {
  const calc = Number(item.calculatedPrice || 0);
  const ceiling = item.brand === 'Rolex' ? MAX_ROLEX_PRICE : MAX_CATALOG_PRICE;
  return calc >= MIN_CATALOG_PRICE && calc <= ceiling;
});

watches = watches.filter(item => {
  const calc = Number(item.calculatedPrice || 0);
  const ceiling = item.brand === 'Rolex' ? MAX_ROLEX_PRICE : MAX_CATALOG_PRICE;
  return calc >= MIN_CATALOG_PRICE && calc <= ceiling;
});

const removedCount = (initialEliteCount - elite.length) + (initialWatchesCount - watches.length);
if (removedCount > 0) {
  console.log(`[Pricing Invariants] 10.000 TL altındaki veya tavanı aşan ${removedCount} adet ürün katalogdan temizlendi.`);
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

// Diğer markalar için stok durumu ve etiket ataması
for (const item of watches) {
  item.badge = '';
  item.condition = 'Orijinal';
  item.stock = 1;
  item.stockStatus = 'in_stock';
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
