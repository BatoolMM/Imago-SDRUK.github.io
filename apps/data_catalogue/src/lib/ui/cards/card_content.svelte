<script lang="ts">
	import type { Snippet } from 'svelte'
	import { fade } from 'svelte/transition'
	let { title, children }: { title: Snippet; children: Snippet } = $props()
</script>

<div class="card" in:fade|global>
	<div class="card-title">
		{@render title?.()}
	</div>
	<div class="card-content">
		{@render children?.()}
	</div>
</div>

<style>
	.card-title {
		background-color: var(--secondary-muted);
		border-radius: var(--radius) var(--radius) 0 0;
	}
	.card {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		border: 1px solid var(--border-accent);
		background-color: var(--secondary);
		border-radius: 0.35rem;
	}
	.card-title {
		border-bottom: 1px solid var(--border-accent);
		padding: 1rem;
	}
	/* .card-image { */
	/* 	width: 100%; */
	/* 	aspect-ratio: 1 / 1; */
	/* 	background-color: var(--background); */
	/* 	padding: 4rem; */
	/* } */
</style>
