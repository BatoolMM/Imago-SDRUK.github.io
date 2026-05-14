<script lang="ts">
	import { page } from '$app/state'
	import type { Tag } from '$lib/server/entities/models/datasets'
	import type { CkanGroup } from '$lib/types/ckan'
	import { Accordion, Button, handleSearchParams, Icon, Subtitle } from '@imago/ui'
	let {
		groups,
		tags,
		resources
	}: {
		groups: (string | CkanGroup)[]
		tags: (string | Tag)[]
		resources: { result: string[] }
	} = $props()
	let filters: {
		title: string
		filters: { key: string; value: string }[]
		query: string
		limit: number
		transform: (id: string) => { label: string; href: string }
	}[] = $derived([
		{
			title: 'Groups',
			filters: groups.map((group) =>
				typeof group === 'string'
					? { key: group, value: group }
					: { key: group.title, value: group.name }
			),
			query: 'groups',
			limit: 10,
			transform: (id: string) => {
				return { label: id, href: `?groups=${id}` }
			}
		},
		{
			title: 'Tags',
			filters: tags.map((tag) =>
				typeof tag === 'string'
					? { key: tag, value: tag }
					: { key: tag.display_name, value: tag.name }
			),
			// query: 'vocab_Topics',
			query: 'vocab_general',
			limit: 10,
			transform: (id: string) => {
				return { label: id, href: `?tags=${id}` }
			}
		},
		{
			title: 'Resources',
			filters: resources.result.map((resource) => ({ key: resource, value: resource })),
			query: 'res_format',
			limit: 10,
			transform: (id: string) => {
				return { label: id, href: `?res_format=${id}` }
			}
		}
	])
</script>

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

<style>
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
</style>
