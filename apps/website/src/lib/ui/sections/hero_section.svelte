<script lang="ts">
	import { Title } from '@imago/ui'
	import LottiePlayer from '../players/lottie_player.svelte'
	const ids = [
		{
			id: 'animation-button-prosperity',
			label: 'Prosperity',
			action: (ev: MouseEvent) => {
				console.log('go to prosperity')
			}
		},
		{
			id: 'animation-button-wellbeing',
			label: 'Wellbeing',
			action: (ev: MouseEvent) => {
				console.log('go to wellbeing')
			}
		},
		{
			id: 'animation-button-sustainability',
			label: 'Sustainability',
			action: (ev: MouseEvent) => {
				console.log('go to sustainability')
			}
		}
	]
</script>

<div class="hero-section">
	<div class="bg-image-container">
		<img class="bg-image" src="/static/ui/terrain_1.png" alt="" />
	</div>
	<div class="content">
		<div class="title">
			<Title size="2xl"
				>Making satellite imagery more useful, usable and used across social research and policy</Title
			>
		</div>
		<div class="beacons-buttons">
			{#each ids as id (id)}
				<button
					class="beacon-button"
					onclick={(ev) => {
						id.action(ev)
					}}>{id.label}</button
				>
			{/each}
		</div>
		<div class="animation-container">
			<LottiePlayer
				src="/static/city/data.json"
				mountAction={() => {
					setTimeout(() => {
						for (const id of ids) {
							const el = document.getElementById(id.id)
							if (el) {
								el.style.cursor = 'pointer'
								el.addEventListener('click', id.action)
							}
						}
					}, 1000)
				}}
			></LottiePlayer>
		</div>
	</div>
</div>

<style>
	.hero-section {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		/* display: flex; */
		/* gap: 2rem; */
		/* flex-direction: column; */
		/* padding: 2rem; */
		/* justify-content: center; */
	}

	.bg-image-container {
		grid-column: 1 / -1;
		grid-row: 1 /-1;
		height: calc(100lvh);
		transform: translate(0, -4rem);
	}

	.content {
		grid-column: 1 / -1;
		grid-row: 1 /-1;
		z-index: 1;
		background: linear-gradient(transparent, var(--secondary) 50%);
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding-top: 2rem;
		text-align: center;
	}

	.title {
		padding: 0 2rem;
	}
	.bg-image {
		height: 100lvh;
		aspect-ratio: auto;
		object-fit: cover;
	}

	.animation-container {
		display: none;
	}
	.beacons-buttons {
		display: flex;
		flex-direction: column;
		/* height: 100%; */
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
	}
	.beacon-button {
		background-color: var(--secondary);
		color: var(--text);
		font-family: var(--subtitle);
		font-weight: 600;
		font-size: clamp(1.25rem, 1.083rem + 0.833vw, 1.75rem);
		padding: clamp(0.8rem, 0.733rem + 0.333vw, 1rem);
		width: min(100% - 1rem, 250px);
		border: 1px solid var(--highlight);
		border-radius: 0.5rem;
		box-shadow:
			0 4px 6px -1px color-mix(in oklab, var(--secondary) 40%, transparent 60%),
			0 2px 4px -2px color-mix(in oklab, white 40%, transparent 60%);
		transition: all 0.3s ease-in-out;
	}
	.beacon-button:hover {
		box-shadow:
			0 10px 15px -5px var(--highlight),
			0 6px 8px -6px white;
	}
	@media (min-width: 768px) {
		.hero-section {
			display: block;
			padding: initial;
		}
		.content {
			display: grid;
			height: 100lvh;
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr) minmax(0, max-content);
		}
		.title {
			padding: 4rem 0;
			width: min(100% - 2rem, 800px);
			margin-inline: auto;
		}
		.beacons-buttons {
			display: none;
		}
		.animation-container {
			display: flex;
			/* height: 110lvh; */
			width: 100%;
			overflow: hidden;
			align-items: flex-end;
			position: relative;
			background: linear-gradient(transparent, var(--secondary));
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
	}
</style>
