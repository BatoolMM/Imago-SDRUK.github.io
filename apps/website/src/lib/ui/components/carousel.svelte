<script lang="ts" generics="T">
	type Props = {
		media:
			| ({
					directus_files_id: DirectusFile | DirectusFile['id'] | null
			  } & T)[]
			| null
	}
	import { getId, Picture } from '@arturoguzman/art-ui'
	import LottiePlayer from '../players/lottie_player.svelte'
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right'
	import ArrowLeft from '@tabler/icons-svelte/icons/arrow-left'
	import type { DirectusFile } from '$lib/types/directus'
	import { IconCircleFilled } from '@tabler/icons-svelte'
	import Paragraph from '../text/paragraph.svelte'
	let { media }: Props = $props()
	const id = getId()
	let current = $state(0)
</script>

{#if media}
	<div class="carousel" id="carousel-{id}">
		<div class="assets">
			{#each media as { directus_files_id }, index}
				{@const media = directus_files_id}
				<div class="asset" id="carousel-{id}-{index}">
					{#if media && typeof media !== 'string'}
						{#if media.type?.startsWith('image/')}
							<Picture image={media}></Picture>
						{/if}
						{#if media.type === 'application/json'}
							<LottiePlayer src="/assets/{media.id}"></LottiePlayer>
						{/if}
					{/if}
				</div>
			{/each}
		</div>
		<div class="description">
			{#if media[current] && typeof media !== 'string'}
				{@const { directus_files_id } = media[current]}
				{#if directus_files_id && typeof directus_files_id !== 'string' && directus_files_id.description}
					<Paragraph size="sm" text={directus_files_id.description}></Paragraph>
				{/if}
			{/if}
		</div>
		{#if media.length > 1}
			{#if current > 0}
				<button
					class="left-button"
					onclick={() => {
						current--
						document
							.getElementById(`carousel-${id}-${current}`)
							?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
					}}><ArrowLeft></ArrowLeft></button
				>
			{/if}
			{#if media.length - 1 > current}
				<button
					onclick={() => {
						current++
						document
							.getElementById(`carousel-${id}-${current}`)
							?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
					}}
					class="right-button"><ArrowRight></ArrowRight></button
				>
			{/if}

			<div class="carousel-nav-buttons">
				{#each media as { directus_files_id }, index}
					{@const media = directus_files_id}
					{#if media && typeof media !== 'string'}
						<button
							class="circle-button"
							data-active={current === index ? true : undefined}
							onclick={() => {
								document
									.getElementById(`carousel-${id}-${index}`)
									?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
								current = index
							}}
						>
							<IconCircleFilled size={current === index ? 12 : 9}></IconCircleFilled>
						</button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.carousel {
		position: relative;
		--theme-colour-text: var(--text);
		--theme-font-paragraph: var(--paragraph);
	}
	.assets {
		display: flex;
		overflow: scroll;
		scrollbar-width: none;
		scroll-snap-type: x mandatory;
		width: 100%;
	}
	button {
		height: 100%;
		color: var(--theme-colour-background);
		cursor: pointer;
	}
	.left-button {
		position: absolute;
		left: 0;
		top: 0;
	}
	.right-button {
		position: absolute;
		right: 0;
		top: 0;
	}
	.assets > * {
		scroll-snap-align: start;
		flex-grow: 0;
		flex-shrink: 0;
	}
	.asset {
		width: 100%;
	}
	.carousel-nav-buttons {
		position: absolute;
		bottom: 0.5rem;
		left: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;
		border: 1px solid var(--theme-colour-highlight);
		border-radius: 999px;
		padding: 0.05rem 0.35rem;
		transform: translate(-50%, 0);
	}
	.circle-button {
		display: flex;
		color: var(--theme-colour-quarternary);
	}
	.circle-button[data-active] {
		display: flex;
		color: var(--theme-colour-secondary);
	}
	.description {
		text-align: right;
	}
</style>
