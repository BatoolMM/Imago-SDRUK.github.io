import { authorise } from '$lib/utils/auth/index.js'
import { create } from '$lib/utils/ckan/ckan.js'
import slugify from '@sindresorhus/slugify'
import { json } from '@sveltejs/kit'

export const POST = async ({ locals, request }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/groups',
		relation: 'POST'
	})
	const body = await request.json()
	const data = {
		...body,
		name: slugify(body.display_name),
		title: body.display_name,
		type: 'group',
		state: 'active',
		approval_status: 'approved'
	}
	await locals.ckan.request(create('group_create', data))
	return json({ message: 'ok' })
}
