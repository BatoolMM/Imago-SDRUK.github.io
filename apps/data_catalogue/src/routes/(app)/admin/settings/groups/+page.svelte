<script lang="ts">
	import { type IColumnConfig } from '@svar-ui/svelte-grid'
	import type { Group } from '$lib/server/entities/models/groups.js'
	import { applyAction, enhance } from '$app/forms'
	import { debug } from '$lib/globals/dev.svelte.js'
	import { jstr } from '@arturoguzman/art-ui'
	import {
		ActionBar,
		Button,
		Checkbox,
		Icon,
		Input,
		Notice,
		Paragraph,
		SectionEdit,
		Select,
		Subtitle,
		Text,
		Textarea,
		Title
	} from '@imago/ui'
	import { onMount } from 'svelte'
	import Dialog from '$lib/ui/cards/dialog.svelte'
	import { toggleDialog } from '$lib/utils/ui/index.js'
	import { notify } from '$lib/stores/notify.js'
	import BaseTable from '$lib/ui/tables/base_table.svelte'
	import CellText from '$lib/ui/tables/cell_text.svelte'
	import { page } from '$app/state'
	import CellEditor from '$lib/ui/tables/cell_editor.svelte'
	import { handleEnhance } from '$lib/utils/forms'
	import type { PermissionRequest } from '$lib/server/entities/models/permissions'
	import CardBlock from '$lib/ui/cards/card_block.svelte'
	import Facts from '$lib/ui/cards/facts.svelte'
	import {
		togglePermission,
		toggleSettingsPermission
	} from '$lib/remotes/permissions/update.remote'
	import { invalidateAll } from '$app/navigation'
	import { toggleAutoEnroll } from '$lib/remotes/groups/update.remote.js'

	let { data } = $props()
	let delete_group = $state('')

	onMount(() => {
		debug.data = data
	})

	let columns: (IColumnConfig & { id: keyof Group })[] = [
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
			id: 'created_at',
			header: 'Created at',
			cell: CellText,
			width: 400
		},
		{
			id: 'updated_at',
			header: 'Updated at',
			cell: CellText,
			width: 400
		}
	]

	let selected = $derived(
		data.groups.findIndex((group) => group.id === page.url.searchParams.get('edit')) ?? -1
	)

	let edit = $state(false)
	let selected_user = $state('')
	let selected_user_delete = $state('')
	let search_results = $state([])
	let available_users = $derived(
		search_results.filter((au) => !data.group_users.find((gu) => gu.id === au.id))
	)
	const available_actions = (
		actor: PermissionRequest['actor']
	): (PermissionRequest & { id: string })[] => [
		{
			id: '65678111-ba51-45dd-ba98-ff54b98fc2ed',
			namespace: 'Action',
			relation: 'groups',
			object: 'permissions',
			actor
		},
		{
			id: 'df15c06c-f8ed-4a9d-9837-9cdd1f2bed14',
			namespace: 'Action',
			relation: 'groups',
			object: 'users',
			actor
		},
		{
			id: '2f826f94-6c62-4ccf-9f0a-5d117d5119b9',
			namespace: 'Action',
			relation: 'groups',
			object: 'groups',
			actor
		},
		{
			id: '32d95b70-3342-499c-a99a-03c99e8735dd',
			namespace: 'Action',
			relation: 'groups',
			object: 'datasets',
			actor
		},
		{
			id: '909ba0d7-7bdb-4855-a410-70a18519d379',
			namespace: 'Action',
			relation: 'groups',
			object: 'answers',
			actor
		},
		{
			id: 'ea9b86b4-48d5-45f8-b7c1-41ff68b256f2',
			namespace: 'Action',
			relation: 'groups',
			object: 'questions',
			actor
		}
	]
	const available_settings = (
		actor: PermissionRequest['actor']
	): (PermissionRequest & { id: string })[] => [
		{
			id: 'f342d080-bbbf-41b9-8a7e-7060749ea1ed',
			namespace: 'Application',
			relation: 'admins',
			object: 'dashboard',
			actor
		},
		{
			id: 'a9f32522-5f6d-45cb-b303-74bc491065f3',
			namespace: 'Application',
			relation: 'admins',
			object: 'datasets',
			actor
		},
		{
			id: 'bd45c009-510d-4517-a2c7-673f018660a3',
			namespace: 'Application',
			relation: 'admins',
			object: 'groups',
			actor
		},
		{
			id: '7d962b89-7632-4096-8cea-aeef9d7c59ce',
			namespace: 'Application',
			relation: 'admins',
			object: 'permissions',
			actor
		},
		{
			id: '7cf673bd-f794-4de8-8e21-8696dee49ca9',
			namespace: 'Application',
			relation: 'admins',
			object: 'registration',
			actor
		},
		{
			id: '1694ecb4-b06e-4457-9ab9-e0684f9d0f33',
			namespace: 'Application',
			relation: 'admins',
			object: 'users',
			actor
		}
	]
