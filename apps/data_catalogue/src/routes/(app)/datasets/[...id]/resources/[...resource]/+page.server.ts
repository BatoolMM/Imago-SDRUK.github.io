import { SERVER_ERRORS } from '$lib/globals/server.js'
import { checkPermission } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { getFields } from '@imago/ui'
import { error } from '@sveltejs/kit'
export const load = async ({ locals, params }) => {
	const permission = await checkPermission({
		subject_id: locals.session?.identity.id,
		relation: 'read',
		object: params.resource,
		namespace: 'Resource'
	})
	if (!permission) {
		return error(401, { message: 'Unauthorised', id: 'Unauthorised' })
	}
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
