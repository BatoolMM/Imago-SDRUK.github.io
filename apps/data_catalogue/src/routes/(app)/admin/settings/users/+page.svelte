<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte.js'
	import CardUser from '$lib/ui/cards/card_user.svelte'
	import { BaseSection, Button, Icon, Paragraph, Subtitle, Title } from '@imago/ui'
	import { onMount } from 'svelte'
	let { data } = $props()
	let selected = $state(-1)
	onMount(() => {
		debug.data = data
	})
</script>

<BaseSection>
	<div class="page">
		<Title size="md">Users</Title>
		<div class="users">
			<div class="left-col">
				<div class="user-buttons">
					{#each data.users as user, index}
						<Button
							active={selected === index}
							style="clean"
							onclick={() => {
								if (selected === index) {
									selected = -1
								} else {
									selected = index
								}
							}}
						>
							<Paragraph>{user.first_name} {user.last_name}</Paragraph>
						</Button>
					{/each}
				</div>
			</div>
			<div class="right-col">
				<div class="cards">
					{#if selected >= 0 && selected < data.users.length}
						{@const user = data.users[selected]}
						{#key user}
							<CardUser {user} groups={data.groups}></CardUser>
						{/key}
					{/if}
				</div>
			</div>
		</div>
		<div class="footer">
			<!-- <Button> -->
			<!-- 	<Icon icon={{ icon: 'arrow-left-02', set: 'hugeicons' }}></Icon> -->
			<!-- </Button> -->
			<!-- <Button> -->
			<!-- 	<Icon icon={{ icon: 'arrow-right-02', set: 'hugeicons' }}></Icon> -->
			<!-- </Button> -->
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
		grid-template-columns: minmax(min-content, 300px) minmax(0, 1fr);
		gap: 1rem;
	}
	.left-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		overflow: scroll;
		height: calc(100lvh - var(--footer-height));
	}
	.user-buttons {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius);
		gap: 0.5rem;
		background-color: var(--background-muted);
		padding: 1rem;
	}
	.right-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.cards {
		position: sticky;
		top: 6rem;
		left: 0;
	}
	.footer {
		display: flex;
	}
</style>
