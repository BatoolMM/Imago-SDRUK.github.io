<script lang="ts">
	import { debug } from '$lib/globals/dev.svelte.js'
	import CardUser from '$lib/ui/cards/card_user.svelte'
	import { BaseSection, Button } from '@imago/ui'
	import { onMount } from 'svelte'

	let { data } = $props()
	onMount(() => {
		debug.data = data
	})
</script>

<BaseSection>
	<div class="page">
		<div class="left-col">
			{#each data.users as user}
				<CardUser {user} groups={data.groups}></CardUser>
			{/each}
		</div>
	</div>
</BaseSection>

<style>
	.left-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
