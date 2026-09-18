const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    // Go to the main watches page
    await page.goto('https://www.cartier.com/tr-tr/saatler/koleksi%CC%87yonlar/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
    
    // Scroll down to load lazy images
    for (let i = 0; i < 5; i++) {
        await page.mouse.wheel(0, 1000);
        await page.waitForTimeout(1000);
    }
    
    const watches = await page.evaluate(() => {
       // Cartier typically uses article or specific div classes
       const items = Array.from(document.querySelectorAll('.product, article, [data-pid]'));
       return items.map(el => {
          const titleEl = el.querySelector('.pdp-link a, .product-name, h2, h3');
          const imgEl = el.querySelector('img.tile-image, img');
          if (!titleEl || !imgEl) return null;
          
          let title = titleEl.innerText.trim();
          // Fallback to aria-label or alt if title is empty
          if (!title) title = imgEl.getAttribute('alt') || '';
          
          let img = imgEl.getAttribute('data-src') || imgEl.getAttribute('src');
          return { title, img };
       }).filter(x => x && x.title && x.img && x.img.includes('demandware'));
    });
    
    console.log(`Extracted ${watches.length} watches from DOM`);
    
    const data = JSON.parse(fs.readFileSync('src/data/elit-saatler.json', 'utf8'));
    
    let updatedCount = 0;
    
    for (let w of data) {
       if (w.brand === 'Cartier') {
           // Find the best match in our scraped watches
           // A simple inclusion test, ignoring case
           const targetName = w.modelName.toLowerCase().replace('çelik kordon', '').replace('bilezik', '').trim();
           let bestMatch = null;
           for (let scraped of watches) {
               if (scraped.title.toLowerCase().includes('cartier')) {
                   // if the scraped title has some overlapping keywords
                   const words = targetName.split(' ').filter(word => word.length > 3 && word !== 'cartier' && word !== 'model' && word !== 'otomatik' && word !== 'çelik');
                   let matchCount = 0;
                   for (let word of words) {
                       if (scraped.title.toLowerCase().includes(word)) matchCount++;
                   }
                   if (matchCount >= words.length - 1) { // mostly matches
                       bestMatch = scraped;
                       break;
                   }
               }
           }
           
           if (bestMatch) {
               console.log(`Matched: ${w.modelName} -> ${bestMatch.img}`);
               // Use sw=750&sh=750
               const base = bestMatch.img.split('?')[0];
               w.image = `${base}?sw=750&sh=750&sm=fit&sfrm=png`;
               updatedCount++;
           } else {
               console.log(`NO MATCH FOR: ${w.modelName}`);
           }
       }
    }
    
    fs.writeFileSync('src/data/elit-saatler.json', JSON.stringify(data, null, 2));
    console.log(`Updated ${updatedCount} Cartier watches.`);
    
  } catch(e) {
    console.log("Error:", e.message);
  }
  await browser.close();
}
run();
