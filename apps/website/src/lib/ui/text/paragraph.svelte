<script lang="ts">
	import type { Snippet } from 'svelte'

	let {
		children,
		text,
		size = 'base'
	}: { text?: string; size?: 'base' | 'sm'; children?: Snippet } = $props()
</script>

<span class="paragraph prose" data-size={size}>
	{#if children}
		{@render children()}
	{/if}
	{#if !children}
		<p>{@html text}</p>
	{/if}
</span>

<style>
	.paragraph {
		font-family: var(--theme-font-paragraph);
		color: var(--theme-colour-text);
		font-weight: 300;
		font-size: clamp(0.875rem, 0.842rem + 0.167vw, 0.975rem);
	}
	:global(.paragraph *) {
		color: var(--theme-colour-text);
	}

	.paragraph[data-size='sm'] {
		font-size: clamp(0.825rem, 0.808rem + 0.083vw, 0.875rem);
		font-weight: 200;
	}
</style>
