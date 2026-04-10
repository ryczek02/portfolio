<script lang="ts">
	const techs = [
		{ name: 'PHP', color: '#777BB4', exp: '4 years' },
		{ name: 'Laravel', color: '#FF2D20', exp: '4 years' },
		{ name: 'Python', color: '#3572A5', exp: '3 years' },
		{ name: 'JavaScript', color: '#F7DF1E', exp: '4 years' },
		{ name: 'C', color: '#555555', exp: '3 years' },
		{ name: 'C++', color: '#f34b7d', exp: '3 years' },
		{ name: 'TypeScript', color: '#3178C6', exp: '2 years' },
		{ name: 'Docker', color: '#2496ED', exp: '3 years' },
		{ name: 'AWS', color: '#FF9900', exp: '2 years' },
		{ name: 'PostgreSQL', color: '#4169E1', exp: '3 years' },
		{ name: 'MySQL', color: '#4479A1', exp: '4 years' },
		{ name: 'Linux', color: '#FCC624', exp: '5 years' },
		{ name: 'Git', color: '#F05032', exp: '5 years' },
		{ name: 'Vue.js', color: '#4FC08D', exp: '3 years' },
		{ name: 'Svelte', color: '#FF3E00', exp: '1 year' },
		{ name: 'Redis', color: '#DC382D', exp: '2 years' },
	];

	let hoveredIdx = $state(-1);
</script>

<section class="stack dot-pattern">
	<div class="stack-inner">
		<div class="stack-left">
			<div class="section-label">
				<span class="label-line"></span>
				<span class="label-text">TOOLS</span>
			</div>
			<h2 class="stack-title">Stack</h2>
			<p class="stack-desc">Languages, frameworks and tools I work with daily.</p>
		</div>
		<div class="stack-right">
			<div class="grid">
				{#each techs as tech, i}
					<button
						class="tech-card"
						class:active={hoveredIdx === i}
						onmouseenter={() => hoveredIdx = i}
						onmouseleave={() => hoveredIdx = -1}
						style="--accent: {tech.color};"
					>
						<span class="tech-name">{tech.name}</span>
						<span class="tech-exp">{tech.exp}</span>
						<div class="tech-glow"></div>
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.stack {
		width: 100%;
		height: 100vh;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		position: relative;
		scroll-snap-align: start;
	}

	.stack-inner {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 0;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.stack-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 60px 40px 60px 60px;
		gap: 24px;
	}

	.section-label {
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

	.stack-title {
		font-family: var(--font-sans);
		font-size: clamp(48px, 6vw, 80px);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 0.95;
		text-transform: uppercase;
	}

	.stack-desc {
		font-size: 14px;
		line-height: 1.7;
		color: var(--fg-dim);
		max-width: 300px;
	}

	.stack-right {
		display: flex;
		align-items: center;
		padding: 60px 60px 60px 20px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 8px;
		width: 100%;
	}

	.tech-card {
		position: relative;
		background: transparent;
		border: 1px solid var(--border);
		padding: 20px 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		cursor: default;
		transition: border-color 0.25s, transform 0.25s;
		overflow: hidden;
		font-family: inherit;
		color: inherit;
	}

	.tech-card:hover {
		border-color: var(--accent);
		transform: translateY(-4px);
	}

	.tech-name {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg);
		transition: color 0.25s;
	}

	.tech-card:hover .tech-name {
		color: var(--accent);
	}

	.tech-exp {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--fg-dim);
		letter-spacing: 0.05em;
		opacity: 0;
		transform: translateY(4px);
		transition: opacity 0.25s, transform 0.25s;
	}

	.tech-card:hover .tech-exp {
		opacity: 1;
		transform: translateY(0);
	}

	.tech-glow {
		position: absolute;
		inset: 0;
		opacity: 0;
		background: radial-gradient(circle at 50% 50%, var(--accent), transparent 70%);
		transition: opacity 0.3s;
		pointer-events: none;
	}

	.tech-card:hover .tech-glow {
		opacity: 0.06;
	}

	@media (max-width: 768px) {
		.stack { height: auto; min-height: 100vh; }
		.stack-inner { grid-template-columns: 1fr; }
		.stack-left { padding: 60px 24px 20px; }
		.stack-right { padding: 20px 24px 60px; }
		.grid { grid-template-columns: repeat(3, 1fr); }
	}
</style>
