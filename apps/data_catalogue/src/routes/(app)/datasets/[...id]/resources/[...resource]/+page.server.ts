import { db } from '$lib/db/index.js'
import { resource_versions } from '$lib/db/schema/resources.js'
import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, checkPermission } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { getFields } from '@imago/ui'
import { redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
export const load = async ({ locals, params }) => {
	await authorise({
		namespace: 'Resource',
		object: params.resource,
		relation: 'read',
		session: locals.session,
		action: () => redirect(307, '/auth/login')
	})
	const versions = await db
		.select()
		.from(resource_versions)
		.where(eq(resource_versions.resource, params.resource))
		.catch(handleDBError('There are no versions for this resource'))
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
	return { data: { ...data, result }, versions }
}
