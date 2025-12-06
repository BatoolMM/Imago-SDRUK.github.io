import { ketoCheck } from '$lib/utils/auth/index.js'
import { patch } from '$lib/utils/ckan/ckan'
import { json } from '@sveltejs/kit'
import { error } from 'console'

export const PATCH = async ({ request, locals, params }) => {
	const permissions = await ketoCheck.checkPermission({
		namespace: 'Dataset',
		object: params.id,
		relation: 'edit',
		subjectId: locals.session?.identity.id
	})
	if (!permissions.allowed) {
		error(401, 'Unautorised')
	}
	const data = await request.json()
	const dataset = await locals.ckan.request(
		patch('package_patch', { id: params.id }, { extras: data.extras, id: params.id })
	)
	console.log(dataset)
	return json({ dataset }, { statusText: 'ok' })
}
