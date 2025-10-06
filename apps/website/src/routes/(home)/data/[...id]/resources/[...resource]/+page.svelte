<script lang="ts">
	import { page } from '$app/state'
	import { jstr } from '@arturoguzman/art-ui'

	let { data } = $props()
</script>

<div class="page">
	{#if Array.isArray(data.data.result) === false}
		<a href={data.data.result.url} download>{data.data.result.name}</a>
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
