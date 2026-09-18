const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function run() {
  const data = JSON.parse(fs.readFileSync('src/data/elit-saatler.json', 'utf8'));
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  for (let watch of data) {
    if (watch.modelName.includes('Tank Française Medium Model')) {
      const page = await context.newPage();
      try {
        const q = encodeURIComponent('Cartier Tank Française Medium watch demandware.static site:cartier.com');
        await page.goto(`https://www.bing.com/images/search?q=${q}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2000);
        
        const imgUrl = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img.mimg'));
          for (let img of imgs) {
             const a = img.closest('a');
             if (a) {
                const m = a.getAttribute('m');
                if (m) {
                   try {
                     const mData = JSON.parse(m);
                     if (mData.murl && mData.murl.includes('demandware.static') && mData.murl.includes('.png')) {
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
           watch.image = imgUrl.split('?')[0] + '?sw=750&sh=750&sm=fit&sfrm=png';
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
