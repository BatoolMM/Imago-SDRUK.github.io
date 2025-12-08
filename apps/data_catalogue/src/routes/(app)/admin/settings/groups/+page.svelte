<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { debug } from '$lib/globals/dev.svelte.js'
	import { capitalise, jstr } from '@arturoguzman/art-ui'
	import {
		Accordion,
		BaseCard,
		BaseSection,
		Button,
		Icon,
		Input,
		Paragraph,
		Subtitle,
		Text,
		Textarea
	} from '@imago/ui'
	import type { Relationship } from '@ory/client-fetch'
	import { onMount } from 'svelte'
	import Dialog from '$lib/ui/cards/dialog.svelte'
	import { toggleDialog } from '$lib/utils/ui/index.js'
	import { notify } from '$lib/stores/notify.js'

	let { data } = $props()
	let delete_group = $state('')
	const auth_groups = data.auth_groups.relation_tuples?.reduce(
		(acc, relation) => {
			if (relation.object in acc) {
				acc[relation.object].push(relation)
				return acc
			}

			acc[relation.object] = [relation]
			return acc
		},
		{} as { [k: string]: Relationship[] }
	)
	onMount(() => {
		debug.data = data
	})
</script>

<BaseSection>
	<div class="page">
		<div class="ckan-groups">
			<div class="subtitle-bar">
				<Subtitle size="lg">CKAN groups</Subtitle>
				<Button
					onclick={() => {
						toggleDialog('add-group')
					}}
				>
					<Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon>
				</Button>
			</div>
			<div class="groups">
				<div class="cards">
					{#each data.ckan_groups.result as group}
						<BaseCard border rounded>
							<Accordion>
								{#snippet title()}
									<Subtitle>{group.title}</Subtitle>
								{/snippet}
								{#snippet buttons({ open, toggleOpen })}
									<Button
										active={open}
										onclick={() => {
											toggleOpen()
										}}
										><Icon icon={{ icon: open ? 'chevron-down' : 'chevron-right', set: 'tabler' }}
										></Icon></Button
									>
								{/snippet}
								<div class="card">
									{#each Object.entries(group) as [key, value]}
										<Paragraph>{capitalise(key.replaceAll('_', ' '))}: {value}</Paragraph>
									{/each}
									<Button
										onclick={() => {
											delete_group = group.id
											toggleDialog('delete-group')
										}}
									>
										<Icon icon={{ icon: 'trash', set: 'tabler' }} />
									</Button>
								</div>
							</Accordion>
						</BaseCard>
					{/each}
				</div>
			</div>
		</div>
		<div class="auth-groups">
			<Subtitle size="lg">Auth groups</Subtitle>
			{#if auth_groups}
				<div class="groups">
					{#each Object.entries(auth_groups) as [group, relations]}
						<Subtitle>{capitalise(group)}</Subtitle>
						<div class="cards">
							{#each relations as relation}
								<BaseCard border rounded>
									<div class="card">
										<!-- <Paragraph>{relation.namespace}</Paragraph> -->
										<Paragraph>{relation.relation}: {relation.subject_id}</Paragraph>
										<!-- <form action="?/delete" method="POST" use:enhance> -->
										<!-- 	<Input label="Relation"> -->
										<!-- 		<Text name="relation" value={JSON.stringify(relation)}></Text> -->
										<!-- 	</Input> -->
										<!-- 	<Button>Delete</Button> -->
										<!-- </form> -->
									</div>
								</BaseCard>
							{/each}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</BaseSection>

<Dialog id="delete-group">
	<Subtitle>Are you sure you want to delete this group?</Subtitle>
	<div class="buttons">
		<Button
			onclick={() => {
				delete_group = ''
				toggleDialog('delete-group')
			}}
		>
			Cancel
		</Button>
		<form
			action="?/delete"
			method="post"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'error') {
						console.log(result)
						notify.send({ message: result.error.message })
					}
					if ('data' in result && result.data) {
						if ('errors' in result.data) {
							notify.send(String(jstr(result.data.errors)))
						}
						if ('message' in result.data) {
							notify.send(String(result.data.message))
						}
					}
					if (result.type === 'redirect') {
						applyAction(result)
					}
					update({ reset: true, invalidateAll: true })
					delete_group = ''
					toggleDialog('delete-group')
				}
			}}
		>
			<input name="id" type="text" value={delete_group} hidden />
			<Button>Delete</Button>
		</form>
	</div>
</Dialog>
<Dialog id="add-group">
	<form
		action="?/create"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'error') {
					console.log(result)
					notify.send({ message: result.error.message })
				}
				if ('data' in result && result.data) {
					if ('errors' in result.data) {
						notify.send(String(jstr(result.data.errors)))
					}
					if ('message' in result.data) {
						notify.send(String(result.data.message))
					}
				}
				if (result.type === 'redirect') {
					applyAction(result)
				}
				update({ reset: true, invalidateAll: true })
			}
		}}
	>
		<Subtitle>Add group</Subtitle>
		<div class="inputs">
			<Input label="Title">
				<Text name="display_name"></Text>
			</Input>
			<Input label="Description">
				<Textarea name="description"></Textarea>
			</Input>
		</div>
		<div class="buttons">
			<Button
				type="button"
				onclick={() => {
					toggleDialog('add-group')
				}}>Cancel</Button
			>
			<Button
				onclick={() => {
					toggleDialog('add-group')
				}}>Save</Button
			>
		</div>
	</form>
</Dialog>

<style>
	.page > * {
		margin-bottom: 1rem;
	}
	.ckan-groups,
	.auth-groups {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem;
	}
	.subtitle-bar {
		display: flex;
		justify-content: space-between;
	}
	.groups {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-auto-flow: row;
		gap: 1rem;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.5rem;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
