import type { AppContext } from '$lib/server/application/context'
import type { IDatastoreService } from '$lib/server/application/services/datastore'
import { err, ok } from '$lib/server/entities/errors'

export const datastoreResetUseCase = async ({
	resource_id,
	datastore_service,
	session,
	configuration,
	authorisation_module
}: {
	resource_id: string
	datastore_service: IDatastoreService
} & AppContext) => {
	const [errors, permission] = await authorisation_module.authorise({
		namespace: 'Resource',
		object: resource_id,
		permits: 'edit',
		actor: session.identity.id,
		configuration
	})
	if (errors) {
		return err(errors)
	}
	if (!permission.allowed) {
		return err({ reason: 'Unauthorised' })
	}
	const [delete_errors] = await datastore_service.deleteStructuralMetadata({ id: resource_id })
	if (delete_errors !== null) {
		return err(delete_errors)
	}
	return ok(null)
}
