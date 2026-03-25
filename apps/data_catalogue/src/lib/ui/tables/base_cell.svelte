<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children }: { children: Snippet } = $props()
</script>

<div class="cell">
	{@render children()}
</div>

<style>
	.cell {
		font-family: var(--paragraph);
		font-size: clamp(0.875rem, 0.842rem + 0.167vw, 0.975rem);
	}
</style>
