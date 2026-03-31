<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import { Paragraph } from '@imago/ui'
	import BaseCell from './base_cell.svelte'
	import type { CkanGroup } from '$lib/types/ckan'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
</script>

<BaseCell>
	{#each row[key] as group}
		<div class="label">
			<Paragraph>
				{group.display_name}
			</Paragraph>
		</div>
	{/each}
</BaseCell>

<style>
	.label {
		background-color: var(--background-muted);
		border-radius: var(--radius);
		padding: 0 0.5rem;
	}
</style>
