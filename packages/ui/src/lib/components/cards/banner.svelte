<script lang="ts">
	import type { Snippet } from 'svelte'
	import Subtitle from '../text/subtitle.svelte'

	let { text, children }: { text?: string; children?: Snippet } = $props()
</script>

<div class="banner">
	{#if text}
		<Subtitle size="lg">{text}</Subtitle>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.banner {
		width: 100%;
		padding: 1rem;
		overflow: hidden;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--tertiary);
		border-radius: var(--radius);
	}
</style>
