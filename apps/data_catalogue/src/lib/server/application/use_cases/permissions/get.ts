import { err, ok, type ErrTypes } from '$lib/server/entities/errors'
import {
	PermissionQuerySchema,
	type Permission,
	type PermissionRequest
} from '$lib/server/entities/models/permissions'
import { type } from 'arktype'
import type { IGroupsRepository } from '$lib/server/application/repositories/groups'
import type { IUsersRepository } from '$lib/server/application/repositories/users'
import type { IIdentityService } from '$lib/server/application/services/identity'
import type { User } from '$lib/server/entities/models/users'
import type { AppContext } from '$lib/server/application/context'

export const permissionsCheckUseCase = async ({
	permissions,
	session,
	configuration,
	authorisation_module
}: {
	permissions?: Omit<Permission, 'actor'>[]
} & AppContext) => {
	const [result_errors, results] = await authorisation_module.batchAuthorise({
		permissions: permissions?.map((p) => ({ ...p, actor: session.identity.id })) ?? [],
		configuration,
		actor: session.identity.id
	})
	if (result_errors !== null) {
		return err(result_errors)
	}
	return ok(results)
}

export const permissionsGetUseCase = async ({
	data,
	session,
	configuration,
	authorisation_module
}: {
	data: unknown
} & AppContext) => {
	const schema = PermissionQuerySchema(data)
	if (schema instanceof type.errors) {
		return err({ reason: 'Invalid Data', message: schema.summary, id: 'invalid-data' })
	}
	const [errs, permissions] = await authorisation_module.getPermissions(schema)
	if (errs !== null) {
		return err(errs)
	}
	return ok(permissions)
}

export const permissionsGetActorsUseCase = async ({
	session,
	groups_repository,
	users_repository,
	identity_service,
	configuration,
	authorisation_module
}: {
	groups_repository: IGroupsRepository
	users_repository: IUsersRepository
	identity_service: IIdentityService
} & AppContext) => {
	const [groups_err, groups] = await groups_repository.getGroups({ limit: 999, offset: 0 })
	if (groups_err !== null) {
		return err(groups_err)
	}

	const [users_err, users] = await users_repository.getUsers({ limit: 999, offset: 0 })
	if (users_err !== null) {
		return err(users_err)
	}

	const identities = await Promise.all(
		users.items.map((user) =>
			identity_service.getIdentity({ id: user.id }).then(([errors, identity]) => {
				if (errors !== null) {
					if (errors.reason === 'Not Found') {
						return ok(null)
					}
					return err(errors)
				}

				return ok({
					...user,
					email: identity?.email,
					first_name: identity?.first_name,
					last_name: identity?.last_name
				})
			})
		)
	)

	const parsed_users = identities.reduce(
		(acc, [errors, resource]) => {
			if (errors !== null) {
				acc.errors.push(errors)
			}
			if (resource !== null) {
				acc.users.push(resource)
			}
			return acc
		},
		{ errors: [], users: [] } as {
			errors: ErrTypes[]
			users: (User & { first_name?: string; last_name?: string; email?: string })[]
		}
	)
	if (parsed_users.errors.length > 0) {
		return err(parsed_users.errors[0])
	}
	const parsed: {
		label: string
		actor: PermissionRequest['actor']
	}[] = [
		...groups.map((group) => ({
			label: group.title,
			actor: {
				namespace: 'Group' as const,
				relation: 'members',
				object: group.id
			}
		})),
		...parsed_users.users.map((user) => ({
			label: String(user.email),
			actor: user.id
		})),
		{ label: 'Public', actor: 'anonymous' }
	]
	return ok(parsed)
}
