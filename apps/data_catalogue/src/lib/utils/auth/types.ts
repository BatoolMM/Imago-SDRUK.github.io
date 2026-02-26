export type IdentitySession = {
	id: string
	active: boolean
	expires_at: string
	authenticated_at: string
	authenticator_assurance_level: string
	authentication_methods: [
		{
			method: string
			aal: string
			completed_at: string
		}
	]
	issued_at: string
	identity: {
		id: string
		schema_id: string
		schema_url: string
		state: string
		traits: {
			name: {
				last: string
				first: string
			}
			email: string
		}
		verifiable_addresses: [
			{
				id: string
				value: string
				verified: boolean
				via: string
				status: string
				created_at: string
				updated_at: string
			}
		]
		recovery_addresses: [
			{
				id: string
				value: string
				via: string
				created_at: string
				updated_at: string
			}
		]
		metadata_public: boolean | null
		created_at: string
		updated_at: string
		organization_id: string | null
	}
	devices: [
		{
			id: string
			ip_address: string
			user_agent: string
			location: string
		}
	]
	error?: IdentityError
	redirect_browser_to?: string
}
//

export type IdentityFlowTypes = 'registration' | 'verification' | 'recovery'

export type IdentityError = {
	id: string
	code: number
	status: string
	reason: string
	details: {
		redirect_browser_to?: string
		redirect_to?: string
		return_to?: string
	}
	message: string
}

export type IdentityMessage = {
	id: number
	text: string
	type: string
	context?: {
		reason: string
	}
}

export type IdentityNode = {
	type: 'text' | 'img' | 'input' | 'a'
	group: string
	attributes: {
		name: string
		type: string
		disabled: boolean
		node_type: string
		value?: string
		required?: boolean
		autocomplete?: string
		src?: string
		id?: string
		width?: number
		height?: number
		href?: string
		title?: {
			id: number
			text: string
			type: string
		}
		text?: {
			id: number
			text: string
			type: string
			context: {
				secret: string
			}
		}
	}
	messages: IdentityMessage[]
	meta: {
		label?: {
			id: number
			text: string
			type: string
			context?: {
				title: string
			}
		}
	}
}

// export type IdentityFlow = {
// 	id: string
// 	type: 'browser' | 'api'
// 	expires_at: string
// 	issued_at: string
// 	request_url: string
// 	ui: {
// 		action: string
// 		method: 'POST'
// 		nodes: IdentityNode[]
// 		messages: IdentityMessage[]
// 	}
// 	organization_id?: null
// 	state?: string
// }

export type IdentityFlow = {
	id: string
	type: 'browser' | 'api'
	expires_at: string
	issued_at: string
	request_url: string
	ui: {
		action: string
		method: 'POST'
		nodes: IdentityNode[]
		messages: IdentityMessage[]
	}
	organization_id?: null
	state?: string
}

export type IdentityLogout = {
	logout_url: string
	logout_token: string
}

export type IdentityResponse = IdentityFlow | IdentityError | IdentityLogout
