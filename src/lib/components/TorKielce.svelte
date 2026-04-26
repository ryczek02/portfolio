<script lang="ts">
	import { Canvas } from '@threlte/core';
	import RacingTrackScene from './RacingTrackScene.svelte';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/isMobile.svelte';

	let sectionEl: HTMLElement | undefined = $state();
	let scrollProgress = $state(0);
	let isNearViewport = $state(false);

	let dragX = $state(0);
	let dragY = $state(0);
	let isDragging = $state(false);
	let dragStartX = 0;
	let dragStartY = 0;
	let dragBaseX = 0;
	let dragBaseY = 0;

	const dragSensitivity = 0.002;
	const maxAngle = 15 * Math.PI / 180;

	function onCanvasPointerDown(e: PointerEvent) {
		isDragging = true;
		dragStartX = e.clientX;
		dragStartY = e.clientY;
		dragBaseX = dragX;
		dragBaseY = dragY;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onCanvasPointerMove(e: PointerEvent) {
		if (!isDragging) return;
		const rawX = dragBaseX + (e.clientX - dragStartX) * dragSensitivity;
		const rawY = dragBaseY + (e.clientY - dragStartY) * dragSensitivity;
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

	$effect(() => {
		if (!sectionEl || !browser) return;
		const observer = new IntersectionObserver(
			([entry]) => { isNearViewport = entry.isIntersecting; },
			{ rootMargin: '500px' }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section bind:this={sectionEl} class="torkielce dot-pattern">
	<div class="torkielce-inner">
		<div class="torkielce-text">
			<div class="project-label">
				<span class="label-line"></span>
				<span class="label-text">00 / MOD</span>
			</div>
			<h2 class="torkielce-title">Tor<br/>Kielce</h2>
			<p class="torkielce-subtitle">Assetto Corsa Track Mod — Co-Author</p>
			<div class="torkielce-desc">
				<p>
					Co-authored a faithful recreation of the Kielce racing circuit
					for Assetto Corsa. The project involved 3D modelling of the
					track surface, environment design, and optimization for
					real-time racing simulation — bringing a real-world track
					into the virtual world.
				</p>
			</div>
			<div class="torkielce-tags">
				<span class="tag">3D Modelling</span>
				<span class="tag">Gamedev</span>
				<span class="tag">Blender</span>
				<span class="tag">Assetto Corsa</span>
			</div>
		</div>
		{#if !isMobile.value}
			<div
				class="torkielce-canvas"
				class:dragging={isDragging}
				onpointerdown={onCanvasPointerDown}
				onpointermove={onCanvasPointerMove}
				onpointerup={onCanvasPointerUp}
				onpointerleave={onCanvasPointerUp}
			>
				{#if browser && isNearViewport}
					<Canvas>
						<RacingTrackScene {scrollProgress} {dragX} {dragY} />
					</Canvas>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.torkielce {
		width: 100%;
		height: 100vh;
		border-top: 1px solid #4a2a0a;
		border-bottom: 1px solid #4a2a0a;
		position: relative;
		scroll-snap-align: start;
		background: linear-gradient(135deg, #1a0c02 0%, #0d0d0d 40%, #1a0f05 100%);
	}

	.torkielce-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.torkielce-text {
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
		color: #cc6600;
	}

	.label-line {
		display: block;
		width: 40px;
		height: 1px;
		background: #cc6600;
	}

	.torkielce-title {
		font-family: var(--font-display);
		font-size: clamp(48px, 6vw, 80px);
		font-weight: 900;
		letter-spacing: -0.02em;
		line-height: 0.95;
		text-transform: uppercase;
		color: #ff6600;
		text-shadow: 0 0 40px rgba(255, 102, 0, 0.15);
	}

	.torkielce-subtitle {
		font-family: var(--font-mono);
		font-size: 14px;
		color: #cc8844;
		letter-spacing: 0.02em;
	}

	.torkielce-desc p {
		font-size: 15px;
		line-height: 1.7;
		color: #cccccc;
		max-width: 440px;
	}

	.torkielce-tags {
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
		border: 1px solid #cc6600;
		color: #ff8844;
		text-transform: uppercase;
	}

	.torkielce-canvas {
		position: relative;
		height: 100%;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
		-webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
		mask-image: linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%);
	}

	.torkielce-canvas.dragging {
		cursor: grabbing;
	}

	@media (max-width: 768px) {
		.torkielce {
			height: auto;
			min-height: 0;
			scroll-snap-align: none;
		}

		.torkielce-inner {
			grid-template-columns: 1fr;
			height: auto;
		}

		.torkielce-text {
			padding: 60px 24px;
			gap: 22px;
		}

		.torkielce-title {
			font-size: 62px;
		}

		.torkielce-subtitle {
			font-size: 16px;
		}

		.torkielce-desc p {
			font-size: 17px;
			line-height: 1.65;
		}

		.torkielce-tags {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 10px;
			width: 100%;
			margin-top: 4px;
		}

		.torkielce-tags .tag {
			text-align: center;
			padding: 10px 4px;
			font-size: 13px;
		}
	}
</style>
