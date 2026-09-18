const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  const watches = [
    { name: 'Cartier Tank Américaine Large Model Otomatik Paslanmaz Çelik', query: 'Cartier WSTA0018 watch front view white background' },
    { name: 'Cartier Santos de Cartier Medium Model Çelik Otomatik', query: 'Cartier WSSA0029 watch front view white background' },
    { name: 'Cartier Pasha de Cartier Grille 41mm', query: 'Cartier WSPA0026 watch front view white background' },
    { name: 'Cartier Ronde Must de Cartier 40mm Otomatik Çelik Kumral Deri', query: 'Cartier WSRN0032 watch front view white background' },
    { name: 'Cartier Santos de Cartier Large Model Çelik Gümüş Kadran', query: 'Cartier WSSA0018 watch front view white background' }
  ];

  const results = {};

  for (let watch of watches) {
      const page = await context.newPage();
      try {
        console.log("Searching: " + watch.query);
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(watch.query)}&tbm=isch`, { waitUntil: 'domcontentloaded' });
        
        // Wait for first image result to appear and click it
        await page.waitForSelector('div[data-ri="0"]');
        await page.click('div[data-ri="0"]');
        
        // Wait for the side panel full image to load
        // Google usually puts the full image in a tag like img.n3VNCb or similar in the side panel
        await page.waitForTimeout(3000);
        
        const imgUrl = await page.evaluate(() => {
           // The full res image usually has a src starting with http and is NOT encrypted/base64
           const imgs = Array.from(document.querySelectorAll('img')).filter(img => {
               const src = img.getAttribute('src');
               return src && src.startsWith('http') && !src.includes('gstatic') && img.width > 200;
           });
           return imgs.length > 0 ? imgs[imgs.length - 1].src : null;
        });
        
        if (imgUrl) {
           results[watch.name] = imgUrl;
           console.log("Found:", imgUrl);
        } else {
           console.log("Not found for", watch.name);
        }
      } catch (e) {
        console.log("Error:", e.message);
      }
      await page.close();
  }
  
  fs.writeFileSync('google_images.json', JSON.stringify(results, null, 2));
  await browser.close();
}
run();
