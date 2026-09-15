const fs = require('fs');
const path = require('path');

const elitPath = 'src/data/elit-saatler.json';
const saatPath = 'src/data/saatler.json';

let allWatches = [];

if (fs.existsSync(saatPath)) {
    allWatches = allWatches.concat(JSON.parse(fs.readFileSync(saatPath, 'utf8')));
}
if (fs.existsSync(elitPath)) {
    allWatches = allWatches.concat(JSON.parse(fs.readFileSync(elitPath, 'utf8')));
}

const allCatalog = allWatches.map(w => {
    return {
        id: w.id || Math.random().toString(36).substring(7),
        brand: w.brand || 'Luxury Watch',
        modelName: w.modelName,
        title: w.modelName, // for admin search compatibility
        price: w.price,
        calculatedPrice: w.calculatedPrice,
        image: w.image,
        category: w.category || 'saat'
    };
});

const dataJsContent = `
// ==========================================================
// SAATCHI — MASTER ÜRÜN VE KOLEKSİYON VERİTABANI
// ==========================================================

const allCatalog = ${JSON.stringify(allCatalog, null, 2)};
`;

fs.writeFileSync('public/js/data.js', dataJsContent);
console.log("data.js successfully overwritten with real Saatchi data.");
