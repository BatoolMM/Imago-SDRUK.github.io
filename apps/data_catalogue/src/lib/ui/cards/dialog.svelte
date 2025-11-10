<script lang="ts">
	import type { Snippet } from 'svelte'

	let { id, children }: { id: string; children: Snippet } = $props()
</script>

<dialog {id}>
	{@render children()}
</dialog>

<style>
	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--background-accent);
		border: 1px solid var(--border-accent);
		border-radius: var(--radius);
	}
	dialog::backdrop {
		background-color: color-mix(in oklab, black 35%, transparent 65%);
		mix-blend-mode: multiply;
	}
</style>
