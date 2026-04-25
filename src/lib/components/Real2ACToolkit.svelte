<script lang="ts">
	import { Canvas } from '@threlte/core';
	import PointCloudScene from './PointCloudScene.svelte';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/isMobile.svelte';

	let sectionEl: HTMLElement | undefined = $state();
	let scrollProgress = $state(0);

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
</script>

<section bind:this={sectionEl} class="r2ac dot-pattern">
	<div class="r2ac-inner">
		<div class="r2ac-text">
			<div class="project-label">
				<span class="label-line"></span>
				<span class="label-text">00 / PLUGIN</span>
			</div>
			<h2 class="r2ac-title">Real2AC<br/>Toolkit</h2>
			<p class="r2ac-subtitle">Plugin for Fluffy's Track Exporter [0.5.5]</p>
			<div class="r2ac-desc">
				<p>
					Transfer real-world locations straight into Assetto Corsa in just a few minutes. Leveraging point cloud data and automated mesh generation, this toolkit bridges the gap between reality and sim racing with minimal manual effort.
				</p>
			</div>
			<div class="r2ac-tags">
				<span class="tag">BLENDER</span>
				<span class="tag">PYTHON</span>
				<span class="tag">MODULE</span>
			</div>
			<a href="#" class="r2ac-link">
				COMING SOON
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" stroke-width="1.5"/>
				</svg>
			</a>
		</div>
		{#if !isMobile.value}
			<div
				class="r2ac-canvas"
				class:dragging={isDragging}
				onpointerdown={onCanvasPointerDown}
				onpointermove={onCanvasPointerMove}
				onpointerup={onCanvasPointerUp}
				onpointerleave={onCanvasPointerUp}
			>
				{#if browser}
					<Canvas>
						<PointCloudScene {scrollProgress} {dragX} {dragY} />
					</Canvas>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.r2ac {
		width: 100%;
		height: 100vh;
		border-top: 1px solid #4a1a1a;
		border-bottom: 1px solid #4a1a1a;
		position: relative;
		scroll-snap-align: start;
		background: linear-gradient(135deg, #1a0505 0%, #0d0d0d 40%, #1a0808 100%);
	}

	.r2ac-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.r2ac-text {
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
		color: #cc3333;
	}

	.label-line {
		display: block;
		width: 40px;
		height: 1px;
		background: #cc3333;
	}

	.r2ac-title {
		font-family: var(--font-sans);
		font-size: clamp(48px, 6vw, 80px);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 0.95;
		text-transform: uppercase;
		color: #ff4444;
		text-shadow: 0 0 40px rgba(255, 68, 68, 0.15);
	}

	.r2ac-subtitle {
		font-family: var(--font-mono);
		font-size: 14px;
		color: #cc6666;
		letter-spacing: 0.02em;
	}

	.r2ac-desc p {
		font-size: 15px;
		line-height: 1.7;
		color: #cccccc;
		max-width: 440px;
		text-align: left;
	}

	.r2ac-tags {
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
		border: 1px solid #cc3333;
		color: #ff6666;
		text-transform: uppercase;
	}

	.r2ac-link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #ff4444;
		border: 1px solid #ff4444;
		padding: 14px 28px;
		margin-top: 16px;
		transition: background 0.2s, color 0.2s;
		align-self: flex-start;
	}

	.r2ac-link:hover {
		background: #ff4444;
		color: #0d0d0d;
	}

	.r2ac-canvas {
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

	.r2ac-canvas.dragging {
		cursor: grabbing;
	}

	@media (max-width: 768px) {
		.r2ac {
			height: auto;
			min-height: 0;
			scroll-snap-align: none;
		}

		.r2ac-inner {
			grid-template-columns: 1fr;
			height: auto;
		}

		.r2ac-text {
			padding: 60px 24px;
			gap: 22px;
		}

		.r2ac-title {
			font-size: 62px;
		}

		.r2ac-subtitle {
			font-size: 16px;
		}

		.r2ac-desc p {
			font-size: 17px;
			line-height: 1.65;
		}

		.r2ac-tags {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 10px;
			width: 100%;
			margin-top: 4px;
		}

		.r2ac-tags .tag {
			text-align: center;
			padding: 10px 4px;
			font-size: 13px;
		}

		.r2ac-link {
			margin-top: 8px;
			align-self: stretch;
			justify-content: center;
			font-size: 15px;
			padding: 18px 28px;
		}
	}
</style>
