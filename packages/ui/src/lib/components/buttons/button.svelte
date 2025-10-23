<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler, PointerEventHandler } from 'svelte/elements'
	let {
		href,
		download,
		leftCol,
		rightCol,
		children,
		onclick,
		onpointerup,
		onpointerdown,
		active,
		style = 'base',
		type,
		line_clamp
	}: {
		href?: string
		download?: string | boolean
		leftCol?: Snippet
		rightCol?: Snippet
		children?: Snippet
		onclick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
		onpointerdown?: PointerEventHandler<HTMLButtonElement | HTMLAnchorElement>
		onpointerup?: PointerEventHandler<HTMLButtonElement | HTMLAnchorElement>
		active?: boolean
		style?: 'base' | 'alt' | null | 'clean' | 'anchor' | 'clean-full'
		type?: 'button' | 'submit' | 'reset' | null
		line_clamp?: boolean
	} = $props()
</script>

{#if href}
	<a
		class="btn"
		class:line-clamp={line_clamp}
		class:active
		{onclick}
		data-style={style}
		{href}
		{download}
		{onpointerdown}
		{onpointerup}
		target={download ? '_blank' : undefined}
	>
		{@render leftCol?.()}
		{@render children?.()}
		{@render rightCol?.()}
	</a>
{/if}
{#if href === undefined}
	<button
		class="btn"
		class:active
		class:line-clamp={line_clamp}
		{onclick}
		data-style={style}
		{type}
		{onpointerdown}
		{onpointerup}
	>
		{@render leftCol?.()}
		{@render children?.()}
		{@render rightCol?.()}
	</button>
{/if}

<style>
	.btn {
		display: flex;
		color: var(--highlight);
		font-family: var(--accent);
		font-size: clamp(0.9rem, 0.875rem + 0.125vw, 0.975rem);
		font-weight: 300;
		transition: all var(--animation-time) ease-in-out;
		text-decoration: none;
	}
	.line-clamp {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		text-align: left;
	}
	.btn[data-style='base'] {
		justify-content: space-between;
		align-items: center;
		border: 1px solid var(--border);
		background-color: var(--background);
		gap: 1rem;
		padding: clamp(0.15rem, 0.117rem + 0.167vw, 0.25rem) clamp(1rem, 0.667rem + 1.667vw, 2rem);
		border-radius: 999px;
	}

	.btn[data-style='base']:hover {
		/* border: 1px solid var(--theme-colour-text); */
		box-shadow: 0px 0px 10px
			color-mix(in oklab, var(--theme-colour-text) 20%, var(--theme-colour-background) 80%);
		background-color: var(--background-accent);
	}

	.btn[data-style='base']:visited {
		border: 1px solid var(--border-muted);
	}

	.btn[data-style='base'].active {
		outline: 0.15rem solid var(--quarternary);
		outline-offset: 0.2rem;
		background-color: var(--highlight-accent);
		color: var(--background-muted);
	}

	.btn[data-style='alt'] {
		font-weight: 400;
		color: var(--tertiary-muted);
		justify-content: space-between;
		align-items: center;
		border: 1px solid var(--tertiary-muted);
		background-color: var(--quarternary);
		gap: 1rem;
		padding: clamp(0.15rem, 0.117rem + 0.167vw, 0.25rem) clamp(1rem, 0.667rem + 1.667vw, 2rem);
		border-radius: 999px;
	}

	.btn[data-style='alt']:hover {
		/* border: 1px solid var(--theme-colour-text); */
		box-shadow: 0px 0px 10px
			color-mix(in oklab, var(--theme-colour-text) 20%, var(--theme-colour-background) 80%);
		background-color: var(--border);
	}

	.btn[data-style='alt']:visited {
		/* border: 1px solid var(--border-muted); */
	}

	.btn[data-style='alt'].active {
		outline: 0.15rem solid var(--quarternary);
		outline-offset: 0.2rem;
		background-color: var(--highlight-accent);
		color: var(--background-muted);
	}

	.btn[data-style='anchor'] {
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		transition: all var(--animation-time) ease-in-out;
	}

	.btn[data-style='anchor']:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
		color: var(--highlight-accent);
	}

	.btn[data-style='anchor'].active {
		outline: 0.15rem solid var(--quarternary);
		outline-offset: 0.2rem;
	}

	.btn[data-style='clean'] {
		justify-content: space-between;
		align-items: center;
	}
	.btn[data-style='clean-full'] {
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
</style>
