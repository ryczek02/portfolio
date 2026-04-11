<script lang="ts">
	import ParticleNetwork from './ParticleNetwork.svelte';
	let visible = $state(false);

	$effect(() => {
		// Stagger animation on mount
		const timer = setTimeout(() => { visible = true; }, 100);
		return () => clearTimeout(timer);
	});
</script>

<section class="hero" class:visible>
	<ParticleNetwork />
	<div class="hero-inner">
		<div class="hero-spacer"></div>
		<div class="hero-center">
			<h1 class="hero-name">
				<span class="line line-1">Łukasz</span>
				<span class="line line-2">Ryczko</span>
			</h1>
		</div>

		<div class="hero-bottom">
			<div class="hero-role">
				<p>Software engineer focused on backend systems,</p>
				<p>AI integrations and embedded projects.</p>
			</div>
			<div class="hero-areas">
				<div class="area">
					<span class="area-num">01</span>
					<span class="area-name">Laravel</span>
				</div>
				<div class="area">
					<span class="area-num">02</span>
					<span class="area-name">AI / LLM</span>
				</div>
				<div class="area">
					<span class="area-num">03</span>
					<span class="area-name">Embedded</span>
				</div>
				<div class="area">
					<span class="area-num">04</span>
					<span class="area-name">Backend</span>
				</div>
			</div>
		</div>
	</div>

	<a href="#projects" class="scroll-indicator">
		<span class="scroll-line"></span>
		<span class="scroll-text">SCROLL</span>
	</a>
</section>

<style>
	.hero {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		border-bottom: 1px solid var(--border);
		opacity: 0;
		transition: opacity 0.8s ease;
		scroll-snap-align: start;
	}

	.hero.visible {
		opacity: 1;
	}

	.hero-inner {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 80px 60px 40px;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
		position: relative;
		z-index: 1;
	}

	.hero-spacer {
		flex: 1;
	}

	.hero-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.hero-label {
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		color: var(--fg-dim);
	}

	.dot {
		width: 6px;
		height: 6px;
		background: var(--fg);
		display: block;
	}

	.hero-links {
		display: flex;
		gap: 32px;
	}

	.hero-links a {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-dim);
		transition: color 0.2s;
		position: relative;
	}

	.hero-links a::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--fg);
		transition: width 0.3s;
	}

	.hero-links a:hover {
		color: var(--fg);
	}

	.hero-links a:hover::after {
		width: 100%;
	}

	.hero-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-name {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.line {
		display: block;
		font-family: var(--font-sans);
		font-weight: 900;
		font-size: clamp(60px, 12vw, 160px);
		letter-spacing: -0.04em;
		line-height: 0.9;
		text-transform: uppercase;
	}

	.line-2 {
		color: var(--bg);
		-webkit-text-stroke: 0;
		text-shadow:
			-1px -1px 0 var(--fg),
			 1px -1px 0 var(--fg),
			-1px  1px 0 var(--fg),
			 1px  1px 0 var(--fg),
			 0   -1px 0 var(--fg),
			 0    1px 0 var(--fg),
			-1px  0   0 var(--fg),
			 1px  0   0 var(--fg);
	}

	.hero-bottom {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.hero-role p {
		font-size: 14px;
		line-height: 1.8;
		color: var(--fg-dim);
	}

	.hero-areas {
		display: flex;
		gap: 40px;
	}

	.area {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.area-num {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--fg-dim);
		letter-spacing: 0.1em;
	}

	.area-name {
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg);
	}

	.scroll-indicator {
		position: absolute;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		z-index: 1;
	}

	.scroll-line {
		width: 1px;
		height: 40px;
		background: var(--fg-dim);
		animation: scrollPulse 2s ease-in-out infinite;
	}

	.scroll-text {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.3em;
		color: var(--fg-dim);
	}

	@keyframes scrollPulse {
		0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
		50% { opacity: 1; transform: scaleY(1); }
	}

	@media (max-width: 768px) {
		.hero-inner {
			padding: 30px 24px 90px;
		}

		.hero-top {
			flex-direction: column;
			gap: 20px;
			align-items: flex-start;
		}

		.hero-bottom {
			flex-direction: column;
			gap: 44px;
			align-items: center;
			flex: 1.3;
			justify-content: flex-start;
			padding-top: 48px;
		}

		.hero-role {
			text-align: center;
		}

		.hero-role p {
			font-size: 17px;
			line-height: 1.7;
		}

		.hero-areas {
			gap: 20px 28px;
			flex-wrap: wrap;
			justify-content: center;
		}

		.area-num {
			font-size: 12px;
		}

		.area-name {
			font-size: 15px;
		}

		.scroll-indicator {
			bottom: 20px;
		}

		.scroll-line {
			height: 24px;
		}

		.scroll-text {
			font-size: 10px;
		}
	}
</style>
