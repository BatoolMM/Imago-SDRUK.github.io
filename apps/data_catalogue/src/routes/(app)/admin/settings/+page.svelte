<script lang="ts">
	import { page } from '$app/state'
	import { BaseSection, Button, Title } from '@imago/ui'

	let { data } = $props()
</script>

<BaseSection>
	<div class="page">
		<Title>Admin settings</Title>
		<div class="routes">
			{#each data.routes.filter((route) => route.href === page.url.pathname)[0].subpaths as route}
				<Button href={route.href}>{route.label}</Button>
			{/each}
		</div>
	</div>
</BaseSection>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.routes {
		display: grid;
		gap: 1rem;
	}
</style>
