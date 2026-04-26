<script lang="ts">
	import { Canvas } from '@threlte/core';
	import NeuralNetScene from './NeuralNetScene.svelte';
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

<section bind:this={sectionEl} class="neuronai dot-pattern">
	<div class="neuronai-inner">
		<div class="neuronai-text">
			<div class="project-label">
				<span class="label-line"></span>
				<span class="label-text">04 / OPEN SOURCE</span>
			</div>
			<h2 class="neuronai-title">Neuron<br/>AI</h2>
			<p class="neuronai-subtitle">PHP Agentic AI Framework — Contributor</p>
			<div class="neuronai-desc">
				<p>
					Contributing to Neuron AI — an all-in-one framework for building
					AI agents and RAG applications in PHP. Multi-provider support
					for OpenAI, Anthropic, and Gemini with seamless Laravel
					and Symfony integration.
				</p>
			</div>
			<div class="neuronai-tags">
				<span class="tag">PHP</span>
				<span class="tag">AI Agents</span>
				<span class="tag">Open Source</span>
				<span class="tag">RAG</span>
			</div>
			<a href="https://www.neuron-ai.dev/" target="_blank" rel="noopener" class="neuronai-link">
				View Project
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" stroke-width="1.5"/>
				</svg>
			</a>
		</div>
		{#if !isMobile.value}
			<div
				class="neuronai-canvas"
				class:dragging={isDragging}
				onpointerdown={onCanvasPointerDown}
				onpointermove={onCanvasPointerMove}
				onpointerup={onCanvasPointerUp}
				onpointerleave={onCanvasPointerUp}
			>
				{#if browser && isNearViewport}
					<Canvas>
						<NeuralNetScene {scrollProgress} {dragX} {dragY} />
					</Canvas>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.neuronai {
		width: 100%;
		height: 100vh;
		border-top: 1px solid #2d1a4a;
		border-bottom: 1px solid #2d1a4a;
		position: relative;
		scroll-snap-align: start;
		background: linear-gradient(135deg, #0f0520 0%, #0d0d0d 40%, #100818 100%);
	}

	.neuronai-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.neuronai-text {
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
		color: #8b5cf6;
	}

	.label-line {
		display: block;
		width: 40px;
		height: 1px;
		background: #8b5cf6;
	}

	.neuronai-title {
		font-family: var(--font-display);
		font-size: clamp(48px, 6vw, 80px);
		font-weight: 900;
		letter-spacing: -0.02em;
		line-height: 0.95;
		text-transform: uppercase;
		color: #a78bfa;
		text-shadow: 0 0 40px rgba(139, 92, 246, 0.2);
	}

	.neuronai-subtitle {
		font-family: var(--font-mono);
		font-size: 14px;
		color: #9775d4;
		letter-spacing: 0.02em;
	}

	.neuronai-desc p {
		font-size: 15px;
		line-height: 1.7;
		color: #cccccc;
		max-width: 440px;
	}

	.neuronai-tags {
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
		border: 1px solid #8b5cf6;
		color: #a78bfa;
		text-transform: uppercase;
	}

	.neuronai-link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #a78bfa;
		border: 1px solid #a78bfa;
		padding: 14px 28px;
		margin-top: 16px;
		transition: background 0.2s, color 0.2s;
		align-self: flex-start;
	}

	.neuronai-link:hover {
		background: #a78bfa;
		color: #0d0d0d;
	}

	.neuronai-canvas {
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

	.neuronai-canvas.dragging {
		cursor: grabbing;
	}

	@media (max-width: 768px) {
		.neuronai {
			height: auto;
			min-height: 0;
			scroll-snap-align: none;
		}

		.neuronai-inner {
			grid-template-columns: 1fr;
			height: auto;
		}

		.neuronai-text {
			padding: 60px 24px;
			gap: 22px;
		}

		.neuronai-title {
			font-size: 62px;
		}

		.neuronai-subtitle {
			font-size: 16px;
		}

		.neuronai-desc p {
			font-size: 17px;
			line-height: 1.65;
		}

		.neuronai-tags {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 10px;
			width: 100%;
			margin-top: 4px;
		}

		.neuronai-tags .tag {
			text-align: center;
			padding: 10px 4px;
			font-size: 13px;
		}

		.neuronai-link {
			margin-top: 8px;
			align-self: stretch;
			justify-content: center;
			font-size: 15px;
			padding: 18px 28px;
		}
	}
</style>
