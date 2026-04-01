<script lang="ts">
	import { type IColumnConfig } from '@svar-ui/svelte-grid'
	import { applyAction, enhance } from '$app/forms'
	import { debug } from '$lib/globals/dev.svelte.js'
	import { capitalise, jstr } from '@arturoguzman/art-ui'
	import {
		ActionBar,
		Button,
		handleSearchParams,
		Icon,
		Input,
		Paragraph,
		SectionEdit,
		Subtitle,
		Text,
		Textarea,
		Title
	} from '@imago/ui'
	import type { Relationship } from '@ory/client-fetch'
	import { onMount } from 'svelte'
	import Dialog from '$lib/ui/cards/dialog.svelte'
	import { toggleDialog } from '$lib/utils/ui/index.js'
	import { notify } from '$lib/stores/notify.js'
	import BaseTable from '$lib/ui/tables/base_table.svelte'
	import type { CkanGroup } from '$lib/types/ckan/index.js'
	import CellText from '$lib/ui/tables/cell_text.svelte'
	import { page } from '$app/state'
	import CellEditor from '$lib/ui/tables/cell_editor.svelte'
	import CellDate from '$lib/ui/tables/cell_date.svelte'
	import CellGroupToUser from '$lib/ui/tables/cell_group_to_user.svelte'
	import { DateTime } from 'luxon'

	let { data } = $props()
	let delete_group = $state('')
	const auth_groups = $derived(
		data.auth_groups.relation_tuples?.reduce(
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
	)
	onMount(() => {
		debug.data = data
	})
	let auth_groups_columns: (IColumnConfig & { id: keyof Relationship })[] = [
		// {
		// 	id: 'namespace',
		// 	header: 'Namespace',
		// 	cell: CellText
		// },
		// {
		// 	id: 'object',
		// 	header: 'Object',
		// 	cell: CellEditorGroup
		// },
		{
			id: 'relation',
			header: 'Relation',
			cell: CellText
		},
		{
			id: 'subject_id',
			header: 'Subject ID',
			cell: CellGroupToUser,
			width: 400
		}
	]
	let ckan_groups_columns: (IColumnConfig & { id: keyof CkanGroup })[] = [
		{
			id: 'title',
			header: 'Title',
			cell: CellEditor
		},
		{
			id: 'description',
			header: 'Description',
			cell: CellText
		},
		{
			id: 'created',
			header: 'Created at',
			cell: CellDate,
			width: 400
		}
	]

	let ckan_groups_selected = $derived(
		data.ckan_groups.result?.findIndex((group) => group.id === page.url.searchParams.get('edit')) ??
			-1
	)

	let ory_groups_selected = $derived(
		auth_groups &&
			page.url.searchParams.get('group') &&
			String(page.url.searchParams.get('group')) in auth_groups
			? auth_groups[String(page.url.searchParams.get('group'))]
			: undefined
	)
	let edit = $state(false)
</script>

<Title>Groups</Title>
<div class="tables">
	<SectionEdit open={ckan_groups_selected !== -1 ? true : undefined}>
		{#snippet leftCol()}
			<ActionBar>
				{#snippet left()}
					<Subtitle>CKAN</Subtitle>
				{/snippet}
				{#snippet right()}
					<Button
						width="auto"
						onclick={() => {
							toggleDialog('add-group')
						}}
					>
						<Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon>
					</Button>
				{/snippet}
			</ActionBar>
			<div class="groups">
				<BaseTable data={data.ckan_groups.result} columns={ckan_groups_columns}></BaseTable>
			</div>
		{/snippet}
		{#snippet rightCol()}
			<div class="edit">
				{#if data.ckan_groups.result[ckan_groups_selected]}
					<ActionBar>
						{#snippet left()}
							<Button width="auto" href={page.url.pathname}>
								<Icon icon={{ icon: 'arrow-narrow-left', set: 'tabler' }} />
							</Button>
						{/snippet}
						{#snippet right()}
							<Button
								width="auto"
								onclick={() => {
									delete_group = group.id
									toggleDialog('delete-group')
								}}
							>
								<Icon icon={{ icon: 'trash', set: 'tabler' }} />
							</Button>
						{/snippet}
					</ActionBar>
					{@const group = data.ckan_groups.result[ckan_groups_selected]}
					<ActionBar>
						{#snippet left()}
							<Subtitle>{group.title}</Subtitle>
						{/snippet}
						{#snippet right()}
							<Button
								active={edit}
								onclick={() => {
									edit = !edit
								}}
							>
								<Icon icon={{ icon: 'edit', set: 'tabler' }} />
							</Button>
						{/snippet}
					</ActionBar>
					{#if !edit}
						<div class="card">
							<Paragraph>Title: {group.title}</Paragraph>
							<Paragraph
								>Created at: {DateTime.fromISO(group.created)
									.setLocale('en-gb')
									.toLocaleString(DateTime.DATETIME_MED)}</Paragraph
							>
							<Paragraph>Description: {group.description}</Paragraph>
						</div>
					{/if}
					{#if edit}
						<div class="card">
							<form action="?/edit" method="post" use:enhance>
								<Input label="Title">
									<Text value={group.title}></Text>
								</Input>
								{#key group}
									<Input label="Description">
										<Textarea name="description" bind:value={group.description}></Textarea>
									</Input>
								{/key}
								<div class="buttons">
									<Button
										type="button"
										onclick={() => {
											edit = false
										}}>Cancel</Button
									>
									<Button>Save</Button>
								</div>
							</form>
						</div>
					{/if}
				{/if}
			</div>
		{/snippet}
	</SectionEdit>

	<SectionEdit open={ory_groups_selected ? true : undefined}>
		{#snippet leftCol()}
			<Subtitle>Auth groups</Subtitle>
			{#if auth_groups}
				<div class="groups">
					{#each Object.entries(auth_groups) as [group, relations]}
						<!-- <Button -->
						<!-- 	active={page.url.searchParams.get('group') === group} -->
						<!-- 	href={handleSearchParams({ -->
						<!-- 		toggle: [{ key: 'group', value: group }], -->
						<!-- 		url: page.url -->
						<!-- 	})} -->
						<!-- > -->
						<Subtitle>{capitalise(group)}</Subtitle>
						<!-- </Button> -->
						<BaseTable data={relations} columns={auth_groups_columns}></BaseTable>
					{/each}
					{#if data.auth_groups.next_page_token}
						<Button
							href={handleSearchParams({
								add: [{ key: 'page_token', value: data.auth_groups.next_page_token, set: true }],
								url: page.url
							})}>Next</Button
						>
					{/if}
				</div>
			{/if}
		{/snippet}
		{#snippet rightCol()}
			{#if ory_groups_selected}
				<div class="edit">
					<pre>{jstr(ory_groups_selected)}</pre>
				</div>
			{/if}
		{/snippet}
	</SectionEdit>
</div>

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
	.tables {
		display: grid;
		gap: 2rem;
		padding: 0 1rem;
	}

	.groups {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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
