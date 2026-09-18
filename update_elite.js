const fs = require('fs');

const joma = JSON.parse(fs.readFileSync('joma_images.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('src/data/elit-saatler.json', 'utf8'));

let updated = 0;
for (let watch of data) {
    if (watch.id === '5113' || watch.modelName.includes('Tank Américaine Large')) {
        watch.image = joma['Cartier Tank Américaine Large Model Otomatik Paslanmaz Çelik'];
        updated++;
    }
    if (watch.id === '5102' || watch.modelName.includes('Santos de Cartier Medium Model Çelik Otomatik')) {
        watch.image = joma['Cartier Santos de Cartier Medium Model Çelik Otomatik'];
        updated++;
    }
    if (watch.id === '5120' || watch.modelName.includes('Pasha de Cartier Grille 41mm')) {
        watch.image = joma['Cartier Pasha de Cartier Grille 41mm'];
        updated++;
    }
    if (watch.id === '5114' || watch.modelName.includes('Ronde Must de Cartier 40mm')) {
        watch.image = joma['Cartier Ronde Must de Cartier 40mm Otomatik Çelik Kumral Deri'];
        updated++;
    }
    if (watch.id === '5101' || watch.modelName.includes('Santos de Cartier Large Model Çelik Gümüş')) {
        watch.image = joma['Cartier Santos de Cartier Large Model Çelik Gümüş Kadran'];
        updated++;
    }
}

fs.writeFileSync('src/data/elit-saatler.json', JSON.stringify(data, null, 2));
console.log("Updated", updated, "watches.");
