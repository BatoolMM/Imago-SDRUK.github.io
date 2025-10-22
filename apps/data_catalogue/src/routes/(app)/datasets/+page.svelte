<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte.js'
	import { jstr } from '@arturoguzman/art-ui'
	import { BaseCard, BaseSection, Button, Icon, Paragraph, Subtitle } from '@imago/ui'
	import Notes from '$lib/ui/text/notes.svelte'
	import { page } from '$app/state'
	import Filters from '$lib/ui/dataset/filters.svelte'

	let { data } = $props()
	let datasets = $derived(data.data.result)
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
				{#each datasets as dataset}
					<BaseCard>
						<div class="product-card">
							<a href={`/datasets/${dataset.name}`} class="title">
								<Subtitle weight={600} current_colour size="md">{dataset.title}</Subtitle>
							</a>
							<div class="metadata">
								<div class="notes">
									{#if dataset.notes}
										<Notes note={String(dataset.notes)} trim={200}></Notes>
									{/if}
								</div>
								<div class="footer">
									<div class="facts">
										{#if dataset.resources && Array.isArray(dataset.resources)}
											{@const formats = Array.from(
												new Set(dataset.resources.map((resource) => resource.format))
											)}

											<Paragraph size="xs"
												>{formats.length === 1 ? 'Format' : 'Formats'}: {String(
													formats.join(', ')
												)}</Paragraph
											>
										{/if}
										{#if dataset.license_title}
											<Paragraph size="xs">License: {String(dataset.license_title)}</Paragraph>
										{/if}
									</div>
									<Button href={`/datasets/${dataset.name}`}>
										See more
										<Icon icon={{ icon: 'arrow-narrow-right', set: 'tabler' }}></Icon>
									</Button>
								</div>
							</div>
						</div>
					</BaseCard>
				{/each}
			{/if}
			<div class="footer">
				{#if page.url.searchParams.get('offset')}
					{@const offset = Number(page.url.searchParams.get('offset'))}
					<!-- HACK: replace fixed dataset with fn to strip required searchparams -->
					<Button href={offset - 10 <= 0 ? '/datasets' : `?offset=${offset - 10}`}>
						<Icon icon={{ icon: 'arrow-narrow-left', set: 'tabler' }}></Icon>
					</Button>
					<div class="page-count">
						<Paragraph>
							Page {(offset / 10 + 1).toFixed(0)} of
							{(Number(data.datasets_count) / 10).toFixed(0)}
						</Paragraph>
					</div>
					<Button href={`?offset=${offset + 10}`}>
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
						<Button href={`?offset=10`}>
							<Icon icon={{ icon: 'arrow-narrow-right', set: 'tabler' }}></Icon>
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</BaseSection>

{#if debug.status}
	<pre>{jstr(data.licenses)}</pre>
{/if}

<style>
	.datasets-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 4fr);
		overflow: hidden;
		gap: 1rem;
		color: var(--text);
	}

	.facts {
		display: flex;
		flex-direction: column;
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
		/* border: 1px solid var(--border); */
		border-radius: 0.35rem;
		padding: 1rem;
	}
	/* .product-card:visited { */
	/* 	border: 1px solid var(--border-muted); */
	/* } */
	.title {
		background-color: var(--quinary);
		padding: 0.5rem;
		border-radius: 0.35rem;
		color: var(--tertiary);
	}
	.title:visited {
		background-color: var(--quinary-muted);
	}
	.notes {
		padding-bottom: 2rem;
	}
	.metadata .footer {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
	}
	.right-col > .footer {
		display: flex;
		justify-content: space-between;
	}
	.button-wrapper {
		grid-column: 3/4;
	}
</style>
