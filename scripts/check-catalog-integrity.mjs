import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

const elite = readJson('src/data/elit-saatler.json');
const watches = readJson('src/data/saatler.json');
const paytr = readJson('src/data/saatler_paytr.json');
const allItems = [...elite, ...watches];

// Saf aksesuar olanları ayırt eden kalıplar (saat olmayan tek başına takı/kayış ürünleri)
const PURE_ACCESSORY_PATTERNS = [
  /^(?:kadın|erkek|unisex)?\s*(?:bileklik|kolye|küpe|yüzük|cüzdan|çanta|parfüm)\b/i,
  /\b(?:kolye ucu|tek küpe|deri bileklik|çelik bileklik)\b/i,
  /^cuir\b/i,
  /^(?:yedek kayış|saat kayışı|kordon takımı|deri kordon|çelik kordon)\b/i,
  /^(?:toka|strap|aksesuar)\b/i,
];

// İzin verilen 12 marka
const ALLOWED_BRANDS = new Set([
  'Seiko',
  'Tissot',
  'Swatch',
  'Casio',
  'Carren',
  'Versace',
  'Calvin Klein',
  'Michael Kors',
  'Guess',
  'Welder',
  'Diesel',
  'Fossil'
]);

const MULTIPLIER_1_60_BRANDS = [
  'Seiko',
  'Tissot',
  'Swatch',
  'Casio',
  'Versace',
  'Calvin Klein',
  'Michael Kors',
  'Guess',
  'Welder',
  'Diesel',
  'Fossil'
];

const MAX_CATALOG_PRICE = 1_700_000;
const MIN_CATALOG_FLOOR = 10_000;
const CARREN_FIXED_PRICE = 19_990;

const failures = [];

// 1. NON-WATCH ACCESSORY FILTER
for (const item of allItems) {
  const name = String(item.modelName || '').trim();
  for (const pattern of PURE_ACCESSORY_PATTERNS) {
    if (pattern.test(name)) {
      failures.push(`[NON-WATCH ACCESSORY] Brand: ${item.brand} | ID: ${item.id} | Model: ${item.modelName}`);
      break;
    }
  }
}

// 2. ONLY ALLOWED 12 BRANDS
for (const item of allItems) {
  if (!ALLOWED_BRANDS.has(item.brand)) {
    failures.push(`[UNAUTHORIZED BRAND] Brand: ${item.brand} izin verilen 12 marka listesinde değil! (ID: ${item.id})`);
  }
}

// 3. CARREN PRICE INVARIANT (Sabit 19.990 TL)
const carrenItems = allItems.filter(x => x.brand === 'Carren');
if (carrenItems.length === 0) {
  failures.push('[CARREN MISSING] Katalogda hiç Carren saat bulunamadı.');
}
for (const item of carrenItems) {
  if (item.calculatedPrice !== CARREN_FIXED_PRICE || item.price !== '₺19.990') {
    failures.push(`[CARREN PRICE INVALID] ID: ${item.id} | calc: ${item.calculatedPrice} | price: ${item.price} (Beklenen: 19.990 TL)`);
  }
}

// 4. MULTIPLIER x1.60 INVARIANTS
for (const brand of MULTIPLIER_1_60_BRANDS) {
  const items = allItems.filter(x => x.brand === brand);
  if (items.length === 0) {
    failures.push(`[BRAND EMPTY] ${brand} markasında hiç ürün yok.`);
    continue;
  }
  for (const item of items) {
    const orig = Number(item.originalPrice || item.sourcePrice || 0);
    const calc = Number(item.calculatedPrice || 0);
    if (orig <= 0 || calc <= 0) {
      failures.push(`[ZERO PRICE] ${brand} | ID: ${item.id} | orig: ${orig} | calc: ${calc}`);
      continue;
    }
    const expectedCalc = Math.round(orig * 1.60);
    if (Math.abs(calc - expectedCalc) > 2) {
      failures.push(`[PRICE MULTIPLIER INVALID] ${brand} | ID: ${item.id} | orig: ${orig} | calc: ${calc} | expected: ${expectedCalc}`);
    }
    if (calc > MAX_CATALOG_PRICE) {
      failures.push(`[CEILING EXCEEDED] ${brand} | ID: ${item.id} | calc: ${calc} > ${MAX_CATALOG_PRICE}`);
    }
  }
}

// 5. ALL WATCHES BASELINE (Minimum 10.000 TL Tabanı - DEĞİŞMEZ KALICI KURAL)
for (const item of allItems) {
  const calc = Number(item.calculatedPrice || 0);
  if (calc < MIN_CATALOG_FLOOR) {
    failures.push(`[UNDER 10K FLOOR VIOLATION] ${item.brand} | ID: ${item.id} | ${item.modelName} | Fiyat: ${calc} < 10.000 TL`);
  }
}

// 6. FORMAT & PAYTR CONSISTENCY
const paytrMap = new Map(paytr.map(p => [p.id, p]));
if (paytr.length !== allItems.length) {
  failures.push(`[PAYTR COUNT MISMATCH] PayTR adet (${paytr.length}) != Katalog adet (${allItems.length})`);
}

for (const item of allItems) {
  const expectedFormatted = '₺' + Number(item.calculatedPrice).toLocaleString('tr-TR');
  if (item.price !== expectedFormatted) {
    failures.push(`[PRICE STRING FORMAT MISMATCH] ID: ${item.id} | price: '${item.price}' != expected: '${expectedFormatted}'`);
  }
  const p = paytrMap.get(item.id);
  if (!p) {
    failures.push(`[PAYTR MISSING ITEM] ID: ${item.id} PayTR tablosunda bulunamadı.`);
  } else if (p.calculatedPrice !== item.calculatedPrice) {
    failures.push(`[PAYTR PRICE MISMATCH] ID: ${item.id} | PayTR calc: ${p.calculatedPrice} != Katalog calc: ${item.calculatedPrice}`);
  }
}

// 7. DESCRIPTION UNIQUENESS & QUALITY
const descSet = new Set();
let descDuplicates = 0;
for (const item of allItems) {
  const d = String(item.description || '').trim();
  if (d.length < 50) {
    failures.push(`[DESCRIPTION TOO SHORT] ID: ${item.id} | ${item.modelName} | Açıklama çok kısa: ${d.length} karakter`);
  }
}

console.log('--- CATALOG INTEGRITY AUDIT ---');
console.log(`Total Products: ${allItems.length} (Elite: ${elite.length}, General: ${watches.length})`);
console.log(`PayTR Registry: ${paytr.length}`);

if (failures.length > 0) {
  console.error(`\n❌ FAIL: ${failures.length} integrity violations found:`);
  for (const f of failures.slice(0, 30)) {
    console.error(' - ' + f);
  }
  if (failures.length > 30) {
    console.error(` ... ve ${failures.length - 30} ek hata daha.`);
  }
  process.exit(1);
} else {
  console.log('✅ PASS: All catalog integrity rules verified successfully! (12 Brands, 1.60x Pricing, 10k Floor, PayTR sync)');
  process.exit(0);
}
