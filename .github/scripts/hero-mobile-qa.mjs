import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE_URL = process.env.HERO_QA_URL || 'http://127.0.0.1:3000';
const OUT_DIR = process.env.HERO_QA_OUT || 'hero-qa-artifacts';
fs.mkdirSync(OUT_DIR, { recursive: true });

const failures = [];
const evidence = [];
const record = (scope, check, pass, details = {}) => {
  evidence.push({ scope, check, pass, ...details });
  const prefix = pass ? 'PASS' : 'FAIL';
  console.log(`${prefix} ${scope} :: ${check}${details.note ? ` :: ${details.note}` : ''}`);
  if (!pass) failures.push(`${scope} :: ${check}${details.note ? ` :: ${details.note}` : ''}`);
};

const safariIOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const chromeIOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/140.0.7339.122 Mobile/15E148 Safari/604.1';
const chromeAndroid = 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36';
const samsungAndroid = 'Mozilla/5.0 (Linux; Android 15; SM-S938B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36';
const safariIPad = 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const safariDesktop = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
const chromeDesktop = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

const profiles = [
  { name: 'iPhone Safari', engine: 'webkit', viewport: { width: 390, height: 844 }, userAgent: safariIOS, mobile: true, touch: true },
  { name: 'iPhone Chrome', engine: 'webkit', viewport: { width: 390, height: 844 }, userAgent: chromeIOS, mobile: true, touch: true },
  { name: 'Android Chrome', engine: 'chromium', viewport: { width: 360, height: 800 }, userAgent: chromeAndroid, mobile: true, touch: true },
  { name: 'Android Samsung Internet', engine: 'chromium', viewport: { width: 360, height: 800 }, userAgent: samsungAndroid, mobile: true, touch: true },
  { name: 'iPad Safari', engine: 'webkit', viewport: { width: 768, height: 1024 }, userAgent: safariIPad, mobile: true, touch: true },
  { name: 'Desktop Safari', engine: 'webkit', viewport: { width: 1440, height: 900 }, userAgent: safariDesktop, mobile: false, touch: false },
  { name: 'Desktop Chrome', engine: 'chromium', viewport: { width: 1440, height: 900 }, userAgent: chromeDesktop, mobile: false, touch: false },
];

const viewportWidths = [320, 360, 375, 390, 414, 430, 768];
const launchers = { chromium, webkit };
const browsers = {};

async function newContext(profile, viewport = profile.viewport) {
  return browsers[profile.engine].newContext({
    viewport,
    userAgent: profile.userAgent,
    isMobile: profile.mobile,
    hasTouch: profile.touch,
    reducedMotion: 'no-preference',
  });
}

async function getHeroState(page) {
  return page.evaluate(() => {
    const section = document.querySelector('section');
    const fallback = document.querySelector('[data-hero-fallback="true"]');
    const video = document.querySelector('[data-hero-video="true"]');
    const active = document.querySelector('[data-hero-content="active"]');
    const cta = active?.querySelector('[data-hero-cta="true"]');
    const title = active?.querySelector('h1');
    const overlays = [...document.querySelectorAll('[data-hero-overlay="true"]')];
    const nav = document.querySelector('[data-hero-nav="true"]');
    const rect = (el) => el ? el.getBoundingClientRect().toJSON() : null;
    const visible = (el) => {
      if (!el) return false;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return s.display !== 'none' && s.visibility !== 'hidden' && Number.parseFloat(s.opacity || '1') > 0 && r.width > 0 && r.height > 0;
    };
    const sr = section?.getBoundingClientRect();
    const vr = video?.getBoundingClientRect();
    const viewport = { width: innerWidth, height: innerHeight };
    return {
      sectionVisible: visible(section),
      fallbackVisible: visible(fallback),
      fallbackBackground: fallback ? getComputedStyle(fallback).backgroundImage : '',
      activeVisible: visible(active),
      titleVisible: visible(title),
      titleText: title?.textContent?.trim() || '',
      ctaVisible: visible(cta),
      ctaRect: rect(cta),
      titleRect: rect(title),
      videoVisible: visible(video),
      videoRect: rect(video),
      sectionRect: rect(section),
      videoObjectFit: video ? getComputedStyle(video).objectFit : '',
      videoPaused: video instanceof HTMLVideoElement ? video.paused : null,
      videoCurrentTime: video instanceof HTMLVideoElement ? video.currentTime : null,
      videoReadyState: video instanceof HTMLVideoElement ? video.readyState : null,
      overlayVisibleCount: overlays.filter(visible).length,
      navVisible: visible(nav),
      scrollHeight: document.documentElement.scrollHeight,
      viewport,
      videoCoversHero: Boolean(sr && vr && Math.abs(sr.width - vr.width) <= 2 && Math.abs(sr.height - vr.height) <= 2),
      ctaInsideViewport: Boolean(cta && (() => { const r = cta.getBoundingClientRect(); return r.left >= -1 && r.right <= innerWidth + 1 && r.top >= -1 && r.bottom <= innerHeight + 1; })()),
      titleInsideViewport: Boolean(title && (() => { const r = title.getBoundingClientRect(); return r.left >= -1 && r.right <= innerWidth + 1 && r.top >= -1 && r.bottom <= innerHeight + 1; })()),
    };
  });
}

