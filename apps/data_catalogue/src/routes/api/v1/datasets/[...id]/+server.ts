import { authorise, ketoCheck } from '$lib/utils/auth/index.js'
import { patch } from '$lib/utils/ckan/ckan'
import { json } from '@sveltejs/kit'

export const PATCH = async ({ request, locals, params }) => {
	await authorise({
		namespace: 'Dataset',
		relation: 'PATCH',
		object: '/api/v1/datasets',
		subjectId: locals.session?.identity.id
	})
	const data = await request.json()
	const dataset = await locals.ckan.request(
		patch('package_patch', { id: params.id }, { extras: data.extras, id: params.id })
	)
	console.log(dataset)
	return json({ dataset }, { statusText: 'ok' })
}
