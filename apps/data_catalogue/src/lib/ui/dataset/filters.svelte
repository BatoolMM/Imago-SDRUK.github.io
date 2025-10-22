<script lang="ts">
	import type { CkanResult, CkanTextError } from '$lib/utils/ckan/actions'
	import { Accordion, Button, Icon, Subtitle } from '@imago/ui'
	let {
		organisations,
		groups,
		tags,
		resources,
		licenses
	}: {
		organisations: CkanResult | CkanTextError
		groups: CkanResult | CkanTextError
		tags: CkanResult | CkanTextError
		resources: CkanResult | CkanTextError
		licenses: CkanResult | CkanTextError
	} = $props()
	let filters = $state([
		{
			title: 'Organisations',
			filters: organisations,
			limit: 10,
			transform: (id: string) => {
				return { label: id, href: `?organization=${id}` }
			}
		},
		{
			title: 'Groups',
			filters: groups,
			limit: 10,
			transform: (id: string) => {
				return { label: id, href: `?groups=${id}` }
			}
		},
		{
			title: 'Tags',
			filters: tags,
			limit: 10,
			transform: (id: string) => {
				return { label: id, href: `?tags=${id}` }
			}
		},
		{
			title: 'Resources',
			filters: resources,
			limit: 10,
			transform: (id: string) => {
				console.log(id)
				return { label: id, href: `?res_format=${id}` }
			}
		},
		{
			title: 'Licenses',
			filters: licenses,
			limit: 10,
			transform: (id: string) => {
				return { label: id, href: `?license_id=${id}` }
			}
		}
	])
</script>

{#each filters.filter((filter) => filter.filters?.result?.length > 0) as filter}
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

				<!-- {#if filter.limit < filter.filters.result.length} -->
				<!-- 	<Button -->
				<!-- 		onclick={() => { -->
				<!-- 			filter.limit = 999 -->
				<!-- 		}} -->
				<!-- 	> -->
				<!-- 		+</Button -->
				<!-- 	> -->
				<!-- {:else} -->
				<!-- 	<Button -->
				<!-- 		onclick={() => { -->
				<!-- 			filter.limit = 10 -->
				<!-- 		}} -->
				<!-- 	> -->
				<!-- 		-</Button -->
				<!-- 	> -->
				<!-- {/if} -->
			{/snippet}
			{#if Array.isArray(filter.filters.result)}
				<div class="accordion-buttons">
					{#each filter.filters.result as result}
						<!-- {#each filter.filters.result.slice(0, filter.limit) as result} -->
						{#if typeof result === 'string'}
							<Button line_clamp>{result}</Button>
						{/if}
						{#if typeof result === 'object'}
							{#if result && 'title' in result}
								<Button line_clamp>{result.title}</Button>
							{/if}
						{/if}
					{/each}
				</div>
			{/if}
		</Accordion>
	</div>
{/each}

<style>
	.accordion-wrapper {
		margin-bottom: 1rem;
	}
	button {
		color: var(--text);
	}
	.accordion-trigger {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}
	.accordion-buttons {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 1rem;
		max-height: 50lvh;
		overflow-y: scroll;
		scrollbar-width: none;
	}
</style>
