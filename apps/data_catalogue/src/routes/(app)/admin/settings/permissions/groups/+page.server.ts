import { ketoRead } from '$lib/utils/auth'

export const load = async () => {
	const groups = await ketoRead.getRelationships({ namespace: 'Group' })
	return {
		groups
	}
}
