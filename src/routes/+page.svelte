<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Real2ACToolkit from '$lib/components/Real2ACToolkit.svelte';
	import BikeESP from '$lib/components/BikeESP.svelte';
	import PoldekDriver from '$lib/components/PoldekDriver.svelte';
	import CyclingCalories from '$lib/components/CyclingCalories.svelte';
	import TechStack from '$lib/components/TechStack.svelte';
	import GitHubActivity from '$lib/components/GitHubActivity.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<ThemeToggle />
<Navbar />

<main>
	<Hero />

	<div id="projects">
		<Real2ACToolkit />
		<BikeESP />
		<PoldekDriver />
		<CyclingCalories />
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