function structuralAssertions(scope, state) {
  record(scope, 'hero first-load visible', state.sectionVisible && state.activeVisible && state.fallbackVisible);
  record(scope, 'no blank/black-only hero', state.fallbackVisible && state.activeVisible && state.titleVisible && state.fallbackBackground !== 'none');
  record(scope, 'text inside viewport', state.titleVisible && state.titleInsideViewport);
  record(scope, 'CTA visible inside viewport', state.ctaVisible && state.ctaInsideViewport);
  record(scope, 'video fills hero with object-cover', state.videoCoversHero && state.videoObjectFit === 'cover');
  record(scope, 'background/overlay visible', state.fallbackVisible && state.overlayVisibleCount >= 3);
  record(scope, 'hero navigation visible', state.navVisible);
}

async function waitForPlayback(page, scope) {
  let started = false;
  try {
    await page.waitForFunction(() => {
      const v = document.querySelector('[data-hero-video="true"]');
      return v instanceof HTMLVideoElement && !v.paused && v.currentTime > 0.05 && v.readyState >= 2;
    }, null, { timeout: 5500 });
    started = true;
  } catch {}
  const state = await getHeroState(page);
  record(scope, 'video starts', started, { note: `paused=${state.videoPaused} currentTime=${state.videoCurrentTime} readyState=${state.videoReadyState}` });
}

async function checkScroll(page, scope) {
  const result = await page.evaluate(() => {
    const before = scrollY;
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const target = Math.min(180, max);
    scrollTo(0, target);
    return new Promise((resolve) => requestAnimationFrame(() => resolve({ before, after: scrollY, max })));
  });
  const pass = result.max === 0 ? true : result.after > result.before;
  record(scope, 'scroll behavior', pass, { note: `before=${result.before} after=${result.after} max=${result.max}` });
  await page.evaluate(() => scrollTo(0, 0));
}

async function checkOrientation(page, profile, scope) {
  if (!profile.mobile) {
    record(scope, 'orientation change', true, { note: 'desktop profile: not applicable' });
    return;
  }
  const portrait = profile.viewport;
  await page.setViewportSize({ width: portrait.height, height: portrait.width });
  await page.waitForTimeout(250);
  const landscape = await getHeroState(page);
  record(scope, 'orientation change', landscape.sectionVisible && landscape.activeVisible && landscape.ctaVisible && landscape.ctaInsideViewport && landscape.videoCoversHero, {
    note: `landscape=${portrait.height}x${portrait.width} ctaInside=${landscape.ctaInsideViewport}`,
  });
  await page.setViewportSize(portrait);
}

async function checkSlider(page, scope, initialTitle) {
  let advanced = false;
  try {
    await page.waitForFunction((oldTitle) => {
      const active = document.querySelector('[data-hero-content="active"] h1');
      return Boolean(active && active.textContent?.trim() && active.textContent.trim() !== oldTitle);
    }, initialTitle, { timeout: 8500 });
    advanced = true;
  } catch {}
  record(scope, 'slider advances independently', advanced);
}

async function runDeviceProfile(profile) {
  const scope = `device:${profile.name}`;
  const context = await newContext(profile);
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(String(error)));
  try {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-hero-fallback="true"]', { state: 'attached', timeout: 10000 });
    await page.waitForTimeout(300);
    const initial = await getHeroState(page);
    structuralAssertions(scope, initial);
    await waitForPlayback(page, scope);
    await checkOrientation(page, profile, scope);
    await checkScroll(page, scope);
    await checkSlider(page, scope, initial.titleText);
    record(scope, 'runtime page errors', pageErrors.length === 0, { note: pageErrors.join(' | ') });
    await page.screenshot({ path: path.join(OUT_DIR, `${profile.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`), fullPage: false });
  } catch (error) {
    record(scope, 'profile execution', false, { note: String(error) });
  } finally {
    await context.close();
  }
}

