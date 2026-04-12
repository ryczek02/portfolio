<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';

	let { scrollProgress = 0, dragX = 0, dragY = 0 }: { scrollProgress?: number; dragX?: number; dragY?: number } = $props();

	const count = 12000;
	const positions = new Float32Array(count * 3);
	const colors = new Float32Array(count * 3);
	const sizes = new Float32Array(count);

	// Generate a terrain-like point cloud (hills + road shape)
	for (let i = 0; i < count; i++) {
		const i3 = i * 3;

		if (i < count * 0.6) {
			// Terrain points - spread out landscape
			const x = (Math.random() - 0.5) * 8;
			const z = (Math.random() - 0.5) * 8;
			// Hills using sine waves
			const y = Math.sin(x * 0.8) * Math.cos(z * 0.6) * 0.8
				+ Math.sin(x * 1.5 + 1) * 0.3
				+ (Math.random() - 0.5) * 0.15;

			positions[i3] = x;
			positions[i3 + 1] = y - 0.5;
			positions[i3 + 2] = z;

			// Green-ish terrain
			const g = 0.15 + Math.random() * 0.25;
			colors[i3] = 0.05 + Math.random() * 0.1;
			colors[i3 + 1] = g;
			colors[i3 + 2] = 0.02;
			sizes[i] = 2 + Math.random() * 3;
		} else if (i < count * 0.75) {
			// Road/track surface - a curved path
			const t = (i - count * 0.6) / (count * 0.15);
			const angle = t * Math.PI * 2;
			const radius = 2.5 + Math.sin(angle * 3) * 0.5;
			const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.4;
			const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.4;
			const y = Math.sin(x * 0.8) * Math.cos(z * 0.6) * 0.8 - 0.5 + (Math.random() - 0.5) * 0.05;

			positions[i3] = x;
			positions[i3 + 1] = y;
			positions[i3 + 2] = z;

			// Gray asphalt
			const gray = 0.3 + Math.random() * 0.15;
			colors[i3] = gray;
			colors[i3 + 1] = gray;
			colors[i3 + 2] = gray;
			sizes[i] = 2 + Math.random() * 2;
		} else if (i < count * 0.9) {
			// Buildings / structures - vertical clusters
			const clusterIdx = Math.floor(Math.random() * 5);
			const cx = [2, -2.5, 1.5, -1, 3][clusterIdx];
			const cz = [-2, 1.5, 2.5, -3, 0.5][clusterIdx];
			const height = [1.5, 2, 1, 1.8, 1.2][clusterIdx];

			const x = cx + (Math.random() - 0.5) * 0.6;
			const z = cz + (Math.random() - 0.5) * 0.6;
			const baseY = Math.sin(cx * 0.8) * Math.cos(cz * 0.6) * 0.8 - 0.5;
			const y = baseY + Math.random() * height;

			positions[i3] = x;
			positions[i3 + 1] = y;
			positions[i3 + 2] = z;

			// Red-ish buildings
			colors[i3] = 0.6 + Math.random() * 0.3;
			colors[i3 + 1] = 0.08 + Math.random() * 0.1;
			colors[i3 + 2] = 0.08 + Math.random() * 0.1;
			sizes[i] = 2 + Math.random() * 2;
		} else {
			// Trees - small vertical clusters scattered
			const x = (Math.random() - 0.5) * 7;
			const z = (Math.random() - 0.5) * 7;
			const baseY = Math.sin(x * 0.8) * Math.cos(z * 0.6) * 0.8 - 0.5;
			const y = baseY + Math.random() * 0.8;

			positions[i3] = x;
			positions[i3 + 1] = y;
			positions[i3 + 2] = z;

			// Dark green trees
			colors[i3] = 0.02 + Math.random() * 0.05;
			colors[i3 + 1] = 0.25 + Math.random() * 0.3;
			colors[i3 + 2] = 0.02 + Math.random() * 0.05;
			sizes[i] = 2.5 + Math.random() * 2.5;
		}
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
	geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

	const material = new THREE.PointsMaterial({
		size: 0.03,
		vertexColors: true,
		sizeAttenuation: true,
		transparent: true,
		opacity: 0.85,
	});

	let rotY = $state(0);
	let time = 0;

	useTask((delta) => {
		time += delta;
		rotY = time * 0.15;
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 1.5, 5.5]} fov={45} oncreate={(ref) => { ref.lookAt(0, 0, 0); }} />

<T.AmbientLight intensity={0.5} />

<T.Group rotation.x={-0.2 + dragY} rotation.y={rotY + dragX} position.y={0.3}>
	<T.Points {geometry} {material} />
</T.Group>
