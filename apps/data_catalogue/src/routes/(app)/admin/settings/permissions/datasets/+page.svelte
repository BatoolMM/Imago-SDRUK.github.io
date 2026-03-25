<script lang="ts">
	import BaseTable from '$lib/ui/tables/base_table.svelte'
	import CellObject from '$lib/ui/tables/cell_object.svelte'
	import CellText from '$lib/ui/tables/cell_text.svelte'
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

<div class="page">
	<div class="group">
		<Subtitle>Datasets</Subtitle>
		<div class="tuples">
			{@render table(data.datasets.relation_tuples)}
			<!-- {#each data.users.relation_tuples ?? [] as dataset} -->
			<!-- 	{@render card(dataset)} -->
			<!-- {/each} -->
		</div>
	</div>
</div>

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
{#snippet table(relationships?: Relationship[])}
	<BaseTable
		data={relationships ?? []}
		columns={[
			{
				id: 'namespace',
				header: 'Namespace',
				cell: CellText
			},
			{
				id: 'object',
				header: 'Object',
				cell: CellText
			},
			{
				id: 'relation',
				header: 'Relation',
				cell: CellText,
				sort: true
			},
			{
				id: 'subject_id',
				header: 'Subject ID',
				cell: CellText
			},
			{
				id: 'subject_set',
				header: 'Subject set',
				cell: CellObject,
				width: 800
			}
		]}
		apiFn={(api) => {
			api.exec('resize-column', { id: 'object', auto: 'data' })
			api.exec('resize-column', { id: 'subject_id', auto: 'data' })
		}}
	></BaseTable>
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
