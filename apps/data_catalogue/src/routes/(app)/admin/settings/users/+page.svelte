<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte.js'
	import CardUser from '$lib/ui/cards/card_user.svelte'
	import { BaseSection, Button, Subtitle, Title } from '@imago/ui'
	import { onMount } from 'svelte'
	let { data } = $props()
	let selected = $state(-1)
	onMount(() => {
		debug.data = data
	})
</script>

<BaseSection>
	<div class="page">
		<Title>Users</Title>
		<div class="users">
			<div class="left-col">
				{#each data.users as user, index}
					<Button
						active={selected === index}
						onclick={() => {
							if (selected === index) {
								selected = -1
							} else {
								selected = index
							}
						}}>{user.name.first} {user.name.last}</Button
					>
				{/each}
			</div>
			<div class="right-col">
				{#if selected >= 0 && selected < data.users.length}
					{@const user = data.users[selected]}
					<CardUser {user} groups={data.groups}></CardUser>
				{/if}
			</div>
		</div>
	</div>
</BaseSection>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.users {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
		gap: 1rem;
	}
	.left-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.right-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
