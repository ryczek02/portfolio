<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { RoundedBoxGeometry as ThreeRoundedBox } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
	import { spring } from 'svelte/motion';
	import * as THREE from 'three';

	type DeviceConfig = { baseX: number; baseY: number; dragSensitivity: number; scale: number; };

	let { scrollProgress = 0, dragX = 0, dragY = 0, config }: {
		scrollProgress: number;
		dragX: number;
		dragY: number;
		config: DeviceConfig;
	} = $props();

	// --- ROZMIARY URZĄDZENIA ---
	const deviceW = 3.41;
	const deviceH = 4.48;
	const deviceD = 1.0;
	const bevelRadius = 0.45;
	const bevelSegments = 8;  // segmenty na zaokrąglenie

	// Three.js RoundedBoxGeometry — bazuje na BoxGeometry, front face ma pełny subdivision
	const bodyGeometry = new ThreeRoundedBox(deviceW, deviceH, deviceD, bevelSegments, bevelRadius);

	// --- EKRAN ---
	const screenW = 2.8;
	const screenH = 3.7;
	const screenMargin = 0.08;
	const screenOffsetY = 0.1;

	// Obrót: base (prosto na usera) + drag offset
	let targetRotX = $derived(config.baseX + dragY);
	let targetRotY = $derived(config.baseY + dragX);

	const rotationY = spring(0, { stiffness: 0.06, damping: 0.4 });
	const rotationX = spring(0, { stiffness: 0.06, damping: 0.4 });

	$effect(() => {
		rotationY.set(targetRotY);
		rotationX.set(targetRotX);
	});

	// --- CANVAS TEXTURE ---
	const canvasEl = document.createElement('canvas');
	canvasEl.width = 341 * 2;
	canvasEl.height = 448 * 2;
	const ctx = canvasEl.getContext('2d')!;
	const screenTexture = new THREE.CanvasTexture(canvasEl);
	screenTexture.colorSpace = THREE.SRGBColorSpace;
	screenTexture.anisotropy = 16;

	// --- SYMULACJA JAZDY ---
	let speed = 28;
	let dist = 47.2;
	let cadence = 85;
	let heart = 148;
	let power = 230;
	let tick = 0;
	const graphHistory: number[] = [];
	for (let i = 0; i < 60; i++) graphHistory.push(27 + Math.random() * 5);

	function simTick() {
		tick++;
		// Prędkość: sinusoida + szum, symuluje podjazdy/zjazdy
		speed = 26 + Math.sin(tick * 0.02) * 8 + Math.sin(tick * 0.07) * 3 + (Math.random() - 0.5) * 2;
		speed = Math.max(8, Math.min(48, speed));

		// Dystans rośnie proporcjonalnie do prędkości
		dist += speed / 3600; // co 1s tick

		// Kadencja koreluje z prędkością
		cadence = Math.round(70 + (speed - 20) * 1.2 + (Math.random() - 0.5) * 6);
		cadence = Math.max(60, Math.min(110, cadence));

		// Tętno: wolno reaguje na wysiłek
		const targetHR = 120 + speed * 1.2;
		heart += (targetHR - heart) * 0.05 + (Math.random() - 0.5) * 2;
		heart = Math.max(110, Math.min(185, heart));

		// Waty korelują z prędkością
		power = Math.round(80 + speed * 5.5 + (Math.random() - 0.5) * 15);
		power = Math.max(80, Math.min(400, power));

		// Wykres przesuwa się — dodaj nowy punkt, usuń stary
		graphHistory.push(speed);
		if (graphHistory.length > 60) graphHistory.shift();
	}

	function drawScreen() {
		const w = canvasEl.width;
		const h = canvasEl.height;
		const s = 2;

		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, w, h);

		// Header line
		ctx.fillStyle = '#1a1a1a';
		ctx.fillRect(0, 70 * s, w, 1);

		// Green dot
		ctx.beginPath();
		ctx.arc(20 * s, 35 * s, 5 * s, 0, Math.PI * 2);
		ctx.fillStyle = '#00ff88';
		ctx.fill();

		// Header
		ctx.font = `${11 * s}px monospace`;
		ctx.fillStyle = '#666666';
		ctx.fillText('BIKEESP V1.2', 35 * s, 40 * s);

		// Speed
		ctx.font = `bold ${64 * s}px sans-serif`;
		ctx.fillStyle = '#ffffff';
		ctx.fillText(speed.toFixed(1), 20 * s, 150 * s);

		ctx.font = `${16 * s}px sans-serif`;
		ctx.fillStyle = '#666666';
		ctx.fillText('km/h', 220 * s, 150 * s);

		// Stat boxes
		const drawStatBox = (x: number, y: number, bw: number, bh: number, label: string, value: string) => {
			ctx.strokeStyle = '#1a1a1a';
			ctx.lineWidth = 1 * s;
			ctx.strokeRect(x, y, bw, bh);
			ctx.font = `${9 * s}px monospace`;
			ctx.fillStyle = '#555555';
			ctx.fillText(label, x + 12 * s, y + 18 * s);
			ctx.font = `bold ${15 * s}px sans-serif`;
			ctx.fillStyle = '#00ff88';
			ctx.fillText(value, x + 12 * s, y + 42 * s);
		};

		const boxW = 140 * s, boxH = 55 * s, gap = 16 * s;
		const sx = 20 * s, row1Y = 180 * s, row2Y = row1Y + boxH + gap;
		drawStatBox(sx, row1Y, boxW, boxH, 'DIST', dist.toFixed(1) + ' km');
		drawStatBox(sx + boxW + gap, row1Y, boxW, boxH, 'CADENCE', Math.round(cadence) + ' rpm');
		drawStatBox(sx, row2Y, boxW, boxH, 'HEART', Math.round(heart) + ' bpm');
		drawStatBox(sx + boxW + gap, row2Y, boxW, boxH, 'POWER', Math.round(power) + ' W');

		// Graph separator
		const graphY = 360 * s;
		ctx.strokeStyle = '#1a1a1a';
		ctx.lineWidth = 1 * s;
		ctx.beginPath();
		ctx.moveTo(20 * s, graphY);
		ctx.lineTo(w - 20 * s, graphY);
		ctx.stroke();

		// Scrolling graph
		const graphH = 60 * s;
		const minSpeed = 5, maxSpeed = 50;
		const gw = w - 40 * s;

		ctx.beginPath();
		ctx.strokeStyle = '#00ff88';
		ctx.lineWidth = 2 * s;
		for (let i = 0; i < graphHistory.length; i++) {
			const px = 20 * s + (i / (graphHistory.length - 1)) * gw;
			const norm = (graphHistory[i] - minSpeed) / (maxSpeed - minSpeed);
			const py = graphY + 10 * s + (1 - norm) * graphH;
			if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
		}
		ctx.stroke();

		// Gradient fill under graph
		const lastPx = 20 * s + gw;
		const lastPy = graphY + 10 * s + (1 - (graphHistory[graphHistory.length - 1] - minSpeed) / (maxSpeed - minSpeed)) * graphH;
		ctx.lineTo(lastPx, graphY + 10 * s + graphH + 5 * s);
		ctx.lineTo(20 * s, graphY + 10 * s + graphH + 5 * s);
		ctx.closePath();
		const grd = ctx.createLinearGradient(0, graphY, 0, graphY + graphH + 10 * s);
		grd.addColorStop(0, 'rgba(0, 255, 136, 0.15)');
		grd.addColorStop(1, 'rgba(0, 255, 136, 0)');
		ctx.fillStyle = grd;
		ctx.fill();

		screenTexture.needsUpdate = true;
	}

	// Animation loop: tick co 500ms, redraw co frame
	let animFrame: number;
	let lastTick = 0;

	function animate() {
		const now = Date.now();
		if (now - lastTick > 1000) {
			simTick();
			lastTick = now;
		}
		drawScreen();

		invalidate();

		animFrame = requestAnimationFrame(animate);
	}

	if (typeof document !== 'undefined') {
		document.fonts.ready.then(() => {
			lastTick = Date.now();
			animate();
		});
	}

	$effect(() => {
		return () => {
			if (animFrame) cancelAnimationFrame(animFrame);
		};
	});

	const { renderer, scene: threlteScene, invalidate } = useThrelte();

	$effect(() => {
		if (!renderer || !threlteScene) return;
		renderer.setClearColor(0x000000, 0);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.2;

		// Procedural environment map for reflections
		const pmrem = new THREE.PMREMGenerator(renderer);
		const envScene = new THREE.Scene();
		const panelGeo = new THREE.PlaneGeometry(4, 4);

		const topPanel = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
		topPanel.position.set(0, 5, 0);
		topPanel.rotation.x = Math.PI / 2;
		envScene.add(topPanel);

		const rightPanel = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide }));
		rightPanel.position.set(5, 0, 0);
		rightPanel.rotation.y = -Math.PI / 2;
		envScene.add(rightPanel);

		const leftPanel = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({ color: 0x8888aa, side: THREE.DoubleSide }));
		leftPanel.position.set(-5, 0, 0);
		leftPanel.rotation.y = Math.PI / 2;
		envScene.add(leftPanel);

		const frontPanel = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), new THREE.MeshBasicMaterial({ color: 0x444444, side: THREE.DoubleSide }));
		frontPanel.position.set(0, 2, 4);
		envScene.add(frontPanel);

		envScene.background = new THREE.Color(0x080808);
		const envMap = pmrem.fromScene(envScene, 0.04).texture;
		threlteScene.environment = envMap;
		pmrem.dispose();
		envScene.clear();

		return () => {
			envMap.dispose();
			if (threlteScene) threlteScene.environment = null;
		};
	});

