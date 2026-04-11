#!/usr/bin/env node
// Generate static/og-image.png (1200x630) from scripts/og-image.svg using sharp.
// Run: node scripts/generate-og-image.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const svgPath = resolve(root, 'scripts/og-image.svg');
const outPath = resolve(root, 'static/og-image.png');

const svg = readFileSync(svgPath);

mkdirSync(dirname(outPath), { recursive: true });

await sharp(svg, { density: 288 })
	.resize(1200, 630, { fit: 'cover' })
	.png({ compressionLevel: 9 })
	.toFile(outPath);

console.log(`✓ Wrote ${outPath}`);
