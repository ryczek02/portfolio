<script lang="ts">
	import { Canvas } from '@threlte/core';
	import CyclingScene from './CyclingScene.svelte';

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

	function onPointerUp() { isDragging = false; }

	$effect(() => {
		if (!sectionEl) return;
		const handleScroll = () => {
			if (!sectionEl) return;
			const rect = sectionEl.getBoundingClientRect();
			const windowH = window.innerHeight;
			scrollProgress = Math.max(0, Math.min(1, (windowH - rect.top) / (rect.height + windowH)));
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<section bind:this={sectionEl} class="cycling dot-pattern">
	<div class="cycling-inner">
		<div class="cycling-text">
			<div class="project-label">
				<span class="label-line"></span>
				<span class="label-text">03 / PROJECT</span>
			</div>
			<h2 class="cycling-title">Cycling<br/>Calories</h2>
			<p class="cycling-subtitle">AI for estimating kcals based on Strava data</p>
			<div class="cycling-desc">
				<p>
					Machine learning pipeline for predicting calorie expenditure
					from cycling activities. Strava API integration, feature engineering,
					7 regression models compared, GPX route prediction via FastAPI.
				</p>
			</div>
			<div class="cycling-tags">
				<span class="tag" style="color:#3572A5; border-color:#3572A5;">Python</span>
				<span class="tag" style="color:#f78c6c; border-color:#f78c6c;">scikit-learn</span>
				<span class="tag" style="color:#00ff88; border-color:#00ff88;">XGBoost</span>
				<span class="tag" style="color:#3b82f6; border-color:#3b82f6;">FastAPI</span>
			</div>
			<a href="https://github.com/ryczek02/cycling-calories-ml" target="_blank" rel="noopener" class="cycling-link">
				View on GitHub
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" stroke-width="1.5"/>
				</svg>
			</a>
		</div>
		<div
			class="cycling-canvas"
			class:dragging={isDragging}
			onpointerdown={onPointerDown}
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
			onpointerleave={onPointerUp}
		>
			<Canvas>
				<CyclingScene {scrollProgress} {dragX} {dragY} />
			</Canvas>
		</div>
	</div>
</section>

<style>
	.cycling {
		width: 100%;
		height: 100vh;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		position: relative;
		scroll-snap-align: start;
	}

	.cycling-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.cycling-text {
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

	.label-line { display: block; width: 40px; height: 1px; background: var(--fg-dim); }

	.cycling-title {
		font-family: var(--font-sans);
		font-size: clamp(48px, 6vw, 80px);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 0.95;
		text-transform: uppercase;
	}

	.cycling-subtitle {
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--fg-dim);
		letter-spacing: 0.02em;
	}

	.cycling-desc p {
		font-size: 15px;
		line-height: 1.7;
		color: #cccccc;
		max-width: 440px;
	}

	.cycling-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }

	.tag {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		padding: 6px 14px;
		border: 1px solid var(--border-bright);
		text-transform: uppercase;
	}

	.cycling-link {
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

	.cycling-link:hover { background: var(--fg); color: var(--bg); }

	.cycling-canvas {
		position: relative;
		height: 100%;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
	}

	.cycling-canvas.dragging { cursor: grabbing; }

	@media (max-width: 768px) {
		.cycling { height: auto; min-height: 100vh; }
		.cycling-inner { grid-template-columns: 1fr; }
		.cycling-text { padding: 60px 24px; }
		.cycling-canvas { min-height: 400px; }
	}
</style>
