<script lang="ts">
	import { Title } from '@imago/ui'
	let { title }: { title?: unknown } = $props()
</script>

<div class="product-title">
	<Title size="lg" text={String(title)}></Title>
</div>

<style>
	.product-title {
		position: relative;
		background-color: color-mix(in oklab, var(--background) 90%, transparent 10%);
		padding: 1rem;
		border: 1px solid var(--border);
	}
	.product-title::before {
		content: '';
		position: absolute;
		bottom: -0.75rem;
		left: 0.75rem;
		height: 100%;
		width: 100%;
		background-color: var(--highlight);
		z-index: -1;
	}
</style>
