import type { IAuthorisationService } from '$lib/server/application/services/autorisation'

export const authorisationServiceInfrastructureTest: IAuthorisationService = {
	authorise: async () => {
		return { allowed: true }
	},
	createPermission: async () => {},
	deletePermission: async () => {}
}
