<script lang="ts">
	import { Canvas } from '@threlte/core';
	import ESP32Scene from './ESP32Scene.svelte';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/isMobile.svelte';

	let sectionEl: HTMLElement | undefined = $state();
	let scrollProgress = $state(0);

	// Drag rotation: łapiesz za model i kręcisz
	let dragX = $state(0);
	let dragY = $state(0);
	let isDragging = $state(false);
	let dragStartX = 0;
	let dragStartY = 0;
	let dragBaseX = 0;
	let dragBaseY = 0;

	const deviceConfig = {
		baseX: 0,       // patrzący na usera (0 = prosto)
		baseY: 0,
		dragSensitivity: 0.002,
		scale: 0.6,
	};

	function onCanvasPointerDown(e: PointerEvent) {
		isDragging = true;
		dragStartX = e.clientX;
		dragStartY = e.clientY;
		dragBaseX = dragX;
		dragBaseY = dragY;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	}

	const maxAngle = 15 * Math.PI / 180; // 15°

	function onCanvasPointerMove(e: PointerEvent) {
		if (!isDragging) return;
		const rawX = dragBaseX + (e.clientX - dragStartX) * deviceConfig.dragSensitivity;
		const rawY = dragBaseY + (e.clientY - dragStartY) * deviceConfig.dragSensitivity;
		dragX = Math.max(-maxAngle, Math.min(maxAngle, rawX));
		dragY = Math.max(-maxAngle, Math.min(maxAngle, rawY));
	}

	function onCanvasPointerUp() {
		isDragging = false;
	}

	$effect(() => {
		if (!sectionEl) return;

		const handleScroll = () => {
			if (!sectionEl) return;
			const rect = sectionEl.getBoundingClientRect();
			const windowH = window.innerHeight;
			const total = rect.height + windowH;
			const scrolled = windowH - rect.top;
			scrollProgress = Math.max(0, Math.min(1, scrolled / total));
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<section bind:this={sectionEl} class="bikeesp dot-pattern">
	<div class="bikeesp-inner">
		<div class="bikeesp-text">
			<div class="project-label">
				<span class="label-line"></span>
				<span class="label-text">01 / PROJECT</span>
			</div>
			<h2 class="bikeesp-title">BikeESP</h2>
			<p class="bikeesp-subtitle">ESP32 based bike computer and telemetry device</p>
			<div class="bikeesp-desc">
				<p>
					Custom-built cycling computer powered by the ESP32-S3 microcontroller
					with AMOLED touch display. Real-time telemetry, GPS tracking,
					and sensor data acquisition for performance analysis.
				</p>
			</div>
			<div class="bikeesp-tags">
				<span class="tag" style="color:#f34b7d; border-color:#f34b7d;">C++</span>
				<span class="tag" style="color:#00ff88; border-color:#00ff88;">ESP32</span>
				<span class="tag" style="color:#e8a317; border-color:#e8a317;">Embedded</span>
				<span class="tag" style="color:#3b82f6; border-color:#3b82f6;">IoT</span>
			</div>
			<a href="https://github.com/ryczek02/BikeESP" target="_blank" rel="noopener" class="bikeesp-link">
				View on GitHub
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" stroke-width="1.5"/>
				</svg>
			</a>
		</div>
		{#if !isMobile.value}
			<div
				class="bikeesp-canvas"
				class:dragging={isDragging}
				onpointerdown={onCanvasPointerDown}
				onpointermove={onCanvasPointerMove}
				onpointerup={onCanvasPointerUp}
				onpointerleave={onCanvasPointerUp}
			>
				{#if browser}
					<Canvas>
						<ESP32Scene {scrollProgress} {dragX} {dragY} config={deviceConfig} />
					</Canvas>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.bikeesp {
		width: 100%;
		height: 100vh;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		position: relative;
		scroll-snap-align: start;
	}

	.bikeesp-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.bikeesp-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 60px 40px 60px 60px;
		gap: 24px;
	}

	.project-label {
		display: flex;
		align-items: center;
		gap: 16px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-dim);
	}

	.label-line {
		display: block;
		width: 40px;
		height: 1px;
		background: var(--fg-dim);
	}

	.bikeesp-title {
		font-family: var(--font-sans);
		font-size: clamp(48px, 6vw, 80px);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 0.95;
		text-transform: uppercase;
	}

	.bikeesp-subtitle {
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--fg-dim);
		letter-spacing: 0.02em;
	}

	.bikeesp-desc p {
		font-size: 15px;
		line-height: 1.7;
		color: #cccccc;
		max-width: 440px;
	}

	.bikeesp-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 8px;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		padding: 6px 14px;
		border: 1px solid var(--border-bright);
		color: var(--fg-dim);
		text-transform: uppercase;
	}

	.bikeesp-link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg);
		border: 1px solid var(--fg);
		padding: 14px 28px;
		margin-top: 16px;
		transition: background 0.2s, color 0.2s;
		align-self: flex-start;
	}

	.bikeesp-link:hover {
		background: var(--fg);
		color: var(--bg);
	}

	.bikeesp-canvas {
		position: relative;
		height: 100%;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
	}

	.bikeesp-canvas.dragging {
		cursor: grabbing;
	}

	@media (max-width: 768px) {
		.bikeesp {
			height: auto;
			min-height: 0;
			scroll-snap-align: none;
		}

		.bikeesp-inner {
			grid-template-columns: 1fr;
			height: auto;
		}

		.bikeesp-text {
			padding: 60px 24px;
			gap: 22px;
		}

		.bikeesp-title {
			font-size: 62px;
		}

		.bikeesp-subtitle {
			font-size: 16px;
		}

		.bikeesp-desc p {
			font-size: 17px;
			line-height: 1.65;
		}

		.bikeesp-tags {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 10px;
			width: 100%;
			margin-top: 4px;
		}

		.bikeesp-tags .tag {
			text-align: center;
			padding: 10px 4px;
			font-size: 13px;
		}

		.bikeesp-link {
			margin-top: 8px;
			align-self: stretch;
			justify-content: center;
			font-size: 15px;
			padding: 18px 28px;
		}
	}
</style>
