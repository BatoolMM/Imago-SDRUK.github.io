<script lang="ts">
	import Subtitle from './subtitle.svelte'
	let {
		title,
		text,
		active,
		inactive
	}: { title?: string; text: string; active?: boolean; inactive?: boolean } = $props()
</script>

<div class="fact">
	{#if title}
		<Subtitle text={title}></Subtitle>
	{/if}
	<p class="paragraph" class:active class:inactive>
		{text}
	</p>
</div>

<style>
	.paragraph {
		font-weight: 300;
		color: var(--text);
		font-family: var(--subtitle);
		font-size: clamp(0.8rem, 0.742rem + 0.292vw, 0.975rem);
	}
	.active {
		color: var(--positive-accent);
		font-weight: 600;
	}
	.inactive {
		color: var(--negative);
	}
</style>
