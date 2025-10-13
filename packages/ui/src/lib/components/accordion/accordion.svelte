<script lang="ts">
	import type { Snippet } from 'svelte'
	let {
		default_open = $bindable(),
		subtitle_padding,
		title,
		buttons,
		children
	}: {
		default_open?: boolean
		subtitle_padding?: 'none'
		buttons?: Snippet<[{ toggleOpen: () => void; open: boolean }]>
		children?: Snippet<[{ toggleOpen: () => void }]>
		title?: Snippet<[{ toggleOpen: () => void; open: boolean }]>
	} = $props()
	let open = $derived(default_open === undefined ? false : default_open)
	const toggleOpen = () => {
		open = !open
	}
</script>

<div class="accordion">
	<header>
		<div class="subtitle-wrapper" data-subtitle-padding={subtitle_padding}>
			{@render title?.({ toggleOpen, open })}
		</div>
		<div class="buttons">
			{@render buttons?.({ toggleOpen, open })}
		</div>
	</header>
	<div class="inputs" class:hidden={open === false}>
		{@render children?.({ toggleOpen })}
	</div>
</div>

<style>
	.accordion {
		flex-shrink: 0;
		overflow-x: hidden;
		position: relative;
	}
	header {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
		align-items: center;
	}
	.hidden {
		display: none;
	}
	.subtitle-wrapper {
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 0 0 1rem;
	}
	.subtitle-wrapper[data-subtitle-padding='none'] {
		padding: 0;
	}
	.inputs {
		padding: 1rem 1rem 2rem 1rem;
	}
	.buttons {
		display: flex;
	}
</style>
