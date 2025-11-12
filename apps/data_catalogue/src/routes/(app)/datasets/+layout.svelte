<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { page } from '$app/state'
	import { notify } from '$lib/stores/notify'
	import Dialog from '$lib/ui/cards/dialog.svelte'
	import { Button, Input, Paragraph, Subtitle, Text } from '@imago/ui'
	let { children } = $props()
	const toggleDialog = (id: string) => {
		const dialog = document.getElementById(id) as HTMLDialogElement | null
		if (dialog) {
			if (!dialog.open) {
				dialog.showModal()
				return
			}
			dialog.close()
		}
	}
</script>

<div class="dataset-layout">
	<nav>
		{#if page.params.id}
			{@const url = `/datasets/${page.params.id}`}
			<Button active={page.url.pathname === url} href={url}>Preview</Button>
			<Button active={page.url.pathname === `${url}/edit`} href={`${url}/edit`}>Edit</Button>
			<Button
				onclick={() => {
					toggleDialog('dataset-delete')
				}}>Delete</Button
			>
		{/if}

		{#if !page.params.id}
			<Button
				onclick={() => {
					toggleDialog('datasets-dialog')
				}}>Create</Button
			>
		{/if}
	</nav>
	<div class="dataset">
		{@render children()}
	</div>
</div>
{#if page.params.id}
	<Dialog id="dataset-delete">
		<Subtitle size="md">Delete dataset</Subtitle>
		<Paragraph>Are you sure you want to delete this dataset?</Paragraph>
		<form
			action="/datasets?/delete"
			method="post"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'redirect') {
						notify.send(`Dataset successfully deleted`)
					}
					applyAction(result)
					toggleDialog('dataset-delete')
				}
			}}
		>
			<div class="fields">
				<input type="text" hidden value={page.params.id} name="id" />
			</div>
			<div class="buttons">
				<Button
					type="button"
					onclick={() => {
						toggleDialog('dataset-delete')
					}}>Cancel</Button
				>
				<Button>Delete</Button>
			</div>
		</form>
	</Dialog>
{/if}
<Dialog id="datasets-dialog">
	<Subtitle size="md">Create dataset</Subtitle>
	<form
		action="?/create"
		method="post"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'redirect') {
					notify.send(`Dataset successfully created`)
				}
				if ('data' in result) {
					notify.send(String(result.data?.message))
				}
				applyAction(result)
				toggleDialog('datasets-dialog')
			}
		}}
	>
		<div class="fields">
			<Input required label="Title">
				<Text required name="title"></Text>
			</Input>
			<Input required label="Name" information="This will be the URL of the dataset">
				<Text required name="name"></Text>
			</Input>
		</div>
		<div class="buttons">
			<Button
				type="button"
				onclick={() => {
					toggleDialog('datasets-dialog')
				}}>Cancel</Button
			>
			<Button>Create</Button>
		</div>
	</form>
</Dialog>

<style>
	nav {
		width: min(100lvw - 4rem, 1440px);
		margin-inline: auto;
		display: flex;
		justify-content: flex-end;
		padding: 1rem 2rem;
		gap: 1rem;
	}
	form {
		/* padding: 1rem; */
		display: grid;
		grid-auto-flow: row;
		gap: 1rem;
		width: 100%;
		overflow: hidden;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
</style>