</script>

<Title>Groups</Title>
<div class="tables">
	<SectionEdit open={selected !== -1 ? true : undefined}>
		{#snippet leftCol()}
			<ActionBar>
				{#snippet right()}
					{#if data.allow_manage}
						<Button
							width="auto"
							onclick={() => {
								toggleDialog('add-group')
							}}
						>
							<Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon>
						</Button>
					{/if}
				{/snippet}
			</ActionBar>
			<div class="groups">
				<BaseTable data={data.groups} {columns}></BaseTable>
			</div>
		{/snippet}
		{#snippet rightCol()}
			<div class="edit">
				{#if data.group}
					{@const group = data.group}
					<ActionBar>
						{#snippet left()}
							<Button width="auto" href={page.url.pathname}>
								<Icon icon={{ icon: 'arrow-narrow-left', set: 'tabler' }} />
							</Button>
						{/snippet}
						{#snippet right()}
							{#if data.allow_manage}
								<Button
									width="auto"
									onclick={() => {
										delete_group = group.id
										toggleDialog('delete-group')
									}}
								>
									<Icon icon={{ icon: 'trash', set: 'tabler' }} />
								</Button>
								<Button
									active={edit}
									onclick={() => {
										edit = !edit
									}}
								>
									<Icon icon={{ icon: 'edit', set: 'tabler' }} />
								</Button>
							{/if}
						{/snippet}
					</ActionBar>
					<div class="section">
						<CardBlock>
							{#snippet header()}
								<ActionBar>
									{#snippet left()}
										<Subtitle>{group.title}</Subtitle>
									{/snippet}
								</ActionBar>
							{/snippet}
							{#snippet content()}
								{#if !edit}
									<Facts
										record={group}
										keys={['title', 'created_at', 'updated_at', 'visibility', 'description']}
									></Facts>
								{/if}

								{#if edit}
									<div class="card">
										<form
											action="?/edit"
											method="post"
											use:enhance={() => {
												return async ({ result, update }) => {
													if (result.type === 'error') {
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
											<input type="hidden" name="id" value={group.id} />
											<Input label="Title">
												<Text value={group.title} name="title"></Text>
											</Input>

											<Input label="Visibility">
												<Select
													name="visibility"
													value={group.visibility}
													options={[
														{ label: 'Public', value: 'public' },
														{ label: 'Private', value: 'private' }
													]}
												></Select>
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
							{/snippet}
						</CardBlock>
					</div>
					<div class="section">
						<CardBlock>
							{#snippet header()}
								<ActionBar>
									{#snippet left()}
										<Subtitle>Members</Subtitle>
									{/snippet}
									{#snippet right()}
										<Paragraph>Current: {data.group_users.length}</Paragraph>
									{/snippet}
								</ActionBar>
							{/snippet}
							{#snippet content()}
								<div class="buttons-multiple">
									{#each data.group_users as user}
										{#if !edit}
											<Paragraph style="label" size="xs">
												{user?.email}
											</Paragraph>
										{/if}
									{/each}
								</div>
								<div class="card">
									{#if edit}
										<CardBlock>
											{#snippet header()}
												<Subtitle>Add users</Subtitle>
											{/snippet}
											{#snippet content()}
												<form
													action="?/search_users"
													method="post"
													use:enhance={() => {
														return async ({ result }) => {
															if (result.type === 'success') {
																if (result.data?.users && Array.isArray(result.data.users)) {
																	const filtered = result.data.users.filter(
																		(au) => !data.group_users.find((gu) => gu.id === au.id)
																	)
																	// available_users = [...filtered]
																	search_results = result.data.users
																}
															}
														}
													}}
												>
													<div class="search-bar">
														<Input>
															<Text name="identifier"></Text>
														</Input>
														<Button>Search</Button>
													</div>
												</form>
											{/snippet}
										</CardBlock>
									{/if}
									{#if available_users.length > 0}
										<CardBlock>
											{#snippet header()}
												<Paragraph>Seach results</Paragraph>
											{/snippet}
											{#snippet content()}
												{#if selected_user !== ''}
													{@const user = available_users.find((user) => user.id === selected_user)}
													<div class="relation-card">
														<form
															action="?/add_user"
															method="post"
															use:enhance={handleEnhance({
																onsuccess: () => {
																	selected_user = ''
																}
															})}
														>
															<input type="hidden" name="user_id" value={user.id} />
															<input type="hidden" name="group_id" value={group.id} />
															<Paragraph>Add {user.email}?</Paragraph>
															<div class="buttons">
																<Button
																	type="button"
																	onclick={() => {
																		selected_user = ''
																	}}>Cancel</Button
																>
																<Button>Add</Button>
															</div>
														</form>
													</div>
												{/if}
												<div class="buttons-multiple">
													{#each available_users as user}
														<Button
															onclick={() => {
																selected_user = user.id
															}}>{user.email}</Button
														>
													{/each}
												</div>
											{/snippet}
										</CardBlock>
									{/if}
									{#if edit}
										<CardBlock>
											{#snippet header()}
												<Paragraph>Existing members</Paragraph>
											{/snippet}
											{#snippet content()}
												{#if data.group_users.length === 0}
													<Notice level="info">
														<Paragraph size="xs">This group doesn't have any members.</Paragraph>
													</Notice>
												{/if}
												{#if selected_user_delete !== ''}
													{@const user = data.group_users.find(
														(user) => user.id === selected_user_delete
													)}
													{#if user}
														<div class="relation-card">
															<form
																action="?/remove_user"
																method="post"
																use:enhance={handleEnhance({
																	onsuccess: () => {
																		selected_user_delete = ''
																	}
																})}
															>
																<input type="hidden" name="user_id" value={user.id} />
																<input type="hidden" name="group_id" value={group.id} />
																<Paragraph>{user.email}</Paragraph>
																<div class="buttons">
																	<Button
																		type="button"
																		onclick={() => {
																			selected_user_delete = ''
																		}}>Cancel</Button
																	>
																	<Button>Remove</Button>
																</div>
															</form>
														</div>
													{/if}
												{/if}
												<div class="buttons-multiple">
													{#each data.group_users as user}
														{#if selected_user_delete !== user.id}
															<Button
																onclick={() => {
																	selected_user_delete = user.id
																}}
															>
																<Icon icon={{ icon: 'edit', set: 'tabler' }}></Icon>
																{user.email}</Button
															>
														{/if}
													{/each}
												</div>
											{/snippet}
										</CardBlock>
									{/if}
									{#if edit}
										<CardBlock>
											{#snippet header()}
												<Subtitle>Add all users</Subtitle>
											{/snippet}
											{#snippet content()}
												<Button
													onclick={() => {
														toggleDialog('add-all-users')
													}}>Add all existing users</Button
												>
											{/snippet}
										</CardBlock>
									{/if}
								</div>
							{/snippet}
						</CardBlock>
					</div>
					{#if edit}
						<CardBlock>
							{#snippet header()}
								<Subtitle>Permissions</Subtitle>
							{/snippet}
							{#snippet content()}
								{@const enabled = group.autoenroll ?? false}
								<div class="sections">
									<div class="section-grid">
										<form
											class="form-grid"
											{...toggleAutoEnroll.enhance(async ({ submit }) => {
												await submit()
											})}
										>
											<input {...toggleAutoEnroll.fields.id.as('hidden', group.id)} />
											<Input
												subgrid
												label={enabled ? `Autoenroll enabled` : `Autoenroll disabled`}
												layout="horizontal"
											>
												<Checkbox
													{...toggleAutoEnroll.fields.autoenroll.as('checkbox', enabled)}
													onchange={async () => {
														const valid = await toggleAutoEnroll.submit()
														if (valid) {
															await invalidateAll()
															return
														}
													}}
												></Checkbox>
											</Input>
										</form>
									</div>
									<div class="section-grid">
										{#each available_actions( { namespace: 'Group', relation: 'members', object: group.id } ) as action (action)}
											{@const form = togglePermission.for(action.id)}
											{@const enabled = data.group_permissions_actions?.relation_tuples?.find(
												(rt) => rt.subject_set?.object === group.id && rt.object === action.object
											)
												? true
												: false}
											<form
												class="form-grid"
												{...form.enhance(async ({ submit }) => {
													await submit()
												})}
											>
												<input {...form.fields.namespace.as('hidden', action.namespace)} />
												<input {...form.fields.relation.as('hidden', action.relation)} />
												<input {...form.fields.object.as('hidden', action.object)} />
												<input
													{...form.fields.actor.namespace.as(
														'hidden',
														typeof action.actor === 'string' ? 'Group' : action.actor.namespace
													)}
												/>
												<input
													{...form.fields.actor.object.as(
														'hidden',
														typeof action.actor === 'string' ? group.id : action.actor.object
													)}
												/>
												<input
													{...form.fields.actor.relation.as(
														'hidden',
														typeof action.actor === 'string' ? 'groups' : action.actor.relation
													)}
												/>
												<Input
													subgrid
													label={enabled
														? `Create ${action.object} enabled`
														: `Create ${action.object} disabled`}
													layout="horizontal"
												>
													<Checkbox
														{...form.fields.create.as('checkbox', enabled)}
														onchange={async (e) => {
															const valid = await form.submit()
															if (valid) {
																await invalidateAll()
																return
															}
														}}
													></Checkbox>
												</Input>
											</form>
										{/each}
									</div>
								</div>
							{/snippet}
						</CardBlock>
						<CardBlock>
							{#snippet header()}
								<Subtitle>Dashboard access</Subtitle>
							{/snippet}
							{#snippet content()}
								<div class="section">
									{#each available_settings( { namespace: 'Group', relation: 'members', object: group.id } ) as action (action)}
										{@const form = toggleSettingsPermission.for(action.id)}
										{@const enabled = data.group_permissions_settings?.relation_tuples?.find(
											(rt) => rt.subject_set?.object === group.id && rt.object === action.object
										)}
										<form
											class="form-grid"
											{...form.enhance(async ({ submit }) => {
												await submit()
											})}
										>
											<input {...form.fields.namespace.as('hidden', action.namespace)} />
											<input {...form.fields.object.as('hidden', action.object)} />
											<input
												{...form.fields.actor.namespace.as(
													'hidden',
													typeof action.actor === 'string' ? 'Group' : action.actor.namespace
												)}
											/>
											<input
												{...form.fields.actor.object.as(
													'hidden',
													typeof action.actor === 'string' ? group.id : action.actor.object
												)}
											/>
											<input
												{...form.fields.actor.relation.as(
													'hidden',
													typeof action.actor === 'string' ? '' : action.actor.relation
												)}
											/>
											{#each form.fields.relation.issues() as issue}
												<p class="issue">{issue.message}</p>
											{/each}
											<Input
												subgrid
												label={enabled
													? `Access ${action.object} enabled`
													: `Access ${action.object} disabled`}
												layout="horizontal"
											>
												<Select
													{...form.fields.relation.as('select', enabled ? enabled.relation : null)}
													same_width
													options={[
														{ label: 'None', value: null },
														{ label: 'Viewer', value: 'viewers' },
														{ label: 'Admin', value: 'admins' }
													]}
													onchange={() => {
														form.submit()
													}}
												></Select>
											</Input>
										</form>
									{/each}
								</div>
							{/snippet}
						</CardBlock>
					{/if}
				{/if}
			</div>
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
			use:enhance={handleEnhance({
				onsuccess: () => {
					delete_group = ''
					toggleDialog('delete-group')
				}
			})}
		>
			<input name="id" type="text" value={delete_group} hidden />
			<Button>Delete</Button>
		</form>
	</div>
</Dialog>
<Dialog id="add-group">
	<form action="?/create" method="post" use:enhance={handleEnhance()}>
		<Subtitle>Add group</Subtitle>
		<div class="inputs">
			<Input label="Title">
				<Text name="title"></Text>
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
<Dialog id="add-all-users">
	<form
		action="?/add_all_users"
		method="post"
		use:enhance={handleEnhance({
			onsuccess: () => {
				toggleDialog('add-all-users')
			}
		})}
	>
		<input type="hidden" name="group_id" value={data.group?.id} />
		<Subtitle>Are you sure you want to add all existing users to this group?</Subtitle>
		<div class="buttons">
			<Button
				type="button"
				onclick={() => {
					toggleDialog('add-all-users')
				}}>Cancel</Button
			>
			<Button>Confirm</Button>
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
		gap: 0.5rem;
		/* padding: 0.5rem; */
	}
	.buttons {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.buttons-multiple {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.search-bar {
		display: flex;
		gap: 1rem;
	}
	.edit {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.relation-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: var(--background-muted);
		padding: 1rem;
		border: 1px solid var(--border);
	}
	.sections {
		display: grid;
		grid-template-columns: minmax(0, max-content) minmax(0, 1fr);
		gap: 1rem;
	}
	.section-grid {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		gap: 1rem;
	}
	.form-grid {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
	}
</style>
