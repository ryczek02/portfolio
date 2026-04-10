<script lang="ts">
	import { theme } from '$lib/theme.svelte';
</script>

<button class="theme-toggle-fixed" onclick={() => theme.toggle()} aria-label="Toggle theme">
	{#if theme.value === 'dark'}
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="5"/>
			<line x1="12" y1="1" x2="12" y2="3"/>
			<line x1="12" y1="21" x2="12" y2="23"/>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
			<line x1="1" y1="12" x2="3" y2="12"/>
			<line x1="21" y1="12" x2="23" y2="12"/>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
		</svg>
	{:else}
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle-fixed {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 200;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg);
		border: 1px solid var(--border-bright);
		color: var(--fg);
		cursor: pointer;
		transition: color 0.2s, border-color 0.2s, background 0.2s;
	}

	.theme-toggle-fixed:hover {
		background: var(--fg);
		color: var(--bg);
	}
</style>
