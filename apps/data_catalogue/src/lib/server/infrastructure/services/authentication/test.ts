import type { IAuthenticationService } from '$lib/server/application/services/authentication'
const validateSession: IAuthenticationService['validateSession'] = async () => {
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
const getIdentity: IAuthenticationService['getIdentity'] = async ({ id }) => {
	return {
		first_name: '',
		last_name: '',
		email: ''
	}
}
export const infrastructureServiceAuthenticationTest: IAuthenticationService = {
	validateSession,
	getIdentity
}