async function runViewportSweep(profile) {
  for (const width of viewportWidths) {
    const height = width >= 768 ? 1024 : 844;
    const scope = `viewport:${profile.name}:${width}px`;
    const context = await newContext(profile, { width, height });
    const page = await context.newPage();
    try {
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForSelector('[data-hero-fallback="true"]', { state: 'attached', timeout: 10000 });
      await page.waitForTimeout(150);
      structuralAssertions(scope, await getHeroState(page));
    } catch (error) {
      record(scope, 'viewport execution', false, { note: String(error) });
    } finally {
      await context.close();
    }
  }
}

async function runNetworkProfile(name, network) {
  const profile = profiles.find((p) => p.name === 'Android Chrome');
  const scope = `network:${name}`;
  const context = await newContext(profile);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: network.latency,
    downloadThroughput: network.down,
    uploadThroughput: network.up,
  });
  await page.route('**/videos/*.mp4', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1800));
    await route.continue();
  });
  try {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-hero-fallback="true"]', { state: 'attached', timeout: 10000 });
    const cold = await getHeroState(page);
    record(scope, 'cold load fallback immediate', cold.sectionVisible && cold.fallbackVisible && cold.activeVisible);
    record(scope, 'cache disabled', true, { note: 'Chromium CDP Network.setCacheDisabled=true' });
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
    const hard = await getHeroState(page);
    record(scope, 'hard reload fallback immediate', hard.sectionVisible && hard.fallbackVisible && hard.activeVisible);
    await page.screenshot({ path: path.join(OUT_DIR, `network-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`), fullPage: false });
  } catch (error) {
    record(scope, 'network execution', false, { note: String(error) });
  } finally {
    await context.close();
  }
}

async function runMediaFailureMode() {
  const profile = profiles.find((p) => p.name === 'iPhone Safari');
  const scope = 'failure:all-hero-video-requests-aborted';
  const context = await newContext(profile);
  const page = await context.newPage();
  await page.route('**/videos/*.mp4', (route) => route.abort('failed'));
  try {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-hero-fallback="true"]', { state: 'attached', timeout: 10000 });
    const first = await getHeroState(page);
    structuralAssertions(scope, first);
    await checkSlider(page, scope, first.titleText);
    const after = await getHeroState(page);
    record(scope, 'fallback survives media failure', after.fallbackVisible && after.activeVisible && after.ctaVisible);
    await page.screenshot({ path: path.join(OUT_DIR, 'media-failure-fallback.png'), fullPage: false });
  } catch (error) {
    record(scope, 'failure-mode execution', false, { note: String(error) });
  } finally {
    await context.close();
  }
}

try {
  browsers.chromium = await chromium.launch({ headless: true });
  browsers.webkit = await webkit.launch({ headless: true });

  for (const profile of profiles) await runDeviceProfile(profile);

  await runViewportSweep(profiles.find((p) => p.name === 'iPhone Safari'));
  await runViewportSweep(profiles.find((p) => p.name === 'Android Chrome'));

  await runNetworkProfile('Fast 3G', { latency: 150, down: 1.6 * 1024 * 1024 / 8, up: 750 * 1024 / 8 });
  await runNetworkProfile('Slow 4G', { latency: 100, down: 4 * 1024 * 1024 / 8, up: 3 * 1024 * 1024 / 8 });
  await runNetworkProfile('Wi-Fi', { latency: 20, down: 30 * 1024 * 1024 / 8, up: 15 * 1024 * 1024 / 8 });
  await runMediaFailureMode();
} finally {
  await Promise.all(Object.values(browsers).filter(Boolean).map((browser) => browser.close()));
  fs.writeFileSync(path.join(OUT_DIR, 'report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl: BASE_URL, failures, evidence }, null, 2));
}

console.log(`HERO_MOBILE_QA_EVIDENCE=${evidence.length}`);
console.log(`HERO_MOBILE_QA_FAILURES=${failures.length}`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('HERO_MOBILE_QA=PASSED');
