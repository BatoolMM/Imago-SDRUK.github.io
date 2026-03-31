<script lang="ts">
	import { Paragraph, Button, Icon, Subtitle, ActionBar } from '@imago/ui'
	import type { Relationship, Relationships } from '@ory/client-fetch'
	import { notify } from '$lib/stores/notify'
	import type { CkanDataset, CkanResource } from '$lib/types/ckan'
	import { AVAILABLE_RELATIONS } from '$lib/globals/auth'
	import { capitalise, jstr } from '@arturoguzman/art-ui'
	import { applyAction, enhance } from '$app/forms'

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
	const available_relations = $derived(
		[
			...new Set([
				...(relationships?.map((relation) => relation.relation) ?? []),
				...AVAILABLE_RELATIONS
			])
		].sort()
	)
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
	let relations = $derived.by(() => getRelationshipGroups(relationships))
	let active_related = $state('')
</script>

<div class="user-card">
	<div class="section">
		<div class="section-title">
			<Subtitle size="lg">Dataset</Subtitle>
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
				<div class="relation-group">
					<ActionBar>
						{#snippet left()}
							<Paragraph>{capitalise(ar)}</Paragraph>
						{/snippet}
						{#snippet right()}
							<Button
								width="auto"
								active={active_related === ar}
								onclick={() => {
									if (active_related === ar) {
										active_related = ''
										return
									}
									active_related = ar
								}}><Icon icon={{ icon: 'edit', set: 'tabler' }}></Icon></Button
							>
						{/snippet}
					</ActionBar>
					<div class="buttons">
						{#if active_related !== ar}
							<div class="relations">
								{#if relations}
									{#if ar in relations}
										{#each relations[ar] as relation}
											<div class="wrapper">
												<Paragraph style="label">
													{relation.subject_id ?? relation.subject_set?.object}
												</Paragraph>
											</div>
										{/each}
									{/if}
								{/if}
							</div>
						{/if}
						{#if active_related === ar}
							<Paragraph>Existing groups</Paragraph>
							<div class="editing">
								{#if relations}
									{#if ar in relations}
										{#each relations[ar] as relation}
											<form
												action="?/remove_group"
												method="post"
												use:enhance={() => {
													return async ({ result, update }) => {
														if ('data' in result && result.data) {
															if ('errors' in result.data) {
																notify.send(String(jstr(result.data.errors)))
															}
															if ('message' in result.data) {
																notify.send(String(result.data.message))
															}
														}
														if (result.type === 'redirect') {
															applyAction(result)
														}
														await update({ reset: true, invalidateAll: true })
													}
												}}
											>
												<input type="hidden" value={dataset.name} name="object" />
												<input type="hidden" value={ar} name="relation" />
												<input
													type="hidden"
													value={relation.subject_id ?? relation.subject_set?.object}
													name="subject_set_object"
												/>
												<Button width="auto" style="tag" onclick={() => {}}
													>{relation.subject_id ?? relation.subject_set?.object}</Button
												>
											</form>
										{/each}
									{/if}
								{/if}
							</div>
							<Paragraph>Available groups</Paragraph>
							<div class="editing">
								{#each groups.filter((group) => {
									if (relations && ar in relations && relations[ar].find((relation) => relation.subject_set?.object === group)) {
										return false
									}
									return true
								}) as group}
									<form
										action="?/add_group"
										method="post"
										use:enhance={() => {
											return async ({ result, update }) => {
												if ('data' in result && result.data) {
													if ('errors' in result.data) {
														notify.send(String(jstr(result.data.errors)))
													}
													if ('message' in result.data) {
														notify.send(String(result.data.message))
													}
												}
												if (result.type === 'redirect') {
													applyAction(result)
												}
												await update({ reset: true, invalidateAll: true })
											}
										}}
									>
										<input type="hidden" value={dataset.name} name="object" />
										<input type="hidden" value={ar} name="relation" />
										<input type="hidden" value={group} name="subject_set_object" />
										<Button width="auto">{group}</Button>
									</form>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

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
	.relation-group {
		/* background-color: var(--background-muted); */
		padding: 1rem;
		border-radius: var(--radius);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.editing {
		background-color: var(--background-muted);
		display: flex;
		gap: 0.5rem;
		padding: 1rem;
		border-radius: var(--radius);
		flex-wrap: wrap;
	}
	.relations {
		display: flex;
		gap: 0.5rem;
	}
</style>
