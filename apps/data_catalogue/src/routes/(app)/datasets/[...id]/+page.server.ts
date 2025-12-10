import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, authorise, ketoCheck } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { getFields } from '@imago/ui'
import { error } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	const data = await locals.ckan.request(get('package_show', { id: params.id }))
	const activities = await locals.ckan.request(get('package_activity_list', { id: params.id }))
	// log.debug(jstr(data))
	if (
		data.success === false ||
		Array.isArray(data.result) ||
		!data.result ||
		!data.success ||
		activities.success === false ||
		data.result.state === 'deleted'
	) {
		return error(...SERVER_ERRORS[404])
	}
	if (locals.session) {
		const permission = await ketoCheck.checkPermission({
			subjectId: locals.session?.identity.id,
			relation: 'read',
			object: params.id,
			namespace: 'Dataset'
		})
		if (!permission.allowed) {
			return error(401, { message: 'Unauthorised', id: 'Unauthorised' })
		}

		if (data.result.private) {
			await authorise({
				session: locals.session,
				namespace: 'Group',
				relation: 'users',
				object: 'admin',
				action: async () => {
					await authorise({
						session: locals.session,
						namespace: 'Group',
						relation: 'users',
						object: 'editor'
					})
				}
			})
		}
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
