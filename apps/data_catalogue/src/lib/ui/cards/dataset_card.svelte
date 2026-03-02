<script lang="ts">
	import { BaseCard, Paragraph, Button, Icon, Subtitle } from '@imago/ui'
	import type { Relationship, Relationships } from '@ory/client-fetch'
	import Dialog from './dialog.svelte'
	import { toggleDialog } from '$lib/utils/ui'
	import { invalidateAll } from '$app/navigation'
	import { notify } from '$lib/stores/notify'
	import type { CkanDataset, CkanResource } from '$lib/types/ckan'
	import { AVAILABLE_RELATIONS } from '$lib/globals/auth'

	let {
		dataset,
		groups,
		relationships,
		resources = []
	}: {
		dataset: CkanDataset
		groups: string[]
		relationships: Relationships['relation_tuples']
		resources: (CkanResource & { downloads?: number })[]
	} = $props()
	let selected_group = $state('')
	const available_relations = [
		...new Set([
			...(relationships?.map((relation) => relation.relation) ?? []),
			...AVAILABLE_RELATIONS
		])
	].sort()
	let relation: 'admins' | 'viewers' | 'editors' | '' = ''
	const getRelationshipGroups = (relationships: Relationships['relation_tuples']) => {
		return relationships?.reduce(
			(acc, relationship) => {
				const _object = relationship.relation
				if (!_object) {
					return acc
				}
				if (_object in acc && Array.isArray(acc[_object])) {
					acc[_object]?.push(relationship)
					return acc
				}
				acc[_object] = [relationship]
				return acc
			},
			{} as { [k: string]: Relationship[] }
		)
	}
	let relations = getRelationshipGroups(relationships)
	let active_related = $state('')
</script>

<BaseCard overflow border rounded>
	<div class="user-card">
		<div class="section">
			<div class="section-title">
				<Subtitle>Dataset</Subtitle>
			</div>
			<div class="user-information">
				<Paragraph>ID: {dataset.id}</Paragraph>
				<Paragraph>Name: {dataset.name}</Paragraph>
				<Paragraph>Title: {dataset.title}</Paragraph>
			</div>
		</div>

		{#if resources.length > 0}
			<div class="section">
				<div class="resources">
					<Subtitle>Resources</Subtitle>
					<div class="resources-table">
						<Paragraph>Name</Paragraph>
						<Paragraph>Downloads</Paragraph>
						{#each resources as resource}
							<div class="resource">
								<Paragraph>{resource.name}</Paragraph>
								<Paragraph>{resource.downloads}</Paragraph>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
		<div class="section">
			<div class="section-title">
				<Subtitle>Groups</Subtitle>
			</div>
			<div class="groups">
				{#each available_relations as ar}
					<div class="relation-title">
						<Paragraph>{ar}</Paragraph>
						<Button
							active={active_related === ar}
							onclick={() => {
								if (active_related === ar) {
									active_related = ''
									return
								}
								active_related = ar
							}}><Icon icon={{ icon: 'plus', set: 'tabler' }}></Icon></Button
						>
					</div>
					<div class="buttons">
						{#if relations}
							{#if ar in relations}
								{#each relations[ar] as relation}
									<Button>{relation.subject_id ?? relation.subject_set?.object}</Button>
								{/each}
							{/if}
						{/if}
					</div>
					{#if active_related === ar}
						<div class="buttons buttons-add">
							{#each groups.filter((group) => {
								if (relations && ar in relations && relations[ar].find((relation) => relation.subject_set?.object === group)) {
									return false
								}
								return true
							}) as group}
								<Button
									onclick={async () => {
										const relationship: Relationship = {
											namespace: 'Dataset',
											object: dataset.name,
											relation: ar,
											subject_set: {
												namespace: 'Group',
												object: group,
												relation: 'users'
											}
										}
										const res = await fetch(`/api/v1/permissions/Dataset`, {
											method: 'POST',
											body: JSON.stringify(relationship)
										})
										const data = await res.json()
										if (data.message === 'ok') {
											notify.send({
												message: `${group} has been added as a ${relation} to dataset ${dataset.title}`
											})
											await invalidateAll()
										}
									}}>{group}</Button
								>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</BaseCard>
<Dialog id="remove-dataset-group-{dataset.id}">
	<div class="dialog">
		<Subtitle size="md"
			>Are you sure you want to remove {dataset.name} from {selected_group}</Subtitle
		>
		<div class="buttons">
			<Button
				type="button"
				onclick={() => {
					selected_group = ''
					toggleDialog(`remove-dataset-group-${dataset.id}`)
				}}>Cancel</Button
			>
			<Button
				onclick={async () => {
					const relationship: Relationship = {
						namespace: 'Dataset',
						object: dataset.id,
						relation: relation,
						subject_set: {
							namespace: 'Group',
							object: 'grrrr',
							relation: 'users'
						}
					}
					const res = await fetch(`/api/v1/permissions/Dataset`, {
						method: 'DELETE',
						body: JSON.stringify(relationship)
					})
					const data = await res.json()
					if (data.message === 'ok') {
						selected_group = ''
						toggleDialog(`remove-dataset-group-${dataset.id}`)
						await invalidateAll()
					}
				}}>Remove</Button
			>
		</div>
	</div>
</Dialog>

<style>
	.user-card {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
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
	.resources {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.resources-table {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-auto-flow: row;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 0.25rem;
	}
	.resource {
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: minmax(0, 1fr);
		grid-column: 1 / -1;
		gap: 0.25rem;
	}
	.groups {
		display: grid;
		gap: 0.25rem;
	}
	.relation-title {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0;
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
	.buttons-add {
		background-color: var(--background-muted);
		padding: 0.5rem;
		border-radius: var(--radius);
	}
</style>
