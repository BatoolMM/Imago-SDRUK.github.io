<script lang="ts">
let { filter }:{filter: } = $props()
</script>

<div class="accordion-buttons">
	{#each filter.filters.result as result}
		{#if typeof result === 'string'}
			<Button line_clamp>{result}</Button>
		{/if}
		{#if typeof result === 'object'}
			{#if result && 'title' in result}
				<Button line_clamp>{result.title}</Button>
			{/if}
		{/if}
	{/each}
</div>

<style>
</style>
