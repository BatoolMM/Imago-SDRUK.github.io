<script lang="ts">
	import { enhance } from '$app/forms'
	import { BaseCard, Paragraph, Button, Icon, Subtitle } from '@imago/ui'
	import type { Relationship } from '@ory/client-fetch'
	import Dialog from './dialog.svelte'
	import { toggleDialog } from '$lib/utils/ui'
	import { invalidateAll } from '$app/navigation'
	import { notify } from '$lib/stores/notify'
	import { onMount } from 'svelte'

	let {
		user,
		groups
	}: {
		user: {
			email: string
			first_name: string
			last_name: string
			id: string
			groups?: Relationship[]
		}
		groups: string[]
	} = $props()
	let selected_group = $state('')
	let edit = $state(false)
	let plus_open = $state(false)
	let user_groups = $state<Relationship[]>([])
	onMount(async () => {
		const res = await fetch(`/api/v1/permissions/Group/relation/users?subject_id=${user.id}`)
		const data = await res.json()
		user_groups = data.relation_tuples
	})
</script>

<BaseCard overflow border rounded>
	<div class="user-card">
		<div class="section">
			<div class="section-title">
				<Subtitle size="md">
					<Icon icon={{ icon: 'user', set: 'tabler' }}></Icon>
					{user.first_name}
					{user.last_name}</Subtitle
				>
				<div class="buttons">
					<Button
						active={edit}
						onclick={() => {
							edit = !edit
						}}
					>
						<Icon icon={{ icon: 'edit', set: 'tabler' }}></Icon>
					</Button>
					{#if edit}
						<Button
							onclick={() => {
								toggleDialog(`delete-user-${user.id}`)
							}}
						>
							<Icon icon={{ icon: 'trash', set: 'tabler' }}></Icon>
						</Button>
					{/if}
				</div>
			</div>
			<div class="user-information">
				<Paragraph>Email: {user.email}</Paragraph>
				<Paragraph>ID: {user.id}</Paragraph>
			</div>
		</div>

		<div class="section">
			<div class="section-title">
				<Subtitle size="md">
					<Icon icon={{ icon: 'users-group', set: 'tabler' }}></Icon>
					Groups</Subtitle
				>
				{#if edit}
					<div class="buttons">
						<Button
							onclick={() => {
								plus_open = !plus_open
							}}><Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon></Button
						>
					</div>
				{/if}
			</div>
			<div class="groups">
				<div class="left-col">
					<div class="groups-buttons">
						{#if user_groups && user_groups.length > 0}
							{#each user_groups ?? [] as group}
								{#if edit}
									<Button
										onclick={() => {
											selected_group = group.object
											toggleDialog(`remove-user-group-${user.id}`)
										}}
									>
										<Icon icon={{ icon: 'trash', set: 'tabler' }}></Icon> {group.object}</Button
									>
								{:else}
									<div class="group-label">
										<Paragraph>{group.object}</Paragraph>
									</div>
								{/if}
							{/each}
						{:else}
							<Paragraph>User is not in any group</Paragraph>
						{/if}
						<div class="add-groups">
							{#if plus_open}
								<div class="add-group-buttons">
									{#each groups.filter((group) => !user_groups?.find((relation) => relation.object === group)) as group}
										<Button
											onclick={async () => {
												const relationship: Relationship = {
													namespace: 'Group',
													object: group,
													relation: 'users',
													subject_id: user.id
												}
												const res = await fetch(`/api/v1/permissions/Group`, {
													method: 'POST',
													body: JSON.stringify(relationship)
												})
												const data = await res.json()
												if (data.message === 'ok') {
													notify.send({
														message: `${user.first_name} has been added to ${group} group`
													})
													await invalidateAll()
												}
											}}>{group}</Button
										>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
				<div class="right-col"></div>
			</div>
		</div>
	</div>
</BaseCard>
<Dialog id="remove-user-group-{user.id}">
	<div class="dialog">
		<Subtitle size="md"
			>Are you sure you want to remove {user.first_name} from {selected_group}</Subtitle
		>
		<div class="buttons">
			<Button
				type="button"
				onclick={() => {
					selected_group = ''
					toggleDialog(`remove-user-group-${user.id}`)
				}}>Cancel</Button
			>
			<Button
				onclick={async () => {
					const relationship: Relationship = {
						namespace: 'Group',
						object: selected_group,
						relation: 'users',
						subject_id: user.id
					}
					const res = await fetch(`/api/v1/permissions/Group`, {
						method: 'DELETE',
						body: JSON.stringify(relationship)
					})
					const data = await res.json()
					if (data.message === 'ok') {
						selected_group = ''
						toggleDialog(`remove-user-group-${user.id}`)
						await invalidateAll()
					}
					console.log(data)
				}}>Remove</Button
			>
		</div>
	</div>
</Dialog>

<Dialog id="delete-user-{user.id}">
	<div class="dialog">
		<Subtitle size="md">Are you sure you want to delete {user.first_name}?</Subtitle>
		<div class="buttons">
			<Button
				type="button"
				onclick={() => {
					selected_group = ''
					toggleDialog(`delete-user-${user.id}`)
				}}>Cancel</Button
			>
			<Button
				onclick={async () => {
					const res = await fetch(`/api/v1/users/${user.id}`, {
						method: 'DELETE'
					})
					const data = await res.json()
					notify.send({ message: data.message })
					selected_group = ''
					toggleDialog(`delete-user-${user.id}`)
					await invalidateAll()
				}}>Delete</Button
			>
		</div>
	</div>
</Dialog>

<style>
	.user-card {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.section {
		display: grid;
		grid-template-rows: minmax(0, 1fr) minmax(0, max-content);
		gap: 0.25rem;
	}
	.section-title {
		display: flex;
		justify-content: space-between;
	}
	.user-information {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.groups {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.groups-buttons {
		display: flex;
		gap: 0.25rem;
	}
	.group-label {
		background: var(--background-muted);
		padding: 0.25rem 1rem;
		border-radius: var(--radius);
		text-transform: capitalize;
	}
	.dialog {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	.add-groups {
		position: relative;
	}
	.add-group-buttons {
		position: absolute;
		top: 120%;
		left: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
