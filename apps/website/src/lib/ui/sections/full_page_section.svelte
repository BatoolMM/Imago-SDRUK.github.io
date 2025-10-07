<script lang="ts">
	import { NAV_HEIGHT } from '$lib/globals/style'
	import type { Section } from '$lib/types/directus'
	import { Paragraph, Subtitle, Title } from '@imago/ui'
	import PageBlock from '../cards/page_block.svelte'
	import BaseSection from './base_section.svelte'

	let { section }: { section: Section } = $props()

	function getBasis(num?: number) {
		if (num === 1) return '100%'
		if (num === 2) return '45%'
		return
	}
</script>

<BaseSection>
	<div class="full-page-section" style:--nav-height={NAV_HEIGHT}>
		<div class="header">
			{#if section.title}
				<Title size="lg" text={section.title}></Title>
			{/if}
			{#if section.subtitle}
				<Subtitle size="sm" text={section.subtitle}></Subtitle>
			{/if}
			{#if section.description}
				<Paragraph>
					{@html section.description}
				</Paragraph>
			{/if}
		</div>
		<div class="blocks">
			{#each section.content ?? [] as { blocks_id }}
				<div class="block-wrapper" style:--basis={getBasis(section.content?.length)}>
					<PageBlock {blocks_id}></PageBlock>
				</div>
			{/each}
		</div>
	</div>
</BaseSection>

<style>
	.full-page-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		gap: 2rem;
		min-height: calc(100lvh - var(--nav-height));
	}
	.blocks {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.block-wrapper {
		flex-basis: var(--basis, 45%);
		justify-content: space-evenly;
		container-type: inline-size;
	}
	@media (min-width: 768px) {
		.block-wrapper {
			flex-basis: var(--basis, 30%);
		}
	}
	@media (min-width: 1280px) {
		.block-wrapper {
			flex-basis: var(--basis, 24%);
		}
	}
</style>
