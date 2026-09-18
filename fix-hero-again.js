const fs = require('fs');
let code = fs.readFileSync('src/components/ui/HeroSlider.tsx', 'utf8');

// Add poster paths to SLIDES
code = code.replace(/video: '\/videos\/hero1\.mp4',/g, "video: '/videos/hero1.mp4',\n    poster: '/images/poster-hero1.jpg',\n    mobilePoster: '/images/poster-hero1-mobile.jpg',");
code = code.replace(/video: '\/videos\/hero2\.mp4',/g, "video: '/videos/hero2.mp4',\n    poster: '/images/poster-hero2.jpg',\n    mobilePoster: '/images/poster-hero2-mobile.jpg',");
code = code.replace(/video: '\/videos\/hero3\.mp4',/g, "video: '/videos/hero3.mp4',\n    poster: '/images/poster-hero3.jpg',\n    mobilePoster: '/images/poster-hero3-mobile.jpg',");

// The video element in ec755f74:
// <video key={activeSlide.id} ref={videoRef} autoPlay loop muted playsInline preload="auto" controls={false} ... >
// We add poster={activeSlide.mobilePoster} but wait! <video poster="..."> only takes one string!
// If we are using CSS/media queries, we can't switch the poster attribute easily via CSS!
// Wait! If the user is on mobile, `poster-hero1-mobile.jpg` is a portrait image. 
// If they are on desktop, `poster-hero1.jpg` is landscape.
// But we only have one <video> tag!
// We can use a trick: poster={activeSlide.video.includes('hero1') ? '/images/poster-hero1-mobile.jpg' : ...} wait, we can't media query the poster.
// Since mobile is the main problem, using the mobile poster or a generic poster is fine, or we can just leave it as mobilePoster and desktop users will see a cropped version for 0.1s.
// Actually, Safari iOS will show the poster. Desktop Chrome will just load the video instantly.
// So `poster={activeSlide.mobilePoster}` is perfect for the <video> tag!
code = code.replace(/<video\n          key=\{activeSlide\.id\}/g, "<video\n          key={activeSlide.id}\n          poster={activeSlide.mobilePoster}");

// Also lighten the overlays for mobile!
code = code.replace(
  /h-2\/3 bg-gradient-to-t from-black\/95 via-black\/45 to-transparent/g,
  'h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent'
);
code = code.replace(
  /bg-\[#0a0a0a\]\/25 mix-blend-multiply/g,
  'bg-[#0a0a0a]/15 mix-blend-multiply'
);
code = code.replace(
  /from-transparent via-black\/35 to-black\/85/g,
  'from-transparent via-black/25 to-black/75'
);

fs.writeFileSync('src/components/ui/HeroSlider.tsx', code);
console.log("Fixed HeroSlider again");
