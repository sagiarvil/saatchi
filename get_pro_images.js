const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  const watches = [
    { name: 'Cartier Tank Américaine Large', query: 'Cartier Tank Américaine Large watch front view' },
    { name: 'Cartier Santos de Cartier Medium Model', query: 'Cartier Santos de Cartier Medium WSSA0029 front view' },
    { name: 'Cartier Pasha de Cartier Grille 41mm', query: 'Cartier Pasha de Cartier Grille 41mm WSPA0026 front view' },
    { name: 'Cartier Ronde Must de Cartier 40mm', query: 'Cartier Ronde Must de Cartier 40mm WSRN0032 front view' },
    { name: 'Cartier Santos de Cartier Large Model', query: 'Cartier Santos de Cartier Large WSSA0018 front view' }
  ];

  for (let watch of watches) {
      const page = await context.newPage();
      try {
        const q = encodeURIComponent(`${watch.query} site:chrono24.com`);
        await page.goto(`https://html.duckduckgo.com/html/?q=${q}`, { waitUntil: 'domcontentloaded' });
        
        const html = await page.content();
        const matches = html.match(/https:\/\/cdn2\.chrono24\.com\/images\/uhren\/[^"&'\s]+/g);
        
        if (matches && matches.length > 0) {
           console.log(watch.name, "=>", matches[0]);
        } else {
           console.log(watch.name, "=> Not found on C24, trying general DDG...");
           await page.goto(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(watch.query + " filetype:png")}`, { waitUntil: 'domcontentloaded' });
           const html2 = await page.content();
           const matches2 = html2.match(/https:\/\/[^\s"'><]+?\.png/gi);
           if (matches2) {
               console.log(watch.name, "=>", matches2.find(u => u.includes('watch') || u.includes('cartier')));
           }
        }
      } catch (e) {
        console.log("Error:", e.message);
      }
      await page.close();
  }
  
  await browser.close();
}
run();
