import type { IAuthorisationService } from '$lib/server/application/services/autorisation'
import type { Relationships } from '$lib/server/entities/models/permissions'
import { ok } from '$lib/server/entities/errors'

const authorise: IAuthorisationService['authorise'] = async () => {
	return ok({ allowed: true })
}

const batchAuthorise: IAuthorisationService['batchAuthorise'] = async ({ permissions }) => {
	return ok({ results: permissions.map(() => ({ allowed: true })) })
}

const createPermission: IAuthorisationService['createPermission'] = async ({
	namespace,
	object,
	relation,
	actor
}) => {
	return ok({
		namespace,
		object,
		relation,
		actor
	})
}

const createPermissions: IAuthorisationService['createPermissions'] = async () => {
	return ok(null)
}

const deletePermissions: IAuthorisationService['deletePermissions'] = async () => {
	return ok(null)
}

const deletePermission: IAuthorisationService['deletePermission'] = async () => {
	return ok(null)
}

const getPermissions: IAuthorisationService['getPermissions'] = async () => {
	const relationships: Relationships = { next_page_token: '', relation_tuples: [] }
	return ok(relationships)
}

export const authorisationServiceInfrastructureTest: IAuthorisationService = {
	authorise,
	batchAuthorise,
	createPermission,
	createPermissions,
	deletePermissions,
	deletePermission,
	getPermissions
}
