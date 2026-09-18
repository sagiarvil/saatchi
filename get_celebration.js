const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    const q = encodeURIComponent('Rolex 126000 Celebration');
    await page.goto(`https://www.prestigetime.com/search?q=${q}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    
    const imgUrl = await page.evaluate(() => {
       const img = document.querySelector('img.img-responsive'); // prestige time image class
       return img ? img.src : null;
    });
    
    console.log("PrestigeTime Celebration:", imgUrl);
    
  } catch(e) {}
  await browser.close();
}
run();
