import { fail } from '@sveltejs/kit'
import { log } from '$lib/utils/server/logger.js'
import { authorise, ketoRead, ketoWrite } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { AUTH_GROUPS } from '$lib/globals/auth.js'
import { env } from '$env/dynamic/private'
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
	const ckan_groups = await locals.ckan.request(get('group_list'))
	const groups = [...AUTH_GROUPS, ...(ckan_groups.success ? ckan_groups.result : [])]
	return {
		groups,
		users
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
	}
}
