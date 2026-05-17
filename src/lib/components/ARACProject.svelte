<section class="arac-project" aria-labelledby="arac-project-title">
	<div class="arac-project-inner">
		<div class="project-label">
			<span class="label-line"></span>
			<span class="label-text">00 / PROJECT</span>
		</div>

		<h2 id="arac-project-title">ARAC<br />Camera</h2>
		<p class="arac-subtitle">Handheld cinematic camera control for Assetto Corsa</p>
		<p class="arac-desc">
			Use your iPhone as a physical camera for smoother racing clips, creator reels,
			mod previews and cinematic shots.
		</p>

		<a href="/arac" class="arac-link">
			Check more
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" stroke-width="1.5" />
			</svg>
		</a>
	</div>
</section>

<style>
	.arac-project {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100vh;
		min-height: 680px;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		scroll-snap-align: start;
		overflow: hidden;
		background:
			linear-gradient(90deg, rgba(5, 7, 9, 0.92) 0%, rgba(5, 7, 9, 0.62) 42%, rgba(5, 7, 9, 0.18) 72%, rgba(5, 7, 9, 0.5) 100%),
			linear-gradient(180deg, rgba(5, 7, 9, 0.2) 0%, rgba(5, 7, 9, 0.72) 100%),
			url('/arac/1-2-scaled.jpg') center / cover no-repeat;
	}

	.arac-project-inner {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: min(1200px, calc(100% - 120px));
		margin: 0 auto;
	}

	.project-label {
		display: flex;
		align-items: center;
		gap: 16px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.72);
	}

	.label-line {
		display: block;
		width: 40px;
		height: 1px;
		background: rgba(255, 255, 255, 0.72);
	}

	h2 {
		max-width: 650px;
		font-family: var(--font-russo);
		font-size: clamp(58px, 8vw, 118px);
		font-weight: 400;
		letter-spacing: 0;
		line-height: 0.96;
		text-transform: uppercase;
	}

	.arac-subtitle {
		max-width: 620px;
		font-family: var(--font-mono);
		font-size: 15px;
		color: rgba(255, 255, 255, 0.78);
		letter-spacing: 0.02em;
	}

	.arac-desc {
		max-width: 520px;
		color: rgba(255, 255, 255, 0.82);
		font-size: 17px;
		line-height: 1.7;
	}

	.arac-link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		align-self: flex-start;
		margin-top: 10px;
		padding: 14px 28px;
		border: 1px solid #ff4a1f;
		background: #ff3f16;
		color: #ffffff;
		box-shadow: 0 18px 42px rgba(255, 63, 22, 0.24);
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		transition: background 0.2s, border-color 0.2s;
	}

	.arac-link:hover {
		background: #e9320e;
		border-color: rgba(255, 255, 255, 0.5);
	}

	.arac-link:focus-visible {
		outline: 3px solid rgba(255, 255, 255, 0.72);
		outline-offset: 4px;
	}

	@media (max-width: 768px) {
		.arac-project {
			height: auto;
			min-height: 100svh;
			scroll-snap-align: none;
			background-position: 58% center;
		}

		.arac-project-inner {
			width: calc(100% - 48px);
			padding: 80px 0 70px;
		}

		h2 {
			font-size: clamp(58px, 18vw, 84px);
		}

		.arac-subtitle,
		.arac-desc {
			font-size: 16px;
		}
	}
</style>
