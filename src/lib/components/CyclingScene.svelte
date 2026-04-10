<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { RoundedBoxGeometry as ThreeRoundedBox } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
	import { spring } from 'svelte/motion';
	import * as THREE from 'three';

	let { scrollProgress = 0, dragX = 0, dragY = 0 }: {
		scrollProgress: number;
		dragX: number;
		dragY: number;
	} = $props();

	// Same device as Poldek — landscape terminal
	const deviceW = 4.48;
	const deviceH = 3.41;
	const deviceD = 1.0;
	const bevelRadius = 0.45;
	const bodyGeometry = new ThreeRoundedBox(deviceW, deviceH, deviceD, 8, bevelRadius);

	const screenW = 3.9;
	const screenH = 2.8;
	const screenOffsetY = 0;

	let targetRotX = $derived(dragY);
	let targetRotY = $derived(dragX);

	const rotationY = spring(0, { stiffness: 0.06, damping: 0.4 });
	const rotationX = spring(0, { stiffness: 0.06, damping: 0.4 });

	$effect(() => {
		rotationY.set(targetRotY);
		rotationX.set(targetRotX);
	});

	const canvasEl = document.createElement('canvas');
	canvasEl.width = 960;
	canvasEl.height = 688;
	const ctx = canvasEl.getContext('2d')!;
	const screenTexture = new THREE.CanvasTexture(canvasEl);
	screenTexture.colorSpace = THREE.SRGBColorSpace;
	screenTexture.anisotropy = 16;

	// --- ML TRAINING SIMULATION ---
	type Line = { text: string; color: string };
	const outputLines: Line[] = [];
	const maxLines = 24;
	let phase = 0;
	let step = 0;

	const models = [
		{ name: 'Linear Regression', mae: 45.23, rmse: 58.12, r2: 0.9523, mape: 5.20 },
		{ name: 'Ridge Regression', mae: 44.89, rmse: 57.45, r2: 0.9534, mape: 5.15 },
		{ name: 'Random Forest', mae: 38.45, rmse: 49.67, r2: 0.9689, mape: 4.30 },
		{ name: 'Gradient Boosting', mae: 39.12, rmse: 50.89, r2: 0.9672, mape: 4.45 },
		{ name: 'XGBoost', mae: 37.89, rmse: 48.92, r2: 0.9701, mape: 4.20 },
		{ name: 'LightGBM', mae: 38.01, rmse: 49.12, r2: 0.9695, mape: 4.25 },
	];

	let modelIdx = 0;
	let epoch = 0;

	function rFloat(a: number, b: number) { return (a + Math.random() * (b - a)).toFixed(2); }

	function addLine(text: string, color: string) {
		outputLines.push({ text, color });
		if (outputLines.length > maxLines) outputLines.shift();
	}

	function simStep() {
		switch (phase) {
			case 0: // Header
				if (step === 0) addLine('═══ CYCLING CALORIES ML ═══════════════════', '#00ff88');
				if (step === 1) addLine('Wczytywanie danych ze Strava API...', '#888');
				if (step === 2) addLine('  X_train: (142, 15)  X_test: (36, 15)', '#ccc');
				if (step === 3) addLine('  Features: dist, elev, hr, cadence, power', '#888');
				if (step === 4) { addLine('  Zainicjalizowano 6 modeli', '#00ff88'); phase = 1; step = -1; modelIdx = 0; }
				break;

			case 1: // Training models
				if (step === 0) addLine('', '#000');
				if (step === 1) addLine(`▸ TRAINING: ${models[modelIdx].name}`, '#c792ea');
				if (step >= 2 && step <= 6) {
					epoch = (step - 2) * 20 + Math.floor(Math.random() * 5);
					const loss = (2.5 - modelIdx * 0.2 - (step - 2) * 0.4 + Math.random() * 0.15).toFixed(4);
					const bar = '█'.repeat(step - 1) + '░'.repeat(5 - (step - 1));
					addLine(`  epoch ${String(epoch).padStart(3)} ${bar} loss=${loss}`, '#888');
				}
				if (step === 7) {
					const m = models[modelIdx];
					addLine(`  MAE: ${m.mae} kcal  R²: ${m.r2}  MAPE: ${m.mape}%`, m.r2 > 0.968 ? '#00ff88' : '#ccc');
				}
				if (step === 8) {
					modelIdx++;
					step = -1;
					if (modelIdx >= models.length) { phase = 2; step = -1; }
				}
				break;

			case 2: // Results comparison
				if (step === 0) addLine('', '#000');
				if (step === 1) addLine('═══ POROWNANIE MODELI ═════════════════════', '#febc2e');
				if (step === 2) addLine('Model              MAE     R²      MAPE', '#888');
				if (step >= 3 && step < 3 + models.length) {
					const m = models[step - 3];
					const best = m.name === 'XGBoost';
					const name = m.name.padEnd(19);
					addLine(`${best ? '★' : ' '} ${name}${String(m.mae).padStart(5)}   ${m.r2}   ${m.mape}%`, best ? '#00ff88' : '#ccc');
				}
				if (step === 3 + models.length) addLine('', '#000');
				if (step === 4 + models.length) addLine('BEST MODEL: XGBoost  MAE=37.89  R²=0.9701', '#00ff88');
				if (step === 5 + models.length) { phase = 3; step = -1; }
				break;

			case 3: // Prediction
				if (step === 0) addLine('', '#000');
				if (step === 1) addLine('═══ GPX PREDICTION ═══════════════════════', '#82aaff');
				if (step === 2) addLine('  Parsing route.gpx... 1247 points', '#888');
				if (step === 3) addLine(`  Dystans:    ${rFloat(42, 48)} km`, '#ccc');
				if (step === 4) addLine(`  Przewyzszenie: ${Math.floor(500 + Math.random() * 300)} m`, '#ccc');
				if (step === 5) addLine(`  Srednia:    ${rFloat(22, 28)} km/h`, '#ccc');
				if (step === 6) addLine('', '#000');
				if (step === 7) addLine(`  PREDICTED:  ${Math.floor(1100 + Math.random() * 300)} kcal`, '#00ff88');
				if (step === 8) addLine('  Saving to data/ml_models/xgboost.pkl', '#888');
				if (step === 10) {
					// Reset and loop
					phase = 0;
					step = -1;
					outputLines.length = 0;
				}
				break;
		}
		step++;
	}

	function drawScreen() {
		const w = canvasEl.width;
		const h = canvasEl.height;

		ctx.fillStyle = '#0d1117';
		ctx.fillRect(0, 0, w, h);

		// Header bar
		ctx.fillStyle = '#161b22';
		ctx.fillRect(0, 0, w, 32);

		ctx.beginPath(); ctx.arc(16, 16, 5, 0, Math.PI * 2); ctx.fillStyle = '#ff5f57'; ctx.fill();
		ctx.beginPath(); ctx.arc(34, 16, 5, 0, Math.PI * 2); ctx.fillStyle = '#febc2e'; ctx.fill();
		ctx.beginPath(); ctx.arc(52, 16, 5, 0, Math.PI * 2); ctx.fillStyle = '#28c840'; ctx.fill();

		ctx.font = '12px monospace';
		ctx.fillStyle = '#8b949e';
		const title = 'python train_models.py';
		ctx.fillText(title, w / 2 - ctx.measureText(title).width / 2, 20);

		ctx.fillStyle = '#21262d';
		ctx.fillRect(0, 32, w, 1);

		// Output lines
		const lineH = 26;
		const startY = 52;
		ctx.font = '13px monospace';

		for (let i = 0; i < outputLines.length; i++) {
			const line = outputLines[i];
			const y = startY + i * lineH;
			if (y > h - 10) break;
			ctx.fillStyle = line.color;
			ctx.fillText(line.text, 12, y);
		}

		// Cursor
		if (Math.floor(Date.now() / 500) % 2 === 0) {
			const cursorY = startY + outputLines.length * lineH;
			ctx.fillStyle = '#00ff88';
			ctx.fillText('▌', 12, cursorY);
		}

		screenTexture.needsUpdate = true;
	}

	let animFrame: number;
	let lastTick = 0;

	function animate() {
		const now = Date.now();
		if (now - lastTick > 600) {
			simStep();
			lastTick = now;
		}
		drawScreen();
		invalidate();
		animFrame = requestAnimationFrame(animate);
	}

	if (typeof document !== 'undefined') {
		document.fonts.ready.then(() => { lastTick = Date.now(); animate(); });
	}

	$effect(() => {
		return () => { if (animFrame) cancelAnimationFrame(animFrame); };
	});

	const { renderer, scene: threlteScene, invalidate } = useThrelte();

	$effect(() => {
		if (!renderer || !threlteScene) return;
		renderer.setClearColor(0x000000, 0);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.2;

		const pmrem = new THREE.PMREMGenerator(renderer);
		const envScene = new THREE.Scene();
		const panelGeo = new THREE.PlaneGeometry(4, 4);
		const topPanel = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
		topPanel.position.set(0, 5, 0); topPanel.rotation.x = Math.PI / 2; envScene.add(topPanel);
		const rightPanel = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide }));
		rightPanel.position.set(5, 0, 0); rightPanel.rotation.y = -Math.PI / 2; envScene.add(rightPanel);
		envScene.background = new THREE.Color(0x080808);
		const envMap = pmrem.fromScene(envScene, 0.04).texture;
		threlteScene.environment = envMap;
		pmrem.dispose(); envScene.clear();

		return () => { envMap.dispose(); if (threlteScene) threlteScene.environment = null; };
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0.3, 10]} fov={35} />

