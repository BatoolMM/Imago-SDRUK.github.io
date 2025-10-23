<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte'
	import { ROUTES } from '$lib/globals/routes.js'
	import Logos from '$lib/ui/cards/logos.svelte'
	import { Button, DynamicNav, Footer } from '@imago/ui'
	let { children } = $props()
</script>

<DynamicNav routes={ROUTES} nav_height="4rem">
	{#snippet children({ scroll })}
		<Logos {scroll}></Logos>
	{/snippet}
</DynamicNav>
<main>
	{@render children?.()}
</main>
<div class="tooltip">
	<Button
		onclick={() => {
			debug.status = !debug.status
		}}>Debug</Button
	>
</div>

<Footer></Footer>

<style>
	.tooltip {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
