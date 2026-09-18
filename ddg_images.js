const { image_search } = require('duckduckgo-images-api');

async function searchWatch(name) {
   const results = await image_search({ query: name + " watch white background front", moderate: true, iterations: 1 });
   const valid = results.filter(r => (r.image.includes('jomashop') || r.image.includes('chrono24') || r.image.includes('cartier') || r.image.includes('prestigetime')) && r.image.includes('.png') || r.image.includes('.jpg'));
   return valid.length > 0 ? valid[0].image : (results.length > 0 ? results[0].image : null);
}

async function run() {
   console.log("Américaine:", await searchWatch('Cartier WSTA0018'));
   console.log("Santos Medium:", await searchWatch('Cartier WSSA0029'));
   console.log("Pasha Grille:", await searchWatch('Cartier WSPA0026'));
   console.log("Ronde Must:", await searchWatch('Cartier WSRN0032'));
   console.log("Santos Large:", await searchWatch('Cartier WSSA0018'));
}
run();