<T.DirectionalLight position={[5, 8, 6]} intensity={3} color={0xffffff} />
<T.DirectionalLight position={[-4, 4, 4]} intensity={1.5} color={0xd0e0ff} />
<T.DirectionalLight position={[0, 4, -6]} intensity={2} color={0xffffff} />
<T.AmbientLight intensity={0.12} color={0xffffff} />

<T.Group rotation.y={$rotationY} rotation.x={$rotationX} rotation.z={0} position.y={0} scale={0.6}>
	<T.Mesh geometry={bodyGeometry}>
		<T.MeshPhysicalMaterial color={0x111111} metalness={1} roughness={1} clearcoat={0.4} clearcoatRoughness={0.2} envMapIntensity={0.5} />
	</T.Mesh>

	<T.Mesh position.z={deviceD / 2 + 0.001} position.y={screenOffsetY}>
		<T.PlaneGeometry args={[screenW, screenH, 16, 16]} />
		<T.MeshPhysicalMaterial color={0x000000} metalness={1.0} roughness={0.05} envMapIntensity={1.2} reflectivity={1.0} />
	</T.Mesh>

	<T.Mesh position.z={deviceD / 2 + 0.002} position.y={screenOffsetY}>
		<T.PlaneGeometry args={[screenW, screenH]} />
		<T.MeshBasicMaterial map={screenTexture} blending={2} depthWrite={false} transparent />
	</T.Mesh>
</T.Group>
