<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte.js'
	import DatasetCard from '$lib/ui/cards/dataset_card.svelte'
	import { BaseSection, Title, Paragraph, Button } from '@imago/ui'
	import { onMount } from 'svelte'
	let { data } = $props()
	let selected = $state(-1)
	onMount(() => {
		debug.data = data
	})
</script>

<BaseSection>
	<div class="page">
		<Title>Datasets</Title>
		<div class="datasets">
			{#if !Array.isArray(data.datasets.result)}
				<div class="left-col">
					{#each data.datasets.result.results as dataset, index}
						<Button
							active={selected === index}
							onclick={() => {
								if (selected === index) {
									selected = -1
								} else {
									selected = index
								}
							}}><Paragraph>{dataset.title}</Paragraph></Button
						>
					{/each}
				</div>
				<div class="right-col">
					{#if selected >= 0 && selected < data.datasets.result.results.length}
						{@const dataset = data.datasets.result.results[selected]}
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
					{/if}
				</div>
			{/if}
		</div>
	</div>
</BaseSection>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.datasets {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
		gap: 1rem;
	}
	.left-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.right-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
