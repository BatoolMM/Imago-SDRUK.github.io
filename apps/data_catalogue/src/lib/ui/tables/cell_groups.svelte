<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import { Paragraph } from '@imago/ui'
	import BaseCell from './base_cell.svelte'
	import { jstr } from '@arturoguzman/art-ui'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
</script>

<BaseCell>
	<div class="labels">
		{#each row[key] as group}
			<div class="label">
				<Paragraph>
					{group.title ?? group.object}
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
