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
  const panthere = await search('CRW2PN0007 Cartier watch demandware');
  console.log("Panthere:", panthere.find(u => u.includes('demandware')));
  
  const baignoire = await search('CRWGBA0014 Cartier watch demandware');
  console.log("Baignoire:", baignoire.find(u => u.includes('demandware')));
  
  const santos = await search('CRW2SA0016 Cartier watch demandware');
  console.log("Santos Two-Tone:", santos.find(u => u.includes('demandware')));
  
  const louis = await search('CRWGTA0010 Cartier watch demandware');
  console.log("Louis Cartier:", louis.find(u => u.includes('demandware')));
}
run();
