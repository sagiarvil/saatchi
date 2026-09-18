const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function run() {
  const data = JSON.parse(fs.readFileSync('src/data/elit-saatler.json', 'utf8'));
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  for (let watch of data) {
    if (watch.brand === 'Cartier') {
      const page = await context.newPage();
      try {
        console.log("Searching for: " + watch.modelName);
        // Go to bing images to bypass google's strict captchas
        const q = encodeURIComponent(watch.modelName + ' site:cartier.com');
        await page.goto(`https://www.bing.com/images/search?q=${q}`, { waitUntil: 'domcontentloaded' });
        
        // Wait for images to load
        await page.waitForTimeout(2000);
        
        const imgUrl = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img.mimg'));
          for (let img of imgs) {
             let src = img.getAttribute('src') || img.getAttribute('data-src') || '';
             // Bing image results sometimes have the original source in m object
             const a = img.closest('a');
             if (a) {
                const m = a.getAttribute('m');
                if (m) {
                   try {
                     const mData = JSON.parse(m);
                     if (mData.murl && (mData.murl.includes('cartier.com') || mData.murl.includes('demandware'))) {
                        return mData.murl;
                     }
                   } catch(e){}
                }
             }
          }
          return null;
        });
        
        if (imgUrl) {
           console.log("Found: " + imgUrl);
           watch.image = imgUrl;
        } else {
           console.log("Not found via bing murl, checking fallback");
        }
      } catch (e) {
        console.log("Error: " + e.message);
      }
      await page.close();
    }
  }
  
  fs.writeFileSync('src/data/elit-saatler.json', JSON.stringify(data, null, 2));
  await browser.close();
}

run();
