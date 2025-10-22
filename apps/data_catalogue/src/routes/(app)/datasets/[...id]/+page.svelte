<script lang="ts">
	import { DateTime } from 'luxon'
	import { debug } from '$lib/globals/dev.svelte'
	import { capitalise, jstr } from '@arturoguzman/art-ui'
	import { Accordion, BaseSection, Button, Fact, Icon, Paragraph, Subtitle } from '@imago/ui'
	import Product from '$lib/ui/products/product.svelte'
	let { data } = $props()
	let result = $derived(data.result)
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
								<Subtitle>Author</Subtitle>
								<Icon icon={{ icon: open ? 'chevron-down' : 'chevron-right', set: 'tabler' }}
								></Icon>
							</button>
						{/snippet}

						{#if result.author}
							<Fact size="xs" text={String(result.author)}></Fact>
						{/if}
						<!-- <Fact text={String(jstr(result.organization))}></Fact> -->
						{#if result.organization}
							<Fact size="xs" title="Organisation" text={result.organization.title}></Fact>
							<!-- <Fact size="xs" text={result.organization.description}></Fact> -->
						{/if}
					</Accordion>
					<Accordion default_open>
						{#snippet title({ open, toggleOpen })}
							<button
								class="trigger-button"
								onclick={() => {
									toggleOpen()
								}}
							>
								<Subtitle>License</Subtitle>
								<Icon icon={{ icon: open ? 'chevron-down' : 'chevron-right', set: 'tabler' }}
								></Icon>
							</button>
						{/snippet}
						{#if result.license_url}
							<Button style="clean" href={String(result.license_url)}>{result.license_title}</Button
							>
						{:else}
							<Paragraph>{result.license_title}</Paragraph>
						{/if}
					</Accordion>
					<Accordion default_open>
						{#snippet title({ open, toggleOpen })}
							<button
								class="trigger-button"
								onclick={() => {
									toggleOpen()
								}}
							>
								<Subtitle>Metadata</Subtitle>
								<Icon icon={{ icon: open ? 'chevron-down' : 'chevron-right', set: 'tabler' }}
								></Icon>
							</button>
						{/snippet}
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
					</Accordion>
					<!-- {#each Object.entries(result) as [key, value]} -->
					<!-- 	<Fact title={key} text={String(value)}></Fact> -->
					<!-- {/each} -->
				</div>
				<div class="right-col">
					<Product result={data.result}></Product>
				</div>
			</div>
		</BaseSection>
	{/if}

	{#if debug.status}
		<pre>{jstr(data)}</pre>
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
</style>
