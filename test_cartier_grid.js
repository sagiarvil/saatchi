const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('https://www.cartier.com/tr-tr/saatler/koleksi%CC%87yonlar/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
    const html = await page.content();
    const watches = await page.evaluate(() => {
       const items = Array.from(document.querySelectorAll('.product-tile'));
       return items.map(el => {
          const titleEl = el.querySelector('.product-tile-title');
          const imgEl = el.querySelector('img.tile-image');
          return {
             title: titleEl ? titleEl.innerText.trim() : '',
             img: imgEl ? (imgEl.getAttribute('data-src') || imgEl.getAttribute('src')) : ''
          };
       }).filter(x => x.title);
    });
    console.log(JSON.stringify(watches, null, 2));
  } catch(e) {
    console.log("Error:", e.message);
  }
  await browser.close();
}
run();
