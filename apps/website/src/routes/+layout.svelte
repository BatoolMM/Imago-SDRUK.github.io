<script lang="ts">
	import '../app.css'
	import { env } from '$env/dynamic/public'
	import { window_height, window_width } from '$lib/stores/layout.svelte'
	let { children } = $props()
</script>

<svelte:head>
	{#if env.PUBLIC_NODE_ENV === 'production'}
		<script
			defer
			src="https://events.imago.ac.uk/script.js"
			data-website-id="a90d4bb4-e429-400e-9f89-9935f2570abe"
		></script>
	{/if}
	<title>Imago - SDRUK</title>
</svelte:head>
<svelte:window bind:innerWidth={$window_width} bind:innerHeight={$window_height} />
<div class="theme">
	{@render children()}
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	.theme {
		min-height: 100lvh;
		background-color: var(--background);
	}
</style>
