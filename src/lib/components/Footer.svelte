<footer class="footer">
	<div class="footer-inner">
		<div class="footer-left">
			<span class="footer-logo">ŁR</span>
			<span class="footer-copy">&copy; {new Date().getFullYear()} Łukasz Ryczko</span>
		</div>
		<div class="footer-links">
			<a href="https://www.linkedin.com/in/lukaszryczko/" target="_blank" rel="noopener">LinkedIn</a>
			<a href="https://www.youtube.com/@ukaszryczko755" target="_blank" rel="noopener">YouTube</a>
			<a href="https://github.com/ryczek02" target="_blank" rel="noopener">GitHub</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		width: 100%;
		border-top: 1px solid var(--border);
		padding: 40px 60px;
	}

	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer-left {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.footer-logo {
		font-family: var(--font-sans);
		font-weight: 900;
		font-size: 16px;
		letter-spacing: -0.02em;
		border: 2px solid var(--fg);
		padding: 3px 8px;
	}

	.footer-copy {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-dim);
		letter-spacing: 0.05em;
	}

	.footer-links {
		display: flex;
		gap: 28px;
	}

	.footer-links a {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-dim);
		transition: color 0.2s;
	}

	.footer-links a:hover {
		color: var(--fg);
	}

	@media (max-width: 768px) {
		.footer { padding: 30px 24px; }
		.footer-inner { flex-direction: column; gap: 20px; }
	}
</style>
