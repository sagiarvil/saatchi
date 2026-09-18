const fs = require('fs');
let code = fs.readFileSync('src/components/ui/HeroSlider.tsx', 'utf8');

// The video element is currently:
// <video key={activeSlide.id} ref={videoRef} autoPlay loop muted playsInline preload="auto" controls={false} disablePictureInPicture aria-hidden="true" data-hero-video="true" onPlaying={() => setMediaState('playing')} onError={handleVideoError} onStalled={() => setMediaState((state) => (state === 'playing' || state === 'failed' ? state : 'blocked'))} className={`absolute inset-0 z-[1] block h-full w-full object-cover object-center contrast-[1.15] saturate-[0.80] brightness-[0.75] transition-opacity duration-500 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`} style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translate3d(0,0,0)' }}>

// Replace `block h-full` with `hidden md:block h-full`
code = code.replace(
  /className=\{`absolute inset-0 z-\[1\] block h-full w-full/g,
  'className={`absolute inset-0 z-[1] hidden md:block h-full w-full'
);

// We should also remove the mobile source from the video to save bandwidth on mobile if possible, but leaving it is fine since we hide it. Actually let's just insert the image before the video.
const imgTag = `\n        <img src="/images/mobile-hero-rolex.jpg" alt="Saatchi Luxury" className="absolute inset-0 z-[1] block h-full w-full object-cover object-center contrast-[1.10] saturate-[0.85] brightness-[0.70] md:hidden" />\n`;

code = code.replace(
  /<video key=\{activeSlide\.id\}/,
  imgTag + '        <video key={activeSlide.id}'
);

fs.writeFileSync('src/components/ui/HeroSlider.tsx', code);
console.log("HeroSlider updated");
