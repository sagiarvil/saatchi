const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/elit-saatler.json', 'utf8'));

console.log("Cartier images:");
data.filter(w => w.brand === 'Cartier').forEach(w => {
   console.log(`${w.modelName}: \n  ${w.image}`);
});
