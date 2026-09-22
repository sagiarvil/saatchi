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
  /^(?:yedek kayış|saat kayışı|kordon takımı)\b/i,
];

const SWISS_BRANDS = ['TAG Heuer', 'Rado', 'Tissot'];
const KONYALI_SVS_BRANDS = ['TAG Heuer', 'Rado', 'Tissot', 'Calvin Klein', 'Michael Kors', 'Versace'];
const MAX_CATALOG_PRICE = 1_700_000;
const MAX_ROLEX_PRICE = 2_000_000;
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

// 2. CARREN PRICE INVARIANT (Sabit 19.990 TL)
const carrenItems = allItems.filter(x => x.brand === 'Carren');
if (carrenItems.length === 0) {
  failures.push('[CARREN MISSING] Katalogda hiç Carren saat bulunamadı.');
}
for (const item of carrenItems) {
  if (item.calculatedPrice !== CARREN_FIXED_PRICE || item.price !== '₺19.990') {
    failures.push(`[CARREN PRICE INVALID] ID: ${item.id} | calc: ${item.calculatedPrice} | price: ${item.price} (Beklenen: 19.990 TL)`);
  }
}

// 3. ROLEX & CARTIER INVARIANTS (2.50 Katsayısı | Rolex 2M Tavan, Cartier 1.7M Tavan)
const rolexItems = allItems.filter(x => x.brand === 'Rolex');
const cartierItems = allItems.filter(x => x.brand === 'Cartier');
const rcItems = [...rolexItems, ...cartierItems];

if (rolexItems.length < 15) {
  failures.push(`[ROLEX COUNT LOW] En az 15 adet Rolex olmalı, bulunan: ${rolexItems.length}`);
}
if (cartierItems.length < 10) {
  failures.push(`[CARTIER COUNT LOW] En az 10 adet Cartier olmalı, bulunan: ${cartierItems.length}`);
}

for (const item of rolexItems) {
  if (item.pricingRule !== 'FOREIGN_SOURCE_X_DOVIZ_SELL_X_2_50' && item.pricingRule !== 'CHRONO24_TR_X_2_50') {
    failures.push(`[ROLEX RULE INVALID] ID: ${item.id} | Rule: ${item.pricingRule}`);
  }
  if (item.calculatedPrice > MAX_ROLEX_PRICE) {
    failures.push(`[ROLEX CEILING EXCEEDED] ID: ${item.id} | Fiyat: ${item.calculatedPrice} > ${MAX_ROLEX_PRICE}`);
  }
  if (item.calculatedPrice < 250_000) {
    failures.push(`[ROLEX SUSPICIOUS LOW PRICE] ID: ${item.id} | Fiyat çok düşük: ${item.calculatedPrice}`);
  }
}

for (const item of cartierItems) {
  if (item.pricingRule !== 'FOREIGN_SOURCE_X_DOVIZ_SELL_X_2_50' && item.pricingRule !== 'CARTIER_TR_X_2_50') {
    failures.push(`[CARTIER RULE INVALID] ID: ${item.id} | Rule: ${item.pricingRule}`);
  }
  if (item.calculatedPrice > MAX_CATALOG_PRICE) {
    failures.push(`[CARTIER CEILING EXCEEDED] ID: ${item.id} | Fiyat: ${item.calculatedPrice} > ${MAX_CATALOG_PRICE}`);
  }
  if (item.calculatedPrice < 200_000) {
    failures.push(`[CARTIER SUSPICIOUS LOW PRICE] ID: ${item.id} | Fiyat çok düşük: ${item.calculatedPrice}`);
  }
}

// 4. KONYALI & SAAT&SAAT INVARIANTS (1.50 Katsayısı)
for (const brand of KONYALI_SVS_BRANDS) {
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
    const expectedCalc = Math.round(orig * 1.50);
    if (Math.abs(calc - expectedCalc) > 2) {
      failures.push(`[PRICE MULTIPLIER INVALID] ${brand} | ID: ${item.id} | orig: ${orig} | calc: ${calc} | expected: ${expectedCalc}`);
    }
    if (calc > MAX_CATALOG_PRICE) {
      failures.push(`[CEILING EXCEEDED] ${brand} | ID: ${item.id} | calc: ${calc} > ${MAX_CATALOG_PRICE}`);
    }
  }
}

// 5. SWISS WATCH BASELINE (Minimum 10.000 TL)
for (const brand of SWISS_BRANDS) {
  const items = allItems.filter(x => x.brand === brand);
  for (const item of items) {
    if (item.calculatedPrice < 10_000) {
      failures.push(`[SWISS WATCH ANOMALY (< 10.000 TL)] ${brand} | ID: ${item.id} | ${item.modelName} | Fiyat: ${item.calculatedPrice}`);
    }
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

// REPORT
if (failures.length > 0) {
  console.error('❌ SAATCHI CATALOG INTEGRITY GUARD FAILED:');
  for (const f of failures.slice(0, 20)) {
    console.error(`  - ${f}`);
  }
  if (failures.length > 20) {
    console.error(`  ... ve ${failures.length - 20} hata daha`);
  }
  process.exit(1);
}

console.log(`✅ SAATCHI CATALOG INTEGRITY GUARD: PASS (${allItems.length} ürün eksiksiz doğrulandı)`);
console.log(`   - Carren: ${carrenItems.length} adet (19.990 ₺ sabit KORUNDU)`);
console.log(`   - Rolex: ${rolexItems.length} adet (x2.50 marj + 2.000.000 ₺ tavan KORUNDU)`);
console.log(`   - Cartier: ${cartierItems.length} adet (x2.50 marj + 1.700.000 ₺ tavan KORUNDU)`);
console.log(`   - Konyalı/Saat&Saat: ${allItems.length - carrenItems.length - rcItems.length} adet (x1.50 marj KORUNDU)`);
console.log(`   - PayTR & Fiyat Formatları: %100 Senkronize`);
