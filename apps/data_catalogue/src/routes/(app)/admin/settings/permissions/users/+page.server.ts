import { ketoRead } from '$lib/utils/auth'

export const load = async () => {
	const users = await ketoRead.getRelationships({ namespace: 'User' })
	return {
		users
	}
}
