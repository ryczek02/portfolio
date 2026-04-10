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

	// Landscape: swapped W/H from BikeESP
	const deviceW = 4.48;
	const deviceH = 3.41;
	const deviceD = 1.0;
	const bevelRadius = 0.45;
	const bodyGeometry = new ThreeRoundedBox(deviceW, deviceH, deviceD, 8, bevelRadius);

	const screenW = 3.9;
	const screenH = 2.8;
	const screenMargin = 0.0;
	const screenOffsetY = 0;

	let targetRotX = $derived(dragY);
	let targetRotY = $derived(dragX);

	const rotationY = spring(0, { stiffness: 0.06, damping: 0.4 });
	const rotationX = spring(0, { stiffness: 0.06, damping: 0.4 });

	$effect(() => {
		rotationY.set(targetRotY);
		rotationX.set(targetRotX);
	});

	// --- CANVAS ---
	// Landscape canvas matching screen ratio
	const canvasEl = document.createElement('canvas');
	canvasEl.width = 960;
	canvasEl.height = 688;
	const ctx = canvasEl.getContext('2d')!;
	const screenTexture = new THREE.CanvasTexture(canvasEl);
	screenTexture.colorSpace = THREE.SRGBColorSpace;
	screenTexture.anisotropy = 16;

	// --- LIVE LOG SIMULATION ---
	type LogEntry = { time: string; level: 'info' | 'warn' | 'debug'; msg: string };
	const logs: LogEntry[] = [];
	const maxLogs = 22;

	const userNames = ['ermaccer', 'poldek42', 'driver_pl', 'kuba_wrx', 'marek99', 'ania_drift', 'tomek_gti', 'jan_turbo'];
	const packetTypes = ['P_ChatMessage', 'P_DirectMessage', 'P_Position', 'P_Handshake', 'P_MapSync', 'P_VehicleState'];

	const infoTemplates = [
		() => `RECV packet ${pick(packetTypes)} from ${pick(userNames)} [id=${rInt(1,8)}]`,
		() => `SEND broadcast to ${rInt(2,7)} clients (${rInt(32,512)}B)`,
		() => `Client ${pick(userNames)} connected from ${rIP()}`,
		() => `Relayed chat from ${pick(userNames)}: "${pick(['gg','siema','jedz szybciej','pustynia.mar loaded','lol'])}"`,
		() => `RECV P_Position from ${pick(userNames)} x=${rFloat(-200,200)} z=${rFloat(-200,200)}`,
		() => `ACK handshake id=${rInt(1,8)} map=pustynia.mar car=car.mar`,
	];

	const warnTemplates = [
		() => `High latency from ${pick(userNames)}: ${rInt(150,400)}ms`,
		() => `Packet queue ${rInt(60,95)}% full for id=${rInt(1,8)}`,
		() => `Retry send to ${pick(userNames)} (attempt ${rInt(2,3)}/3)`,
	];

	const debugTemplates = [
		() => `tick #${rInt(10000,99999)} dt=${rFloat(14,18).toFixed(1)}ms clients=${rInt(3,8)}`,
		() => `Socket buffer: ${rInt(1024,8192)}B / ${rInt(16384,32768)}B`,
		() => `Thread pool: ${rInt(3,8)} active, ${rInt(0,2)} idle`,
	];

	function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
	function rInt(a: number, b: number) { return Math.floor(Math.random() * (b - a + 1)) + a; }
	function rFloat(a: number, b: number) { return a + Math.random() * (b - a); }
	function rIP() { return `192.168.${rInt(0,5)}.${rInt(10,250)}`; }

	function genTimestamp(): string {
		const d = new Date();
		return d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0');
	}

	function addLog() {
		const roll = Math.random();
		let level: LogEntry['level'];
		let msg: string;

		if (roll < 0.65) {
			level = 'info';
			msg = pick(infoTemplates)();
		} else if (roll < 0.85) {
			level = 'debug';
			msg = pick(debugTemplates)();
		} else {
			level = 'warn';
			msg = pick(warnTemplates)();
		}

		logs.push({ time: genTimestamp(), level, msg });
		if (logs.length > maxLogs) logs.shift();
	}

	// Seed initial logs
	for (let i = 0; i < 15; i++) addLog();

	const levelColors: Record<string, string> = {
		info: '#00ff88',
		warn: '#febc2e',
		debug: '#888888',
	};

	const levelLabels: Record<string, string> = {
		info: 'INFO ',
		warn: 'WARN ',
		debug: 'DEBUG',
	};

	function drawScreen() {
		const w = canvasEl.width;
		const h = canvasEl.height;

		ctx.fillStyle = '#0d1117';
		ctx.fillRect(0, 0, w, h);

		// Header bar
		ctx.fillStyle = '#161b22';
		ctx.fillRect(0, 0, w, 32);

		// Traffic lights
		ctx.beginPath(); ctx.arc(16, 16, 5, 0, Math.PI * 2); ctx.fillStyle = '#ff5f57'; ctx.fill();
		ctx.beginPath(); ctx.arc(34, 16, 5, 0, Math.PI * 2); ctx.fillStyle = '#febc2e'; ctx.fill();
		ctx.beginPath(); ctx.arc(52, 16, 5, 0, Math.PI * 2); ctx.fillStyle = '#28c840'; ctx.fill();

		// Title
		ctx.font = '12px monospace';
		ctx.fillStyle = '#8b949e';
		const title = 'TWServer — 0.0.0.0:7777';
		ctx.fillText(title, w / 2 - ctx.measureText(title).width / 2, 20);

		// Connection status
		ctx.fillStyle = '#00ff88';
		ctx.fillText(`● ${rInt(3, 8)} online`, w - 100, 20);

		// Separator
		ctx.fillStyle = '#21262d';
		ctx.fillRect(0, 32, w, 1);

		// Log lines
		const lineH = 26;
		const startY = 52;
		ctx.font = '13px monospace';

		for (let i = 0; i < logs.length; i++) {
			const log = logs[i];
			const y = startY + i * lineH;
			if (y > h - 10) break;

			// Timestamp
			ctx.fillStyle = '#484f58';
			ctx.fillText(log.time, 10, y);

			// Level badge
			ctx.fillStyle = levelColors[log.level];
			ctx.fillText(levelLabels[log.level], 130, y);

			// Message
			ctx.fillStyle = log.level === 'debug' ? '#666' : '#ccc';
			ctx.fillText(log.msg, 185, y);
		}

		// Cursor blink
		if (Math.floor(Date.now() / 500) % 2 === 0) {
			const cursorY = startY + logs.length * lineH;
			ctx.fillStyle = '#00ff88';
			ctx.fillText('▌', 10, cursorY);
		}

		screenTexture.needsUpdate = true;
	}

	// Animation loop
	let animFrame: number;
	let lastTick = 0;

	function animate() {
		const now = Date.now();
		if (now - lastTick > 800) {
			addLog();
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
		topPanel.position.set(0, 5, 0);
		topPanel.rotation.x = Math.PI / 2;
		envScene.add(topPanel);

		const rightPanel = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide }));
		rightPanel.position.set(5, 0, 0);
		rightPanel.rotation.y = -Math.PI / 2;
		envScene.add(rightPanel);

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

<T.PerspectiveCamera makeDefault position={[0, 0.3, 10]} fov={35} />

<T.DirectionalLight position={[5, 8, 6]} intensity={3} color={0xffffff} />
<T.DirectionalLight position={[-4, 4, 4]} intensity={1.5} color={0xd0e0ff} />
<T.DirectionalLight position={[0, 4, -6]} intensity={2} color={0xffffff} />
<T.AmbientLight intensity={0.12} color={0xffffff} />

<T.Group
	rotation.y={$rotationY}
	rotation.x={$rotationX}
	rotation.z={0}
	position.y={0}
	scale={0.6}
>
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

	<!-- Mirror -->
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

	<!-- Screen content -->
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
