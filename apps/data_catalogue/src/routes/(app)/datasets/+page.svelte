<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte.js'
	import { jstr } from '@arturoguzman/art-ui'
	import { BaseSection, Button, handleSearchParams, Icon, Paragraph, Subtitle } from '@imago/ui'
	import { page } from '$app/state'
	import Filters from '$lib/ui/dataset/filters.svelte'
	import CardProduct from '$lib/ui/cards/card_product.svelte'

	let { data } = $props()
	let datasets = $derived(data.datasets)
</script>

<BaseSection>
	<div class="datasets-section">
		<div class="left-col">
			<Filters
				organisations={data.organisations}
				tags={data.tags}
				licenses={data.licenses}
				groups={data.groups}
				resources={data.resources}
			></Filters>
		</div>
		<div class="right-col">
			{#if Array.isArray(datasets)}
				{#if datasets.length === 0}
					<Subtitle size="lg">There are no results for this search.</Subtitle>
				{/if}
				{#each datasets as dataset}
					<CardProduct {dataset}></CardProduct>
				{/each}
				<div class="footer">
					{#if datasets.length > 0}
						{#if page.url.searchParams.get('offset')}
							{@const offset = Number(page.url.searchParams.get('offset'))}
							<!-- HACK: replace fixed dataset with fn to strip required searchparams -->
							<Button
								href={handleSearchParams({
									add: [{ key: 'offset', value: offset - 10, set: true }],
									remove: offset - 10 <= 0 ? ['offset'] : undefined
								})}
							>
								<!-- <Button href={offset - 10 <= 0 ? '/datasets' : `?offset=${offset - 10}`}> -->
								<Icon icon={{ icon: 'arrow-narrow-left', set: 'tabler' }}></Icon>
							</Button>
							<div class="page-count">
								<Paragraph>
									Page {(offset / 10 + 1).toFixed(0)} of
									{(Number(data.datasets_count) / 10).toFixed(0)}
								</Paragraph>
							</div>
							<Button
								href={handleSearchParams({
									add: [{ key: 'offset', value: offset + 10, set: true }]
								})}
							>
								<!-- <Button href={`?offset=${offset + 10}`}> -->
								<Icon icon={{ icon: 'arrow-narrow-right', set: 'tabler' }}></Icon>
							</Button>
						{:else}
							<div class="no-button"></div>
							<div class="page-count">
								<Paragraph>
									Page 1 of
									{(Number(data.datasets_count) / 10).toFixed(0)}
								</Paragraph>
							</div>
							<div class="button-wrapper">
								<Button href={handleSearchParams({ add: [{ key: 'offset', value: 10 }] })}>
									<Icon icon={{ icon: 'arrow-narrow-right', set: 'tabler' }}></Icon>
								</Button>
							</div>
						{/if}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</BaseSection>

{#if debug.status}
	<pre>{jstr(data)}</pre>
{/if}

<style>
	.datasets-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 4fr);
		/* overflow: hidden; */
		gap: 1rem;
		color: var(--text);
		position: relative;
	}

	.right-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--background-muted);
		padding: 2rem;
		border-radius: 0.35rem;
	}
	.right-col > .footer {
		display: flex;
		justify-content: space-between;
		position: sticky;
		bottom: 0;
		left: 0;
		background-color: var(--background-muted);
		padding: 1rem;
	}
	.button-wrapper {
		grid-column: 3/4;
	}
</style>
