<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { page } from '$app/state'
	import { notify } from '$lib/stores/notify'
	import Dialog from '$lib/ui/cards/dialog.svelte'
	import { Button, Input, Paragraph, Select, Subtitle, Text } from '@imago/ui'
	let { data, children } = $props()
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
	{#if !page.params.id}
		<nav>
			{#if data.allow_create}
				<Button
					onclick={() => {
						toggleDialog('datasets-dialog')
					}}>Create</Button
				>
			{/if}
		</nav>
	{/if}
	<div class="dataset">
		{@render children()}
	</div>
</div>
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
			{#if Array.isArray(data.groups.result)}
				<Input required label="Group">
					<Select
						name="group"
						options={data.groups.result.map((result) => ({
							label: result.title,
							value: JSON.stringify({ id: result.id, name: result.name })
						}))}
					></Select>
				</Input>
			{/if}
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
