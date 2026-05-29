<script lang="ts">
	import type { Tag, Vocabulary } from '$lib/server/entities/models/datasets'
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { getDataset } from '$lib/context/dataset.svelte'
	import { handleEnhance } from '$lib/utils/forms'
	import { fuzzy } from '@arturoguzman/art-ui'
	import { Subtitle, Button, Paragraph, Input, Text, Icon, Notice, Select } from '@imago/ui'
	import slugify from '@sindresorhus/slugify'
	import { toggleDialog } from '$lib/utils/ui'
	import Dialog from '../cards/dialog.svelte'
	const ctx = getDataset()
	let {
		existing_tags,
		vocabularies
	}: { existing_tags: (Tag | string)[]; vocabularies: Vocabulary[] } = $props()
	let search = $state('')
	let search_results = $derived(
		existing_tags
			.filter(() => search !== '')
			.filter((tag) => typeof tag !== 'string')
			.filter((tag) => !ctx.dataset.tags.find((_tag) => tag.id === _tag.id))
			.filter((tag) => fuzzy(search, tag.display_name))
	)
</script>

<div class="field-header">
	<Subtitle size="lg">Tags</Subtitle>
	<div class="wrapper"></div>
</div>
<div class="fields">
	<div class="search">
		<Input label="Search or add a tag">
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
				{#each search_results as tag (tag)}
					{#if typeof tag !== 'string'}
						<form
							action="?/add_tag"
							method="POST"
							use:enhance={handleEnhance({
								onsuccess: () => {
									search = ''
								}
							})}
						>
							<input type="hidden" name="dataset_id" value={ctx.dataset.id} />
							<input type="hidden" name="tag" value={tag.name} />
							<input
								type="hidden"
								name="vocabulary_id"
								value={vocabularies.find((voc) => voc.id === tag?.vocabulary_id)?.name}
							/>
							<div class="tag">
								<Button>
									<Paragraph
										>{tag.display_name} - {vocabularies.find((voc) => voc.id === tag?.vocabulary_id)
											?.name}</Paragraph
									>
								</Button>
							</div>
						</form>
					{/if}
				{/each}
				<input type="hidden" name="tag" value={search} />
				<Button
					onclick={() => {
						toggleDialog('add-tag')
					}}
				>
					<Icon icon={{ icon: 'plus', set: 'tabler', size: 'lg' }}></Icon>
					<Paragraph>{search}</Paragraph>
				</Button>

				{#if search_results.length === 0}
					{#if ctx.dataset.tags.find((tag) => tag.name === slugify(search))}
						<Notice level="info">
							<Paragraph>Tag {search} has already been added to the dataset.</Paragraph>
						</Notice>
					{/if}
				{/if}
			</div>
		{/if}
	</div>
</div>

<div class="tags">
	{#each ctx.dataset.tags as tag (tag)}
		<div class="existing-tag">
			<Paragraph
				>{tag.display_name} - {vocabularies.find((voc) => voc.id === tag?.vocabulary_id)
					?.name}</Paragraph
			>
			<div class="buttons">
				<form
					action="?/remove_tag"
					method="POST"
					use:enhance={handleEnhance({
						onsuccess: () => {
							search = ''
							invalidateAll()
						}
					})}
				>
					<input type="hidden" name="dataset_id" value={ctx.dataset.id} />
					<input type="hidden" hidden value={tag.display_name} name="tag" />
					<input
						type="hidden"
						name="vocabulary_id"
						value={vocabularies.find((voc) => voc.id === tag?.vocabulary_id)?.name}
					/>
					<Button hover_label={`Click to remove from dataset`} style="tag">
						<Icon icon={{ icon: 'x', set: 'tabler' }}></Icon>
					</Button>
				</form>

				<Button
					style="tag"
					hover_label={`Click to delete`}
					onclick={() => {
						toggleDialog(`delete-tag-${tag.id}`)
					}}
				>
					<Icon icon={{ icon: 'trash', set: 'tabler' }}></Icon>
				</Button>
				<Dialog id="delete-tag-{tag.id}">
					<form
						action="?/delete_tag"
						method="POST"
						use:enhance={handleEnhance({
							onsuccess: () => {
								search = ''
								invalidateAll()
							}
						})}
					>
						<input type="hidden" hidden value={tag.id} name="tag_id" />
						<input
							type="hidden"
							name="vocabulary_id"
							value={vocabularies.find((voc) => voc.id === tag?.vocabulary_id)?.name}
						/>
						<Subtitle>Are you sure you want to delete this tag for all datasets?</Subtitle>
						<div class="buttons">
							<Button
								type="button"
								onclick={() => {
									toggleDialog(`delete-tag-${tag.id}`)
								}}>Cancel</Button
							>
							<Button>Delete</Button>
						</div>
					</form>
				</Dialog>
			</div>
		</div>
	{/each}
</div>

<Dialog id="add-tag">
	<form
		action="?/add_tag"
		method="POST"
		use:enhance={handleEnhance({
			onsuccess: () => {
				toggleDialog('add-tag')
			}
		})}
	>
		<input type="hidden" name="dataset_id" value={ctx.dataset.id} />
		<Input label="Vocabulary" required>
			<Select
				name="vocabulary_id"
				same_width
				required
				options={vocabularies.map((voc) => ({ label: voc.name, value: voc.id }))}
			></Select>
		</Input>
		<Input label="Tag" required>
			<Text bind:value={search} name="tag" required></Text>
		</Input>
		<div class="buttons">
			<Button
				type="button"
				onclick={() => {
					toggleDialog('add-tag')
				}}
			>
				<Paragraph>Cancel</Paragraph>
			</Button>
			<Button>
				<Paragraph>Create</Paragraph>
			</Button>
		</div>
	</form>
</Dialog>

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
	.tag {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.existing-tag {
		display: flex;
		align-items: center;
		gap: 2rem;
		width: 100%;
		border: 1px solid var(--border-muted);
		padding: 0.5rem 1rem;
		border-radius: var(--radius);
	}
	.search-results {
		padding: 1rem;
		display: flex;
		gap: 0.5rem;
		background-color: var(--background);
		border-radius: 0 0 var(--radius) var(--radius);
		flex-wrap: wrap;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
</style>
