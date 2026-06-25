import { fail } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import { formGetStringOrUndefined, parseForm } from '$lib/utils/forms/index.js'
import { groupCreateController } from '$lib/server/interface/adapters/controllers/groups/create.js'
import { groupDeleteController } from '$lib/server/interface/adapters/controllers/groups/delete.js'
import {
	groupAddAllUsersController,
	groupAddUserController,
	groupRemoveUserController,
	groupUpdateController
} from '$lib/server/interface/adapters/controllers/groups/update.js'
import {
	groupGetController,
	groupGetUsersController
} from '$lib/server/interface/adapters/controllers/groups/get.js'
import { usersSearchController } from '$lib/server/interface/adapters/controllers/users/get.js'
import type { Group } from '$lib/server/entities/models/groups.js'
import {
	permissionsCheckController,
	permissionsGetController
} from '$lib/server/interface/adapters/controllers/permissions/get.js'
import type { Relationships } from '$lib/server/entities/models/permissions.js'
import { applicationGetGroupsController } from '$lib/server/interface/adapters/controllers/application/get.js'

export const load = async ({ locals, url }) => {
	let allow_manage = false
	const [check_errs, check] = await permissionsCheckController({
		permissions: [{ namespace: 'Application', object: 'groups', permits: 'manage' }],
		configuration: locals.configuration,
		session: locals.session
	})
	if (check_errs === null) {
		if (check.results.every((check) => check.allowed)) {
			allow_manage = true
		}
	}

	const [errors, groups] = await applicationGetGroupsController({
		configuration: locals.configuration,
		session: locals.session
	})
	if (errors !== null) {
		error(500, { message: errors.reason, id: errors.reason })
	}
	const edit = url.searchParams.get('edit')
	let group: Group | null = null
	let group_users: { first_name: string; last_name: string; email: string; id: string }[] = []
	let group_permissions_actions: Relationships | null = null
	let group_permissions_settings: Relationships | null = null
	// let existing: Relationships | null = null
	if (edit) {
		;[group, group_users, group_permissions_actions, group_permissions_settings] =
			await Promise.all([
				await groupGetController({
					configuration: locals.configuration,
					session: locals.session,
					id: edit,
					permissions: [{ namespace: 'Application', object: 'groups', permits: 'read' }]
				}).then(([errors, users]) => {
					if (errors !== null) {
						error(500, { message: errors.reason, id: errors.reason })
					}
					return users
				}),
				await groupGetUsersController({
					configuration: locals.configuration,
					session: locals.session,
					group_id: edit
				}).then(([errors, users]) => {
					if (errors !== null) {
						error(500, { message: errors.reason, id: errors.reason })
					}
					return users
				}),
				await permissionsGetController({
					configuration: locals.configuration,
					session: locals.session,
					data: {
						namespace: 'Action',
						actor: { namespace: 'Group', object: edit, relation: 'members' }
					}
				}).then(([errors, users]) => {
					if (errors !== null) {
						error(500, { message: errors.reason, id: errors.reason })
					}
					return users
				}),
				await permissionsGetController({
					configuration: locals.configuration,
					session: locals.session,
					data: {
						namespace: 'Application',
						actor: { namespace: 'Group', object: edit, relation: 'members' }
					}
				}).then(([errors, users]) => {
					if (errors !== null) {
						error(500, { message: errors.reason, id: errors.reason })
					}
					return users
				})
			])
	}
	return {
		allow_manage,
		groups,
		group_users,
		group,
		group_permissions_actions,
		group_permissions_settings
	}
}

