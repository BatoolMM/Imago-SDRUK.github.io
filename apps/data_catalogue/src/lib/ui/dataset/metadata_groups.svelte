<script lang="ts">
	import { enhance } from '$app/forms'
	import { getDataset } from '$lib/context/dataset.svelte'
	import { handleEnhance } from '$lib/utils/forms'
	import { fuzzy } from '@arturoguzman/art-ui'
	import { Subtitle, Button, Paragraph, Input, Text, Notice } from '@imago/ui'
	import type { CkanGroup } from '$lib/types/ckan'
	const ctx = getDataset()
	let { groups = [] }: { groups?: (CkanGroup | string)[] } = $props()
	let search = $state('')
	let search_results = $derived(
		groups
			.filter(() => search !== '')
			.filter((group) => typeof group !== 'string')
			.filter((group) => !ctx.dataset.groups.find((_group) => group.id === _group.id))
			.filter((group) => fuzzy(search, group.display_name))
	)
</script>

<div class="field-header">
	<Subtitle size="lg">Metadata groups</Subtitle>
</div>
<form
	action="?/add_group"
	method="POST"
	use:enhance={handleEnhance({
		onsuccess: () => {
			search = ''
		}
	})}
>
	<input type="hidden" value={ctx.dataset.id} name="dataset_id" />
	<div class="fields">
		<div class="search">
			<Input label="Search">
				<Text
					onkeydown={(e) => {
						if (e.key === ',') {
							e.preventDefault()
						}
					}}
					bind:value={search}
				></Text>
			</Input>

			{#if search !== ''}
				<div class="search-results">
					{#each search_results as group (group)}
						{#if typeof group !== 'string'}
							<input type="hidden" value={group?.id} name="group_id" />
							<div class="group">
								<Button>
									<Paragraph>{group.display_name}</Paragraph>
								</Button>
							</div>
						{/if}
					{/each}
					{#if search_results.length === 0}
						<Notice level="info">
							<Paragraph>Group {search} doesn't exist.</Paragraph>
						</Notice>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</form>

<div class="group">
	{#each ctx.dataset.groups as group (group)}
		<form
			action="?/remove_group"
			method="POST"
			use:enhance={handleEnhance({
				onsuccess: () => {
					search = ''
				}
			})}
		>
			<div class="group">
				<input type="hidden" value={ctx.dataset.id} name="dataset_id" />
				<input type="hidden" value={group?.id} name="group_id" />
				<Button hover_label={`Click to delete ${group.display_name}`} style="tag">
					<Paragraph>{group.display_name}</Paragraph>
				</Button>
			</div>
		</form>
	{/each}
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.fields {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.field-header {
		display: flex;
		justify-content: space-between;
	}
	.group {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.search-results {
		padding: 1rem;
		display: flex;
		gap: 0.5rem;
		background-color: var(--background);
		border-radius: 0 0 var(--radius) var(--radius);
		flex-wrap: wrap;
	}
	.group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
