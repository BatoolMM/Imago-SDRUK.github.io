import { get } from '$lib/utils/ckan/ckan.js'
import type { PageServerLoadEvent } from './$types.js'
export const load = async ({ locals }: PageServerLoadEvent) => {
	return {
		package_count: (await locals.ckan.request(get('package_list'))).result.length,
		organisation_count: (await locals.ckan.request(get('organization_list'))).result.length,
		tag_count: (await locals.ckan.request(get('tag_list'))).result.length
	}
}
