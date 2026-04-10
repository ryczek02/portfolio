<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import * as THREE from 'three';
	import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	const deviceW = 3.41;
	const deviceH = 4.48;
	const deviceD = 1.0;
	const bevelRadius = 0.45;
	const bevelSegments = 8;

	const bodyGeometry = new RoundedBoxGeometry(deviceW, deviceH, deviceD, bevelSegments, bevelRadius);

	const screenW = 2.8;
	const screenH = 3.7;
	const screenMargin = 0.08;
	const screenOffsetY = 0.1;

	const { renderer, invalidate } = useThrelte();

	let cameraRef: THREE.PerspectiveCamera | undefined = $state();

	$effect(() => {
		if (!cameraRef || !renderer) return;
		const controls = new OrbitControls(cameraRef, renderer.domElement);
		controls.enableDamping = true;
		controls.addEventListener('change', () => invalidate());
		return () => controls.dispose();
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 2, 8]} fov={35} bind:ref={cameraRef} />
<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[5, 5, 5]} intensity={1} />

<!-- Body wireframe — teraz z subdividowanym frontem -->
<T.Mesh geometry={bodyGeometry}>
	<T.MeshBasicMaterial wireframe color={0x00ff00} />
</T.Mesh>

<T.Mesh geometry={bodyGeometry}>
	<T.MeshBasicMaterial transparent opacity={0.15} color={0x00ff00} />
</T.Mesh>

<!-- Screen plane -->
<T.Mesh position.z={deviceD / 2 + 0.001} position.y={screenOffsetY}>
	<T.PlaneGeometry args={[screenW - screenMargin * 2, screenH - screenMargin * 2]} />
	<T.MeshBasicMaterial wireframe color={0xff0000} />
</T.Mesh>
