<script lang="ts">
	import { page } from '$app/state'
	import { NAV_HEIGHT } from '$lib/globals/style'
	import { Button, Icon, Title, Footer, DynamicNav } from '@imago/ui'
	import { goto } from '$app/navigation'
	import { ROUTES } from '$lib/globals/routes'
	import Logos from '$lib/ui/cards/logos.svelte'
</script>

<DynamicNav routes={ROUTES} nav_height={NAV_HEIGHT}>
	{#snippet children({ scroll })}
		<Logos {scroll}></Logos>
	{/snippet}
</DynamicNav>
<div class="error-section" style:--nav-height={NAV_HEIGHT}>
	<div class="error-message">
		<Title text={`${page.status} ${page.error?.message}`}></Title>
		<div class="button-container">
			<Button
				onclick={() => {
					goto('/')
				}}
			>
				{#snippet leftCol()}
					<p>Head home?</p>
				{/snippet}
				{#snippet rightCol()}
					<Icon icon={{ icon: 'home-13', set: 'hugeicons' }}></Icon>
				{/snippet}
			</Button>
		</div>
	</div>
</div>

<Footer></Footer>

<style>
	.error-section {
		min-height: calc(100lvh - var(--nav-height));
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.error-message {
		width: min(100% - 2rem, 600px);
		margin-inline: auto;
		text-align: center;
	}
	.button-container {
		margin: 2rem 0;
		display: flex;
		justify-content: center;
	}
</style>
