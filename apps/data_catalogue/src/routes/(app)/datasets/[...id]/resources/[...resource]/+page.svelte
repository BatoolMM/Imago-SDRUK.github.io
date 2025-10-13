<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte'
	import { jstr } from '@arturoguzman/art-ui'
	import { Button, Fact } from '@imago/ui'

	let { data } = $props()
	let result = $derived(data.data.result)
</script>

<div class="page">
	{#if Array.isArray(result) === false && typeof result.url === 'string'}
		<Button href={result.url} download>Download: {result.name ?? result.description}</Button>
	{/if}

	{#each Object.entries(result) as [key, value]}
		{#if value !== null}
			<Fact title={key} text={String(value)}></Fact>
		{/if}
	{/each}
	{#if debug.status}
		<pre>{jstr(data)}</pre>
	{/if}
</div>

<style>
	.page {
		color: var(--theme-colour-text);
	}
	.page > * + * {
		margin: 1rem;
	}
</style>
