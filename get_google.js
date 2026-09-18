const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    const q = encodeURIComponent('Cartier W2PN0007 watch front view cartier.com');
    await page.goto(`https://www.google.com/search?q=${q}&tbm=isch`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    const urls = await page.evaluate(() => {
       const imgs = Array.from(document.querySelectorAll('img'));
       return imgs.map(img => img.src).filter(src => src.startsWith('http') && !src.includes('gstatic'));
    });
    console.log("Panthere Google:", urls.slice(0, 5));
  } catch(e) {}
  await browser.close();
}
run();
