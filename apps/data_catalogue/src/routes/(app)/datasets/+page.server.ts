import { get } from '$lib/utils/ckan/ckan.js'
import type { PageServerLoadEvent } from './$types.js'
export const load = async ({ locals }: PageServerLoadEvent) => {
	const data = await locals.ckan.request(get('current_package_list_with_resources'))
	return {
		data,
		datasets: await locals.ckan.request(get('package_list')),
		groups: await locals.ckan.request(get('group_list')),
		organisations: await locals.ckan.request(get('organization_list')),
		tags: await locals.ckan.request(get('tag_list')),
		resources: await locals.ckan.request(get('format_autocomplete')),
		licenses: await locals.ckan.request(get('license_list'))
	}
}
