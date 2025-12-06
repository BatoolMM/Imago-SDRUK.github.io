import { ketoRead } from '$lib/utils/auth'

export const load = async () => {
	const users = await ketoRead.getRelationships({ namespace: 'User' })
	const groups = await ketoRead.getRelationships({ namespace: 'Group' })
	const datasets = await ketoRead.getRelationships({ namespace: 'Dataset' })
	const resources = await ketoRead.getRelationships({ namespace: 'Resource' })
	const resource_versions = await ketoRead.getRelationships({ namespace: 'ResourceVersion' })
	const endpoints = await ketoRead.getRelationships({ namespace: 'Endpoint' })
	return {
		users,
		groups,
		datasets,
		resources,
		resource_versions,
		endpoints
	}
}