export const actions = {
	create: async ({ locals, request }) => {
		const form = parseForm(await request.formData())
		const [errors] = await groupCreateController({
			configuration: locals.configuration,
			data: form,
			session: locals.session
		})
		if (errors !== null) {
			console.log(errors)
			return fail(500, { message: errors.reason })
		}
		return {
			message: 'Group created'
		}
	},
	edit: async ({ locals, request }) => {
		const form = await request.formData()
		const id = formGetStringOrUndefined({ form, field: 'id' })
		const data = parseForm(form)
		const [errors, group] = await groupUpdateController({
			configuration: locals.configuration,
			id,
			data: data,
			session: locals.session
		})
		if (errors !== null) {
			console.log(errors)
			return fail(500, { message: errors.reason })
		}
		console.log(group)
		return {
			message: 'Group updated'
		}
	},
	// toggle_autoenroll: async ({ locals, request }) => {
	// 	const form = await request.formData()
	// 	const id = formGetStringOrUndefined({ form, field: 'id' })
	// 	const autoenroll = formGetStringOrUndefined({ form, field: 'autoenroll' })
	// 	const is_autoenroll = autoenroll === 'on' ? true : false
	// 	const [errors, group] = await groupToggleAutoenrollController({
	// 		configuration: locals.configuration,
	// 		id,
	// 		autoenroll: is_autoenroll,
	// 		session: locals.session
	// 	})
	// 	if (errors !== null) {
	// 		console.log(errors)
	// 		return fail(500, { message: errors.message ?? errors.reason })
	// 	}
	// 	console.log(group)
	// 	return {
	// 		message: `Group autoenroll set to ${group.autoenroll}`
	// 	}
	// },
	delete: async ({ locals, request }) => {
		const form = await request.formData()
		const id = formGetStringOrUndefined({ form, field: 'id' })
		const [errors] = await groupDeleteController({
			configuration: locals.configuration,
			id,
			session: locals.session
		})
		if (errors !== null) {
			return fail(500, { message: errors.reason })
		}
		return {
			message: 'Group deleted'
		}
	},
	add_user: async ({ locals, request }) => {
		const form = await request.formData()
		const payload = {
			user_id: formGetStringOrUndefined({ form, field: 'user_id' }),
			group_id: formGetStringOrUndefined({ form, field: 'group_id' })
		}
		const [errors] = await groupAddUserController({
			configuration: locals.configuration,
			session: locals.session,
			data: payload
		})
		if (errors !== null) {
			console.log(errors)
			return fail(500, { message: errors.reason })
		}
		return {
			message: `User successfully added`
		}
	},

	add_all_users: async ({ locals, request }) => {
		const form = await request.formData()
		const group_id = formGetStringOrUndefined({ form, field: 'group_id' })
		const [errors] = await groupAddAllUsersController({
			group_id,
			configuration: locals.configuration,
			session: locals.session
		})
		if (errors !== null) {
			console.log(errors)
			return fail(500, { message: errors.reason })
		}
		return {
			message: `User successfully added`
		}
	},
	remove_user: async ({ locals, request }) => {
		const form = await request.formData()
		const payload = {
			user_id: formGetStringOrUndefined({ form, field: 'user_id' }),
			group_id: formGetStringOrUndefined({ form, field: 'group_id' })
		}
		const [errors] = await groupRemoveUserController({
			configuration: locals.configuration,
			session: locals.session,
			...payload
		})
		if (errors !== null) {
			return fail(500, { message: errors.reason })
		}
		return {
			message: `User successfully added`
		}
	},
	search_users: async ({ locals, request }) => {
		const form = await request.formData()
		const identifier = formGetStringOrUndefined({ form, field: 'identifier' })
		const [errors, users] = await usersSearchController({
			configuration: locals.configuration,
			session: locals.session,
			identifier: String(identifier)
		})
		if (errors !== null) {
			return fail(500, { message: errors.reason })
		}
		return {
			message: `Ok`,
			users
		}
	}
	// add_action: async ({ locals, request }) => {
	// 	const form = await request.formData()
	// 	const group_id = formGetStringOrUndefined({ form, field: 'group_id' })
	// 	const object = formGetStringOrUndefined({ form, field: 'object' })
	// 	const payload: PermissionRequest = {
	// 		actor: { object: group_id, namespace: 'Group', relation: 'members' },
	// 		namespace: 'Action',
	// 		object: object,
	// 		relation: 'groups'
	// 	}
	// 	const [errors, permission] = await permissionCreateController({
	// 		configuration: locals.configuration,
	// 		session: locals.session,
	// 		data: payload
	// 	})
	// 	if (errors !== null) {
	// 		return fail(500, { message: errors.reason })
	// 	}
	// 	return {
	// 		message: 'ok'
	// 	}
	// },
	// remove_action: async ({ locals, request }) => {
	// 	const form = await request.formData()
	// 	const group_id = formGetStringOrUndefined({ form, field: 'group_id' })
	// 	const object = formGetStringOrUndefined({ form, field: 'object' })
	// 	const payload: PermissionRequest = {
	// 		actor: { object: group_id, namespace: 'Group', relation: 'members' },
	// 		namespace: 'Action',
	// 		object: object,
	// 		relation: 'groups'
	// 	}
	// 	const [errors, permission] = await permissionDeleteController({
	// 		configuration: locals.configuration,
	// 		session: locals.session,
	// 		data: payload
	// 	})
	// 	if (errors !== null) {
	// 		return fail(500, { message: errors.reason })
	// 	}
	// 	return {
	// 		message: 'ok'
	// 	}
	// }
}
