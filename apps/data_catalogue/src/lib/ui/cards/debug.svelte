<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte'
	import { jstr } from '@arturoguzman/art-ui'
</script>

<div class="debug">
	{#if debug.data}
		<div class="debug-block">
			<pre>
        {jstr(debug.data)}
      </pre>
		</div>
	{/if}
</div>

<style>
	.debug {
		width: 100%;
		color: var(--text);
		font-size: 0.85rem;
		overflow: hidden;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.debug-block {
		overflow-x: scroll;
		width: 100%;
		border: 1px solid var(--border);
		background-color: #1e1e2e;
		color: #89b4fa;
		padding: 1rem;
		border-radius: var(--radius);
		font-family: var(--accent);
	}
</style>
