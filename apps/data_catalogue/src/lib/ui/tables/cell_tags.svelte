<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import BaseCell from './base_cell.svelte'
	import { Paragraph } from '@imago/ui'
	import { jstr } from '@arturoguzman/art-ui'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
	const value = $derived.by(() => {
		const value = $state(row[key])
		return value
	})
	const statuses: {
		label: string
		value: string
		style: 'base' | 'label' | 'warning' | 'positive' | 'negative' | 'danger'
	}[] = [
		{
			value: 'pending',
			style: 'warning',
			label: 'Pending'
		}
	]
</script>

<BaseCell>
	{#if typeof value === 'object'}
		{#if Array.isArray(value)}
			<Paragraph size="sm">{jstr(value)}</Paragraph>
		{:else}
			<Paragraph size="sm">{jstr(value)}</Paragraph>
		{/if}
	{/if}
</BaseCell>

<style>
</style>
