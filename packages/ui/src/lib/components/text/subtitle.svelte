<script lang="ts">
	import type { Snippet } from 'svelte'

	let {
		children,
		text,
		size = 'sm'
	}: {
		text?: string
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
		children?: Snippet
	} = $props()
</script>

<h3 class="title" data-size={size}>
	{#if children}
		{@render children()}
	{/if}
	{#if text}
		{text}
	{/if}
</h3>

<style>
	h3 {
		color: var(--text);
		font-family: var(--subtitle);
		font-weight: 400;
	}
	h3[data-size='xs'] {
		font-size: clamp(0.875rem, 0.858rem + 0.083vw, 0.925rem);
	}
	h3[data-size='sm'] {
		font-size: clamp(0.925rem, 0.85rem + 0.375vw, 1.15rem);
	}
	h3[data-size='md'] {
		font-size: clamp(1.075rem, 0.933rem + 0.708vw, 1.5rem);
	}
	h3[data-size='lg'] {
		font-size: clamp(1.35rem, 1.133rem + 1.083vw, 2rem);
	}
	h3[data-size='xl'] {
		font-size: clamp(1.725rem, 1.55rem + 0.875vw, 2.25rem);
	}
	h3[data-size='2xl'] {
		font-size: clamp(2rem, 1.667rem + 1.667vw, 3rem);
	}
</style>
