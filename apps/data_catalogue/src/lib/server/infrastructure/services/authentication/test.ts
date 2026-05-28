import type { IAuthenticationService } from '$lib/server/application/services/authentication'
export const infrastructureServiceAuthenticationTest: IAuthenticationService = {
	validateSession: async () => {
		return {
			session: {
				active: true,
				identity: {
					first_name: '',
					email: '',
					id: '',
					last_name: ''
				},
				id: '',
				expires_at: '',
				verified: true
			}
		}
	}
}
