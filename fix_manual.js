const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/elit-saatler.json', 'utf8'));

for (let watch of data) {
    if (watch.modelName === 'Cartier Santos de Cartier 18K Sarı Altın & Çelik İki Tonlu Medium') {
        watch.image = 'https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwe28fc633/images/large/5fd1b28d5c7051e4b4b8898ac235c52a.png?sw=750&sh=750&sm=fit&sfrm=png';
    }
}

fs.writeFileSync('src/data/elit-saatler.json', JSON.stringify(data, null, 2));
console.log("Updated Santos Two-Tone");
