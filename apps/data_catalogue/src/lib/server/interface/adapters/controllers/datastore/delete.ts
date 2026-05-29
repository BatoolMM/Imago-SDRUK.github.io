import type { Session } from '$lib/server/entities/models/identity'
import { getDatastoreModule } from '$lib/server/modules/datastore'
import { err } from '$lib/server/entities/errors'
import type { Configuration } from '$lib/server/entities/models/configuration'
import { datastoreResetUseCase } from '$lib/server/application/use_cases/datastore/delete'
import { getAuthorisationModule } from '$lib/server/modules/authorisation'

export const datastoreResetController = async ({
	resource_id,
	session,
	configuration
}: {
	resource_id?: string
	session?: Session
	configuration: Configuration
}) => {
	if (!session) {
		return err({ reason: 'Unauthenticated' })
	}
	if (!resource_id || typeof resource_id !== 'string') {
		return err({
			reason: 'Missing ID',
			message: `You need to provide a resource ID`
		})
	}
	return await datastoreResetUseCase({
		configuration,
		session,
		authorisation_module: getAuthorisationModule(),
		datastore_service: getDatastoreModule(),
		resource_id
	})
}
