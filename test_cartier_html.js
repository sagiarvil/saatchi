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
    console.log(html.substring(0, 1500));
    
    // find things that look like image urls
    const matches = html.match(/https:\/\/www\.cartier\.com\/dw\/image\/v2\/[^\/]+\/on\/demandware\.static\/[^\s"']+/g);
    if (matches) {
       console.log("Found images:", [...new Set(matches)].slice(0, 5));
    }
  } catch(e) {
    console.log("Error:", e.message);
  }
  await browser.close();
}
run();
