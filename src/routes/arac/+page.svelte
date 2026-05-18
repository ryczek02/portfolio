<script lang="ts">
	const patreonLabel = 'Patreon (coming soon)';
	const discordHandle = 'ryczek02';
	const steps = ['Download iOS app', 'Enable ARAC Camera', 'Start recording'];
	type CameraFeature = {
		eyebrow: string;
		title: string;
		copy: string;
		videoSrc?: string;
	};

	const cameraFeatures: CameraFeature[] = [
		{
			eyebrow: 'Live demo',
			title: 'Phone-controlled camera',
			copy: 'Walk around the rig and let the in-game view follow your hand with natural, handheld movement.',
			videoSrc: '/arac/phone-controlled-camera.webm'
		},
		{
			eyebrow: 'Physical framing',
			title: 'Chase shots without camera-tool wrestling',
			copy: 'Track a pass, dip into cockpit details, or orbit the car using your phone instead of nudging sliders.',
			videoSrc: '/arac/chase-shots.webm'
		},
		{
			eyebrow: 'Creator flow',
			title: 'Ready for reels, mods, and quick takes',
			copy: 'Recenter, frame the car, record the move. ARAC keeps setup short so the clip stays the focus.',
			videoSrc: '/arac/creator-flow.webm'
		}
	];
	const benefits = [{ title: 'Natural handheld movement', copy: 'Move the camera with your body instead of nudging sliders frame by frame. The result feels closer to a real trackside camera.' }, { title: 'Made for Assetto Corsa creators', copy: 'Designed for people recording cars, maps, mods, reels and showcase clips inside Assetto Corsa.' }, { title: 'Simple setup before a recording session', copy: 'Open the iOS app, enable ARAC Camera, recenter your view and start filming without turning setup into the whole evening.' }, { title: 'Works for cinematic clips, reels, and mod previews', copy: 'Use it for rolling shots, close passes, garage walkarounds, build reveals and quick social clips.' }];
</script>
<svelte:head>
	<title>ARAC Camera | iPhone camera control for Assetto Corsa</title>
	<meta name="description" content="Turn your iPhone into a handheld camera for cinematic Assetto Corsa clips, reels, and mod previews." />
	<link rel="canonical" href="https://lukaszryczko.pl/arac" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://lukaszryczko.pl/arac" />
	<meta property="og:title" content="ARAC Camera | iPhone camera control for Assetto Corsa" />
	<meta property="og:description" content="Film smoother Assetto Corsa shots with physical phone movement instead of static camera tools." />
	<meta property="og:image" content="https://lukaszryczko.pl/arac/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="ARAC Camera landing preview with cinematic Assetto Corsa camera copy." />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="ARAC Camera | iPhone camera control for Assetto Corsa" />
	<meta name="twitter:description" content="A handheld phone camera workflow for cinematic Assetto Corsa clips." />
	<meta name="twitter:image" content="https://lukaszryczko.pl/arac/og-image.png" />
	<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Russo+One&display=swap" rel="stylesheet" />
