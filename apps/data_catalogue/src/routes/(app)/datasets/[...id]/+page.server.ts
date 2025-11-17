import { SERVER_ERRORS } from '$lib/globals/server.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { getSignedDownloadUrl, loadStorageClient } from '$lib/utils/files/azure/index.js'
import { getFields } from '@imago/ui'
import { error } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	const data = await locals.ckan.request(get('package_show', { id: params.id }))
	const activities = await locals.ckan.request(get('package_activity_list', { id: params.id }))
	// console.log(jstr(data))
	if (Array.isArray(data.result) || !data.result || !data.success || activities.success === false) {
		return error(...SERVER_ERRORS[404])
	}
	const fields = getFields(data.result, [
		'author',
		'isopen',
		'owner_org',
		'version',
		'id',
		'url',
		'creator_user_id',
		'relationships_as_subject',
		'relationships_as_object',
		'author_email',
		'license_id',
		'license_title',
		'license_url',
		'maintainer',
		'maintainer_email',
		'metadata_created',
		'metadata_modified',
		'name',
		'notes',
		'num_resources',
		'num_tags',
		'organization',
		'private',
		'state',
		'title',
		'tags',
		'type',
		'extras',
		'resources',
		'tabs',
		'groups'
	])
	// const data = await locals.ckan.request(get('package_show', { id: params.id }))
	// if (!locals.session) {
	// const client = loadStorageClient()
	// fields.resources = fields.resources.map((resource) => {
	// 	const resource_url = getSignedDownloadUrl({ ...client, filename: resource.id })
	// 	return {
	// 		...resource,
	// 		url: resource_url,
	// 		download_url: resource_url
	// 	}
	// })
	// }
	return {
		result: fields,
		activities
	}
}
