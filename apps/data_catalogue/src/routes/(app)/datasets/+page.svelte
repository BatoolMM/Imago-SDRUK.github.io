<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte.js'
	import { jstr } from '@arturoguzman/art-ui'
	import {
		Accordion,
		BaseCard,
		BaseSection,
		Button,
		Fact,
		Icon,
		Paragraph,
		Subtitle
	} from '@imago/ui'

	let { data } = $props()
	let datasets = $derived(data.data.result)
	const filters = [
		{
			title: 'Organisations',
			filters: data.organisations,
			transform: (id: string) => {
				return { label: id, href: `?organization=${id}` }
			}
		},
		{
			title: 'Groups',
			filters: data.groups,
			transform: (id: string) => {
				return { label: id, href: `?groups=${id}` }
			}
		},
		{
			title: 'Tags',
			filters: data.tags,
			transform: (id: string) => {
				return { label: id, href: `?tags=${id}` }
			}
		},
		{
			title: 'Resources',
			filters: data.resources,
			transform: (id: string) => {
				return { label: id, href: `?res_format=${id}` }
			}
		},
		{
			title: 'Licenses',
			filters: data.licenses,
			transform: (id: string) => {
				return { label: id, href: `?license_id=${id}` }
			}
		}
	]
</script>

<BaseSection>
	<div class="datasets-section">
		<div class="left-col">
			{#each filters as filter}
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
					{#if Array.isArray(filter.filters.result)}
						<div class="accordion-buttons">
							{#each filter.filters.result as li}
								<Button>{li}</Button>
							{/each}
						</div>
					{/if}
				</Accordion>
			{/each}

			{#if Array.isArray(datasets)}
				{#each datasets as dataset}
					<Button href="/datasets/{dataset}">{dataset}</Button>
				{/each}
			{/if}
		</div>
		<div class="right-col">
			{#if Array.isArray(datasets)}
				{#each datasets as dataset}
					<BaseCard>
						<a href={`/datasets/${dataset.id}`} class="product-card">
							<div class="title">
								<Subtitle size="md">{dataset.title}</Subtitle>
							</div>
							<div class="metadata">
								<div class="notes">
									{#if dataset.notes}
										<Paragraph>{dataset.notes}</Paragraph>
									{/if}
								</div>
								<div class="facts">
									{#if dataset.license_title}
										<Fact title="License" text={String(dataset.license_title)}></Fact>
									{/if}
									{#if dataset.resources && Array.isArray(dataset.resources)}
										{@const formats = Array.from(
											new Set(dataset.resources.map((resource) => resource.format))
										)}
										<Fact title="Format" text={String(formats.join(', '))}></Fact>
									{/if}
								</div>
							</div>
						</a>
					</BaseCard>
				{/each}
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
		overflow: hidden;
		gap: 1rem;
		color: var(--text);
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
	}
	.facts {
		display: flex;
		gap: 1rem;
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.product-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-decoration: none;
		border: 1px solid var(--border);
		border-radius: 0.35rem;
		padding: 1rem;
	}
	.product-card:visited {
		border: 1px solid var(--border-muted);
	}
</style>
