import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, checkPermission } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { getFields } from '@imago/ui'
import { redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
export const load = async ({ locals, params }) => {
	await authorise({
		namespace: 'Resource',
		object: params.resource,
		relation: 'read',
		session: locals.session,
		action: () => redirect(307, '/auth/login')
	})
	const data = await locals.ckan.request(get('resource_show', { id: params.resource }))
	if (Array.isArray(data.result) || !data.result || !data.success) {
		return error(...SERVER_ERRORS[404])
	}
	const result = getFields(data.result, [
		'format',
		'id',
		'mimetype',
		'mimetype_inner',
		'name',
		'package_id',
		'last_modified',
		'hash',
		'download_url',
		'description',
		'state',
		'size',
		'created',
		'url'
	])
	return { data: { ...data, result } }
}
