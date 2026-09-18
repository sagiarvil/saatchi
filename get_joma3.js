const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.jomashop.com/search?q=${encodeURIComponent('Rolex Celebration')}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    
    const imgUrls = await page.evaluate(() => {
       const imgs = Array.from(document.querySelectorAll('img[src*="cdn2.jomashop.com/media/catalog/product"]'));
       return imgs.map(img => img.src);
    });
    console.log("Celebration:", imgUrls.slice(0,3));
  } catch(e) {}
  await browser.close();
}
run();
