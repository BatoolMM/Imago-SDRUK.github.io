<script lang="ts">
	import { goto } from '$app/navigation'
	import { BaseCard, Input, Title, Text, type IconsSets, PlayerLottie, Button } from '@imago/ui'
	let { data } = $props()
	let search = $state()
	const search_icon: IconsSets = { icon: 'search', set: 'tabler' }
	const stats: { label: string; count: number }[] = [
		{ label: 'Datasets', count: Number(data.package_count) },
		{ label: 'Organisations', count: Number(data.organisation_count) },
		{ label: 'Topics', count: Number(data.tag_count) }
	]
</script>

<div class="hero-section">
	<div class="bg-image-container">
		<img class="bg-image" src="/images/terrain_1.png" alt="" />
	</div>
	<div class="animation-container">
		<PlayerLottie play src="/lottie/city/data.json"></PlayerLottie>
	</div>
	<div class="content">
		<div class="hcader">
			<Title size="2xl">Search Imago datasets</Title>
			<div class="search-bar">
				<Input>
					<Text
						icon={search_icon}
						name="search"
						bind:value={search}
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								goto(`/datasets?search=${search}`)
							}
						}}
					></Text>
				</Input>
				<Button href="/datasets?search={search}">Search</Button>
			</div>
		</div>
		<div class="body">
			{#each stats as stat}
				<BaseCard rounded border>
					<button class="cta-card">
						<Title size="2xl" text={String(stat.count)}></Title>
						<Title size="lg" text={stat.label}></Title>
					</button>
				</BaseCard>
			{/each}
		</div>
	</div>
</div>

<style>
	.hero-section {
		position: relative;
		background: linear-gradient(var(--background), var(--secondary));
		transform: translate(0, -4rem);
		height: 100lvh;
		display: flex;
		gap: 4rem;
		flex-direction: column;
		padding: 1rem;
		justify-content: center;
		align-items: center;
	}

	.bg-image-container {
		height: 100lvh;
		position: absolute;
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
			var(--secondary)
		);
	}
	.bg-image {
		height: 100lvh;
		aspect-ratio: auto;
		object-fit: cover;
	}
	.header {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.search-bar {
		display: flex;
		gap: 1rem;
	}

	.animation-container {
		display: none;
	}

	.content {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: min(100%);
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
		justify-items: center;
		align-items: center;
		margin-inline: auto;
		padding: 0 1rem;
	}
	.body {
		display: flex;
		gap: 1rem;
		flex-direction: column;
		padding: 2rem 0;
		width: min(100%, 1024px);
	}
	.cta-card {
		width: 100%;
		height: 100%;
		background-color: color-mix(in oklab, var(--quarternary) 60%, transparent 40%);
		padding: 1rem;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 3fr) minmax(0, 1fr);
		justify-items: center;
		align-items: center;
	}
	@media (min-width: 768px) {
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
		.bg-image-container {
			display: none;
		}
		.body {
			flex-direction: row;
		}
		.cta-card {
			width: 100%;
			aspect-ratio: 1 / 1;
		}
	}
</style>
