<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Łukasz Ryczko — Portfolio</title>
	<meta name="description" content="Software engineer focused on backend systems, AI integrations and embedded projects." />
</svelte:head>

{@render children()}
