<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { page } from '$app/state'
	import { notify } from '$lib/stores/notify'
	import Dialog from '$lib/ui/cards/dialog.svelte'
	import { toggleDialog } from '$lib/utils/ui/index.js'
	import { jstr } from '@arturoguzman/art-ui'
	import { Button, Input, Paragraph, Select, Subtitle, Text } from '@imago/ui'
	let { data, children } = $props()
</script>

<div class="dataset-layout">
	<nav>
		{#each data.subroutes as { href, label }}
			<Button {href}>{label}</Button>
		{/each}

		{#if data.subroutes.length > 0}
			<Button
				onclick={() => {
					toggleDialog('dataset-delete')
				}}>Delete</Button
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
					if ('data' in result) {
						notify.send(String(result.data?.message))
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
