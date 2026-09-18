const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  const watches = [
    { name: 'Cartier Tank Américaine Large Model Otomatik Paslanmaz Çelik', query: 'Cartier WSTA0018' },
    { name: 'Cartier Santos de Cartier Medium Model Çelik Otomatik', query: 'Cartier WSSA0029' },
    { name: 'Cartier Pasha de Cartier Grille 41mm', query: 'Cartier WSPA0026' },
    { name: 'Cartier Ronde Must de Cartier 40mm Otomatik Çelik Kumral Deri', query: 'Cartier WSRN0032' },
    { name: 'Cartier Santos de Cartier Large Model Çelik Gümüş Kadran', query: 'Cartier WSSA0018' }
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
           results[watch.name] = imgUrl.replace(/\?.*/, ''); // remove query params if any
           console.log("Found:", results[watch.name]);
        } else {
           console.log("Not found for", watch.name);
        }
      } catch (e) {
        console.log("Error:", e.message);
      }
      await page.close();
  }
  
  fs.writeFileSync('joma_images.json', JSON.stringify(results, null, 2));
  await browser.close();
}
run();
