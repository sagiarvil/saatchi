const fs = require('fs');

let content = fs.readFileSync('src/components/ui/HeroSlider.tsx', 'utf8');

// We add a useEffect that finds all videos and forces them to play repeatedly, 
// and also binds to global events to ensure play on first touch.

const forcePlayLogic = `
  // Force videos to play on all devices, bypassing Low Power Mode / Reduce Motion constraints by attaching to any interaction
  useEffect(() => {
    const playVideos = () => {
      document.querySelectorAll('video').forEach(video => {
        if (video.paused) {
          video.play().catch(() => {
            // Silently catch OS blocks
          });
        }
      });
    };

    // Try to play immediately
    playVideos();
    
    // Some devices require user interaction to unlock media playback
    const events = ['touchstart', 'touchend', 'click', 'scroll', 'mousemove'];
    events.forEach(event => {
      window.addEventListener(event, playVideos, { once: false, passive: true });
    });

    // Also brute-force attempt every 2 seconds for aggressive overrides
    const interval = setInterval(playVideos, 2000);

    return () => {
      events.forEach(event => window.removeEventListener(event, playVideos));
      clearInterval(interval);
    };
  }, [current]);
`;

content = content.replace(
  'useEffect(() => {',
  forcePlayLogic + '\n  useEffect(() => {'
);

fs.writeFileSync('src/components/ui/HeroSlider.tsx', content);
