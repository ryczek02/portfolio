<script lang="ts">
	// Generate realistic commit data for last 52 weeks
	function generateCommitData(): number[][] {
		const weeks: number[][] = [];
		for (let w = 0; w < 52; w++) {
			const days: number[] = [];
			// More active recently, less in past
			const activityLevel = 0.3 + (w / 52) * 0.7;
			for (let d = 0; d < 7; d++) {
				const isWeekend = d === 0 || d === 6;
				const base = isWeekend ? 0.2 : 0.6;
				const rand = Math.random();
				let commits = 0;
				if (rand < base * activityLevel) {
					commits = Math.floor(Math.random() * 8) + 1;
					// Occasional big days
					if (Math.random() < 0.08) commits += Math.floor(Math.random() * 10);
				}
				days.push(commits);
			}
			weeks.push(days);
		}
		return weeks;
	}

	const commitData = generateCommitData();
	const totalCommits = commitData.flat().reduce((a, b) => a + b, 0);

	function getColorVar(count: number): string {
		if (count === 0) return 'var(--gh-0)';
		if (count <= 2) return 'var(--gh-1)';
		if (count <= 5) return 'var(--gh-2)';
		if (count <= 8) return 'var(--gh-3)';
		return 'var(--gh-4)';
	}

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	// Calculate month labels based on current date
	const now = new Date();
	const monthLabels: { label: string; col: number }[] = [];
	for (let w = 0; w < 52; w++) {
		const date = new Date(now.getTime() - (52 - w) * 7 * 24 * 60 * 60 * 1000);
		if (date.getDate() <= 7) {
			monthLabels.push({ label: months[date.getMonth()], col: w });
		}
	}
</script>

<section class="github dot-pattern">
	<div class="github-inner">
		<div class="github-left">
			<div class="section-label">
				<span class="label-line"></span>
				<span class="label-text">GITHUB</span>
			</div>
			<h2 class="github-title">Activity</h2>
			<p class="github-stat">{totalCommits} contributions in the last year</p>
		</div>
		<div class="github-right">
			<div class="heatmap">
				<div class="month-labels">
					{#each monthLabels as { label, col }}
						<span class="month-label" style="grid-column: {col + 1};">{label}</span>
					{/each}
				</div>
				<div class="grid">
					{#each commitData as week, w}
						{#each week as count, d}
							<div
								class="cell"
								style="grid-column: {w + 1}; grid-row: {d + 1}; background: {getColorVar(count)};"
								title="{count} commits"
							></div>
						{/each}
					{/each}
				</div>
				<div class="legend">
					<span class="legend-text">Less</span>
					{#each [0, 1, 3, 6, 10] as lvl}
						<div class="cell-legend" style="background: {getColorVar(lvl)};"></div>
					{/each}
					<span class="legend-text">More</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.github {
		width: 100%;
		height: 100vh;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		position: relative;
		scroll-snap-align: start;
	}

	.github-inner {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 0;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.github-left {
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

	.github-title {
		font-family: var(--font-sans);
		font-size: clamp(48px, 6vw, 80px);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 0.95;
		text-transform: uppercase;
	}

	.github-stat {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--fg-dim);
		letter-spacing: 0.02em;
	}

	.github-right {
		display: flex;
		align-items: center;
		padding: 60px 60px 60px 20px;
	}

	.heatmap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}

	.month-labels {
		display: grid;
		grid-template-columns: repeat(52, 1fr);
		gap: 2px;
		padding-left: 0;
	}

	.month-label {
		font-family: var(--font-mono);
		font-size: 9px;
		color: var(--fg-dim);
		letter-spacing: 0.05em;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(52, 1fr);
		grid-template-rows: repeat(7, 1fr);
		gap: 2px;
	}

	.cell {
		aspect-ratio: 1;
		border-radius: 2px;
		transition: transform 0.15s;
	}

	.cell:hover {
		transform: scale(1.8);
		outline: 1px solid var(--fg-dim);
		z-index: 2;
		position: relative;
	}

	.legend {
		display: flex;
		align-items: center;
		gap: 4px;
		justify-content: flex-end;
		margin-top: 4px;
	}

	.legend-text {
		font-family: var(--font-mono);
		font-size: 9px;
		color: var(--fg-dim);
		letter-spacing: 0.05em;
	}

	.cell-legend {
		width: 10px;
		height: 10px;
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		.github { height: auto; min-height: 100vh; }
		.github-inner { grid-template-columns: 1fr; }
		.github-left { padding: 60px 24px 20px; }
		.github-right { padding: 20px 24px 60px; overflow-x: auto; }
	}
</style>
