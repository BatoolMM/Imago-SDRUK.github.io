import { get } from '$lib/utils/ckan/ckan.js'
import { getFields } from '@imago/ui'
import { error } from 'console'
import slugify from '@sindresorhus/slugify'

export const load = async ({ locals, params }) => {
	const data = await locals.ckan.request(get('package_show', { id: params.id }))
	if (Array.isArray(data.result)) {
		return error(404, 'ok')
	}
	const fields = getFields(data.result, [
		'author',
		'license_id',
		'license_title',
		'license_url',
		'mantainer',
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
		'type',
		'extras',
		'resources',
		'tabs',
		'groups'
	])
	// const data = await locals.ckan.request(get('package_show', { id: params.id }))
	return {
		result: fields
	}
}
