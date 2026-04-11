<script lang="ts">
	import { Canvas } from '@threlte/core';
	import PoldekScene from './PoldekScene.svelte';
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

	const maxAngle = 15 * Math.PI / 180;

	function onPointerDown(e: PointerEvent) {
		isDragging = true;
		dragStartX = e.clientX;
		dragStartY = e.clientY;
		dragBaseX = dragX;
		dragBaseY = dragY;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging) return;
		dragX = Math.max(-maxAngle, Math.min(maxAngle, dragBaseX + (e.clientX - dragStartX) * 0.002));
		dragY = Math.max(-maxAngle, Math.min(maxAngle, dragBaseY + (e.clientY - dragStartY) * 0.002));
	}

	function onPointerUp() {
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
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<section bind:this={sectionEl} class="poldek dot-pattern">
	<div class="poldek-inner">
		{#if !isMobile.value}
			<div
				class="poldek-canvas"
				class:dragging={isDragging}
				onpointerdown={onPointerDown}
				onpointermove={onPointerMove}
				onpointerup={onPointerUp}
				onpointerleave={onPointerUp}
			>
				{#if browser}
					<Canvas>
						<PoldekScene {scrollProgress} {dragX} {dragY} />
					</Canvas>
				{/if}
			</div>
		{/if}
		<div class="poldek-text">
			<div class="project-label">
				<span class="label-line"></span>
				<span class="label-text">02 / PROJECT</span>
			</div>
			<h2 class="poldek-title">Poldek<br/>Driver</h2>
			<p class="poldek-subtitle">Multiplayer driver implementation for the Poldek game</p>
			<div class="poldek-desc">
				<p>
					Client-server multiplayer networking layer for PolMod.
					TCP-based architecture with Winsock2, supporting up to 100
					concurrent players, chat relay, direct messaging and RCON authentication.
				</p>
			</div>
			<div class="poldek-tags">
				<span class="tag" style="color:#f34b7d; border-color:#f34b7d;">C++</span>
				<span class="tag" style="color:#00599c; border-color:#00599c;">Winsock2</span>
				<span class="tag" style="color:#e8a317; border-color:#e8a317;">TCP</span>
				<span class="tag" style="color:#a855f7; border-color:#a855f7;">Multiplayer</span>
			</div>
			<a href="https://github.com/ryczek02/Poldek-Driver-Multiplayer" target="_blank" rel="noopener" class="poldek-link">
				View on GitHub
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" stroke-width="1.5"/>
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.poldek {
		width: 100%;
		height: 100vh;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		position: relative;
		scroll-snap-align: start;
	}

	.poldek-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.poldek-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 60px 60px 60px 60px;
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

	.poldek-title {
		font-family: var(--font-sans);
		font-size: clamp(48px, 6vw, 80px);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 0.95;
		text-transform: uppercase;
	}

	.poldek-subtitle {
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--fg-dim);
		letter-spacing: 0.02em;
	}

	.poldek-desc p {
		font-size: 15px;
		line-height: 1.7;
		color: #cccccc;
		max-width: 440px;
	}

	.poldek-tags {
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
		text-transform: uppercase;
	}

	.poldek-link {
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

	.poldek-link:hover {
		background: var(--fg);
		color: var(--bg);
	}

	.poldek-canvas {
		position: relative;
		height: 100%;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
		padding-left: 40px;
	}

	.poldek-canvas.dragging {
		cursor: grabbing;
	}

	@media (max-width: 768px) {
		.poldek {
			height: auto;
			min-height: 0;
			scroll-snap-align: none;
		}
		.poldek-inner {
			grid-template-columns: 1fr;
			height: auto;
		}
		.poldek-text {
			padding: 60px 24px;
			gap: 22px;
		}
		.poldek-title { font-size: 62px; }
		.poldek-subtitle { font-size: 16px; }
		.poldek-desc p { font-size: 17px; line-height: 1.65; }
		.poldek-tags {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 10px;
			width: 100%;
			margin-top: 4px;
		}
		.poldek-tags .tag {
			text-align: center;
			padding: 10px 4px;
			font-size: 13px;
		}
		.poldek-link {
			margin-top: 8px;
			align-self: stretch;
			justify-content: center;
			font-size: 15px;
			padding: 18px 28px;
		}
	}
</style>
