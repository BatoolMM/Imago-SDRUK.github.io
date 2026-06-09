<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { notify } from '$lib/stores/notify.js'
	import CardContent from '$lib/ui/cards/card_content.svelte'
	import CardProduct from '$lib/ui/cards/card_product.svelte'
	import {
		Subtitle,
		Input,
		Title,
		Text,
		type IconsSets,
		PlayerLottie,
		Button,
		Icon,
		handleSearchParams
	} from '@imago/ui'
	let { data } = $props()
	let search = $state('')
	const search_icon: IconsSets = { icon: 'search', set: 'tabler' }
	const stats: { label: string; count: number }[] = $derived([
		{ label: 'Datasets', count: Number(data.package_count) },
		{ label: 'Topics', count: Number(data.tag_count) }
	])
	const handleSearch = () => {
		if (search.length >= 3) {
			goto(`/datasets?search=${search}`)
			return
		}
		notify.send({ message: `You need to provide more than 3 characters` })
	}
</script>

<div class="hero-section">
	<div class="bg-image-container">
		<img class="bg-image" src="/images/terrain_1.png" alt="" />
	</div>
	<div class="animation-container">
		<PlayerLottie play src="/lottie/city/data.json"></PlayerLottie>
	</div>
</div>
<div class="page">
	<header>
		<Title size="2xl">Imago - Data catalogue</Title>
		<div class="banner">
			<div class="search-bar">
				<div class="search-input">
					<Input>
						<Text
							aria-label="Search bar"
							icon={search_icon}
							name="search"
							bind:value={search}
							onkeydown={(e) => {
								if (e.key === 'Enter') {
									handleSearch()
								}
							}}
						></Text>
					</Input>
					<Button
						umami_event="Search datasets"
						onclick={() => {
							handleSearch()
						}}>Search</Button
					>
				</div>
				<div class="cards">
					{#each stats as stat}
						<button
							class="cta-card"
							onclick={() => {
								goto(`/datasets`)
							}}
						>
							<Title size="xl" text={String(stat.count)}></Title>
							<Title size="md" text={stat.label}></Title>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</header>
	<div class="content">
		<CardContent>
			{#snippet title()}
				<Subtitle size="md" weight={500}>
					<Icon icon={{ icon: 'users-group', set: 'tabler' }}></Icon>
					Groups</Subtitle
				>
			{/snippet}
			<div class="buttons">
				{#each data.groups as group}
					<div class="button-wrapper">
						<Button
							href={`/datasets${handleSearchParams({
								url: page.url,
								add: [{ key: 'groups', value: typeof group === 'string' ? group : group.name }]
							})}`}>{typeof group === 'string' ? group : group.display_name}</Button
						>
					</div>
				{/each}
			</div>
		</CardContent>
		<CardContent>
			{#snippet title()}
				<Subtitle size="md" weight={500}>
					<Icon icon={{ icon: 'layout-grid', set: 'tabler' }}></Icon>
					Topics</Subtitle
				>
			{/snippet}
			<div class="buttons">
				{#each data.tags as tag}
					<div class="button-wrapper">
						<Button
							href={`/datasets${handleSearchParams({
								url: page.url,
								add: [{ key: 'vocab_general', value: typeof tag === 'string' ? tag : tag.name }]
							})}`}>{typeof tag === 'string' ? tag : tag.display_name}</Button
						>
					</div>
				{/each}
			</div>
		</CardContent>
		<CardContent>
			{#snippet title()}
				<Subtitle size="md" weight={500}>
					<Icon icon={{ icon: 'database-smile', set: 'tabler' }}></Icon>
					Latest datasets</Subtitle
				>
			{/snippet}

			<div class="dataset-cards">
				{#each data.datasets.items as dataset}
					<div class="button-wrapper">
						<CardProduct {dataset}></CardProduct>
						<!-- // <Button href={`/datasets/${dataset.name}`}>{dataset.title}</Button> -->
					</div>
				{/each}
			</div>
		</CardContent>
	</div>
</div>

<style>
	.hero-section {
		position: relative;
		background: linear-gradient(var(--background), var(--secondary-accent));
		transform: translate(0, -4rem);
		height: 100lvh;
		display: flex;
		gap: 4rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.bg-image-container {
		height: 100lvh;
		position: relative;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.bg-image-container::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			color-mix(in oklab, 75% var(--background), 25% transparent) 15%,
			var(--secondary-accent)
		);
	}
	.bg-image {
		height: 100lvh;
		aspect-ratio: auto;
		object-fit: cover;
	}
	.page {
		/* position: absolute; */
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: flex;
		gap: 2rem;
		flex-direction: column;
		justify-items: center;
		align-items: center;
		margin-inline: auto;
		padding: 6rem 1rem 4rem 1rem;
		background: linear-gradient(to bottom, transparent 25%, var(--secondary) 45%);
		/* background: red; */
	}
	.content {
		width: min(100% - 2rem, 800px);
		display: flex;
		flex-direction: column;
		gap: 2rem;
		/* margin-bottom: 12rem; */
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}
	.search-bar {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: min(100%, 800px);
		justify-content: flex-end;
	}
	header {
		text-align: center;
		display: flex;
		flex-direction: column;

		/* gap: 4rem; */
		gap: 4rem;
		margin-bottom: 2rem;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		overflow: scroll;
		scrollbar-width: none;
		/* background: var(--background); */
		padding: 0.25rem;
		border-radius: var(--radius);
		padding: 2rem;
	}
	.button-wrapper {
		flex-shrink: 0;
	}
	.search-input {
		display: flex;
		gap: 1rem;
	}

	.animation-container {
		display: none;
	}

	.banner {
		display: flex;
		justify-content: center;
		flex-direction: column-reverse;
		gap: 1rem;
		padding: 2rem 0;
		width: min(100%, 1024px);
		margin-inline: auto;
	}
	.dataset-cards {
		display: flex;
		width: 100%;
		overflow: scroll;
		scrollbar-width: none;
		gap: 1rem;
		padding: 4rem;
	}

	.cta-card {
		/* width: min(100%, 200px); */
		/* aspect-ratio: 1 / 1; */
		background-color: var(--secondary-muted);
		padding: 1rem;
		display: flex;
		gap: 1rem;
		/* display: grid; */
		/* grid-template-columns: minmax(0, 1fr); */
		/* grid-template-rows: minmax(0, 3fr) minmax(0, 1fr); */
		justify-items: center;
		align-items: center;
		/* border: 1px solid var(--border); */
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.banner {
			flex-direction: row;
		}
		.page {
			background: linear-gradient(to bottom, transparent 35%, var(--secondary) 45%);
		}
		.hero-section {
			display: block;
			padding: initial;
		}
		.animation-container {
			display: flex;
			height: 110lvh;
			width: 100%;
			overflow: hidden;
			align-items: flex-end;
			position: relative;
			background: linear-gradient(transparent, var(--secondary));
			pointer-events: none;
		}
		.animation-container::after {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			background: linear-gradient(transparent 75%, var(--secondary));
			pointer-events: none;
		}
		.content {
			padding: 4rem 1rem 0 1rem;
		}
		.bg-image-container {
			display: none;
		}
	}
</style>
