<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';

	let { scrollProgress = 0, dragX = 0, dragY = 0 }: { scrollProgress?: number; dragX?: number; dragY?: number } = $props();

	const count = 6000;
	const positions = new Float32Array(count * 3);
	const colors = new Float32Array(count * 3);
	const sizes = new Float32Array(count);
	let idx = 0;

	function addPoint(x: number, y: number, z: number, r: number, g: number, b: number, size: number) {
		if (idx >= count) return;
		const i3 = idx * 3;
		positions[i3] = x; positions[i3 + 1] = y; positions[i3 + 2] = z;
		colors[i3] = r; colors[i3 + 1] = g; colors[i3 + 2] = b;
		sizes[idx] = size;
		idx++;
	}

	// Track centerline — asymmetric racing circuit with elevation
	function trackPoint(t: number): [number, number, number] {
		const a = t * Math.PI * 2;
		const x = 2.8 * Math.sin(a) + 0.6 * Math.sin(2 * a) + 0.25 * Math.sin(3 * a);
		const z = 2.0 * Math.cos(a) + 0.4 * Math.cos(3 * a);
		const y = 0.2 * Math.sin(2 * a) + 0.08 * Math.cos(4 * a);
		return [x, y, z];
	}

	function trackNormal(t: number): [number, number] {
		const dt = 0.001;
		const [x1, , z1] = trackPoint(t);
		const [x2, , z2] = trackPoint(t + dt);
		const dx = x2 - x1, dz = z2 - z1;
		const len = Math.sqrt(dx * dx + dz * dz);
		return [-dz / len, dx / len];
	}

	// --- Asphalt surface ---
	const trackWidth = 0.45;
	for (let i = 0; i < 2600 && idx < count; i++) {
		const t = i / 2600;
		const [cx, cy, cz] = trackPoint(t);
		const [nx, nz] = trackNormal(t);
		const off = (Math.random() - 0.5) * trackWidth;
		const gray = 0.18 + Math.random() * 0.1;
		addPoint(cx + nx * off, cy + (Math.random() - 0.5) * 0.015, cz + nz * off, gray, gray, gray + 0.01, 2 + Math.random() * 2);
	}

	// --- Kerbs (orange / white alternating) ---
	for (let i = 0; i < 650 && idx < count; i++) {
		const t = i / 650;
		const [cx, cy, cz] = trackPoint(t);
		const [nx, nz] = trackNormal(t);
		const side = Math.random() > 0.5 ? 1 : -1;
		const off = (trackWidth * 0.5 + Math.random() * 0.06) * side;
		const phase = Math.floor(t * 60) % 2;
		if (phase === 0) {
			addPoint(cx + nx * off, cy + 0.01, cz + nz * off, 0.9, 0.35, 0.0, 2.5 + Math.random());
		} else {
			addPoint(cx + nx * off, cy + 0.01, cz + nz * off, 0.85, 0.85, 0.85, 2.5 + Math.random());
		}
	}

	// --- Grass & run-off ---
	for (let i = 0; i < 1900 && idx < count; i++) {
		const x = (Math.random() - 0.5) * 9;
		const z = (Math.random() - 0.5) * 7;
		let minDist = Infinity;
		for (let s = 0; s < 1; s += 0.025) {
			const [tx, , tz] = trackPoint(s);
			const d = Math.sqrt((x - tx) ** 2 + (z - tz) ** 2);
			if (d < minDist) minDist = d;
		}
		if (minDist < trackWidth * 0.7) continue;
		if (minDist < trackWidth) {
			const sand = 0.45 + Math.random() * 0.12;
			addPoint(x, -0.01, z, sand, sand * 0.8, sand * 0.45, 2 + Math.random() * 2);
		} else {
			const g = 0.16 + Math.random() * 0.18;
			addPoint(x, -0.01 + (Math.random() - 0.5) * 0.03, z, 0.03 + Math.random() * 0.05, g, 0.02, 2 + Math.random() * 2.5);
		}
	}

	// --- Trees & perimeter structures ---
	while (idx < count) {
		const angle = Math.random() * Math.PI * 2;
		const dist = 3.2 + Math.random() * 2;
		const x = Math.cos(angle) * dist;
		const z = Math.sin(angle) * dist * 0.7;
		if (Math.random() > 0.6) {
			const g = 0.12 + Math.random() * 0.2;
			addPoint(x + (Math.random() - 0.5) * 0.3, Math.random() * 0.7, z + (Math.random() - 0.5) * 0.3, 0.02, g, 0.01, 2.5 + Math.random() * 2.5);
		} else {
			addPoint(x, Math.random() * 0.3, z, 0.5 + Math.random() * 0.2, 0.25 + Math.random() * 0.1, 0.04, 2 + Math.random() * 2);
		}
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
	geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

	const material = new THREE.PointsMaterial({
		size: 0.038,
		vertexColors: true,
		sizeAttenuation: true,
		transparent: true,
		opacity: 0.85,
	});

	// --- Animated racing line trail ---
	const lineCount = 80;
	const linePositions = new Float32Array(lineCount * 3);
	const lineColors = new Float32Array(lineCount * 3);
	const lineGeometry = new THREE.BufferGeometry();
	lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
	lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

	const lineMaterial = new THREE.PointsMaterial({
		size: 0.045,
		vertexColors: true,
		sizeAttenuation: true,
		transparent: true,
		opacity: 0.9,
	});

	let rotY = $state(0);
	let time = 0;
	let lineT = 0;

	useTask((delta) => {
		time += delta;
		rotY = time * 0.12;

		// Advance racing line around the circuit
		lineT = (lineT + delta * 0.12) % 1;
		for (let i = 0; i < lineCount; i++) {
			const t = ((lineT - (i / lineCount) * 0.12) % 1 + 1) % 1;
			const [x, y, z] = trackPoint(t);
			const i3 = i * 3;
			linePositions[i3] = x;
			linePositions[i3 + 1] = y + 0.025;
			linePositions[i3 + 2] = z;

			const fade = 1 - i / lineCount;
			const intensity = fade * fade;
			lineColors[i3] = 1.0 * intensity;
			lineColors[i3 + 1] = 0.4 * intensity;
			lineColors[i3 + 2] = 0.0;
		}
		lineGeometry.attributes.position.needsUpdate = true;
		lineGeometry.attributes.color.needsUpdate = true;
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 4.5, 5.5]} fov={38} oncreate={(ref) => { ref.lookAt(0, 0, 0); }} />

<T.AmbientLight intensity={0.6} />

<T.Group rotation.x={-0.35 + dragY} rotation.y={rotY + dragX}>
	<T.Points {geometry} {material} />
	<T.Points geometry={lineGeometry} material={lineMaterial} />
</T.Group>
