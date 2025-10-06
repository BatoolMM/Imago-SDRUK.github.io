<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'

	let {
		href,
		download,
		leftCol,
		rightCol,
		children,
		onclick,
		active,
		style = 'base',
		type
	}: {
		href?: string
		download?: string
		leftCol?: Snippet
		rightCol?: Snippet
		children?: Snippet
		onclick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
		active?: boolean
		style?: 'base' | 'alt'
		type?: 'button' | 'submit' | 'reset' | null
	} = $props()
</script>

{#if href}
	<a class="btn" class:active {onclick} data-style={style} {href} {download}>
		{@render leftCol?.()}
		{@render children?.()}
		{@render rightCol?.()}
	</a>
{/if}
{#if href === undefined}
	<button class="btn" class:active {onclick} data-style={style} {type}>
		{@render leftCol?.()}
		{@render children?.()}
		{@render rightCol?.()}
	</button>
{/if}

<style>
	a,
	button {
		display: flex;
		justify-content: space-between;
		padding: clamp(0.15rem, 0.117rem + 0.167vw, 0.25rem) clamp(1rem, 0.667rem + 1.667vw, 2rem);
		color: var(--theme-colour-text);
		font-weight: 300;
		background-color: var(--theme-colour-quarternary);
		border: 1px solid var(--theme-colour-quarternary);
		border-radius: 999px;
		font-family: var(--theme-font-accent);
		/* font-size: clamp(0.75rem, 0.675rem + 0.375vw, 0.975rem); */
		font-size: clamp(0.9rem, 0.875rem + 0.125vw, 0.975rem);
		transition: all 0.3s ease-in-out;
		gap: 1rem;
	}
	a,
	button:hover {
		border: 1px solid var(--theme-colour-text);
		box-shadow: 0px 0px 10px
			color-mix(in oklab, var(--theme-colour-text) 20%, var(--theme-colour-background) 80%);
		background-color: color-mix(
			in oklab,
			var(--theme-colour-primary) 90%,
			var(--theme-colour-background) 10%
		);
	}
	a.active,
	button.active {
		outline: 3px solid var(--theme-colour-highlight);
		outline-offset: 2px;
	}

	.btn[data-style='alt'] {
		background-color: transparent;
		border: 1px solid var(--theme-colour-highlight);
		color: var(--theme-colour-highlight);
	}

	.btn[data-style='alt']:hover {
		background-color: color-mix(
			in oklab,
			var(--theme-colour-highlight) 10%,
			var(--theme-colour-quarternary) 90%
		);
		color: var(--theme-colour-highlight);
	}
</style>
