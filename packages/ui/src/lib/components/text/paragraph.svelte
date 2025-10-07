<script lang="ts">
	import type { Snippet } from 'svelte'

	let {
		children,
		text,
		size = 'md'
	}: {
		text?: string
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
		children?: Snippet
	} = $props()
</script>

{#if children}
	<span class="paragraph prose" data-size={size}>
		{@render children()}
	</span>
{/if}
{#if text}
	<p class="paragraph prose" data-size={size}>{text}</p>
{/if}

<style>
	.paragraph {
		font-family: var(--paragraph);
		color: var(--text);
		font-weight: 300;
	}
	:global(.paragraph *) {
		color: var(--theme-colour-text);
	}

	.paragraph[data-size='xs'] {
		font-size: clamp(0.8rem, 0.783rem + 0.083vw, 0.85rem);
		font-weight: 200;
	}
	.paragraph[data-size='sm'] {
		font-size: clamp(0.825rem, 0.808rem + 0.083vw, 0.875rem);
		font-weight: 200;
	}
	.paragraph[data-size='md'] {
		font-size: clamp(0.875rem, 0.842rem + 0.167vw, 0.975rem);
	}
	.paragraph[data-size='lg'] {
		font-size: clamp(0.9rem, 0.875rem + 0.125vw, 0.975rem);
	}
	.paragraph[data-size='xl'] {
		font-size: clamp(0.915rem, 0.892rem + 0.117vw, 0.985rem);
	}
	.paragraph[data-size='2xl'] {
		font-size: clamp(0.925rem, 0.9rem + 0.125vw, 1rem);
	}
	.prose {
		line-height: 1.5rem;
		width: min(100%, 600px);
	}
	:global(span.prose *:not(:last-child)) {
		margin-bottom: 1rem;
	}
</style>