</svelte:head>
<main class="arac-page">
	<section class="hero" aria-labelledby="arac-title">
		<div class="hero__copy">
			<p class="brand">ARAC Camera</p>
			<h1 id="arac-title">AR camera for Assetto Corsa.</h1>
			<p class="intro">
				Use your iPhone as a real handheld camera for cinematic Assetto Corsa shots.
				Film smoother clips, creator reels, and mod previews with physical movement.
			</p>
			<div class="actions" aria-label="ARAC actions">
				<span class="cta cta--soon" role="link" aria-disabled="true">
					<span>{patreonLabel}</span>
					<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
				</span>
			</div>
		</div>
	</section>
	<section class="signal" aria-label="How to start with ARAC">
		{#each steps as step, index}
			<div>
				<span>{String(index + 1).padStart(2, '0')}</span>
				<p>{step}</p>
			</div>
		{/each}
	</section>
	<section class="section intro-band" aria-labelledby="why-title">
		<div class="section__copy">
			<p class="section-label">Why ARAC</p>
			<h2 id="why-title">Stop recording like the camera is glued to the track.</h2>
		</div>
		<p>
			ARAC gives Assetto Corsa footage a real camera feel. Move closer, drift around
			the car, reframe a corner, or follow a build showcase with your hands instead of
			menu sliders.
		</p>
	</section>
	<section class="section presentations" aria-labelledby="presentations-title">
		<div class="section__copy section__copy--wide">
			<p class="section-label">Camera features</p>
			<h2 id="presentations-title">A camera system made for moving shots, not menu tweaking.</h2>
		</div>
		<div class="presentation-grid">
			{#each cameraFeatures as feature}
				<article class="presentation-card">
					{#if feature.videoSrc}
						<div class="video-slot">
							<video autoplay muted playsinline loop preload="auto" aria-label="{feature.title} demo">
								<source src={feature.videoSrc} type="video/webm" />
							</video>
						</div>
					{:else}
						<div class="feature-plate" aria-hidden="true">
							<span>{feature.eyebrow}</span>
							<strong>{feature.title}</strong>
						</div>
					{/if}
					<span class="feature-eyebrow">{feature.eyebrow}</span>
					<h3>{feature.title}</h3>
					<p>{feature.copy}</p>
				</article>
			{/each}
		</div>
	</section>
	<section class="section split" aria-labelledby="creator-title">
		<div class="section__copy">
			<p class="section-label">For creators</p>
			<h2 id="creator-title">Built for clips that need movement.</h2>
		</div>
		<div class="benefit-list" aria-label="ARAC benefits">
			{#each benefits as benefit}
				<details>
					<summary><span>{benefit.title}</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg></summary>
					<p>{benefit.copy}</p>
				</details>
			{/each}
		</div>
	</section>
	<section class="final-cta" aria-labelledby="support-title">
		<div>
			<p class="section-label">Support the mod</p>
			<h2 id="support-title">Help push ARAC further.</h2>
			<p>Support development on Patreon and follow the next builds, iOS releases, and camera features.</p>
		</div>
		<span class="cta cta--light cta--soon" role="link" aria-disabled="true">
			<span>{patreonLabel}</span>
			<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
		</span>
	</section>
	<footer class="arac-footer">
		<a href="/" class="footer-mark">ARAC Camera</a>
		<nav aria-label="ARAC footer links"><span>{patreonLabel}</span><span>Discord: {discordHandle}</span></nav>
		<p>Assetto Corsa cinematic camera mod.</p>
	</footer>
</main>
<style>
	:global(html) {
		scroll-snap-type: none;
	}
	:global(body) {
		background: #090b0d;
	}
	.arac-page {
		min-height: 100svh;
		overflow: hidden;
		background: #090b0d;
		color: #ffffff;
		font-family: 'Chakra Petch', Inter, sans-serif;
	}
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		min-height: 100vh;
		padding: 42px max(20px, calc((100vw - 1180px) / 2)) 82px;
		background:
			linear-gradient(90deg, rgba(4, 6, 8, 0.86) 0%, rgba(4, 6, 8, 0.56) 38%, rgba(4, 6, 8, 0.16) 66%, rgba(4, 6, 8, 0.42) 100%),
			linear-gradient(180deg, rgba(4, 6, 8, 0.14) 0%, rgba(4, 6, 8, 0.6) 100%),
			url('/arac/1-2-scaled.jpg') center / cover no-repeat;
	}
	.hero::before {
		content: none;
	}
	.hero__copy {
		position: relative;
		z-index: 1;
		max-width: 610px;
	}
	.brand {
		margin-bottom: 18px;
		color: #ff4a1f;
		font-family: 'Russo One', Inter, sans-serif;
		font-size: 18px;
		line-height: 1;
		text-transform: uppercase;
	}
	h1 {
		max-width: 12.5ch;
		color: #ffffff;
		font-family: 'Russo One', Inter, sans-serif;
		font-size: clamp(44px, 5.8vw, 76px);
		font-weight: 400;
		line-height: 0.98;
		letter-spacing: 0;
		text-wrap: balance;
	}
	.intro {
		max-width: 560px;
		margin-top: 22px;
		color: rgba(255, 255, 255, 0.76);
		font-size: clamp(16px, 1.5vw, 19px);
		font-weight: 500;
		line-height: 1.5;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 28px;
	}
	.cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		min-height: 52px;
		padding: 0 22px;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 6px;
		background: #ff3f16;
		color: #ffffff;
		box-shadow: 0 18px 42px rgba(255, 63, 22, 0.28);
		cursor: pointer;
		font-size: 16px;
		font-weight: 700;
		line-height: 1;
		transition:
			background-color 200ms ease,
			border-color 200ms ease,
			box-shadow 200ms ease;
	}
	.cta:hover {
		border-color: rgba(255, 255, 255, 0.34);
		background: #e9320e;
		box-shadow: 0 22px 48px rgba(255, 63, 22, 0.34);
	}
	.cta--soon {
		cursor: default;
	}
	.cta--soon:hover {
		border-color: rgba(255, 255, 255, 0.16);
		background: #ff3f16;
		box-shadow: 0 18px 42px rgba(255, 63, 22, 0.28);
	}
	.cta:focus-visible {
		outline: 3px solid rgba(255, 255, 255, 0.72);
		outline-offset: 4px;
	}
	.cta svg {
		width: 20px;
		height: 20px;
		fill: none;
		stroke: currentColor;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 2.2;
	}
	.signal {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1px;
		width: min(1180px, calc(100% - 40px));
		margin: 48px auto 44px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.08);
	}
	.signal div {
		display: flex;
		align-items: center;
		gap: 14px;
		min-height: 72px;
		padding: 18px 22px;
		background: rgba(8, 10, 12, 0.8);
	}
	.signal span {
		color: #ff4a1f;
		font-family: 'Russo One', Inter, sans-serif;
		font-size: 18px;
	}
	.signal p {
		color: rgba(255, 255, 255, 0.86);
		font-size: 16px;
		font-weight: 700;
		line-height: 1.25;
	}
	.section,
	.final-cta {
		width: min(1180px, calc(100% - 40px));
		margin: 0 auto;
	}
	.section {
		padding: clamp(54px, 8vw, 96px) 0;
	}
	.section-label {
		margin-bottom: 14px;
		color: #ff4a1f;
		font-family: 'Russo One', Inter, sans-serif;
		font-size: 15px;
		line-height: 1;
		text-transform: uppercase;
	}
	h2 {
		color: #ffffff;
		font-family: 'Russo One', Inter, sans-serif;
		font-size: clamp(34px, 4vw, 56px);
		font-weight: 400;
		line-height: 1.02;
		letter-spacing: 0;
		text-wrap: balance;
	}
	.intro-band,
	.split {
		display: grid;
		grid-template-columns: minmax(0, 0.88fr) minmax(280px, 0.9fr);
		align-items: start;
		gap: clamp(28px, 6vw, 86px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}
	.intro-band > p,
	.final-cta p,
	.presentation-card p {
		color: rgba(255, 255, 255, 0.72);
		font-size: 18px;
		font-weight: 500;
		line-height: 1.55;
	}
	.section__copy--wide {
		max-width: 820px;
		margin-bottom: 32px;
	}
	.presentation-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 18px;
	}
	.video-slot {
		position: relative;
		display: grid;
		place-items: center;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.13);
		border-radius: 8px;
		background:
			linear-gradient(135deg, rgba(255, 63, 22, 0.22), transparent 42%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.01)),
			#0d1113;
		box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
	}
	.video-slot::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, transparent 62%, rgba(8, 10, 12, 0.36)),
			linear-gradient(90deg, rgba(255, 63, 22, 0.16), transparent 36%);
		pointer-events: none;
	}
	.video-slot video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.feature-plate {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		padding: 20px;
		border: 1px solid rgba(255, 255, 255, 0.13);
		border-radius: 8px;
		background:
			linear-gradient(135deg, rgba(255, 74, 31, 0.28), transparent 44%),
			repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 64px),
			#0d1113;
		box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
	}
	.feature-plate::after {
		content: '';
		position: absolute;
		right: -18%;
		bottom: -38%;
		width: 68%;
		aspect-ratio: 1;
		border: 1px solid rgba(255, 74, 31, 0.32);
		border-radius: 50%;
	}
	.feature-plate span,
	.feature-eyebrow,
	.presentation-card h3 {
		font-family: 'Russo One', Inter, sans-serif;
		font-weight: 400;
	}
	.feature-plate span,
	.feature-eyebrow {
		color: #ff4a1f;
		font-size: 16px;
	}
	.feature-plate strong {
		position: relative;
		z-index: 1;
		max-width: 12ch;
		color: rgba(255, 255, 255, 0.88);
		font-size: clamp(22px, 2.4vw, 30px);
		line-height: 1.05;
		text-wrap: balance;
	}
	.feature-eyebrow {
		display: block;
		margin-top: 18px;
		font-size: 13px;
		text-transform: uppercase;
	}
	.presentation-card h3 {
		margin-top: 10px;
		color: #ffffff;
		font-size: 24px;
		line-height: 1.1;
	}
	.presentation-card p {
		margin-top: 12px;
		font-size: 16px;
	}
	.benefit-list {
		display: grid;
		gap: 1px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		overflow: hidden;
	}
	.benefit-list details { background: rgba(8, 10, 12, 0.82); }
	.benefit-list summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		padding: 22px 24px;
		color: rgba(255, 255, 255, 0.86);
		cursor: pointer;
		font-size: 18px;
		font-weight: 700;
		line-height: 1.35;
	}
	.benefit-list summary::-webkit-details-marker { display: none; }
	.benefit-list summary svg {
		flex: 0 0 auto;
		width: 20px;
		height: 20px;
		fill: none;
		stroke: #ff4a1f;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 2.2;
		transition: transform 0.2s;
	}
	.benefit-list details[open] summary svg { transform: rotate(180deg); }
	.benefit-list details p {
		margin: -4px 24px 24px;
		color: rgba(255, 255, 255, 0.66);
		font-size: 16px;
		font-weight: 500;
		line-height: 1.6;
	}
	.final-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 28px;
		margin-bottom: 54px;
		padding: clamp(28px, 5vw, 52px);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 8px;
		background:
			linear-gradient(112deg, rgba(255, 63, 22, 0.34), transparent 48%),
			rgba(255, 255, 255, 0.045);
	}
	.final-cta > div { max-width: 680px; }
	.final-cta p { margin-top: 16px; }
	.cta--light { flex: 0 0 auto; }
	.arac-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		width: min(1180px, calc(100% - 40px));
		margin: 0 auto;
		padding: 28px 0 36px;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.56);
		font-family: 'Chakra Petch', Inter, sans-serif;
	}
	.footer-mark {
		color: #ffffff;
		font-family: 'Russo One', Inter, sans-serif;
		font-size: 18px;
		text-transform: uppercase;
	}
	.arac-footer nav { display: flex; gap: 22px; }
	.arac-footer nav span {
		color: rgba(255, 255, 255, 0.72);
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		transition: color 0.2s;
	}
	.arac-footer a:hover { color: #ff4a1f; }
	.arac-footer p { font-size: 14px; }
	@media (max-width: 860px) {
		.hero {
			min-height: 100vh;
			padding: 38px 20px 74px;
			background-position: 58% center;
		}
		h1 {
			max-width: 12.5ch;
			font-size: clamp(42px, 12vw, 64px);
		}
		.intro {
			margin-top: 22px;
		}
		.signal {
			grid-template-columns: 1fr;
			margin: 28px auto;
		}
		.intro-band,
		.split,
		.presentation-grid {
			grid-template-columns: 1fr;
		}
		.final-cta {
			display: grid;
		}
		.arac-footer { display: grid; }
	}
	@media (max-width: 520px) {
		.signal,
		.section,
		.final-cta {
			width: min(100% - 28px, 1180px);
		}
		.arac-footer {
			width: min(100% - 28px, 1180px);
		}
		.brand {
			margin-bottom: 18px;
			font-size: 17px;
		}
		.cta {
			width: 100%;
		}
		.section {
			padding: 46px 0;
		}
		.presentation-card h3 {
			font-size: 21px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		*, *::before, *::after { scroll-behavior: auto !important; transition-duration: 1ms !important; }
	}
</style>
