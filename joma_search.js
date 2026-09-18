const https = require('https');

function search(query) {
  return new Promise((resolve) => {
    // We can just search the HTML
    const options = {
      hostname: 'www.jomashop.com',
      path: `/search?q=${encodeURIComponent(query)}`,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', c => data+=c);
      res.on('end', () => {
         const m = data.match(/https:\/\/cdn2\.jomashop\.com\/media\/catalog\/product\/[^"'\s]+\.jpg/g);
         resolve(m ? [...new Set(m)].slice(0,2) : []);
      });
    });
  });
}

async function run() {
  console.log("Tank Américaine:", await search('Cartier Tank Américaine Large'));
  console.log("Santos Medium:", await search('Cartier Santos Medium WSSA0029'));
  console.log("Pasha Grille:", await search('Cartier Pasha Grille WSPA0026'));
  console.log("Ronde Must:", await search('Cartier Ronde Must 40mm WSRN0032'));
  console.log("Santos Large:", await search('Cartier Santos Large WSSA0018'));
}
run();
