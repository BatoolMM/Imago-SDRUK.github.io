<script lang="ts">
	import { page } from '$app/state'
	import { jstr } from '@arturoguzman/art-ui'

	let { data } = $props()
</script>

<div class="page">
	{#if Array.isArray(data.data.result) === false}
		{#each data.data.result.resources as result}
			<a href="/data/products/{page.params.id}/resources/{result.id}">{result.name}</a>
		{/each}
	{/if}
	<pre class="proxe-xs prose text-white">{jstr(data)}</pre>
</div>

<style>
	.page {
		color: var(--theme-colour-text);
	}
	.page > * + * {
		margin: 1rem;
	}
</style>
