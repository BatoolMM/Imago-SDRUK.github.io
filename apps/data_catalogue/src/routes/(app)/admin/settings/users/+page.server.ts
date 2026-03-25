import { error, fail } from '@sveltejs/kit'
import { log } from '$lib/utils/server/logger.js'
import { authorise, ketoRead, ketoWrite } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { AUTH_GROUPS } from '$lib/globals/auth.js'
import type { Identity } from '@ory/client-fetch'
import { formGetStringOrUndefined } from '$lib/utils/forms/index.js'
export const load = async ({ locals, fetch, url }) => {
	await authorise({
		namespace: 'Endpoint',
		object: '/api/v1/users',
		relation: 'GET',
		session: locals.session
	})
	const built_url = new URL(`${env.ORIGIN ?? 'http://127.0.0.1:5174'}/api/v1/users`)
	const page_size = url.searchParams.get('page_size')
	const per_page = url.searchParams.get('per_page') ?? '50'
	const page = url.searchParams.get('page') ?? '0'
	if (page_size) built_url.searchParams.append('page_size', page_size)
	if (per_page) built_url.searchParams.append('per_page', per_page)
	if (page) built_url.searchParams.append('page', page)
	const res = await fetch(built_url)
	const { users } = (await res.json()) as {
		users: { first_name: string; last_name: string; id: string; email: string }[]
	}
	const edit = url.searchParams.get('edit')
	let user = null
	let answers = null
	if (edit) {
		user = (await fetch(`/api/v1/users/${edit}`).then((res) => res.json())) as {
			first_name: string
			last_name: string
			email: string
			id: string
			preferences: Record<PropertyKey, unknown>
			created_at: string
			updated_at: string
			deleted_at: string
		}
		answers = await fetch(`/api/v1/users/${edit}/answers`).then((res) => res.json())
	}
	return {
		groups,
		users: users.map((user) => ({
			first_name: user.traits.name.first,
			last_name: user.traits.name.last,
			email: user.traits.email,
			id: user.id,
			groups: active_groups.relation_tuples?.filter(
				(relation) => relation.relation === 'users' && relation.subject_id === user.id
			)
		})),
		user,
		answers
	}
}

export const actions = {
	add_group: async ({ request, fetch }) => {
		const form = await request.formData()
		const relationship = {
			namespace: 'Group',
			object: formGetStringOrUndefined({ form, field: 'object' }),
			relation: 'users',
			subject_id: formGetStringOrUndefined({ form, field: 'subject_id' })
		}
		const res = await fetch(`/api/v1/permissions/Group`, {
			method: 'POST',
			body: JSON.stringify(relationship)
		})

		if (res.ok) {
			return {
				message: `Added user to group ${relationship.object}`
			}
		}
		const error = await res.json()
		return fail(res.status, { message: error.message })
	},
	remove_group: async ({ request, fetch }) => {
		const form = await request.formData()
		const relationship = {
			namespace: 'Group',
			object: formGetStringOrUndefined({ form, field: 'object' }),
			relation: 'users',
			subject_id: formGetStringOrUndefined({ form, field: 'subject_id' })
		}
		const res = await fetch(`/api/v1/permissions/Group`, {
			method: 'DELETE',
			body: JSON.stringify(relationship)
		})

		if (res.ok) {
			return {
				message: `Removed user from group ${relationship.object}`
			}
		}
		const error = await res.json()
		return fail(res.status, { message: error.message })
		// return fail(res.status, { message: res.statusText })
	},
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
		log.debug(roles[0])
		const exists = await ketoRead.getRelationships(roles[0])
		log.debug(exists)
		if (
			exists.relation_tuples?.filter((relation) => relation.subject_id === roles[0].subject_id)
				.length === 0
		) {
			log.debug(roles[0])
			const create = await ketoWrite.createRelationship({ createRelationshipBody: roles[0] })
			log.debug(create)
		}
		return {
			message: 'ok'
		}
	},
	delete: async ({ request, fetch }) => {
		const form = await request.formData()
		const id = form.get('id')
		if (typeof id === 'string') {
			const res = await fetch(`/api/v1/users/${id}`, { method: 'DELETE' })
			const data = await res.json()
			return {
				message: data.message
			}
		}
		return fail(400, { message: 'Provide a valid id' })
	}
}
