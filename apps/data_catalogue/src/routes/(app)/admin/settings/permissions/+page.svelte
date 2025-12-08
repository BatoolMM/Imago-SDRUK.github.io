<script lang="ts">
	import { BaseSection, Paragraph, Subtitle, Button } from '@imago/ui'
	import type { Relationship } from '@ory/client-fetch'
	let { data } = $props()
	async function handleDelete(relation: Relationship) {
		const res = await fetch(`/api/v1/permissions/${relation.namespace}`, {
			method: 'DELETE',
			body: JSON.stringify(relation)
		})
		const data = await res.json()
		console.log(data)
	}
	async function handleTest(relation: Relationship) {
		const res = await fetch(`http://127.0.0.1:4467/`, {
			method: 'POST',
			body: JSON.stringify(relation)
		})
		const data = await res.json()
		console.log(data)
	}
</script>

<BaseSection>
	<div class="page">
		<div class="group">
			<Subtitle>Users</Subtitle>
			<div class="tuples">
				{#each data.users.relation_tuples ?? [] as dataset}
					{@render card(dataset)}
				{/each}
			</div>
		</div>
		<div class="group">
			<Subtitle>Groups</Subtitle>
			<div class="tuples">
				{#each data.groups.relation_tuples ?? [] as dataset}
					{@render card(dataset)}
				{/each}
			</div>
		</div>
		<div class="group">
			<Subtitle>Datasets</Subtitle>
			<div class="tuples">
				{#each data.datasets.relation_tuples ?? [] as dataset}
					{@render card(dataset)}
				{/each}
			</div>
		</div>
		<div class="group">
			<Subtitle>Resources</Subtitle>
			<div class="tuples">
				{#each data.resources.relation_tuples ?? [] as dataset}
					{@render card(dataset)}
				{/each}
			</div>
		</div>
		<div class="group">
			<Subtitle>Resource Versions</Subtitle>
			<div class="tuples">
				{#each data.resource_versions.relation_tuples ?? [] as dataset}
					{@render card(dataset)}
				{/each}
			</div>
		</div>
		<div class="group">
			<Subtitle>Endpoints</Subtitle>
			<div class="tuples">
				{#each data.endpoints.relation_tuples ?? [] as dataset}
					{@render card(dataset)}
				{/each}
			</div>
		</div>
	</div>
</BaseSection>

{#snippet card(relation: Relationship)}
	<div class="card">
		<Paragraph>Object: {relation.object}</Paragraph>
		{#if relation.subject_id}
			<Paragraph>{relation.subject_id} is a {relation.relation} on {relation.object}</Paragraph>
		{/if}
		{#if relation.subject_set}
			<Paragraph
				>{relation.subject_set.namespace}:{relation.subject_set?.subject_id ?? relation.subject_id} is
				a {relation.subject_set.relation} on {relation.subject_set.object}
			</Paragraph>
		{/if}

		<Button
			onclick={() => {
				handleTest(relation)
			}}>Test</Button
		>
		<Button
			onclick={() => {
				handleDelete(relation)
			}}>Delete</Button
		>
	</div>
{/snippet}

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.group {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.tuples {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem;
	}
</style>
