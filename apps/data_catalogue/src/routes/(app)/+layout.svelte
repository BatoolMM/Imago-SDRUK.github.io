<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte'
	import Logos from '$lib/ui/cards/logos.svelte'
	import { jstr } from '@arturoguzman/art-ui'
	import { Button, DynamicNav, Footer } from '@imago/ui'
	let { children, data } = $props()
</script>

<DynamicNav routes={data.routes} nav_height="4rem">
	{#snippet children({ scroll })}
		<Logos {scroll}></Logos>
	{/snippet}
</DynamicNav>
<main>
	{@render children?.()}
</main>
<div class="tooltip">
	<Button
		active={debug.status}
		onclick={() => {
			debug.status = !debug.status
		}}>Debug</Button
	>
</div>
{#if debug.status}
	<div class="debug">
		<div class="debug-block">
			<pre>{jstr(data)}</pre>
		</div>
		{#if debug.data}
			<div class="debug-block">
				<pre>{jstr(debug.data)}</pre>
			</div>
		{/if}
	</div>
{/if}
<Footer></Footer>

<style>
	.debug {
		width: 100%;
		color: var(--text);
		font-size: 0.85rem;
		overflow: hidden;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.debug-block {
		overflow-x: scroll;
		width: 100%;
		border: 1px solid var(--border);
		background-color: #1e1e2e;
		color: #89b4fa;
		padding: 1rem;
		border-radius: var(--radius);
		font-family: var(--accent);
	}
	.tooltip {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
