import { db } from '$lib/db/index.js'
import { resource_versions } from '$lib/db/schema/resources.js'
import { SERVER_ERRORS } from '$lib/globals/server.js'
import type { CSVW } from '$lib/types/csvw.js'
import { authorise } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { csvwToDatastore, datastoreToCsvw, testCSVW } from '$lib/utils/datastore/index.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { jstr } from '@arturoguzman/art-ui'
import { getFields } from '@imago/ui'
import { error, redirect } from '@sveltejs/kit'
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
	if (!data.success) {
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
		// 'download_url',
		'description',
		'state',
		'size',
		'created',
		'url',
		'datastore_active'
	])
	let datastore: CSVW | null = null
	if (result.datastore_active) {
		const res = await locals.ckan.request(get('datastore_info', { resource_id: params.resource }))
		console.log(jstr(res))
		if (res.success) {
			datastore = datastoreToCsvw(res.result)
		}
	}
	const test = csvwToDatastore({ id: data.result.id, csvw: testCSVW })
	return { data: { ...data, result }, versions, datastore, test }
}
