<script lang="ts" generics="T extends Block">
	import type { Block } from '$lib/types/directus'
	import Carousel from '../components/carousel.svelte'
	import { Picture } from '@arturoguzman/art-ui'
	import { Subtitle, Title, Paragraph, Button, Icon } from '@imago/ui'
	type Action = {
		label: string
		href?: string
		alternative?: boolean
	}
	let {
		blocks_id
	}: {
		blocks_id: Block | string | null | T
	} = $props()
</script>

{#if blocks_id && typeof blocks_id !== 'string'}
	{@const block = blocks_id}
	{#if block.style === 'general'}
		<div class="block">
			{#if block.media && block.media.length > 0}
				<div class="left-col">
					<Carousel media={block.media}></Carousel>
				</div>
			{/if}
			<div class="right-col">
				<div class="copy">
					<div class="header">
						{#if block.title}
							<Title text={block.title}></Title>
						{/if}
						{#if block.subtitle}
							<Subtitle text={block.subtitle}></Subtitle>
						{/if}
					</div>
					{#if block.content}
						<Paragraph>
							{@html block.content}
						</Paragraph>
					{/if}
				</div>

				{#if block.actions}
					{@const actions = block.actions as Action[]}
					{#each actions as { href, label }}
						<div class="actions">
							<Button {href}>
								{#snippet leftCol()}
									{label}
								{/snippet}
								{#snippet rightCol()}
									{#if href?.startsWith('/')}
										<Icon icon={{ icon: 'arrow-right-01', set: 'hugeicons' }}></Icon>
									{:else}
										<Icon icon={{ icon: 'arrow-up-right-01', set: 'hugeicons' }}></Icon>
									{/if}
								{/snippet}
							</Button>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
	{#if block.style === 'title_and_image'}
		<div class="card">
			<div class="card-title">
				{#if block.title}
					<Title size="lg" text={block.title}></Title>
				{/if}
			</div>
			<div class="card-content">
				<div class="card-image">
					{#if block.media}
						{#each block.media as media}
							<!-- {#if typeof media !== 'string' && typeof media !== 'number' && 'directus_files_id' in media} -->
							{#if typeof media !== 'string' && typeof media !== 'number' && 'directus_files_id' in media}
								{#if typeof media.directus_files_id !== 'string'}
									<Picture fit="contain" image={media.directus_files_id}></Picture>
								{/if}
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/if}
	{#if block.style === 'title_only'}
		<div class="cta-card" style:--card-colour={block.background_colour}>
			<h2 class="cta-text">
				{block.title}
			</h2>
			{#if block.actions}
				<div class="icon">
					<a href={block.actions[0].href}>
						<Icon icon={{ icon: 'arrow-right-01', set: 'hugeicons', size: 'lg' }}></Icon>
					</a>
				</div>
			{/if}
		</div>
	{/if}
{/if}

<style>
	.block {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	@container (width > 600px) {
		.block {
			width: 100%;
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
	}
	.right-col {
		height: 100%;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, max-content);
		gap: 1rem;
	}
	.actions {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}
	.card {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
		border: 1px solid var(--highlight);
		background-color: var(--background);
		border-radius: 0.35rem;
	}
	.card-title {
		border-bottom: 1px solid var(--highlight);
		padding: 1rem;
	}
	.card-image {
		width: 100%;
		aspect-ratio: 1 / 1;
		background-color: var(--background);
		padding: 4rem;
		/* background-color: white; */
	}
	.cta-card {
		aspect-ratio: 1 / 1;
		background: color-mix(in oklab, var(--card-colour) 20%, transparent 80%);
		border: 1px solid var(--text);
		border-radius: 0.35rem;
		color: var(--text);
		padding: 1rem;
		font-family: var(--title);
		font-weight: 700;
		font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		box-shadow: var(--glass);
		transition: all 0.3s ease-in-out;
	}
	.cta-card:hover {
		background: color-mix(in oklab, var(--card-colour) 40%, transparent 60%);
	}
	.icon {
		display: flex;
		justify-content: flex-end;
	}
	a {
		color: var(--text);
	}
	@media (min-width: 768px) {
		.cta-text {
			height: 100%;
			word-break: break-all;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
