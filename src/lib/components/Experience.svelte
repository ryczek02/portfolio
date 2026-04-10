<script lang="ts">
</script>

<section class="exp dot-pattern">
	<div class="exp-inner">
		<div class="exp-left">
			<div class="project-label">
				<span class="label-line"></span>
				<span class="label-text">03 / EXPERIENCE</span>
			</div>
			<h2 class="exp-title">EXP</h2>
		</div>
		<div class="exp-right">
			<div class="timeline">
				<div class="timeline-item">
					<div class="timeline-dot"></div>
					<div class="timeline-content">
						<div class="timeline-period">2020 — present</div>
						<div class="timeline-company">Freelancer</div>
						<div class="timeline-role">Full-Stack Developer</div>
						<p class="timeline-desc">
							Independent software development — Laravel backends, AI integrations,
							embedded systems, and client-facing web applications.
						</p>
					</div>
				</div>

				<div class="timeline-item">
					<div class="timeline-dot"></div>
					<div class="timeline-content">
						<div class="timeline-period">2025 — present</div>
						<div class="timeline-company">
							<span class="company ng">NorthGravity</span>
						</div>
						<div class="timeline-role">Software Engineer</div>
						<p class="timeline-desc">
							Data infrastructure and backend systems for enterprise clients.
						</p>
					</div>
				</div>

				<div class="timeline-item">
					<div class="timeline-dot"></div>
					<div class="timeline-content">
						<div class="timeline-period">2022 — 2025</div>
						<div class="timeline-company">
							<span class="company fw">fingoweb</span>
						</div>
						<div class="timeline-role">Software Developer</div>
						<p class="timeline-desc">
							Full-stack development with Laravel, Vue.js, and cloud infrastructure.
							Building web applications and internal tools for Polish and international clients.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.exp {
		width: 100%;
		height: 100vh;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		position: relative;
		scroll-snap-align: start;
	}

	.exp-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.exp-left {
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

	.exp-title {
		font-family: var(--font-sans);
		font-size: clamp(48px, 6vw, 80px);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 0.95;
		text-transform: uppercase;
	}

	.exp-right {
		display: flex;
		align-items: center;
		padding: 60px 60px 60px 40px;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 40px;
		position: relative;
		width: 100%;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 8px;
		bottom: 8px;
		width: 1px;
		background: var(--border);
	}

	.timeline-item {
		position: relative;
		padding-left: 28px;
	}

	.timeline-dot {
		position: absolute;
		left: -3px;
		top: 6px;
		width: 7px;
		height: 7px;
		background: var(--fg);
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.timeline-period {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		color: var(--fg-dim);
		text-transform: uppercase;
	}

	.timeline-company {
		font-family: var(--font-sans);
		font-size: 24px;
		font-weight: 900;
		letter-spacing: -0.02em;
		text-transform: uppercase;
	}

	.company.fw {
		color: #00c2ff;
	}

	.company.ng {
		color: #a855f7;
	}

	.timeline-role {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-dim);
		letter-spacing: 0.05em;
	}

	.timeline-desc {
		font-size: 13px;
		line-height: 1.6;
		color: #888;
		max-width: 420px;
	}

	@media (max-width: 768px) {
		.exp { height: auto; min-height: 100vh; }
		.exp-inner { grid-template-columns: 1fr; }
		.exp-left { padding: 60px 24px 20px; }
		.exp-right { padding: 20px 24px 60px; }
	}
</style>
