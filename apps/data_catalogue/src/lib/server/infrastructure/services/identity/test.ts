import type { IIdentityService } from '$lib/server/application/services/identity'
import { err, ok } from '$lib/server/entities/errors'
import type { Identity } from '$lib/server/entities/models/identity'
import { getId } from '@arturoguzman/art-ui'
const mock: Identity[] = []

const createSuperUser: IIdentityService['createSuperUser'] = async ({ data }) => {
	const result: Identity = {
		...data,
		id: getId(),
		schema_url: '',
		credentials: {
			password: {
				type: 'password',
				...data.credentials?.password
			}
		},
		metadata_admin: null,
		metadata_public: null
	}
	mock.push(result)
	return ok(result)
}

const validateSession: IIdentityService['validateSession'] = async () => {
	return {
		session: {
			id: getId(),
			active: true,
			expires_at: '',
			identity: {
				id: getId(),
				email: '',
				first_name: '',
				last_name: ''
			},
			verified: true,
			redirect_browser_to: ''
		}
	}
}

const getIdentity: IIdentityService['getIdentity'] = async ({ id }) => {
	const result = mock.find((x) => x.id === id)
	if (result) {
		return ok({
			email: result.traits.email,
			first_name: result.traits.name.first,
			last_name: result.traits.name.last
		})
	}
	return err({ reason: 'Not Found', message: 'Identity not found' })
}

const getIdentities: IIdentityService['getIdentities'] = async () => {
	return ok(
		mock.map((result) => ({
			id: result.id,
			email: result.traits.email,
			first_name: result.traits.name.first,
			last_name: result.traits.name.last
		}))
	)
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

const getFlow: IIdentityService['getFlow'] = async () => {
	return ok({
		action: 'form',
		form: {
			action: '',
			method: 'POST',
			messages: [],
			nodes: [
				{
					messages: [],
					meta: { label: undefined },
					attributes: {
						name: '',
						type: '',
						disabled: false,
						node_type: ''
					},
					group: '',
					type: 'text'
				}
			]
		}
	})
}

export const infrastructureServiceIdentityTest: IIdentityService = {
	validateSession,
	getIdentity,
	getIdentities,
	createSuperUser,
	sessionToToken,
	getFlow
}
