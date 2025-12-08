<script lang="ts">
	import { enhance } from '$app/forms'
	import { BaseCard, Paragraph, Button, Icon, Subtitle } from '@imago/ui'
	import type { Relationship } from '@ory/client-fetch'
	import Dialog from './dialog.svelte'
	import { toggleDialog } from '$lib/utils/ui'
	import { invalidateAll } from '$app/navigation'
	import { notify } from '$lib/stores/notify'

	let {
		user,
		groups
	}: {
		user: {
			name: { first: string; last: string }
			email: string
			id: string
			groups?: Relationship[]
		}
		groups: string[]
	} = $props()
	let groups_to_add: {
		namespace: string
		object: string
		relation: string
		subject_id: string
	}[] = $state([])
	let selected_group = $state('')
	let plus_open = $state(false)
</script>

<BaseCard overflow border rounded>
	<div class="user-card">
		<div class="user-information">
			<Paragraph>{user.id}</Paragraph>
			<Paragraph>Name: {user.name.first} {user.name.last}</Paragraph>
			<Paragraph>Email: {user.email}</Paragraph>
			<Button
				onclick={() => {
					toggleDialog(`delete-user-${user.id}`)
				}}
			>
				<Icon icon={{ icon: 'trash', set: 'tabler' }}></Icon>
			</Button>
		</div>
		<Subtitle>Groups</Subtitle>
		<div class="groups">
			<div class="left-col">
				<Subtitle>Member of</Subtitle>
				<div class="groups-buttons">
					{#if user.groups && user.groups.length > 0}
						{#each user.groups ?? [] as group}
							<Button
								onclick={() => {
									selected_group = group.object
									toggleDialog(`remove-user-group-${user.id}`)
								}}>{group.object}</Button
							>
						{/each}
					{:else}
						<Paragraph>User is not in any group</Paragraph>
					{/if}

					<div class="add-groups">
						<Button
							onclick={() => {
								plus_open = !plus_open
							}}><Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon></Button
						>
						{#if plus_open}
							<div class="add-group-buttons">
								{#each groups.filter((group) => !user.groups?.find((relation) => relation.object === group)) as group}
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
													message: `${user.name.first} has been added to ${group} group`
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
</BaseCard>
<Dialog id="remove-user-group-{user.id}">
	<div class="dialog">
		<Subtitle size="md"
			>Are you sure you want to remove {user.name.first} from {selected_group}</Subtitle
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
		<Subtitle size="md">Are you sure you want to delete {user.name.first}?</Subtitle>
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
