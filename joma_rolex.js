const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  const watches = [
    { name: 'Rolex Submariner No Date 41mm Oystersteel', query: 'Rolex 124060' },
    { name: 'Rolex Oyster Perpetual 36mm Celebration', query: 'Rolex 126000 Celebration' },
    { name: 'Rolex Explorer 36mm Oystersteel Siyah Kadran', query: 'Rolex 124270' }
  ];

  const results = {};

  for (let watch of watches) {
      const page = await context.newPage();
      try {
        console.log("Searching: " + watch.query);
        await page.goto(`https://www.jomashop.com/search?q=${encodeURIComponent(watch.query)}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3000);
        
        const imgUrl = await page.evaluate(() => {
           const img = document.querySelector('img[src*="cdn2.jomashop.com/media/catalog/product"]');
           return img ? img.src : null;
        });
        
        if (imgUrl) {
           results[watch.name] = imgUrl.replace(/\?.*/, ''); 
           console.log("Found:", results[watch.name]);
        } else {
           console.log("Not found for", watch.name);
        }
      } catch (e) {
        console.log("Error:", e.message);
      }
      await page.close();
  }
  
  fs.writeFileSync('joma_rolex_images.json', JSON.stringify(results, null, 2));
  await browser.close();
}
run();
