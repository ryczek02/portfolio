<script lang="ts">
	const patreonLabel = 'Patreon (coming soon)';
	const discordHandle = 'ryczek02';
	const githubStars = '1k+';
	const steps = ['Download iOS app', 'Enable ARAC Camera', 'Start recording'];
	type CameraFeature = {
		eyebrow: string;
		title: string;
		copy: string;
		videoSrc?: string;
	};
	type HeroArVideo = {
		src: string;
		className: string;
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
	const heroArVideos: HeroArVideo[] = [
		{ src: '/arac/phone-controlled-camera.webm', className: 'ar-plane--primary' },
		{ src: '/arac/chase-shots.webm', className: 'ar-plane--left' },
		{ src: '/arac/creator-flow.webm', className: 'ar-plane--right' }
	];
	const creatorChannels = [
		{
			title: 'Reels that feel filmed, not captured',
			copy: 'Turn short clips into trackside camera moves with passes, orbits, walkarounds, and quick reveals that read immediately on mobile feeds.'
		},
		{
			title: 'Mod creator showcase shots',
			copy: 'Give cars, maps, shaders, and builds a cleaner reveal without spending the whole session fighting static camera tools.'
		},
		{
			title: 'YouTube intros and B-roll',
			copy: 'Grab cinematic motion for install guides, mod reviews, server promos, and channel updates while the idea is still fresh.'
		}
	];
	const benefits = [{ title: 'Natural handheld movement', copy: 'Move the camera with your body instead of nudging sliders frame by frame. The result feels closer to a real trackside camera.' }, { title: 'Made for Assetto Corsa creators', copy: 'Designed for people recording cars, maps, mods, reels and showcase clips inside Assetto Corsa.' }, { title: 'Simple setup before a recording session', copy: 'Open the iOS app, enable ARAC Camera, recenter your view and start filming without turning setup into the whole evening.' }, { title: 'Works for cinematic clips, reels, and mod previews', copy: 'Use it for rolling shots, close passes, garage walkarounds, build reveals and quick social clips.' }];
	const transparencyNotes = [
		{
			title: 'Open source plugin and bridge',
			copy: 'The AC plugin and backend bridge will be fully open-source for transparency and security review by the community.'
		},
		{
			title: 'Open-source iOS camera app',
			copy: 'The iOS app will also be open-source. Using the App Store build will be paid, and creators who want to support development will also be able to do it through Patreon.'
		},
		{
			title: 'Camera transform data only',
			copy: 'ARAC does not access personal files, browser data, or unrelated system information. The application only transmits camera transform data required for real-time in-game camera movement.'
		}
	];
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
	<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Unbounded:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
</svelte:head>
<main class="arac-page">
	<section class="hero" aria-labelledby="arac-title">
		<div class="hero__copy">
			<p class="brand">ARAC Camera</p>
			<h1 id="arac-title">
				AR Cam for
				<span class="ac-logo-lockup">
					<img src="/arac/assetto-corsa-mark.svg" alt="Assetto Corsa" />
				</span>
			</h1>
			<p class="intro">
				Use your iPhone as a real handheld camera for cinematic Assetto Corsa shots.
				Film smoother clips, creator reels, and mod previews with physical movement.
			</p>
			<div class="actions" aria-label="ARAC actions">
				<span class="download-button download-button--github" role="link" aria-disabled="true">
					<svg class="download-button__icon" aria-hidden="true" viewBox="0 0 24 24">
						<path
							d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.86 8.33 6.84 9.68.5.09.68-.22.68-.49v-1.9c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.04A9.3 9.3 0 0 1 12 6.92c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.04 2.74-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
						/>
					</svg>
					<span>Download Desktop App</span>
					<span class="star-badge" aria-label={`${githubStars} GitHub stars`}>
						<svg aria-hidden="true" viewBox="0 0 24 24">
							<path d="m12 2.8 2.8 5.68 6.27.91-4.54 4.42 1.07 6.24L12 17.1l-5.6 2.95 1.07-6.24-4.54-4.42 6.27-.91L12 2.8Z" />
						</svg>
						{githubStars}
					</span>
				</span>
				<div class="download-row">
					<span class="download-button download-button--apple" role="link" aria-disabled="true">
						<svg class="download-button__icon" aria-hidden="true" viewBox="0 0 24 24">
							<path
								d="M17.27 12.78c-.03-2.76 2.25-4.09 2.35-4.15-1.28-1.88-3.28-2.14-3.99-2.17-1.7-.17-3.32 1-4.18 1-.87 0-2.22-.98-3.65-.95-1.88.03-3.61 1.09-4.58 2.78-1.95 3.39-.5 8.41 1.4 11.16.93 1.34 2.04 2.85 3.5 2.8 1.4-.06 1.93-.91 3.63-.91 1.69 0 2.18.91 3.66.88 1.51-.03 2.47-1.37 3.39-2.72 1.07-1.56 1.51-3.07 1.54-3.15-.03-.02-2.94-1.13-3.07-4.57ZM14.52 4.67c.77-.94 1.29-2.24 1.15-3.53-1.11.04-2.45.74-3.24 1.68-.71.82-1.33 2.14-1.16 3.4 1.23.1 2.48-.63 3.25-1.55Z"
							/>
						</svg>
						<span>Download iOS App</span>
					</span>
					<span class="download-button download-button--patreon" role="link" aria-disabled="true" aria-label={patreonLabel}>
						<img class="download-button__asset" src="/arac/patreon-logo.svg" alt="" aria-hidden="true" />
						<span class="patreon-label">Patreon</span>
					</span>
				</div>
			</div>
		</div>
		<div class="hero__visual" aria-label="AR camera movement visualized as a spatial overlay">
			{#each heroArVideos as video}
				<figure class={`ar-plane ${video.className}`}>
					<video autoplay muted playsinline loop preload="auto" aria-label="ARAC camera footage">
						<source src={video.src} type="video/webm" />
					</video>
				</figure>
			{/each}
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
	<section class="section creator-pitch" aria-labelledby="creator-pitch-title">
		<div class="section__copy">
			<p class="section-label">For the feed</p>
			<h2 id="creator-pitch-title">Make Assetto clips feel like camera work.</h2>
			<p>
				ARAC is built for creators who need motion fast: Reels, YouTube B-roll,
				mod previews, server promos, and the kind of shots that make a car feel alive.
			</p>
		</div>
		<div class="creator-channel-list" aria-label="ARAC creator use cases">
			{#each creatorChannels as channel}
				<article>
					<h3>{channel.title}</h3>
					<p>{channel.copy}</p>
				</article>
			{/each}
		</div>
	</section>
	<section class="section desktop-app" aria-labelledby="desktop-title">
		<div class="section__copy">
			<p class="section-label">Desktop app</p>
			<h2 id="desktop-title">Receiver, stream source, and Lua setup in one place.</h2>
			<p>
				ARAC Desktop handles the native bridge between the iPhone camera controls,
				Assetto Corsa CSP Lua, and the selected stream window before a recording session.
			</p>
		</div>
		<figure class="desktop-preview">
			<img
				src="/arac/desktop-receiver.png"
				alt="ARAC Desktop receiver interface with Lua install, receiver pairing, stream source, and controls."
				loading="lazy"
				decoding="async"
			/>
		</figure>
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
	<section class="section presentations" aria-label="ARAC camera feature demos">
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
	<section class="section transparency" aria-labelledby="transparency-title">
		<div class="section__copy">
			<p class="section-label">Transparency</p>
			<h2 id="transparency-title">Open where it matters, narrow where data moves.</h2>
		</div>
		<div class="transparency-list" aria-label="ARAC transparency and privacy notes">
			{#each transparencyNotes as note}
				<article>
					<h3>{note.title}</h3>
					<p>{note.copy}</p>
				</article>
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
		justify-content: space-between;
		gap: clamp(34px, 5vw, 72px);
		min-height: 100vh;
		padding: 42px max(20px, calc((100vw - 1180px) / 2)) 82px;
		background:
			linear-gradient(90deg, rgba(4, 6, 8, 0.9) 0%, rgba(4, 6, 8, 0.68) 42%, rgba(4, 6, 8, 0.28) 68%, rgba(4, 6, 8, 0.5) 100%),
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
		flex: 1 1 500px;
		min-width: 0;
	}
	.hero__visual {
		position: relative;
		z-index: 1;
		flex: 0 1 660px;
		width: min(52vw, 660px);
		min-height: clamp(390px, 51vw, 620px);
		perspective: 980px;
		transform-style: preserve-3d;
		isolation: isolate;
	}
	.ar-plane {
		position: absolute;
	}
	.ar-plane {
		overflow: hidden;
		aspect-ratio: 16 / 9;
		border-radius: 22px;
		background: #0b0f12;
		box-shadow:
			0 34px 78px rgba(0, 0, 0, 0.58),
			0 0 40px rgba(255, 63, 22, 0.2);
		transform-style: preserve-3d;
	}
	.ar-plane video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.ar-plane--primary {
		z-index: 4;
		right: 0;
		top: 13%;
		width: min(43vw, 560px);
		animation: plane-float-primary 7s ease-in-out infinite;
		transform: rotateY(-17deg) rotateX(7deg) rotateZ(2deg) translateZ(80px);
	}
	.ar-plane--left {
		z-index: 2;
		left: 0;
		bottom: 15%;
		width: min(29vw, 365px);
		opacity: 0.82;
		animation: plane-float-left 8s ease-in-out infinite;
		transform: rotateY(28deg) rotateX(14deg) rotateZ(-8deg) translateZ(-20px);
	}
	.ar-plane--right {
		z-index: 3;
		right: 9%;
		bottom: 1%;
		width: min(31vw, 400px);
		opacity: 0.9;
		animation: plane-float-right 7.6s ease-in-out infinite;
		transform: rotateY(-28deg) rotateX(13deg) rotateZ(7deg) translateZ(18px);
	}
	.brand {
		margin-bottom: 18px;
		color: #ff4a1f;
		font-family: 'Unbounded', Inter, sans-serif;
		font-size: 18px;
		font-weight: 800;
		line-height: 1;
		text-transform: uppercase;
	}
	h1 {
		max-width: 11.2ch;
		color: #ffffff;
		font-family: 'Unbounded', Inter, sans-serif;
		font-size: clamp(44px, 5.8vw, 76px);
		font-weight: 800;
		line-height: 0.98;
		letter-spacing: 0;
		text-wrap: balance;
	}
	.ac-logo-lockup {
		display: inline-flex;
		align-items: center;
		width: 1.25em;
		margin-left: 0.06em;
		vertical-align: -0.13em;
	}
	.ac-logo-lockup img {
		display: block;
		width: 100%;
		height: auto;
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
		display: grid;
		align-items: stretch;
		gap: 10px;
		width: min(100%, 368px);
		margin-top: 28px;
	}
	.download-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 54px;
		gap: 10px;
		width: 100%;
	}
	.download-button {
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		gap: 11px;
		min-width: 0;
		min-height: 54px;
		padding: 0 14px 0 18px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 8px;
		color: #f7f5ee;
		box-shadow: 0 18px 44px rgba(0, 0, 0, 0.34);
		cursor: default;
		font-size: 15px;
		font-weight: 800;
		line-height: 1;
		transition:
			border-color 200ms ease,
			box-shadow 200ms ease,
			transform 200ms ease;
	}
	.download-button:hover {
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: 0 22px 52px rgba(0, 0, 0, 0.44);
		transform: translateY(-1px);
	}
	.download-button--github {
		width: 100%;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent),
			#25282e;
	}
	.download-button--apple {
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent),
			#050507;
	}
	.download-button--patreon {
		justify-content: center;
		padding: 0;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.14), transparent),
			#ff3f16;
		box-shadow: 0 18px 44px rgba(255, 63, 22, 0.24);
	}
	.download-button--patreon:hover {
		box-shadow: 0 22px 52px rgba(255, 63, 22, 0.3);
	}
	.download-button__icon {
		flex: 0 0 auto;
		width: 21px;
		height: 21px;
		fill: currentColor;
	}
	.download-button__asset {
		display: block;
		width: 24px;
		height: 24px;
		filter: brightness(0) invert(1);
		object-fit: contain;
	}
	.patreon-label {
		display: none;
	}
	.star-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		margin-left: auto;
		min-height: 28px;
		padding: 0 9px;
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		color: #f7f5ee;
		font-size: 13px;
		font-weight: 900;
	}
	.star-badge svg {
		width: 13px;
		height: 13px;
		fill: #ff4a1f;
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
		font-family: 'Unbounded', Inter, sans-serif;
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
		font-family: 'Unbounded', Inter, sans-serif;
		font-size: 15px;
		font-weight: 800;
		line-height: 1;
		text-transform: uppercase;
	}
	h2 {
		color: #ffffff;
		font-family: 'Unbounded', Inter, sans-serif;
		font-size: clamp(34px, 4vw, 56px);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: 0;
		text-wrap: balance;
	}
	.intro-band,
	.split,
	.creator-pitch,
	.transparency,
	.desktop-app {
		display: grid;
		grid-template-columns: minmax(0, 0.88fr) minmax(280px, 0.9fr);
		align-items: start;
		gap: clamp(28px, 6vw, 86px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}
	.intro-band > p,
	.final-cta p,
	.presentation-card p,
	.creator-pitch p:not(.section-label),
	.desktop-app p:not(.section-label),
	.creator-channel-list p,
	.transparency-list p {
		color: rgba(255, 255, 255, 0.72);
		font-size: 18px;
		font-weight: 500;
		line-height: 1.55;
	}
	.transparency {
		padding-top: clamp(48px, 7vw, 82px);
	}
	.creator-pitch {
		padding-top: clamp(48px, 7vw, 82px);
	}
	.creator-pitch .section__copy p:not(.section-label) {
		margin-top: 18px;
		max-width: 560px;
	}
	.creator-channel-list {
		display: grid;
		gap: 1px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
	}
	.creator-channel-list article {
		padding: 24px;
		background:
			linear-gradient(112deg, rgba(255, 74, 31, 0.16), transparent 44%),
			rgba(8, 10, 12, 0.84);
	}
	.creator-channel-list h3 {
		color: #ffffff;
		font-family: 'Unbounded', Inter, sans-serif;
		font-size: 20px;
		font-weight: 700;
		line-height: 1.15;
	}
	.creator-channel-list p {
		margin-top: 10px;
		font-size: 16px;
	}
	.transparency-list {
		display: grid;
		gap: 1px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
	}
	.transparency-list article {
		padding: 24px;
		background:
			linear-gradient(112deg, rgba(255, 74, 31, 0.1), transparent 42%),
			rgba(8, 10, 12, 0.84);
	}
	.transparency-list h3 {
		color: #ffffff;
		font-family: 'Unbounded', Inter, sans-serif;
		font-size: 20px;
		font-weight: 700;
		line-height: 1.15;
	}
	.transparency-list p {
		margin-top: 10px;
		font-size: 16px;
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
		font-family: 'Unbounded', Inter, sans-serif;
		font-weight: 700;
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
	.desktop-app {
		align-items: center;
	}
	.desktop-app .section__copy {
		order: 2;
	}
	.desktop-preview {
		order: 1;
	}
	.desktop-app .section__copy p:not(.section-label) {
		margin-top: 18px;
		max-width: 560px;
	}
	.desktop-preview {
		overflow: hidden;
		border-radius: 24px;
		background: rgba(8, 10, 12, 0.82);
		box-shadow:
			0 34px 80px rgba(0, 0, 0, 0.46),
			0 0 46px rgba(255, 63, 22, 0.12);
	}
	.desktop-preview img {
		display: block;
		width: 100%;
		aspect-ratio: 1472 / 1329;
		object-fit: cover;
	}
	.benefit-list {
		order: 1;
		display: grid;
		gap: 1px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		overflow: hidden;
	}
	.split .section__copy {
		order: 2;
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
		font-family: 'Unbounded', Inter, sans-serif;
		font-size: 18px;
		font-weight: 800;
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
	@keyframes plane-float-primary {
		0%, 100% { transform: rotateY(-17deg) rotateX(7deg) rotateZ(2deg) translate3d(0, 0, 80px); }
		50% { transform: rotateY(-14deg) rotateX(9deg) rotateZ(1deg) translate3d(-8px, -14px, 96px); }
	}
	@keyframes plane-float-left {
		0%, 100% { transform: rotateY(28deg) rotateX(14deg) rotateZ(-8deg) translate3d(0, 0, -20px); }
		50% { transform: rotateY(24deg) rotateX(17deg) rotateZ(-6deg) translate3d(10px, -10px, 0); }
	}
	@keyframes plane-float-right {
		0%, 100% { transform: rotateY(-28deg) rotateX(13deg) rotateZ(7deg) translate3d(0, 0, 18px); }
		50% { transform: rotateY(-25deg) rotateX(16deg) rotateZ(5deg) translate3d(-6px, 12px, 38px); }
	}
	@media (max-width: 860px) {
		.hero {
			display: grid;
			align-content: center;
			min-height: 100vh;
			padding: 38px 20px 74px;
			background-position: 58% center;
		}
		.hero__visual {
			display: none;
		}
		.actions {
			width: 100%;
		}
		.download-row {
			grid-template-columns: 1fr;
		}
		.download-button {
			width: 100%;
		}
		.download-button--patreon {
			justify-content: flex-start;
			width: 100%;
			min-height: 54px;
			padding: 0 14px 0 18px;
		}
		.download-button--patreon .download-button__asset {
			width: 21px;
			height: 21px;
		}
		.patreon-label {
			display: inline;
		}
		.ar-plane--primary {
			width: min(84%, 520px);
			right: 0;
			top: 8%;
		}
		.ar-plane--left {
			width: min(54%, 330px);
			left: 0;
			bottom: 18%;
		}
		.ar-plane--right {
			width: min(58%, 350px);
			right: 7%;
			bottom: 2%;
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
		.creator-pitch,
		.desktop-app,
		.transparency,
		.presentation-grid {
			grid-template-columns: 1fr;
		}
		.desktop-app .section__copy,
		.desktop-preview,
		.split .section__copy,
		.benefit-list {
			order: initial;
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
		.download-button,
		.cta {
			width: 100%;
		}
		.ar-plane {
			border-radius: 16px;
		}
		.section {
			padding: 46px 0;
		}
		.presentation-card h3 {
			font-size: 21px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		*, *::before, *::after { scroll-behavior: auto !important; transition-duration: 1ms !important; animation-duration: 1ms !important; }
	}
</style>
