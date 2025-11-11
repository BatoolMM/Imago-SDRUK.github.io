<script lang="ts">
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { notify } from '$lib/stores/notify.js'
	import licenses from '$lib/utils/ckan/licenses.json'
	import {
		BaseSection,
		Button,
		Editor,
		Input,
		InputBlock,
		Select,
		Subtitle,
		Text,
		Textarea
	} from '@imago/ui'
	import Resources from '$lib/ui/dataset/resource/resources.svelte'
	import { getDataset, setDataset } from '$lib/context/dataset.svelte.js'
	import Extras from '$lib/ui/dataset/extras.svelte'
	import { debug } from '$lib/globals/dev.svelte.js'
	import Tags from '$lib/ui/dataset/tags.svelte'
	import { onMount } from 'svelte'

	let { data } = $props()
	setDataset(data.dataset.result)
	const ctx = getDataset()
	onMount(() => {
		debug.data = data
	})
	$effect(() => {
		console.log(`refreshing data from invalidate`)
		ctx.dataset = data.dataset.result
	})
</script>

{#if ctx.dataset && !Array.isArray(ctx.dataset)}
	<BaseSection>
		<div class="page">
			<div class="left-col">
				<div class="form">
					<Subtitle size="lg">Dataset information</Subtitle>
					<form
						action="?/update"
						method="POST"
						use:enhance={() => {
							return async ({ result }) => {
								if ('data' in result) {
									notify.send(String(result.data?.message))
								}
								invalidateAll()
							}
						}}
					>
						<div class="fields">
							<InputBlock design="row">
								<Input label="State">
									<Select name="state" bind:value={ctx.dataset.state}>
										<option value="draft">Draft</option>
										<option value="active">Published</option>
									</Select>
								</Input>

								<Input label="Visibility">
									<Select name="private" bind:value={ctx.dataset.private}>
										<option value={true}>Private</option>
										<option value={false}>Public</option>
									</Select>
								</Input>
							</InputBlock>

							<InputBlock>
								<Input label="Title" required>
									<Text name="title" bind:value={ctx.dataset.title} required></Text>
								</Input>
								<Input label="Description">
									<textarea name="notes" hidden bind:value={ctx.dataset.notes}></textarea>
									<Editor bind:content={ctx.dataset.notes}></Editor>
									<!-- <Textarea name="notes" bind:value={ctx.dataset.notes}></Textarea> -->
								</Input>
							</InputBlock>

							<InputBlock design="row">
								<Input label="Author">
									<Text name="author" bind:value={ctx.dataset.author}></Text>
								</Input>
								<Input label="Author email">
									<Text name="author_email" type="email" bind:value={ctx.dataset.author_email}
									></Text>
								</Input>
							</InputBlock>
							<InputBlock design="row">
								<Input label="Maintainer">
									<Text name="maintainer" bind:value={ctx.dataset.maintainer}></Text>
								</Input>
								<Input label="Maintainer email">
									<Text
										name="maintainer_email"
										type="email"
										bind:value={ctx.dataset.maintainer_email}
									></Text>
								</Input>
							</InputBlock>
							<InputBlock design="row">
								<Input label="License">
									<Select name="license_id" bind:value={ctx.dataset.license_id}>
										{#each licenses as license}
											<option value={license.id}>{license.title}</option>
										{/each}
									</Select>
								</Input>

								<Input label="Version">
									<Text name="version" bind:value={ctx.dataset.version}></Text>
								</Input>
							</InputBlock>
						</div>
						<div class="buttons">
							<Button style="alt">Save</Button>
						</div>
					</form>
				</div>
				<div class="form">
					<Extras></Extras>
				</div>
				<div class="form">
					<Tags existing_tags={data.tags.result}></Tags>
				</div>
			</div>
			<div class="right-col">
				<div class="form">
					<Subtitle size="lg">Resources</Subtitle>
					<Resources></Resources>
				</div>
			</div>
		</div>
	</BaseSection>
{/if}

<style>
	.page {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-flow: row;
		gap: 2rem;
	}
	.form {
		background-color: var(--background-muted);
		padding: 2rem;
		border-radius: var(--radius);
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	form {
		display: grid;
		grid-auto-flow: row;
		gap: 1rem;
	}
	.fields {
		display: grid;
		grid-auto-flow: row;
		gap: 1rem;
	}
	.left-col {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.buttons {
		display: flex;
		justify-content: flex-end;
	}
	@media (min-width: 1024px) {
		.page {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr);
		}
	}
</style>
