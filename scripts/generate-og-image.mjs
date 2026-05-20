#!/usr/bin/env node
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outPath = resolve(root, 'static/arac/og-image.png');
const imageData = (path, mime) =>
	`data:${mime};base64,${readFileSync(resolve(root, path)).toString('base64')}`;
const heroBackground = imageData('static/arac/1-2-scaled.jpg', 'image/jpeg');
const acMark = `<svg class="ac-mark" viewBox="0 0 132 108" aria-hidden="true">
	<g transform="translate(-1.3787272,-113.29179)">
		<path fill="#db0e15" d="M 496.83984,515.08984 344.01758,667.44141 v -53.96875 l -79.73633,79.49218 v 54.42188 h 86.93359 L 497.33594,601.7168 v -86.62696 z" transform="scale(0.26458333)" />
		<path fill="#db0e15" d="M 411.33008,428.18945 264.28125,574.78516 v 87.12109 c 0,0 94.2448,-93.95381 147.04883,-146.5957 z" transform="scale(0.26458333)" />
		<path fill="#ffffff" d="M 238.23828,514.27148 5.2109375,746.58008 v 87.12109 c 0,0 102.2438525,-101.92802 153.3652325,-152.89258 v 86.62696 l 79.66211,-79.41602 z" transform="scale(0.26458333)" />
	</g>
</svg>`;

mkdirSync(dirname(outPath), { recursive: true });

const html = `<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Unbounded:wght@700;800;900&display=swap" rel="stylesheet" />
		<style>
			* { box-sizing: border-box; }
			body {
				width: 1200px;
				height: 630px;
				margin: 0;
				overflow: hidden;
				background: #08090a;
				color: #fff;
			}
			.og {
				position: relative;
				display: flex;
				align-items: flex-start;
				width: 1200px;
				height: 630px;
				padding: 73px 0 0 122px;
				background:
					linear-gradient(90deg, rgba(5, 6, 7, 0.86) 0%, rgba(5, 6, 7, 0.74) 58%, rgba(5, 6, 7, 0.62) 100%),
					url('${heroBackground}') center / cover no-repeat;
			}
			.og::before {
				content: '';
				position: absolute;
				inset: 0;
				background: rgba(0, 0, 0, 0.12);
				pointer-events: none;
			}
			.copy {
				position: relative;
				z-index: 2;
				width: 100%;
				min-width: 0;
			}
			.brand {
				margin: 0 0 34px;
				color: #ff4a1f;
				font: 900 38px/1 Unbounded, sans-serif;
				text-transform: uppercase;
			}
			h1 {
				max-width: 820px;
				margin: 0;
				font: 900 108px/0.94 Unbounded, sans-serif;
				letter-spacing: 0;
			}
			.title-line {
				display: block;
				white-space: nowrap;
			}
			.for-lockup {
				display: inline-flex;
				align-items: center;
				gap: 0.28em;
				white-space: nowrap;
				vertical-align: -0.15em;
			}
			.ac-mark {
				width: 1.32em;
				height: auto;
				flex: 0 0 auto;
				transform: translateY(0.06em);
			}
			.intro {
				max-width: 960px;
				margin: 44px 0 0;
				color: rgba(255, 255, 255, 0.76);
				font: 600 32px/1.52 "Chakra Petch", sans-serif;
			}
		</style>
	</head>
	<body>
		<main class="og">
			<section class="copy">
				<p class="brand">ARAC Camera</p>
				<h1>
					<span class="title-line">AR Cam</span>
					<span class="title-line"><span class="for-lockup">for ${acMark}</span></span>
				</h1>
				<p class="intro">Use your iPhone as a real handheld camera for cinematic Assetto Corsa shots. Film smoother clips, creator reels, and mod previews with physical movement.</p>
			</section>
		</main>
	</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(async () => document.fonts.ready);
await page.waitForTimeout(200);
await page.screenshot({ path: outPath, type: 'png' });
await browser.close();

console.log(`Wrote ${outPath}`);
