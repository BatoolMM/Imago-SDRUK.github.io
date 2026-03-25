import { ketoRead } from '$lib/utils/auth'

export const load = async () => {
	const endpoints = await ketoRead.getRelationships({ namespace: 'Endpoint' })
	return {
		endpoints
	}
}
