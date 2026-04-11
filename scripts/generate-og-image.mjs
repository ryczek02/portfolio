#!/usr/bin/env node
// Generate static/og-image.png (1200x630) from scripts/og-image.svg.
//
// Sharp is NOT a project dependency (it bloats CI installs with platform-specific
// binaries). Install it on-demand when regenerating the OG image:
//
//   npm i -g sharp-cli && sharp -i scripts/og-image.svg -o static/og-image.png resize 1200 630
//
// Or run this script after installing sharp locally (not persisted to package.json):
//
//   npm i --no-save sharp && node scripts/generate-og-image.mjs
//
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

let sharp;
try {
	sharp = (await import('sharp')).default;
} catch {
	console.error(
		'\n✗ sharp not installed.\n\n' +
			'  Run:  npm i --no-save sharp && node scripts/generate-og-image.mjs\n'
	);
	process.exit(1);
}

const svgPath = resolve(root, 'scripts/og-image.svg');
const outPath = resolve(root, 'static/og-image.png');

mkdirSync(dirname(outPath), { recursive: true });

await sharp(readFileSync(svgPath), { density: 288 })
	.resize(1200, 630, { fit: 'cover' })
	.png({ compressionLevel: 9 })
	.toFile(outPath);

console.log(`✓ Wrote ${outPath}`);
