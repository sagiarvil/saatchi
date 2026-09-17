import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const navbar = fs.readFileSync(path.join(root, 'src/components/layout/Navbar.tsx'), 'utf8');
const hero = fs.readFileSync(path.join(root, 'src/components/ui/HeroSlider.tsx'), 'utf8');

const requiredNavbarTokens = [
  'Elit Saatler',
  'Diğer Saat Kategorisi',
  "name: 'Rolex'",
  "name: 'Cartier'",
  "name: 'TAG Heuer'",
  "name: 'Rado'",
  "name: 'Tissot'",
  "name: 'Carren'",
  "name: 'Calvin Klein'",
  "name: 'Michael Kors'",
  "name: 'Versace'",
  'activeProducts.map',
  'overflow-y-auto overscroll-contain',
  'id="saatchi-premium-menu"',
  'bg-[#0b0a09]',
];

const requiredHeroTokens = [
  'text-[clamp(42px,8vw,64px)]',
  'md:text-[clamp(58px,6.1vw,92px)]',
  'md:text-[18px]',
  'px-8 py-4',
];

const missingNavbar = requiredNavbarTokens.filter((token) => !navbar.includes(token));
const missingHero = requiredHeroTokens.filter((token) => !hero.includes(token));

if (missingNavbar.length || missingHero.length) {
  console.error('PREMIUM_UI_REGRESSION_GUARD_FAILED');
  if (missingNavbar.length) console.error('Missing Navbar invariants:', missingNavbar);
  if (missingHero.length) console.error('Missing Hero invariants:', missingHero);
  process.exit(1);
}

console.log('Premium navigation + hero regression guard: PASS');
