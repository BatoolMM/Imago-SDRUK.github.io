import { get } from '$lib/utils/ckan/ckan.js'
import type { PageServerLoadEvent } from './$types.js'
export const load = async ({ locals }: PageServerLoadEvent) => {
	const data = await locals.ckan.request(get('package_list'))
	return { data }
}
