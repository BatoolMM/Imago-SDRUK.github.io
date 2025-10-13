import { get } from '$lib/utils/ckan/ckan.js'

export const load = async ({ locals, params }) => {
	const data = await locals.ckan.request(get('package_show', { id: params.id }))
	// const data = await locals.ckan.request(get('package_show', { id: params.id }))
	return { data }
}
