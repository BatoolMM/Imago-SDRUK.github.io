<script lang="ts">
	import { Notice, Paragraph, Title } from '@imago/ui'
	let { title, state }: { title?: unknown; state?: string } = $props()
</script>

<div class="product-title">
	<Title size="lg" text={String(title)}></Title>
	{#if state === 'draft'}
		<div class="wrapper">
			<Notice level="warning">
				<Paragraph current_colour size="sm">Beta version</Paragraph>
			</Notice>
		</div>
	{/if}
</div>

<style>
	.product-title {
		position: relative;
		/* background-color: color-mix(in oklab, var(--background) 90%, transparent 10%); */
		padding: 1rem;
		background-color: var(--background-accent);
		border-radius: var(--radius);
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
		/* border: 1px solid var(--border); */
	}
	.product-title::before {
		content: '';
		position: absolute;
		bottom: -0.75rem;
		left: 0.75rem;
		height: 100%;
		width: 100%;
		/* background-color: var(--highlight); */
		z-index: -1;
	}
</style>
