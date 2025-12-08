<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler, PointerEventHandler } from 'svelte/elements'
	let {
		hover_label,
		href,
		download,
		disabled,
		leftCol,
		rightCol,
		children,
		onclick,
		onpointerup,
		onpointerdown,
		active,
		style = 'base',
		type,
		line_clamp,
		umami_event
	}: {
		hover_label?: string
		href?: string
		download?: string | boolean
		disabled?: boolean
		umami_event?: string
		leftCol?: Snippet
		rightCol?: Snippet
		children?: Snippet
		onclick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
		onpointerdown?: PointerEventHandler<HTMLButtonElement | HTMLAnchorElement>
		onpointerup?: PointerEventHandler<HTMLButtonElement | HTMLAnchorElement>
		active?: boolean
		style?: 'base' | 'alt' | null | 'clean' | 'anchor' | 'clean-full' | 'square' | 'tag'
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
		data-hover-label={hover_label}
		{href}
		{download}
		{onpointerdown}
		{onpointerup}
		data-umami-event={umami_event}
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
		data-hover-label={hover_label}
		{disabled}
		{type}
		{onpointerdown}
		{onpointerup}
		data-umami-event={umami_event}
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
		background-color: var(--background);
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
		border-radius: var(--radius);
		padding: 0.25rem;
	}
	.btn[data-style='clean'].active {
		color: var(--background);
		background-color: var(--quarternary);
	}
	.btn[data-style='clean-full'] {
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.btn[data-style='square'] {
		border: 1px solid var(--background-accent);
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: var(--radius);
		width: 100%;
		aspect-ratio: 1 / 1;
	}
	.btn[data-style='square']:hover {
		border: 1px solid var(--border-muted);
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: var(--radius);
		width: 100%;
		aspect-ratio: 1 / 1;
	}
	.btn[data-style='square'].active {
		color: var(--background-muted);
		background-color: var(--border);
		border: 1px solid var(--border);
	}
	.btn[data-style='tag'] {
		border: 1px solid var(--background-accent);
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: var(--radius);
		width: 100%;
	}
	.btn[data-style='tag']:hover {
		border: 1px solid var(--border-muted);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: var(--radius);
		width: 100%;
	}
	.btn[data-style='tag'].active {
		color: var(--background-muted);
		background-color: var(--border);
		border: 1px solid var(--border);
	}
	.btn[data-hover-label] {
		position: relative;
	}
	.btn[data-hover-label]:hover::after {
		content: attr(data-hover-label);
		position: absolute;
		font-size: 0.75rem;
		background-color: var(--background);
		color: var(--text);
		transform: translate(0, -100%);
		padding: 0.15rem;
		border-radius: 0.15rem;
		width: 100%;
	}
	.line-clamp {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		text-align: left;
	}
	@media print {
		.btn {
			display: none;
		}
	}
</style>
