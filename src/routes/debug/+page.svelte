<script lang="ts">
	import { Canvas } from '@threlte/core';
	import DebugScene from './DebugScene.svelte';
	import { browser } from '$app/environment';
</script>

<div style="width:100vw; height:100vh; background:#111;">
	{#if browser}
		<Canvas>
			<DebugScene />
		</Canvas>
	{/if}
</div>
