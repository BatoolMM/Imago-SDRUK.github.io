<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import { Button, handleSearchParams } from '@imago/ui'
	import BaseCell from './base_cell.svelte'
	import { page } from '$app/state'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
</script>

<BaseCell>
	<Button
		style="clean"
		active={page.url.searchParams.get('edit') === row['id']}
		href={handleSearchParams({ toggle: [{ key: 'edit', value: row['id'] }], url: page.url })}
	>
		{row[key]}
	</Button>
</BaseCell>

<style>
</style>
