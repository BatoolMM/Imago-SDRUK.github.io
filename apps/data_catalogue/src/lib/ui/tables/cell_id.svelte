<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import BaseCell from './base_cell.svelte'
	import { Button } from '@imago/ui'
	import { page } from '$app/state'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
</script>

<BaseCell>
	<Button href={`${page.url.pathname}/${row[key]}`}>{row[key]}</Button>
</BaseCell>

<style>
</style>
