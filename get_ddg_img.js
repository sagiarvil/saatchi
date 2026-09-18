const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  const watches = [
    { name: 'Cartier Panthère de Cartier Medium Model 18K Sarı Altın', query: 'CRW2PN0007 cartier.com "demandware.static" png' },
    { name: 'Cartier Baignoire Small Model 18K Sarı Altın', query: 'CRWGBA0014 cartier.com "demandware.static" png' },
    { name: 'Cartier Santos de Cartier 18K Sarı Altın & Çelik', query: 'CRW2SA0016 cartier.com "demandware.static" png' },
    { name: 'Cartier Tank Louis Cartier Small 18K Pembe Altın', query: 'CRWGTA0010 cartier.com "demandware.static" png' },
    { name: 'Cartier Santos de Cartier Large Model Çelik Gümüş', query: 'CRWSSA0018 cartier.com "demandware.static" png' }
  ];

  for (let watch of watches) {
      const page = await context.newPage();
      try {
        const q = encodeURIComponent(watch.query);
        await page.goto(`https://html.duckduckgo.com/html/?q=${q}`, { waitUntil: 'domcontentloaded' });
        
        const html = await page.content();
        const matches = html.match(/https?:\/\/[a-zA-Z0-9\-\.]+\.cartier\.com\/dw\/image\/v2\/[^\/]+\/on\/demandware\.static\/[^\s"'\?&]+/g);
        
        if (matches && matches.length > 0) {
           console.log(watch.name, "=>", matches[0] + '?sw=750&sh=750&sm=fit&sfrm=png');
        } else {
           console.log(watch.name, "=> Not found");
        }
      } catch (e) {
        console.log("Error:", e.message);
      }
      await page.close();
  }
  
  await browser.close();
}
run();
