<script lang="ts">
	import { onMount } from 'svelte';

	type PdfPage = {
		getViewport: (options: { scale: number }) => { width: number; height: number };
		render: (options: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => {
			promise: Promise<void>;
		};
	};

	type PdfDocument = {
		numPages: number;
		getPage: (pageNumber: number) => Promise<PdfPage>;
	};

	type PdfJs = {
		GlobalWorkerOptions: { workerSrc: string };
		getDocument: (source: string) => { promise: Promise<PdfDocument> };
	};

	const PDF_PATH = '/cv/Lukasz-Ryczko-Backend-Developer.pdf';
	const PDFJS_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs';
	const PDFJS_WORKER_URL =
		'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
	const PAGE_WIDTH = 920;

	let pagesContainer: HTMLDivElement;
	let status = $state('Ładowanie podglądu PDF...');
	let failed = $state(false);

	onMount(async () => {
		try {
			const pdfjs = (await import(/* @vite-ignore */ PDFJS_URL)) as PdfJs;
			pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;

			const pdf = await pdfjs.getDocument(PDF_PATH).promise;
			await renderPages(pdf);
			status = '';
		} catch (error) {
			failed = true;
			status =
				error instanceof Error
					? `Nie udało się wyrenderować PDF-a: ${error.message}`
					: 'Nie udało się wyrenderować PDF-a.';
		}
	});

	async function renderPages(pdf: PdfDocument) {
		pagesContainer.replaceChildren();

		for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
			const page = await pdf.getPage(pageNumber);
			const baseViewport = page.getViewport({ scale: 1 });
			const pixelRatio = Math.min(window.devicePixelRatio || 1, 3);
			const cssScale = PAGE_WIDTH / baseViewport.width;
			const viewport = page.getViewport({ scale: cssScale * pixelRatio });
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');

			if (!context) continue;

			canvas.width = Math.floor(viewport.width);
			canvas.height = Math.floor(viewport.height);
			canvas.style.width = `${PAGE_WIDTH}px`;
			canvas.style.height = 'auto';
			canvas.setAttribute('aria-label', `Strona ${pageNumber} CV`);
			pagesContainer.appendChild(canvas);

			await page.render({ canvasContext: context, viewport }).promise;
		}
	}
</script>

<svelte:head>
	<title>CV - Łukasz Ryczko</title>
	<meta name="description" content="CV Łukasza Ryczko w podglądzie PDF." />
</svelte:head>

<main class="cv-page">
	<section class="toolbar" aria-label="CV actions">
		<a href="/" class="back-link">Portfolio</a>
		<div class="toolbar-actions">
			<a href={PDF_PATH} target="_blank" rel="noopener" class="ghost-link">Otwórz PDF</a>
			<a href={PDF_PATH} download="Lukasz-Ryczko-Backend-Developer.pdf" class="download-link">
				Pobierz CV
			</a>
		</div>
	</section>

	<section class="viewer-shell" aria-label="Podgląd CV Łukasza Ryczko">
		<div class="viewer-header">
			<div>
				<p>Curriculum Vitae</p>
				<h1>Łukasz Ryczko</h1>
				<span>Backend Developer</span>
			</div>
			<a href={PDF_PATH} download="Lukasz-Ryczko-Backend-Developer.pdf">PDF</a>
		</div>

		{#if status}
			<p class:error={failed} class="viewer-status">{status}</p>
		{/if}

		<div class="pdf-pages" bind:this={pagesContainer} aria-label="Podgląd stron PDF"></div>

		{#if failed}
			<div class="pdf-fallback">
				<p>Możesz nadal otworzyć albo pobrać gotowy plik PDF.</p>
				<a href={PDF_PATH} download="Lukasz-Ryczko-Backend-Developer.pdf">Pobierz CV</a>
			</div>
		{/if}
	</section>
</main>

<style>
	.cv-page {
		min-height: 100vh;
		padding: 96px 24px 48px;
		background:
			linear-gradient(135deg, rgba(79, 90, 58, 0.16), transparent 34%),
			#e7e5dc;
		color: #181818;
	}

	.toolbar {
		position: sticky;
		top: 18px;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		width: min(100%, 1120px);
		margin: 0 auto 24px;
	}

	.toolbar-actions {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.back-link,
	.ghost-link,
	.download-link,
	.viewer-header a {
		border: 1px solid #434334;
		background: rgba(255, 255, 249, 0.84);
		color: #181818;
		font: 700 12px/1 var(--font-mono);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 12px 16px;
		transition: background 0.2s, color 0.2s, border-color 0.2s;
	}

	.download-link,
	.viewer-header a {
		background: #4f5a3a;
		border-color: #4f5a3a;
		color: #ffffff;
	}

	.back-link:hover,
	.ghost-link:hover {
		background: #ffffff;
	}

	.download-link:hover,
	.viewer-header a:hover {
		background: #181818;
		border-color: #181818;
	}

	.viewer-shell {
		width: min(100%, 1120px);
		margin: 0 auto;
		overflow: hidden;
		background: transparent;
	}

	.viewer-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding: 24px 28px;
		border-bottom: 1px solid rgba(67, 67, 52, 0.22);
		background: #fffef9;
	}

	.viewer-header p {
		margin: 0 0 6px;
		color: #4f5a3a;
		font: 700 11px/1.3 var(--font-mono);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.viewer-header h1 {
		margin: 0;
		color: #181818;
		font: 900 clamp(34px, 6vw, 56px) / 0.96 var(--font-sans);
		letter-spacing: 0;
	}

	.viewer-header span {
		display: block;
		margin-top: 7px;
		color: #4f5a3a;
		font-size: 20px;
	}

	.viewer-status {
		margin: 24px 0 0;
		color: #4f5a3a;
		font: 700 12px/1.4 var(--font-mono);
		letter-spacing: 0.08em;
		text-align: center;
		text-transform: uppercase;
	}

	.viewer-status.error {
		color: #7a2424;
	}

	.pdf-pages {
		display: grid;
		gap: 28px;
		padding: 28px 0 0;
	}

	.pdf-pages :global(canvas) {
		display: block;
		width: min(100%, 920px) !important;
		height: auto !important;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0 28px 70px rgba(0, 0, 0, 0.16);
	}

	.pdf-fallback {
		display: grid;
		place-items: center;
		gap: 16px;
		height: 100%;
		padding: 28px;
		text-align: center;
		background: rgba(255, 254, 249, 0.8);
	}

	.pdf-fallback p {
		margin: 0;
		color: #353535;
	}

	.pdf-fallback a {
		border: 1px solid #4f5a3a;
		background: #4f5a3a;
		color: #ffffff;
		font: 700 12px/1 var(--font-mono);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 12px 16px;
	}

	@media (max-width: 720px) {
		.cv-page {
			padding: 82px 12px 28px;
		}

		.toolbar {
			position: static;
			align-items: stretch;
		}

		.toolbar,
		.toolbar-actions,
		.viewer-header {
			flex-direction: column;
		}

		.back-link,
		.ghost-link,
		.download-link,
		.viewer-header a {
			width: 100%;
			text-align: center;
		}

		.viewer-header {
			align-items: stretch;
			padding: 20px;
		}

		.pdf-pages {
			gap: 16px;
			padding-top: 16px;
		}

		.pdf-pages :global(canvas) {
			box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
		}
	}
</style>
