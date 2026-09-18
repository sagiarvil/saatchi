const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('https://html.duckduckgo.com/html/?q=CRW2PN0007', { waitUntil: 'domcontentloaded' });
    const html = await page.content();
    const links = html.match(/https?:\/\/[^\s"'><]+/g);
    const cartierLinks = links.filter(l => l.includes('cartier.com') && l.includes('demandware'));
    console.log("DDG Links:", cartierLinks);
  } catch(e) { console.log(e); }
  await browser.close();
}
run();
