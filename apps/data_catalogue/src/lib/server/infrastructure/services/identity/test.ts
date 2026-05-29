import type { IIdentityService } from '$lib/server/application/services/identity'
import { ok } from '$lib/server/entities/errors'

const createSuperUser: IIdentityService['createSuperUser'] = async () => {
	return ok({
		id: '',
		schema_id: '',
		traits: [],
		schema_url: ''
	})
}

const validateSession: IIdentityService['validateSession'] = async () => {
	return { action: 'verify' }
}

const getIdentity: IIdentityService['getIdentity'] = async () => {
	return ok({
		email: '',
		first_name: '',
		last_name: ''
	})
}

const getIdentities: IIdentityService['getIdentities'] = async () => {
	return ok([])
}

const sessionToToken: IIdentityService['sessionToToken'] = async () => {
	return ok({
		active: true,
		authenticated_at: '',
		authentication_methods: [{ method: '', aal: '', completed_at: '' }],
		authenticator_assurance_level: '',
		devices: [{ id: '', ip_address: '', user_agent: '', location: '' }],
		expires_at: '',
		identity: {
			id: '',
			schema_id: '',
			traits: { name: { last: '', first: '' }, email: '' },
			schema_url: '',
			created_at: '',
			metadata_public: false,
			organization_id: '',
			recovery_addresses: [
				{ id: '', created_at: '', updated_at: '', status: '', value: '', verified: false, via: '' }
			],
			state: '',
			updated_at: '',
			verifiable_addresses: [
				{ id: '', created_at: '', updated_at: '', status: '', value: '', verified: false, via: '' }
			]
		},
		id: '',
		issued_at: ''
	})
}

export const infrastructureServiceIdentityTest: IIdentityService = {
	validateSession,
	getIdentity,
	getIdentities,
	createSuperUser,
	sessionToToken
}
