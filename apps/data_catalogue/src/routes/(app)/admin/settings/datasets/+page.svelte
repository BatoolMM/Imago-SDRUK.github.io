<script lang="ts">
	import { type IColumnConfig } from '@svar-ui/svelte-grid'
	import { debug } from '$lib/globals/dev.svelte.js'
	import type { CkanDataset } from '$lib/types/ckan/index.js'
	import DatasetCard from '$lib/ui/cards/dataset_card.svelte'
	import BaseTable from '$lib/ui/tables/base_table.svelte'
	import { BaseSection, Title, Paragraph, Button } from '@imago/ui'
	import { onMount } from 'svelte'
	import CellText from '$lib/ui/tables/cell_text.svelte'
	import CellTags from '$lib/ui/tables/cell_tags.svelte'
	let { data } = $props()
	let selected = $state(-1)
	const columns: (IColumnConfig & { id: keyof CkanDataset })[] = [
		{
			id: 'name',
			header: 'Name',
			sort: true,
			cell: CellText,
			resize: true
		},

		{
			id: 'title',
			header: 'Title',
			sort: true,
			cell: CellText,
			resize: true
		},
		{
			id: 'version',
			header: 'Version',
			sort: true,
			cell: CellText,
			resize: true
		},
		{
			id: 'type',
			header: 'Type',
			sort: true,
			cell: CellText,
			resize: true
		},
		{
			id: 'author',
			header: 'Author',
			sort: true,
			cell: CellText,
			resize: true
		},
		{
			id: 'groups',
			header: 'Groups',
			sort: true,
			cell: CellTags,
			resize: true
		},
		{
			id: 'tags',
			header: 'tags',
			sort: true,
			cell: CellTags,
			resize: true
		},
		{
			id: 'isopen',
			header: 'Is open',
			sort: true,
			cell: CellText,
			resize: true
		},
		{
			id: 'private',
			header: 'Private',
			sort: true,
			cell: CellText,
			resize: true
		},
		{
			id: 'organization',
			header: 'Organisation',
			sort: true,
			cell: CellText,
			resize: true
		}
	]
	onMount(() => {
		debug.data = data
	})
</script>

<BaseSection>
	<div class="page">
		<Title>Datasets</Title>
		<div class="datasets" data-open={selected !== -1 ? true : undefined}>
			{#if !Array.isArray(data.datasets.result)}
				<div class="left-col">
					<BaseTable
						data={data.datasets.result.results}
						{columns}
						apiFn={(api) => {
							api.on('select-row', (row) => {
								const index = data.datasets.result.results.findIndex(
									(record) => record.id === row.id
								)
								selected = index
							})
						}}
					></BaseTable>
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
		/* grid-template-columns: minmax(0, 1fr) minmax(0, 3fr); */
		grid-template-columns: minmax(0, 1fr) minmax(0, 0fr);
		gap: 1rem;
		transition: all 0.3s ease-in-out;
	}
	.datasets[data-open] {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
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
