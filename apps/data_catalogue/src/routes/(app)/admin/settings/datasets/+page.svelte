<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte.js'
	import DatasetCard from '$lib/ui/cards/dataset_card.svelte'
	import { BaseSection } from '@imago/ui'
	import { onMount } from 'svelte'
	let { data } = $props()
	onMount(() => {
		debug.data = data
	})
</script>

<BaseSection>
	<div class="page">
		<div class="left-col">
			{#if !Array.isArray(data.datasets.result)}
				{#each data.datasets.result.results as dataset}
					<DatasetCard
						resources={data.resources.filter((resource) =>
							dataset.resources.map((res) => res.id).includes(resource.id)
						)}
						relationships={data.relationships.relation_tuples?.filter(
							(relationship) => relationship.object === dataset.name
						)}
						{dataset}
						groups={data.groups}
					></DatasetCard>
				{/each}
			{/if}
		</div>
	</div>
</BaseSection>

<style>
	.left-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
