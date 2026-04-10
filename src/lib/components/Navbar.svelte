<script lang="ts">
	let scrolled = $state(false);

	$effect(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav class="navbar" class:scrolled>
	<div class="nav-inner">
		<a href="/" class="nav-logo">ŁR</a>
		<div class="nav-links">
			<a href="#projects">Projects</a>
			<a href="https://www.linkedin.com/in/lukaszryczko/" target="_blank" rel="noopener">LinkedIn</a>
			<a href="https://www.youtube.com/@ukaszryczko755" target="_blank" rel="noopener">YouTube</a>
			<a href="https://github.com/ryczek02" target="_blank" rel="noopener">GitHub</a>
		</div>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 20px 60px;
		transition: all 0.3s;
		opacity: 0;
		transform: translateY(-100%);
		pointer-events: none;
	}

	.navbar.scrolled {
		padding: 14px 60px;
		background: rgba(10, 10, 10, 0.9);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border);
		opacity: 1;
		transform: translateY(0);
		pointer-events: all;
	}

	.nav-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.nav-logo {
		font-family: var(--font-sans);
		font-weight: 900;
		font-size: 20px;
		letter-spacing: -0.02em;
		border: 2px solid var(--fg);
		padding: 4px 10px;
		transition: background 0.2s, color 0.2s;
	}

	.nav-logo:hover {
		background: var(--fg);
		color: var(--bg);
	}

	.nav-links {
		display: flex;
		gap: 32px;
		align-items: center;
	}

	.nav-links a {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-dim);
		transition: color 0.2s;
	}

	.nav-links a:hover {
		color: var(--fg);
	}

	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid var(--border-bright);
		color: var(--fg-dim);
		width: 32px;
		height: 32px;
		cursor: pointer;
		transition: color 0.2s, border-color 0.2s;
	}

	.theme-toggle:hover {
		color: var(--fg);
		border-color: var(--fg);
	}

	@media (max-width: 768px) {
		.navbar {
			padding: 16px 24px;
		}
		.navbar.scrolled {
			padding: 12px 24px;
		}
	}
</style>
