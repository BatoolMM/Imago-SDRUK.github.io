import { get } from '$lib/utils/ckan/ckan.js'

export const load = async ({ locals, params }) => {
	const data = await locals.ckan.request(get('resource_show', { id: params.resource }))
	return { data }
}
