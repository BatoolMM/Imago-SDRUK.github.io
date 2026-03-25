<script lang="ts">
	import type { Snippet } from 'svelte'

	let { left, centre, right }: { left?: Snippet; centre?: Snippet; right?: Snippet } = $props()
</script>

<div class="edit-buttons">
	<div class="left-col">
		{@render left?.()}
	</div>
	<div class="centre-col">
		{@render centre?.()}
	</div>
	<div class="right-col">
		{@render right?.()}
	</div>
</div>

<style>
	.edit-buttons {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	.left-col,
	.centre-col,
	.right-col {
		display: flex;
		gap: 0.25rem;
	}
	.left-col {
		align-items: center;
		justify-content: flex-start;
	}
	.centre-col {
		align-items: center;
		justify-content: flex-start;
	}
	.right-col {
		align-items: center;
		justify-content: flex-end;
	}
</style>
