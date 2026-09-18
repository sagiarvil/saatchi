const https = require('https');

function search(query) {
  return new Promise((resolve, reject) => {
    const q = encodeURIComponent(query);
    const options = {
      hostname: 'www.bing.com',
      path: `/images/search?q=${q}`,
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const murls = [];
        const regex = /"murl":"(https:\/\/[^"]+)"/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
          murls.push(match[1]);
        }
        resolve(murls);
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  const panthere = await search('Cartier CRW2PN0007 watch front view');
  console.log("Panthere:", panthere.filter(u => u.includes('demandware.static') && u.includes('large')).slice(0, 3));
  
  const baignoire = await search('Cartier CRWGBA0014 watch front view');
  console.log("Baignoire:", baignoire.filter(u => u.includes('demandware.static') && u.includes('large')).slice(0, 3));
  
  const santos = await search('Cartier CRW2SA0016 watch front view');
  console.log("Santos Two-Tone:", santos.filter(u => u.includes('demandware.static') && u.includes('large')).slice(0, 3));
}
run();
