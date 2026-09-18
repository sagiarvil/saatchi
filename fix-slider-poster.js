const fs = require('fs');
let code = fs.readFileSync('src/components/ui/HeroSlider.tsx', 'utf8');

// Add poster paths to SLIDES
code = code.replace(/video: '\/videos\/hero1\.mp4',/g, "video: '/videos/hero1.mp4',\n    poster: '/images/poster-hero1.jpg',\n    mobilePoster: '/images/poster-hero1-mobile.jpg',");
code = code.replace(/video: '\/videos\/hero2\.mp4',/g, "video: '/videos/hero2.mp4',\n    poster: '/images/poster-hero2.jpg',\n    mobilePoster: '/images/poster-hero2-mobile.jpg',");
code = code.replace(/video: '\/videos\/hero3\.mp4',/g, "video: '/videos/hero3.mp4',\n    poster: '/images/poster-hero3.jpg',\n    mobilePoster: '/images/poster-hero3-mobile.jpg',");

// Update mobile video tag
code = code.replace(/src="\$\{slide\.mobileVideo\}"/g, 'src="${slide.mobileVideo}" poster="${slide.mobilePoster}"');

// Update desktop video tag
code = code.replace(/src="\$\{slide\.video\}"/g, 'src="${slide.video}" poster="${slide.poster}"');

fs.writeFileSync('src/components/ui/HeroSlider.tsx', code);
console.log("Replaced posters");
