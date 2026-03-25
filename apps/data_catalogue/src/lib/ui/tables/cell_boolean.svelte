<script lang="ts">
	import { type ICellProps } from '@svar-ui/svelte-grid'
	import BaseCell from './base_cell.svelte'
	import { Icon, Paragraph } from '@imago/ui'
	let { column, row }: ICellProps = $props()
	const key = $derived(String(column['id']))
</script>

<BaseCell>
	{#if row[key] === true}
		<div class="check">
			<Icon icon={{ icon: 'check', set: 'tabler' }}></Icon>
		</div>
	{:else}
		<div class="x">
			<Icon icon={{ icon: 'x', set: 'tabler' }}></Icon>
		</div>
	{/if}
</BaseCell>

<style>
	.check {
		color: var(--text);
	}
	.x {
		color: var(--background-muted);
	}
</style>
