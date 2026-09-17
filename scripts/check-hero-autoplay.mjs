import { readFileSync } from 'node:fs';

const path = 'src/components/ui/HeroSlider.tsx';
const source = readFileSync(path, 'utf8');

const requirements = [
  ['single active video architecture', (source.match(/<video\b/g) || []).length === 1],
  ['React autoplay attribute', /\bautoPlay\b/.test(source)],
  ['muted autoplay', /\bmuted\b/.test(source)],
  ['inline playback', /\bplaysInline\b/.test(source)],
  ['mobile hero1 source', source.includes("/videos/hero1-mobile.mp4")],
  ['mobile hero2 source', source.includes("/videos/hero2-mobile.mp4")],
  ['mobile hero3 source', source.includes("/videos/hero3-mobile.mp4")],
  ['mobile source media query', /<source\s+media="\(max-width: 767px\)"/.test(source)],
  ['imperative muted fallback', source.includes("video.defaultMuted = true")],
  ['webkit inline fallback', source.includes("webkit-playsinline")],
  ['no injected video markup', !source.includes('dangerouslySetInnerHTML')],
];

const failed = requirements.filter(([, ok]) => !ok).map(([name]) => name);

if (failed.length > 0) {
  console.error(`Hero autoplay regression detected: ${failed.join(', ')}`);
  process.exit(1);
}

console.log('Hero autoplay regression guard: PASS');