</script>

<!-- Camera -->
<T.PerspectiveCamera makeDefault position={[0, 0.3, 10]} fov={35} />

<!-- Environment map set procedurally in script -->

<!-- Key lights for visible reflections -->
<T.DirectionalLight position={[5, 8, 6]} intensity={3} color={0xffffff} />
<T.DirectionalLight position={[-4, 4, 4]} intensity={1.5} color={0xd0e0ff} />
<T.DirectionalLight position={[0, 4, -6]} intensity={2} color={0xffffff} />
<T.PointLight position={[6, 0, 5]} intensity={2} color={0xffffff} distance={15} />
<T.AmbientLight intensity={0.12} color={0xffffff} />

<!-- Device -->
<T.Group
	rotation.y={$rotationY}
	rotation.x={$rotationX}
	rotation.z={0}
	position.y={0}
	scale={config.scale}
>
	<!-- Body: matowa obudowa, zero env na body -->
	<T.Mesh geometry={bodyGeometry}>
		<T.MeshPhysicalMaterial
			color={0x111111}
			metalness={1}
			roughness={1}
			clearcoat={0.4}
			clearcoatRoughness={0.2}
			envMapIntensity={0.5}
		/>
	</T.Mesh>

	<!-- Mirror plane: flat normals (0,0,1), ostre lustrzane odbicia -->
	<T.Mesh position.z={deviceD / 2 + 0.001} position.y={screenOffsetY}>
		<T.PlaneGeometry args={[screenW - screenMargin * 2, screenH - screenMargin * 2, 16, 16]} />
		<T.MeshPhysicalMaterial
			color={0x000000}
			metalness={1.0}
			roughness={0.05}
			envMapIntensity={1.2}
			reflectivity={1.0}
		/>
	</T.Mesh>

	<!-- Screen content: na wierzchu, additive — czarny = przezroczysty, content świeci -->
	<T.Mesh position.z={deviceD / 2 + 0.002} position.y={screenOffsetY}>
		<T.PlaneGeometry args={[screenW - screenMargin * 2, screenH - screenMargin * 2]} />
		<T.MeshBasicMaterial
			map={screenTexture}
			blending={2}
			depthWrite={false}
			transparent
		/>
	</T.Mesh>
</T.Group>
