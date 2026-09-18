const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('https://www.cartier.com/tr-tr/CRW2PN0007', { waitUntil: 'domcontentloaded', timeout: 30000 });
    const imgUrl = await page.evaluate(() => {
       const img = document.querySelector('img[src*="demandware"][src*="png"]');
       return img ? (img.getAttribute('data-src') || img.getAttribute('src')) : null;
    });
    console.log("Panthere:", imgUrl);
    
    await page.goto('https://www.cartier.com/tr-tr/CRWGBA0014', { waitUntil: 'domcontentloaded', timeout: 30000 }); // Baignoire Small Model
    const imgUrl2 = await page.evaluate(() => {
       const img = document.querySelector('img[src*="demandware"][src*="png"]');
       return img ? (img.getAttribute('data-src') || img.getAttribute('src')) : null;
    });
    console.log("Baignoire:", imgUrl2);

  } catch(e) {
    console.log("Error:", e.message);
  }
  await browser.close();
}
run();
