#!/usr/bin/env node
// Take mobile screenshots for visual QA.
// Usage: npm i --no-save playwright && node scripts/mobile-screenshots.mjs
import { chromium, devices } from 'playwright';
import { resolve, dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../.screenshots');
mkdirSync(outDir, { recursive: true });

const device = devices['iPhone 13'];
const browser = await chromium.launch();
const context = await browser.newContext({ ...device });
const page = await context.newPage();

await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

// Hero (top)
await page.screenshot({ path: resolve(outDir, '01-hero.png') });

// BikeESP section (scroll to it)
await page.evaluate(() => {
	const el = document.querySelector('.bikeesp');
	if (el) el.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(800);
await page.screenshot({ path: resolve(outDir, '02-bikeesp.png') });

// Full page
await page.screenshot({ path: resolve(outDir, '03-fullpage.png'), fullPage: true });

// Also measure key elements
const metrics = await page.evaluate(() => {
	const vh = window.innerHeight;
	const vw = window.innerWidth;
	const q = (s) => {
		const el = document.querySelector(s);
		if (!el) return null;
		const r = el.getBoundingClientRect();
		return { top: r.top, left: r.left, width: r.width, height: r.height, bottom: r.bottom };
	};
	return {
		viewport: { vw, vh },
		heroRole: q('.hero-role'),
		heroAreas: q('.hero-areas'),
		scrollIndicator: q('.scroll-indicator'),
		heroName: q('.hero-name'),
		bikeespCanvas: q('.bikeesp-canvas'),
		bikeespTags: q('.bikeesp-tags'),
		bikeespLink: q('.bikeesp-link'),
		heroLine: q('.line-1'),
	};
});
console.log(JSON.stringify(metrics, null, 2));

await browser.close();
console.log(`\n✓ Screenshots written to ${outDir}`);
