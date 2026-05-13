<script lang="ts">
	let scrolled = $state(false);
	let menuOpen = $state(false);

	$effect(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<nav class="navbar" class:scrolled class:menu-open={menuOpen}>
	<div class="nav-inner">
		<a href="/" class="nav-logo" onclick={closeMenu}>ŁR</a>
		<div class="nav-links desktop-links">
			<a href="#projects">Projects</a>
			<a href="https://www.linkedin.com/in/lukaszryczko/" target="_blank" rel="noopener">LinkedIn</a>
			<a href="https://www.youtube.com/@ukaszryczko755" target="_blank" rel="noopener">YouTube</a>
			<a href="https://github.com/ryczek02" target="_blank" rel="noopener">GitHub</a>
		</div>
		<button
			class="hamburger"
			class:active={menuOpen}
			onclick={toggleMenu}
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</nav>

<div class="mobile-menu" class:open={menuOpen} aria-hidden={!menuOpen}>
	<div class="mobile-menu-inner">
		<a href="#projects" onclick={closeMenu}>Projects</a>
		<a href="https://www.linkedin.com/in/lukaszryczko/" target="_blank" rel="noopener" onclick={closeMenu}>LinkedIn</a>
		<a href="https://www.youtube.com/@ukaszryczko755" target="_blank" rel="noopener" onclick={closeMenu}>YouTube</a>
		<a href="https://github.com/ryczek02" target="_blank" rel="noopener" onclick={closeMenu}>GitHub</a>
	</div>
</div>

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

	.hamburger {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 6px;
		width: 44px;
		height: 44px;
		background: transparent;
		border: 1px solid var(--border-bright);
		cursor: pointer;
		padding: 0;
		z-index: 110;
	}

	.hamburger span {
		display: block;
		width: 20px;
		height: 2px;
		background: var(--fg);
		transition: transform 0.3s, opacity 0.2s;
	}

	.hamburger.active span:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}

	.hamburger.active span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.active span:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	.mobile-menu {
		position: fixed;
		inset: 0;
		background: var(--bg);
		z-index: 90;
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s;
	}

	.mobile-menu.open {
		opacity: 1;
		pointer-events: all;
	}

	.mobile-menu-inner {
		display: flex;
		flex-direction: column;
		gap: 28px;
		text-align: center;
	}

	.mobile-menu-inner a {
		font-family: var(--font-sans);
		font-weight: 900;
		font-size: 34px;
		letter-spacing: -0.02em;
		text-transform: uppercase;
		color: var(--fg);
		transition: color 0.2s, transform 0.3s;
		transform: translateY(20px);
		opacity: 0;
	}

	.mobile-menu.open .mobile-menu-inner a {
		transform: translateY(0);
		opacity: 1;
	}

	.mobile-menu.open .mobile-menu-inner a:nth-child(1) { transition-delay: 0.08s; }
	.mobile-menu.open .mobile-menu-inner a:nth-child(2) { transition-delay: 0.14s; }
	.mobile-menu.open .mobile-menu-inner a:nth-child(3) { transition-delay: 0.20s; }
	.mobile-menu.open .mobile-menu-inner a:nth-child(4) { transition-delay: 0.26s; }

	@media (max-width: 768px) {
		.navbar {
			padding: 16px 24px;
			/* Always visible on mobile for hamburger access */
			opacity: 1;
			transform: translateY(0);
			pointer-events: all;
		}
		.navbar.scrolled {
			padding: 12px 24px;
		}
		/* Transparent background by default, dimmed bg only when scrolled or menu open */
		.navbar:not(.scrolled):not(.menu-open) {
			background: transparent;
			border-bottom: 1px solid transparent;
			backdrop-filter: none;
		}
		.navbar.menu-open {
			background: transparent;
			border-bottom-color: transparent;
			backdrop-filter: none;
		}
		.desktop-links {
			display: none;
		}
		.hamburger {
			display: flex;
		}
		.mobile-menu {
			display: flex;
		}
	}
</style>
