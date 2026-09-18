const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  const watches = [
    { name: 'Cartier Tank Américaine Large Model Otomatik Paslanmaz Çelik', url: 'https://www.chrono24.com.tr/cartier/ref-wsta0018.htm' },
    { name: 'Cartier Santos de Cartier Medium Model Çelik Otomatik', url: 'https://www.chrono24.com.tr/cartier/ref-wssa0029.htm' },
    { name: 'Cartier Pasha de Cartier Grille 41mm', url: 'https://www.chrono24.com.tr/cartier/ref-wspa0026.htm' },
    { name: 'Cartier Ronde Must de Cartier 40mm Otomatik Çelik Kumral Deri', url: 'https://www.chrono24.com.tr/cartier/ref-wsrn0032.htm' },
    { name: 'Cartier Santos de Cartier Large Model Çelik Gümüş Kadran', url: 'https://www.chrono24.com.tr/cartier/ref-wssa0018.htm' }
  ];

  const results = {};

  for (let watch of watches) {
      const page = await context.newPage();
      try {
        console.log("Navigating to: " + watch.url);
        await page.goto(watch.url, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3000);
        
        const imgUrl = await page.evaluate(() => {
           // Find the first image in the article list
           const img = document.querySelector('.article-item-container img, .article-image-container img');
           if (img) {
               return img.getAttribute('src') || img.getAttribute('data-original');
           }
           return null;
        });
        
        if (imgUrl) {
           results[watch.name] = imgUrl.replace('Focus_360', 'Square').replace('Focus_320', 'Square').replace('Portrait', 'Square');
           console.log("Found:", results[watch.name]);
        } else {
           console.log("Not found for", watch.name);
        }
      } catch (e) {
        console.log("Error:", e.message);
      }
      await page.close();
  }
  
  fs.writeFileSync('c24_images.json', JSON.stringify(results, null, 2));
  await browser.close();
}
run();
