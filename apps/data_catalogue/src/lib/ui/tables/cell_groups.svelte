<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import { Paragraph } from '@imago/ui'
	import BaseCell from './base_cell.svelte'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
</script>

<BaseCell>
	<div class="labels">
		{#each row[key] as group}
			<div class="label">
				<Paragraph>
					{#if typeof group === 'string'}
						{group}
					{:else}
						{group.title ?? group.object}
					{/if}
				</Paragraph>
			</div>
		{/each}
	</div>
</BaseCell>

<style>
	.labels {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.label {
		background-color: var(--background-muted);
		border-radius: var(--radius);
		padding: 0 0.5rem;
	}
</style>
