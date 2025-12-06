import { fail, redirect } from '@sveltejs/kit'
import { ketoCheck, ketoRead, ketoWrite, kratosRead } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { AUTH_GROUPS } from '$lib/globals/auth.js'
export const load = async ({ locals }) => {
	if (!locals.session) {
		return redirect(307, '/')
	}
	const users = await kratosRead.listIdentities()
	const active_groups = await ketoRead.getRelationships({ namespace: 'Group' })
	const ckan_groups = await locals.ckan.request(get('group_list'))
	let groups = [...AUTH_GROUPS]
	if (ckan_groups.success) {
		groups = [...groups, ...ckan_groups.result]
	}
	return {
		ckan_groups,
		groups,
		users: users.map((user) => ({
			name: user.traits.name,
			email: user.traits.email,
			id: user.id,
			groups: active_groups.relation_tuples?.filter(
				(relation) => relation.relation === 'users' && relation.subject_id === user.id
			)
		}))
	}
}

export const actions = {
	edit_user_groups: async ({ locals, request }) => {
		if (!locals.session) {
			return fail(401, { message: 'Unauthorised' })
		}
		const form = await request.formData()
		const roles = JSON.parse(String(form.get('roles')))
		console.log(roles[0])
		const exists = await ketoRead.getRelationships(roles[0])
		console.log(exists)
		if (
			exists.relation_tuples?.filter((relation) => relation.subject_id === roles[0].subject_id)
				.length === 0
		) {
			console.log(roles[0])
			const create = await ketoWrite.createRelationship({ createRelationshipBody: roles[0] })
			console.log(create)
		}
		return {
			message: 'ok'
		}
	}
}
