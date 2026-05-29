import type { ErrTypes } from '$lib/server/entities/errors'
import type { Session } from '$lib/server/entities/models/identity'
import type { IdentitySession } from '$lib/utils/auth/types'
import type { CreateIdentityBody, Identity } from '@ory/client-fetch'

export type IIdentityService = {
	// generateUserId: () => string;
	createSuperUser: ({
		data
	}: {
		data: CreateIdentityBody
	}) => Promise<[ErrTypes, null] | [null, Identity]>
	validateSession: ({
		cookie,
		token
	}: {
		cookie: string | undefined
		token: string | null
	}) => Promise<{ session: Session } | { action: 'invalidate' } | { action: 'verify' }>
	sessionToToken: ({
		cookie
	}: {
		cookie: string | undefined
	}) => Promise<[ErrTypes, null] | [null, IdentitySession]>
	getIdentity: ({
		id
	}: {
		id: string
	}) => Promise<
		[ErrTypes, null] | [null, { first_name: string; last_name: string; email: string } | null]
	>
	getIdentities: (request: {
		page_size?: number
		page_token?: string
		identifier?: string
		ids?: string[]
	}) => Promise<
		| [ErrTypes, null]
		| [null, { first_name: string; last_name: string; email: string; id: string }[]]
	>
}
