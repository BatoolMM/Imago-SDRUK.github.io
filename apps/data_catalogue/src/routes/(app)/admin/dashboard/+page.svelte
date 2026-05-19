<script lang="ts">
	import { page } from '$app/state'
	import BaseTable from '$lib/ui/tables/base_table.svelte'
	import CellText from '$lib/ui/tables/cell_text.svelte'
	import { BaseSection, Button, handleSearchParams, Input, Subtitle, Title } from '@imago/ui'
	import type { IColumnConfig } from '@svar-ui/svelte-grid'
	import { DateTime } from 'luxon'

	let { data } = $props()
	const columns: IColumnConfig[] = [
		{
			id: 'title',
			header: 'Title',
			cell: CellText,
			width: 400
		},
		{
			id: 'downloads',
			header: 'Downloads',
			cell: CellText
		}
	]
	let from = $state(DateTime.now().minus({ month: 1 }).toISODate())
	let to = $state(DateTime.now().toISODate())
</script>

<div class="page">
	<Title>Downloads</Title>
	<div class="filters">
		<input type="date" name="" id="" bind:value={from} />
		<input type="date" name="" id="" bind:value={to} />
		<Button
			href={handleSearchParams({
				url: page.url,
				add: [
					{ key: 'from', value: from, set: true },
					{ key: 'to', value: to, set: true }
				]
			})}>Filter</Button
		>
	</div>
	<div class="table-wrapper">
		<BaseTable data={data.downloads} {columns}></BaseTable>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.filters {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}
	.table-wrapper {
		height: 40lvh;
		overflow: scroll;
	}
</style>
