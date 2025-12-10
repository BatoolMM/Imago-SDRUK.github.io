import { authorise } from '$lib/utils/auth/index.js'
import { log } from '$lib/utils/server/logger.js'
import { patch } from '$lib/utils/ckan/ckan'
import { json } from '@sveltejs/kit'

export const PATCH = async ({ request, locals, params }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/datasets',
		relation: 'PATCH'
	})
	const data = await request.json()
	const dataset = await locals.ckan.request(
		patch('package_patch', { id: params.id }, { extras: data.extras, id: params.id })
	)
	log.debug(dataset)
	return json({ dataset }, { statusText: 'ok' })
}
