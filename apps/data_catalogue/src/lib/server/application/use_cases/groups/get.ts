import type { AppContext } from '$lib/server/application/context'
import type { IGroupsRepository } from '$lib/server/application/repositories/groups'
import type { IIdentityService } from '$lib/server/application/services/identity'
import { err, ok } from '$lib/server/entities/errors'

export const groupGetUseCase = async ({
	id,
	session,
	groups_repository,
	configuration,
	authorisation_module,
	permissions
}: {
	id: string
	groups_repository: IGroupsRepository
} & AppContext) => {
	const [errors, permission] = await authorisation_module.batchAuthorise({
		permissions: [
			{
				actor: session.identity.id,
				namespace: 'Group',
				object: id,
				permits: 'members'
			},
			...(permissions?.map((x) => ({ ...x, actor: session.identity.id })) ?? [])
		],
		configuration,
		actor: session.identity.id
	})
	if (errors) {
		return err(errors)
	}
	if (!permission.results.some((res) => res.allowed)) {
		return err({ reason: 'Unauthorised' })
	}
	const [rg_errors, group] = await groups_repository.getGroup({ id })
	if (rg_errors !== null) {
		// HACK: remove exception once groups are migrated
		if (rg_errors.reason !== 'Invalid Data') {
			return err(rg_errors)
		}
	}
	return ok(group)
}

export const groupsGetUseCase = async ({
	session,
	groups_repository,
	authorisation_module,
	configuration
}: {
	groups_repository: IGroupsRepository
} & AppContext) => {
	const [errors, permission] = await authorisation_module.authorise({
		actor: session.identity.id,
		namespace: 'Application',
		object: 'groups',
		permits: 'read',
		configuration
	})
	if (errors) {
		return err(errors)
	}
	if (!permission.allowed) {
		return err({ reason: 'Unauthorised' })
	}

	const [rg_errors, groups] = await groups_repository.getGroups({
		limit: 1000,
		offset: 0
	})
	if (rg_errors !== null) {
		return err(rg_errors)
	}

	return ok(groups)
}

export const groupGetUsersUseCase = async ({
	session,
	groups_repository,
	group_id,
	identity_service,
	configuration,
	authorisation_module
}: {
	group_id: string
	groups_repository: IGroupsRepository
	identity_service: IIdentityService
} & AppContext) => {
	const [errors, permission] = await authorisation_module.authorise({
		actor: session.identity.id,
		namespace: 'Application',
		object: 'groups',
		permits: 'read',
		configuration
	})
	if (errors) {
		return err(errors)
	}
	if (!permission.allowed) {
		return err({ reason: 'Unauthorised' })
	}

	const [rg_errors, users] = await groups_repository.getGroupUsers({ id: group_id })
	if (rg_errors !== null) {
		return err(rg_errors)
	}
	if (users.length === 0) {
		return ok([])
	}
	const [i_errs, identities] = await identity_service.getIdentities({
		ids: users.map(({ id }) => id)
	})
	if (i_errs !== null) {
		return err(i_errs)
	}
	return ok(identities)
}
