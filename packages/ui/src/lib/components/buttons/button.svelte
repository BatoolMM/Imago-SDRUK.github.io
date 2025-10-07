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
		type
	}: {
		href?: string
		download?: string
		leftCol?: Snippet
		rightCol?: Snippet
		children?: Snippet
		onclick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
		onpointerdown?: PointerEventHandler<HTMLButtonElement | HTMLAnchorElement>
		onpointerup?: PointerEventHandler<HTMLButtonElement | HTMLAnchorElement>
		active?: boolean
		style?: 'base' | 'alt' | null | 'clean'
		type?: 'button' | 'submit' | 'reset' | null
	} = $props()
</script>

{#if href}
	<a
		class="btn"
		class:active
		{onclick}
		data-style={style}
		{href}
		{download}
		{onpointerdown}
		{onpointerup}
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

	.btn[data-style='base'].active {
		outline: 0.15rem solid var(--quarternary);
		outline-offset: 0.2rem;
	}

	/**/
	/* .btn[data-style='alt'] { */
	/* 	background-color: transparent; */
	/* 	border: 1px solid var(--highlight); */
	/* 	color: var(--highlight); */
	/* } */
	/**/
	/* .btn[data-style='alt']:hover { */
	/* 	background-color: color-mix( */
	/* 		in oklab, */
	/* 		var(--theme-colour-highlight) 10%, */
	/* 		var(--theme-colour-quarternary) 90% */
	/* 	); */
	/* 	color: var(--theme-colour-highlight); */
	/* } */
</style>
