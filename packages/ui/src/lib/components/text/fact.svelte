<script lang="ts">
	import Subtitle from './subtitle.svelte'
	let {
		title,
		text,
		active,
		inactive,
		size,
		description
	}: {
		title?: string
		text: string
		active?: boolean
		inactive?: boolean
		description?: string

		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
	} = $props()
</script>

<div class="fact">
	{#if title}
		<Subtitle {size} text={title}></Subtitle>
	{/if}
	<p class="paragraph" class:active class:inactive data-description={description}>
		{text}
	</p>
</div>

<style>
	.paragraph {
		font-weight: 300;
		color: var(--text);
		font-family: var(--subtitle);
		font-size: clamp(0.8rem, 0.742rem + 0.292vw, 0.975rem);
		position: relative;
	}
	.paragraph:hover::after {
		content: attr(data-description);
		background-color: var(--tertiary);
		position: absolute;
		bottom: 0;
		left: 0;
		transform: translate(0, 100%);
	}
	.active {
		color: var(--positive-accent);
		font-weight: 600;
	}
	.inactive {
		color: var(--negative);
	}
</style>
