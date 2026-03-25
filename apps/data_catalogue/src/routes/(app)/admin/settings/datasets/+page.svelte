<script lang="ts">
	import { type IColumnConfig } from '@svar-ui/svelte-grid'
	import { debug } from '$lib/globals/dev.svelte.js'
	import type { CkanDataset } from '$lib/types/ckan/index.js'
	import DatasetCard from '$lib/ui/cards/dataset_card.svelte'
	import BaseTable from '$lib/ui/tables/base_table.svelte'
	import { Title, Button, SectionEdit, ActionBar, Icon } from '@imago/ui'
	import { onMount } from 'svelte'
	import CellText from '$lib/ui/tables/cell_text.svelte'
	import CellTags from '$lib/ui/tables/cell_tags.svelte'
	import { page } from '$app/state'
	import CellEditor from '$lib/ui/tables/cell_editor.svelte'
	import CellGroups from '$lib/ui/tables/cell_groups.svelte'
	import CellBoolean from '$lib/ui/tables/cell_boolean.svelte'
	import CellStatus from '$lib/ui/tables/cell_status.svelte'
	let { data } = $props()
	let selected = $derived(
		data.datasets.result.results?.findIndex(
			(dataset) => dataset.id === page.url.searchParams.get('edit')
		) ?? -1
	)

	const columns: (IColumnConfig & { id: keyof CkanDataset })[] = [
		{
			id: 'title',
			header: 'Title',
			sort: true,
			cell: CellEditor,
			resize: true,
			width: 600
		},

		{
			id: 'state',
			header: 'Status',
			sort: true,
			cell: CellStatus,
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
			cell: CellGroups,
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
			cell: CellBoolean,
			resize: true
		},
		{
			id: 'private',
			header: 'Private',
			sort: true,
			cell: CellBoolean,
			resize: true
		}
	]
	onMount(() => {
		debug.data = data
	})
</script>

{#if !Array.isArray(data.datasets.result)}
	<SectionEdit open={selected !== -1 ? true : undefined}>
		{#snippet leftCol()}
			<Title>Datasets</Title>
			<div class="left-col">
				<BaseTable data={data.datasets.result.results} {columns}></BaseTable>
			</div>
		{/snippet}
		{#snippet rightCol()}
			<ActionBar>
				{#snippet left()}
					<Button width="auto" href={page.url.pathname}>
						<Icon icon={{ icon: 'arrow-narrow-left', set: 'tabler' }}></Icon>
					</Button>
				{/snippet}
				{#snippet right()}
					<Button width="auto">
						<Icon icon={{ icon: 'trash', set: 'tabler' }}></Icon>
					</Button>
				{/snippet}
			</ActionBar>
			{#if selected > -1}
				<div class="edit">
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
		{/snippet}
	</SectionEdit>
{/if}

<style>
	.left-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
