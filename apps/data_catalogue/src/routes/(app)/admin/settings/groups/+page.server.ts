import { fail, redirect } from '@sveltejs/kit'
import { authorise, ketoRead } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { error } from '@sveltejs/kit'
import { parseForm } from '$lib/utils/forms/index.js'

export const load = async ({ locals }) => {
	await authorise({
		namespace: 'Group',
		relation: 'users',
		session: locals.session,
		object: 'admin'
	})

	const auth_groups = await ketoRead.getRelationships({ namespace: 'Group' })
	// const missing_groups = AUTH_GROUPS.filter((group) =>
	// 	relationships.relation_tuples?.findIndex((tuple) => tuple.subject_id === group)
	// )
	const ckan_groups = await locals.ckan.request(get('group_list', { all_fields: true }))
	if (!ckan_groups.success) {
		error(400, { message: 'Error getting CKAN groups', id: '' })
	}
	return {
		auth_groups,
		ckan_groups
	}
}

export const actions = {
	create: async ({ locals, request, fetch }) => {
		if (!locals.session) {
			return redirect(307, '/')
		}
		const form = parseForm(await request.formData())
		const res = await fetch(`/api/v1/groups`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(form)
		}).catch(() => error(500, { message: 'Error saving group', id: 'err' }))
		const data = await res.json()
		if (!res.ok) {
			return fail(res.status, data)
		}
		return {
			message: 'Group created'
		}
	},
	delete: async ({ locals, request, fetch }) => {
		if (!locals.session) {
			return redirect(307, '/')
		}
		const form = parseForm(await request.formData())
		if ('id' in form === false) {
			return fail(400, { message: 'You need to provide an ID' })
		}
		const res = await fetch(`/api/v1/groups/${form.id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(form)
		}).catch(() => error(500, { message: 'Error deleting group', id: 'err' }))
		const data = await res.json()
		if (!res.ok) {
			return fail(res.status, data)
		}
		return {
			message: 'Group deleted'
		}
	}
}
