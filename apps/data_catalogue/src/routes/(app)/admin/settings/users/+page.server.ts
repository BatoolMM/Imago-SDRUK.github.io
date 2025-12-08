import { fail } from '@sveltejs/kit'
import { authorise, ketoRead, ketoWrite, kratosRead } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { AUTH_GROUPS } from '$lib/globals/auth.js'
import type { Identity } from '@ory/client-fetch'
export const load = async ({ locals, fetch }) => {
	await authorise({
		namespace: 'Endpoint',
		object: '/api/v1/users',
		relation: 'GET',
		session: locals.session
	})
	const res = await fetch(`/api/v1/users`)
	const { users } = (await res.json()) as { users: Identity[] }
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
		await authorise({
			namespace: 'Endpoint',
			object: '/api/v1/users',
			relation: 'POST',
			session: locals.session
		})
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
