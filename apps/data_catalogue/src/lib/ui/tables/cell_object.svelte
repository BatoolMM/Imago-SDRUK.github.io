<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import BaseCell from './base_cell.svelte'
	import { Paragraph } from '@imago/ui'
	import { jstr } from '@arturoguzman/art-ui'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
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

{#if row[key] === undefined || row[key] === null}
	<Paragraph size="sm">-</Paragraph>
{:else if Array.isArray(row[key])}
	{#each row[key] as entry}
		{@render cell(entry)}
	{/each}
{:else}
	{@render cell(row[key])}
{/if}

{#snippet cell(entry: Record<PropertyKey, unknown>)}
	{@const entries = Object.entries(entry)}
	<BaseCell>
		<div class="cell-container" style:--repeat={entries.length}>
			{#each entries as [_key, value]}
				{#if value !== undefined && value !== null}
					<div class="label">
						<Paragraph size="sm">{_key}: {value}</Paragraph>
					</div>
				{/if}
			{/each}
		</div>
	</BaseCell>
{/snippet}

<style>
	.cell-container {
		display: grid;
		grid-template-columns: repeat(var(--repeat), minmax(0, max-content));
		gap: 0.5rem;
		width: 100%;
	}
	.label {
		padding: 0 0.5rem;
		background-color: var(--background-muted);
		border-radius: var(--radius);
		width: 100%;
	}
</style>
