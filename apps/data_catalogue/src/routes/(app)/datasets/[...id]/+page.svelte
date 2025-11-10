<script lang="ts">
	import { DateTime } from 'luxon'
	import { debug } from '$lib/globals/dev.svelte'
	import { capitalise, jstr } from '@arturoguzman/art-ui'
	import { Accordion, BaseSection, Button, Fact, Icon, Paragraph, Subtitle } from '@imago/ui'
	import Product from '$lib/ui/products/product.svelte'
	import { getDataset, setDataset } from '$lib/context/dataset.svelte.js'
	let { data } = $props()
	setDataset(data.result)
	let result = getDataset()
	debug.data = data
</script>

<div class="page">
	{#if result}
		<BaseSection style="base">
			<div class="dataset-section">
				<div class="left-col">
					<Accordion default_open>
						{#snippet title({ open, toggleOpen })}
							<button
								class="trigger-button"
								onclick={() => {
									toggleOpen()
								}}
							>
								<Subtitle>Information</Subtitle>
								<Icon icon={{ icon: open ? 'chevron-down' : 'chevron-right', set: 'tabler' }}
								></Icon>
							</button>
						{/snippet}
						<div class="facts">
							{#if result.author}
								<Fact
									size="xs"
									title="Author"
									href={result.author_email ? `mailto:${result.author_email}` : null}
									text={String(result.author)}
								></Fact>
							{/if}
							{#if result.maintainer}
								<Fact
									size="xs"
									title="Maintainer"
									href={result.maintainer_email ? `mailto:${result.maintainer_email}` : null}
									text={String(result.maintainer)}
								></Fact>
							{/if}

							{#if result.license_title}
								<Fact
									title="License"
									href={result.license_url}
									size="xs"
									text={result.license_title}
								></Fact>
							{/if}

							{#if result.version}
								<Fact title="Version" size="xs" text={result.version}></Fact>
							{/if}
							<Fact size="xs" title="Type" text={capitalise(String(result.type))}></Fact>
							<Fact
								size="xs"
								title="Created"
								text={DateTime.fromISO(String(result.metadata_created)).toLocaleString(
									DateTime.DATETIME_FULL
								)}
							></Fact>
							<Fact
								size="xs"
								title="Modified"
								text={DateTime.fromISO(String(result.metadata_modified)).toLocaleString(
									DateTime.DATETIME_FULL
								)}
							></Fact>
							<Fact size="xs" title="Resources" text={String(result.num_resources)}></Fact>
							{#if result.tags && result.tags.length > 0}
								<Fact size="xs" title="Tags">
									<div class="tags">
										{#each result.tags as tag}
											<div class="button-wapper">
												<Button href={`/datasets?tags=${tag.name}`} style="clean"
													>{tag.display_name}</Button
												>
											</div>
										{/each}
									</div>
								</Fact>
							{/if}
						</div>
					</Accordion>
					{#if result.extras.length > 0}
						<Accordion default_open>
							{#snippet title({ open, toggleOpen })}
								<button
									class="trigger-button"
									onclick={() => {
										toggleOpen()
									}}
								>
									<Subtitle>Additional information</Subtitle>
									<Icon icon={{ icon: open ? 'chevron-down' : 'chevron-right', set: 'tabler' }}
									></Icon>
								</button>
							{/snippet}
							<div class="facts">
								{#each result.extras as extra}
									<Fact size="xs" title={extra.key} text={extra.value}></Fact>
								{/each}
							</div>
						</Accordion>

						<!-- {#each Object.entries(result) as [key, value]} -->
						<!-- 	<Fact title={key} text={String(value)}></Fact> -->
						<!-- {/each} -->
					{/if}
				</div>
				<div class="right-col">
					<Product result={data.result}></Product>
				</div>
			</div>
		</BaseSection>
	{/if}
</div>

<style>
	.page {
		color: var(--text);
	}
	.dataset-section {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
		grid-template-rows: minmax(0, 1fr);
		gap: 2rem;
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.trigger-button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--text);
		width: 100%;
	}
	.facts {
		display: grid;
		grid-auto-flow: row;
		gap: 1rem;
	}
	.tags {
		display: flex;
		gap: 1rem;
	}
</style>
