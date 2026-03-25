import { ketoRead } from '$lib/utils/auth'

export const load = async () => {
	return {
		resources: await ketoRead.getRelationships({ namespace: 'Resource' }),
		resource_versions: await ketoRead.getRelationships({ namespace: 'ResourceVersion' })
	}
}
