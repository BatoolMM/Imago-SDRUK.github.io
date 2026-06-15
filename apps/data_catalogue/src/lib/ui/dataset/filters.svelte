<script lang="ts">
	import { page } from '$app/state'
	import type { DatasetsFilter } from '$lib/types/filters'
	import { Accordion, ActionBar, Button, handleSearchParams, Icon, Subtitle } from '@imago/ui'
	let { filters }: { filters: DatasetsFilter[] } = $props()
	let open = $state(false)
	function toggleOpen() {
		open = !open
	}
</script>

<div class="mobile-filters" data-open={open ? true : undefined}>
	<ActionBar>
		{#snippet right()}
			<Button
				style="tag"
				active={open}
				onclick={() => {
					toggleOpen()
				}}
			>
				Filters
				<Icon icon={{ icon: 'filter-2', set: 'tabler' }}></Icon>
			</Button>
		{/snippet}
	</ActionBar>
	{#if open}
		{@render filtersMenu()}
	{/if}
</div>
<div class="desktop-filters">
	{@render filtersMenu()}
</div>

{#snippet filtersMenu()}
	<div class="filters">
		{#if page.url.searchParams.get('search')}
			<Button
				style="tag"
				active={true}
				line_clamp
				href={handleSearchParams({
					remove: ['search'],
					url: page.url
				})}>Clear search</Button
			>
		{/if}
		{#each filters.filter((filter) => filter.filters.length > 0) as filter}
			<div class="accordion-wrapper">
				<Accordion default_open>
					{#snippet title({ toggleOpen, open })}
						<Button
							style="clean-full"
							onclick={() => {
								toggleOpen()
							}}
						>
							{#snippet leftCol()}
								<Subtitle>{filter.title}</Subtitle>
							{/snippet}
							{#snippet rightCol()}
								<Icon icon={{ icon: open ? 'arrow-down-01' : 'arrow-right-01', set: 'hugeicons' }}
								></Icon>
							{/snippet}
						</Button>
					{/snippet}
					{#if Array.isArray(filter.filters)}
						<div class="accordion-buttons">
							{#each filter.filters as result}
								{@const active = page.url.searchParams.getAll(filter.query).includes(result.value)}
								<div class="button-wrapper">
									<!-- {#each filter.filters.result.slice(0, filter.limit) as result} -->
									<!-- {#if typeof result === 'string'} -->
									<!-- 	{@const active = page.url.searchParams.getAll(filter.query).includes(result)} -->
									<!-- 	<Button -->
									<!-- 		style="tag" -->
									<!-- 		{active} -->
									<!-- 		line_clamp -->
									<!-- 		href={handleSearchParams({ -->
									<!-- 			add: [{ key: filter.query, value: result }], -->
									<!-- 			remove: active ? [{ key: filter.query, value: result }] : undefined, -->
									<!-- 			url: page.url -->
									<!-- 		})}>{result}</Button -->
									<!-- 	> -->
									<!-- {/if} -->
									<Button
										style="tag"
										{active}
										line_clamp
										href={handleSearchParams({
											add: [{ key: filter.query, value: result.value }],
											remove: active ? [{ key: filter.query, value: result.value }] : undefined,
											url: page.url
										})}>{result.key}</Button
									>
								</div>
							{/each}
						</div>
					{/if}
				</Accordion>
			</div>
		{/each}
	</div>
{/snippet}

<style>
	.mobile-filters {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, 0fr);
	}

	.mobile-filters[data-open] {
		grid-template-rows: minmax(0, 1fr) minmax(0, max-content);
	}
	.desktop-filters {
		display: none;
	}
	.accordion-wrapper {
		margin-bottom: 1rem;
	}

	.accordion-buttons {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 0.5rem;
		max-height: 50lvh;
		overflow-y: scroll;
		scrollbar-width: none;
		padding: 1rem;
	}
	.filters {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	@media (min-width: 768px) {
		.mobile-filters {
			display: none;
		}
		.desktop-filters {
			display: initial;
		}
	}
</style>
