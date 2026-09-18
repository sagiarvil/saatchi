const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/elit-saatler.json', 'utf8'));

let updated = 0;
for (let watch of data) {
    if (watch.id === '5011' || watch.modelName === 'Rolex Submariner No Date 41mm Oystersteel') {
        watch.image = 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-submariner-automatic-chronometer-black-dial-mens-watch-124060bkso-m1240600001_1.jpg';
        updated++;
    }
    if (watch.id === '5019' || watch.modelName === 'Rolex Oyster Perpetual 36mm Kutlama (Celebration) Kadran') {
        // Using the Tiffany Blue (Turquoise) packshot as it perfectly matches the base color and is an ultra-premium packshot
        watch.image = 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/r/o/rolex-oyster-perpetual-36-automatic-chronometer-tiffany-blue-dial-watch-126000tqblso-m1260000006.jpg';
        updated++;
    }
    if (watch.id === '5014' || watch.modelName === 'Rolex Explorer 36mm Oystersteel Siyah Kadran') {
        watch.image = 'https://cdn2.jomashop.com/media/catalog/product/cache/9d6243d99187096e972f05545e39058c/p/r/preowned-rolex-explorer-automatic-chronometer-black-dial-mens-watch-214270bkaso3.jpg';
        updated++;
    }
}

fs.writeFileSync('src/data/elit-saatler.json', JSON.stringify(data, null, 2));
console.log("Updated", updated, "watches.");
