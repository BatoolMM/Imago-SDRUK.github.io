<script lang="ts">
	import type { Snippet } from 'svelte'

	let { design = 'column', children }: { design?: 'column' | 'row'; children: Snippet } = $props()
</script>

<div class="input-block" data-design={design}>
	{@render children()}
</div>

<style>
	.input-block {
		display: grid;
		grid-auto-flow: row;
		gap: 0.5rem;
	}

	.input-block[data-design='column'] {
		grid-template-columns: minmax(0, 1fr);
	}
	.input-block[data-design='row'] {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	}
</style>
