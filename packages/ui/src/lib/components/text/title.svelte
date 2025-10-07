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

<h2 class="title" data-size={size}>
	{#if children}
		{@render children()}
	{/if}
	{#if text}
		{text}
	{/if}
</h2>

<style>
	h2 {
		color: var(--text);
		font-family: var(--title);
		font-weight: 600;
	}
	h2[data-size='xs'] {
		font-size: clamp(0.9rem, 0.867rem + 0.167vw, 1rem);
	}
	h2[data-size='sm'] {
		font-size: clamp(1.05rem, 0.95rem + 0.5vw, 1.35rem);
	}
	h2[data-size='md'] {
		font-size: clamp(1.15rem, 0.983rem + 0.833vw, 1.65rem);
	}
	h2[data-size='lg'] {
		font-size: clamp(1.25rem, 0.917rem + 1.667vw, 2.25rem);
		line-height: clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem);
	}
	h2[data-size='xl'] {
		font-size: clamp(1.95rem, 1.6rem + 1.75vw, 3rem);
		line-height: clamp(2.25rem, 2rem + 1.25vw, 3rem);
	}
	h2[data-size='2xl'] {
		font-size: clamp(3rem, 2.667rem + 1.667vw, 4rem);
		line-height: clamp(3rem, 2.833rem + 0.833vw, 3.5rem);
	}
</style>
