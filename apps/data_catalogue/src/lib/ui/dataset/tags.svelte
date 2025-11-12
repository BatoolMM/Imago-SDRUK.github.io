<script lang="ts">
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { getDataset } from '$lib/context/dataset.svelte'
	import { notify } from '$lib/stores/notify'
	import type { CkanTag } from '$lib/types/ckan'
	import { fuzzy, getId, jstr } from '@arturoguzman/art-ui'
	import { Subtitle, Button, Paragraph, Input, Text, Icon } from '@imago/ui'
	const ctx = getDataset()
	let { existing_tags }: { existing_tags: CkanTag[] } = $props()
	let tags: { display_name: string; id: string }[] = $state([])
	let search = $state('')
	let search_results = $derived(
		existing_tags
			.filter(() => search !== '')
			.filter((tag) => !ctx.dataset.tags.find((_tag) => tag.id === _tag.id))
			.filter((tag) => fuzzy(search, tag.display_name))
	)
	const handleCreateTag = (name: string) => {
		ctx.dataset.tags.push({
			display_name: name,
			state: 'active',
			name,
			vocabulary_id: null
		})
	}
</script>

<div class="field-header">
	<Subtitle size="lg">Tags</Subtitle>
	<div class="wrapper">
		<!-- <Button -->
		<!-- 	type="button" -->
		<!-- 	onclick={() => { -->
		<!-- 		tags.push({ display_name: '', id: getId() }) -->
		<!-- 	}} -->
		<!-- > -->
		<!-- 	<Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon> -->
		<!-- </Button> -->
	</div>
</div>
<form
	action="?/save_tags"
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if ('data' in result) {
				notify.send(String(result.data?.message))
			}
			search = ''
			invalidateAll()
		}
	}}
>
	<div class="fields">
		<input type="text" value={JSON.stringify(ctx.dataset.tags)} hidden name="tags" />
		<div class="search">
			<Input label="Search or add a tag">
				<Text
					onkeydown={(e) => {
						if (e.key === ',') {
							e.preventDefault()
						}
						if (e.key === 'Enter') {
							e.preventDefault()
							if (search_results.length === 1) {
								ctx.dataset.tags.push(search_results[0])
								return
							}
							handleCreateTag(search)
							search = ''
						}
					}}
					bind:value={search}
				></Text>
			</Input>

			{#if search !== ''}
				<div class="search-results">
					{#each search_results as tag, index (tag)}
						<div class="tag">
							<Button
								type="button"
								onclick={() => {
									ctx.dataset.tags.push(tag)
								}}
							>
								<Paragraph>{tag.display_name}</Paragraph>
							</Button>
						</div>
					{/each}
					{#if search_results.length === 0}
						<Button
							type="button"
							onclick={() => {
								handleCreateTag(search)
								search = ''
							}}
						>
							<Icon icon={{ icon: 'plus', set: 'tabler', size: 'lg' }}></Icon>
							<Paragraph>{search}</Paragraph>
						</Button>
					{/if}
				</div>
			{/if}
		</div>
		<div class="tags">
			{#each ctx.dataset.tags as tag, index (tag)}
				<div class="tag">
					<Button
						hover_label={`Click to delete ${tag.display_name}`}
						style="tag"
						type="button"
						onclick={() => {
							ctx.dataset.tags = [
								...ctx.dataset.tags.slice(0, index),
								...ctx.dataset.tags.slice(index + 1)
							]
						}}
					>
						<Paragraph>{tag.display_name}</Paragraph>
					</Button>
				</div>
			{/each}
		</div>
	</div>
	<div class="buttons">
		<Button
			type="button"
			onclick={() => {
				invalidateAll()
			}}
			style="alt">Cancel</Button
		>
		<Button style="alt">Save</Button>
	</div>
</form>

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
	.search-results {
		padding: 1rem;
		display: flex;
		gap: 0.5rem;
		background-color: var(--background);
		border-radius: 0 0 var(--radius) var(--radius);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
