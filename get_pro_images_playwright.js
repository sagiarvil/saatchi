const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  const watches = [
    { name: 'Cartier Tank Américaine Large Model Otomatik Paslanmaz Çelik', q: 'Cartier WSTA0018 watch front view white background' },
    { name: 'Cartier Santos de Cartier Medium Model Çelik Otomatik', q: 'Cartier WSSA0029 watch front view white background' },
    { name: 'Cartier Pasha de Cartier Grille 41mm', q: 'Cartier WSPA0026 watch front view white background' },
    { name: 'Cartier Ronde Must de Cartier 40mm Otomatik Çelik Kumral Deri', q: 'Cartier WSRN0032 watch front view white background' },
    { name: 'Cartier Santos de Cartier Large Model Çelik Gümüş Kadran', q: 'Cartier WSSA0018 watch front view white background' }
  ];

  const results = {};

  for (let watch of watches) {
      const page = await context.newPage();
      try {
        console.log("Searching: " + watch.q);
        await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(watch.q)}&iax=images&ia=images`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        const imgUrl = await page.evaluate(() => {
           // Duckduckgo images have class tile--img__img
           const imgs = Array.from(document.querySelectorAll('img.tile--img__img'));
           for (let img of imgs) {
              const src = img.getAttribute('src');
              if (src && src.startsWith('//')) {
                 return 'https:' + src;
              }
           }
           return null;
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
  
  fs.writeFileSync('pro_images.json', JSON.stringify(results, null, 2));
  await browser.close();
}
run();
