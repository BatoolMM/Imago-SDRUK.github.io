<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import { Paragraph } from '@imago/ui'
	import { capitalise } from '@arturoguzman/art-ui'
	import BaseCell from './base_cell.svelte'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
</script>

<BaseCell>
	<div class="label {row[key]}">
		<Paragraph>{capitalise(row[key])}</Paragraph>
	</div>
</BaseCell>

<style>
	.label {
		padding: 0 0.25rem;
		border-radius: var(--radius);
	}
	.draft {
		background-color: var(--warning-muted);
	}
	.active {
		background-color: var(--positive-muted);
	}
</style>
