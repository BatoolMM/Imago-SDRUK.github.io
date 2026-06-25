import type { Transaction } from '$lib/db'
import type { IAuthorisationService } from '$lib/server/application/services/autorisation'
import type { Configuration } from '$lib/server/entities/models/configuration'
import type { Session } from '$lib/server/entities/models/identity'
import type { Permission } from '$lib/server/entities/models/permissions'
import { getAuthorisationModule } from '$lib/server/modules/authorisation'

export type AppContext = {
	session: Session
	configuration: Configuration
	authorisation_module: IAuthorisationService
	identity_token?: string
	tx?: Transaction
	permissions?: Omit<Permission, 'actor'>[]
}

export const getServerContext = ({
	session,
	configuration,
	identity_token,
	tx,
	permissions
}: {
	session: Session
	configuration: Configuration
	identity_token?: string
	tx?: Transaction
	permissions?: Omit<Permission, 'actor'>[]
}): AppContext => {
	return {
		session,
		configuration,
		authorisation_module: getAuthorisationModule(),
		identity_token,
		tx,
		permissions
	}
}
