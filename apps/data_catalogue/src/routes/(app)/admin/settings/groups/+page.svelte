<script lang="ts">
	import { enhance } from '$app/forms'
	import { debug } from '$lib/globals/dev.svelte.js'
	import { jstr } from '@arturoguzman/art-ui'
	import { Button, Input, Text } from '@imago/ui'
	import { onMount } from 'svelte'

	let { data } = $props()

	onMount(() => {
		debug.data = data
	})
</script>

<div class="cards">
	{#each data.relationships.relation_tuples ?? [] as relation}
		<div class="card">
			<form action="?/delete" method="POST" use:enhance>
				<Input label="Relation">
					<Text name="relation" value={JSON.stringify(relation)}></Text>
				</Input>
				<Button>Delete</Button>
			</form>
		</div>
	{/each}
</div>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-auto-flow: row;
		gap: 1rem;
	}
	.card {
		border: 1px solid var(--border);
	}
</style>
