import { ketoRead } from '$lib/utils/auth'

export const load = async () => {
	const datasets = await ketoRead.getRelationships({ namespace: 'Dataset' })
	return {
		datasets
	}
}
