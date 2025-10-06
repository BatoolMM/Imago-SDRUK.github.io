<script lang="ts">
	import { jstr } from '@arturoguzman/art-ui'

	let { data } = $props()
</script>

<div class="page">
	<pre class="proxe-xs prose text-white">{jstr(data)}</pre>
	{#if Array.isArray(data.data.result)}
		{#each data.data.result as result}
			<a href="/data/products/{result}">{result}</a>
		{/each}
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
