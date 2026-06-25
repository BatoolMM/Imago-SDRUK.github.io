import type { AppContext } from '$lib/server/application/context'
import { err, ok } from '$lib/server/entities/errors'

export const applicationToggleSettingsAccess = async ({
	enable,
	group_id,
	object,
	relation,
	configuration,
	session,
	authorisation_module
}: {
	enable?: boolean
	group_id: string
	object: string
	relation?: string | null
} & AppContext) => {
	const [errors, permission] = await authorisation_module.authorise({
		actor: session.identity.id,
		namespace: 'Action',
		object: 'permissions',
		permits: 'create',
		configuration
	})
	if (errors) {
		return err(errors)
	}
	if (!permission.allowed) {
		return err({ reason: 'Unauthorised' })
	}
	const [permissions_errors, permissions] = await authorisation_module.deletePermissions({
		permissions: [
			{
				actor: group_id,
				object: 'datasets',
				relation: 'admins',
				namespace: 'Application'
			},
			{
				actor: group_id,
				object: 'datasets',
				relation: 'viewers',
				namespace: 'Application'
			}
		]
	})
	if (permissions_errors !== null) {
		return err(permissions_errors)
	}
	if (enable && relation && relation !== '') {
		const base_permissions = [
			{
				actor: group_id,
				object: object,
				relation: relation,
				namespace: 'Application' as const
			}
		]
		const [errs, permissions] = await authorisation_module.createPermissions({
			permissions: base_permissions
		})
		if (errs !== null) {
			return err(errs)
		}
		return ok(permissions)
	}
	return ok(permissions)
}
