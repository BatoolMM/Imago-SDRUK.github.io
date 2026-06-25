import { form, getRequestEvent } from '$app/server'
import { PermissionRequestSchema } from '$lib/server/entities/models/permissions'
import { permissionCreateController } from '$lib/server/interface/adapters/controllers/permissions/create'
import {
	permissionDeleteController,
	permissionsDeleteController
} from '$lib/server/interface/adapters/controllers/permissions/delete'
import { error } from '@sveltejs/kit'
import { type } from 'arktype'

export const togglePermission = form(
	PermissionRequestSchema.merge(type({ 'create?': 'boolean' })),
	async ({ actor, object, relation, namespace, create }) => {
		const { locals } = getRequestEvent()
		if (create) {
			const [errors, permission] = await permissionCreateController({
				configuration: locals.configuration,
				session: locals.session,
				data: {
					actor,
					object,
					relation,
					namespace
				}
			})
			if (errors !== null) {
				error(500, { message: errors.reason, id: '' })
			}
			return {
				message: 'ok',
				permission
			}
		}
		const [errors] = await permissionDeleteController({
			configuration: locals.configuration,
			session: locals.session,
			data: {
				actor,
				object,
				relation,
				namespace
			}
		})
		if (errors !== null) {
			error(500, { message: errors.reason, id: '' })
		}
		return {
			message: 'ok'
		}
	}
)

export const toggleSettingsPermission = form(
	PermissionRequestSchema.merge(type({ relation: '"admins" | "viewers" | ""' })),
	async ({ actor, object, relation, namespace }) => {
		const { locals } = getRequestEvent()
		if (relation !== '') {
			await permissionsDeleteController({
				configuration: locals.configuration,
				session: locals.session,
				data: [
					{
						actor,
						object,
						relation: 'admins',
						namespace
					},
					{
						actor,
						object,
						relation: 'viewers',
						namespace
					}
				]
			})

			const [errors, permission] = await permissionCreateController({
				configuration: locals.configuration,
				session: locals.session,
				data: {
					actor,
					object,
					relation,
					namespace
				}
			})
			if (errors !== null) {
				error(500, { message: errors.reason, id: '' })
			}
			return {
				message: 'ok',
				permission
			}
		}

		const [errors] = await permissionsDeleteController({
			configuration: locals.configuration,
			session: locals.session,
			data: [
				{
					actor,
					object,
					relation: 'admins',
					namespace
				},
				{
					actor,
					object,
					relation: 'viewers',
					namespace
				}
			]
		})

		if (errors !== null) {
			error(500, { message: errors.reason, id: '' })
		}
		return {
			message: 'ok'
		}
	}
)
