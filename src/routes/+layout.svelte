<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';

	let { children } = $props();

	const SITE_URL = 'https://lukaszryczko.pl';
	const SITE_NAME = 'Łukasz Ryczko — Portfolio';
	const TITLE = 'Łukasz Ryczko — Software Engineer | Backend, AI & Embedded';
	const DESCRIPTION =
		'Software engineer specialising in Laravel backends, AI / LLM integrations and embedded systems. Portfolio featuring BikeESP (ESP32 bike computer), Poldek multiplayer driver and cycling-calories ML.';
	const KEYWORDS =
		'Łukasz Ryczko, Lukasz Ryczko, software engineer, backend developer, Laravel, PHP, AI, LLM, embedded, ESP32, C++, three.js, Svelte, portfolio, freelancer, NorthGravity';
	const OG_IMAGE = `${SITE_URL}/og-image.png`;
	const AUTHOR = 'Łukasz Ryczko';

	const canonical = `${SITE_URL}${page.url.pathname === '/' ? '' : page.url.pathname}`;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Łukasz Ryczko',
		alternateName: 'Lukasz Ryczko',
		url: SITE_URL,
		image: OG_IMAGE,
		jobTitle: 'Software Engineer',
		description: DESCRIPTION,
		sameAs: [
			'https://github.com/ryczek02',
			'https://www.linkedin.com/in/lukaszryczko/',
			'https://www.youtube.com/@ukaszryczko755'
		],
		knowsAbout: [
			'Laravel',
			'PHP',
			'Backend Development',
			'AI / LLM Integrations',
			'Embedded Systems',
			'ESP32',
			'C++',
			'TypeScript',
			'Svelte',
			'Three.js'
		],
		worksFor: {
			'@type': 'Organization',
			name: 'NorthGravity'
		}
	};
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<meta name="keywords" content={KEYWORDS} />
	<meta name="author" content={AUTHOR} />
	<meta name="robots" content="index, follow, max-image-preview:large" />
	<meta name="googlebot" content="index, follow" />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content="pl_PL" />
	<meta property="og:locale:alternate" content="en_US" />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Łukasz Ryczko — Software Engineer Portfolio" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content="Łukasz Ryczko — Software Engineer Portfolio" />

	<!-- Structured data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

{@render children()}
