const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    const q = encodeURIComponent('Rolex 126000 Celebration front view');
    await page.goto(`https://duckduckgo.com/?q=${q}&iax=images&ia=images`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const imgUrl = await page.evaluate(() => {
       const imgs = Array.from(document.querySelectorAll('img.tile--img__img'));
       return imgs.length > 0 ? 'https:' + imgs[0].getAttribute('src') : null;
    });
    console.log("DDG Celebration:", imgUrl);
  } catch(e) {}
  await browser.close();
}
run();
