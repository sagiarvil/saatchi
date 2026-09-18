const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    const q = encodeURIComponent('site:cartier.com "watch" demandware.static images/large png');
    await page.goto(`https://www.bing.com/images/search?q=${q}&qft=+filterui:aspect-square`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    const imgUrls = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img.mimg'));
      return imgs.map(img => {
         const a = img.closest('a');
         if (a) {
            const m = a.getAttribute('m');
            if (m) {
               try {
                 const mData = JSON.parse(m);
                 return mData.murl;
               } catch(e){}
            }
         }
         return null;
      }).filter(url => url && url.includes('demandware.static') && url.includes('images/large'));
    });
    console.log("Good Cartier Images:", imgUrls.slice(0, 10));
  } catch(e) {}
  await browser.close();
}
run();
