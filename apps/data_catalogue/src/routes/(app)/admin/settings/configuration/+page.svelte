<script lang="ts">
	import {
		configurationAddSuperUser,
		configurationRemoveSuperUser
	} from '$lib/remotes/configuration/update.remote.js'
	import { usersSearch } from '$lib/remotes/users/get.remote.js'
	import { notify } from '$lib/stores/notify.js'
	import CardUser from '$lib/ui/cards/card_user.svelte'
	import Dialog from '$lib/ui/cards/dialog.svelte'
	import { toggleDialog } from '$lib/utils/ui/index.js'
	import { BaseSection, Button, Icon, Input, Paragraph, Subtitle, Text } from '@imago/ui'

	let { data } = $props()
	let users: { first_name: string; last_name: string; email: string; id: string }[] = $state([])
</script>

<div class="page">
	<BaseSection title="Add superuser" style="title">
		<div class="content">
			<form
				class="search-bar"
				{...usersSearch.enhance(async ({ submit }) => {
					const valid = await submit()
					if (valid && usersSearch.result) {
						users = usersSearch.result
					}
				})}
			>
				<Input label="Term">
					<Text {...usersSearch.fields.term.as('text')}></Text>
				</Input>
				<Button>Search</Button>
			</form>
			<div class="search-results">
				{#each users.filter((x) => !data.configuration.superusers?.includes(x.id)) as user}
					{@const form = configurationAddSuperUser.for(user.id)}
					<CardUser {user}>
						<form
							{...form.enhance(async ({ submit }) => {
								if (data.configuration.superusers?.includes(user.id)) {
									notify.send({ message: 'This user is already a superuser' })
									return
								}
								const valid = await submit()
								if (valid) {
									notify.send({ message: 'Success' })
								}
							})}
						>
							<input {...form.fields.id.as('hidden', user.id)} />
							<Button>
								<Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon>
							</Button>
						</form>
					</CardUser>
				{/each}
			</div>
		</div>
	</BaseSection>
	<BaseSection style="title" title="Existing superusers">
		<div class="users">
			{#each data.superusers as user}
				{@const form = configurationRemoveSuperUser.for(user.id)}
				<CardUser {user}>
					<Button
						onclick={() => {
							toggleDialog(`remove-${user.id}`)
						}}
					>
						<Icon icon={{ icon: 'trash', set: 'tabler' }}></Icon>
					</Button>
					<Dialog id="remove-{user.id}">
						<form
							{...form.enhance(async ({ submit }) => {
								const valid = await submit()
								if (valid) {
									notify.send({ message: 'Success' })
									toggleDialog(`remove-${user.id}`)
								}
							})}
						>
							<input {...form.fields.id.as('hidden', user.id)} />
							<Subtitle size="sm"
								>Are you sure you want to remove {user.first_name}
								{user.last_name} as superuser?</Subtitle
							>
							<div class="buttons">
								<Button
									type="button"
									onclick={() => {
										toggleDialog(`remove-${user.id}`)
									}}
								>
									Cancel
								</Button>
								<Button>Remove</Button>
							</div>
						</form>
					</Dialog>
				</CardUser>
			{/each}
		</div>
	</BaseSection>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.search-bar {
		display: flex;
		gap: 0.5rem;
		align-items: flex-end;
	}
	.search-results {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.users {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.buttons {
		display: flex;
		gap: 0.25rem;
		justify-content: space-between;
	}
	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
