<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';

	let { scrollProgress = 0, dragX = 0, dragY = 0 }: { scrollProgress?: number; dragX?: number; dragY?: number } = $props();

	// --- Neural network topology ---
	const layers = [
		{ count: 4, x: -3 },
		{ count: 6, x: -1 },
		{ count: 6, x: 1 },
		{ count: 3, x: 3 },
	];

	const nodePositions: [number, number, number][] = [];
	for (const layer of layers) {
		for (let i = 0; i < layer.count; i++) {
			const y = (i - (layer.count - 1) / 2) * 1.1;
			nodePositions.push([layer.x, y, (Math.random() - 0.5) * 0.3]);
		}
	}

	// Connections between adjacent layers
	const connections: [number, number][] = [];
	let layerOffset = 0;
	for (let l = 0; l < layers.length - 1; l++) {
		const nextOffset = layerOffset + layers[l].count;
		for (let i = 0; i < layers[l].count; i++) {
			for (let j = 0; j < layers[l + 1].count; j++) {
				connections.push([layerOffset + i, nextOffset + j]);
			}
		}
		layerOffset = nextOffset;
	}

	// --- Static points ---
	const count = 5000;
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

	const layerColors: [number, number, number][] = [
		[0.02, 0.71, 0.83],   // cyan — input
		[0.55, 0.36, 0.96],   // purple — hidden 1
		[0.55, 0.36, 0.96],   // purple — hidden 2
		[0.93, 0.29, 0.60],   // pink — output
	];

	// Node clusters
	let nodeIdx = 0;
	for (let l = 0; l < layers.length; l++) {
		const [cr, cg, cb] = layerColors[l];
		for (let i = 0; i < layers[l].count; i++) {
			const [nx, ny, nz] = nodePositions[nodeIdx];
			for (let p = 0; p < 22; p++) {
				addPoint(
					nx + (Math.random() - 0.5) * 0.25,
					ny + (Math.random() - 0.5) * 0.25,
					nz + (Math.random() - 0.5) * 0.25,
					cr + Math.random() * 0.1, cg + Math.random() * 0.1, cb + Math.random() * 0.1,
					3 + Math.random() * 3
				);
			}
			nodeIdx++;
		}
	}

	// Synapse points along connections
	for (const [fromIdx, toIdx] of connections) {
		const [x1, y1, z1] = nodePositions[fromIdx];
		const [x2, y2, z2] = nodePositions[toIdx];
		for (let p = 0; p < 5; p++) {
			const t = (p + 0.5) / 5;
			addPoint(
				x1 + (x2 - x1) * t + (Math.random() - 0.5) * 0.04,
				y1 + (y2 - y1) * t + (Math.random() - 0.5) * 0.04,
				z1 + (z2 - z1) * t + (Math.random() - 0.5) * 0.04,
				0.3, 0.2, 0.5,
				1.5 + Math.random()
			);
		}
	}

	// Ambient particles
	while (idx < count) {
		const x = (Math.random() - 0.5) * 10;
		const y = (Math.random() - 0.5) * 8;
		const z = (Math.random() - 0.5) * 4;
		const b = 0.05 + Math.random() * 0.08;
		addPoint(x, y, z, b * 1.5, b, b * 2, 1 + Math.random() * 2);
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

	const material = new THREE.PointsMaterial({
		size: 0.04,
		vertexColors: true,
		sizeAttenuation: true,
		transparent: true,
		opacity: 0.85,
	});

	// --- Animated signal pulses ---
	const pulseCount = 35;
	const pulsePositions = new Float32Array(pulseCount * 3);
	const pulseColors = new Float32Array(pulseCount * 3);
	const pulseGeometry = new THREE.BufferGeometry();
	pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
	pulseGeometry.setAttribute('color', new THREE.BufferAttribute(pulseColors, 3));

	const pulseMaterial = new THREE.PointsMaterial({
		size: 0.07,
		vertexColors: true,
		sizeAttenuation: true,
		transparent: true,
		opacity: 0.95,
	});

	const pulseStates = Array.from({ length: pulseCount }, () => ({
		connIdx: Math.floor(Math.random() * connections.length),
		progress: Math.random(),
		speed: 0.3 + Math.random() * 0.4,
	}));

	let rotY = $state(0);
	let time = 0;

	useTask((delta) => {
		time += delta;
		rotY = time * 0.08;

		for (let i = 0; i < pulseCount; i++) {
			const pulse = pulseStates[i];
			pulse.progress += delta * pulse.speed;
			if (pulse.progress >= 1) {
				pulse.progress = 0;
				pulse.connIdx = Math.floor(Math.random() * connections.length);
				pulse.speed = 0.3 + Math.random() * 0.4;
			}

			const [fromIdx, toIdx] = connections[pulse.connIdx];
			const [x1, y1, z1] = nodePositions[fromIdx];
			const [x2, y2, z2] = nodePositions[toIdx];
			const t = pulse.progress;
			const i3 = i * 3;
			pulsePositions[i3] = x1 + (x2 - x1) * t;
			pulsePositions[i3 + 1] = y1 + (y2 - y1) * t;
			pulsePositions[i3 + 2] = z1 + (z2 - z1) * t;

			const glow = Math.sin(t * Math.PI);
			pulseColors[i3] = 0.4 * glow;
			pulseColors[i3 + 1] = 0.9 * glow;
			pulseColors[i3 + 2] = 1.0 * glow;
		}
		pulseGeometry.attributes.position.needsUpdate = true;
		pulseGeometry.attributes.color.needsUpdate = true;
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} oncreate={(ref) => { ref.lookAt(0, 0, 0); }} />

<T.AmbientLight intensity={0.5} />

<T.Group rotation.y={rotY + dragX} rotation.x={dragY}>
	<T.Points {geometry} {material} />
	<T.Points geometry={pulseGeometry} material={pulseMaterial} />
</T.Group>
