const https = require('https');
function search(query) {
  return new Promise((resolve) => {
    https.get(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
  });
}
async function run() {
  const data = await search('Cartier W2PN0007');
  const murls = [...data.matchAll(/"murl":"(https:\/\/[^"]+)"/g)].map(m => m[1]);
  console.log("Panthere:", murls.slice(0, 10));
}
run();
