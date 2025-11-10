import { get } from '$lib/utils/ckan/ckan.js'
import type { PageServerLoadEvent } from './$types.js'
export const load = async ({ locals }: PageServerLoadEvent) => {
	console.log(await locals.ckan.request(get('tag_list')))
	return {
		package_count: (await locals.ckan.request(get('package_list'))).result.length,
		tag_count: (await locals.ckan.request(get('tag_list'))).result.length
	}
}
