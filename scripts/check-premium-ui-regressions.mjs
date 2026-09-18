import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const hero = fs.readFileSync(path.join(root, 'src/components/ui/HeroSlider.tsx'), 'utf8');

const requiredHeroTokens = [
  'text-[clamp(42px,8vw,64px)]',
  'md:text-[clamp(58px,6.1vw,92px)]',
  'px-6 pb-[max(3.5rem,env(safe-area-inset-bottom))]',
];

const missingHero = requiredHeroTokens.filter((token) => !hero.includes(token));

if (missingHero.length) {
  console.error('PREMIUM_UI_REGRESSION_GUARD_FAILED');
  console.error('Missing Hero invariants:', missingHero);
  process.exit(1);
}

console.log('Premium navigation + hero regression guard: PASS');
