import type { IAuthorisationService } from '$lib/server/application/services/autorisation'
import type { Relationships } from '$lib/server/entities/models/permissions'

const authorise: IAuthorisationService['authorise'] = async () => {
	return [null, { allowed: true }]
}

const batchAuthorise: IAuthorisationService['batchAuthorise'] = async ({ permissions }) => {
	return [null, { results: permissions.map(() => ({ allowed: true })) }]
}

const createPermission: IAuthorisationService['createPermission'] = async ({
	namespace,
	object,
	relation,
	actor
}) => {
	return [
		null,
		{
			namespace,
			object,
			relation,
			actor
		}
	]
}

const createPermissions: IAuthorisationService['createPermissions'] = async () => {
	return [null, null]
}

const deletePermissions: IAuthorisationService['deletePermissions'] = async () => {
	return [null, null]
}

const deletePermission: IAuthorisationService['deletePermission'] = async () => {
	return [null, null]
}

const getPermissions: IAuthorisationService['getPermissions'] = async () => {
	const relationships: Relationships = { next_page_token: '', relation_tuples: [] }
	return [null, relationships]
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
