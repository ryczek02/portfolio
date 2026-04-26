<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import NeuronAI from '$lib/components/NeuronAI.svelte';
	import TorKielce from '$lib/components/TorKielce.svelte';
	import BikeESP from '$lib/components/BikeESP.svelte';
	import PoldekDriver from '$lib/components/PoldekDriver.svelte';
	import CyclingCalories from '$lib/components/CyclingCalories.svelte';
	import TechStack from '$lib/components/TechStack.svelte';
	import GitHubActivity from '$lib/components/GitHubActivity.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />

<main>
	<Hero />

	<div id="projects">
		<BikeESP />
		<PoldekDriver />
		<CyclingCalories />
		<NeuronAI />
		<TorKielce />
	</div>

	<TechStack />
	<GitHubActivity />
	<Experience />
	<Footer />
</main>

<style>
	main {
		width: 100%;
	}
</style>
