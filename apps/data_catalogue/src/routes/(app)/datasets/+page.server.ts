import { get } from '$lib/utils/ckan/ckan.js'
import { jstr } from '@arturoguzman/art-ui'
import type { PageServerLoadEvent } from './$types.js'
export const load = async ({ locals, url }: PageServerLoadEvent) => {
	const offset = url.searchParams.get('offset') ? Number(url.searchParams.get('offset')) : 0
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 10
	if (offset === 0) {
		url.searchParams.delete('offset')
	}
	const data = await locals.ckan.request(
		get('current_package_list_with_resources', { offset: offset <= 0 ? 0 : offset, limit })
	)
	if (data.success === false) {
		console.log(jstr(data.result))
	}
	const resources = [
		...new Set(data.result.flatMap(({ resources }) => resources).map((r) => r.format))
	]
	return {
		data,
		datasets: await locals.ckan.request(get('package_list')),
		datasets_count: (await locals.ckan.request(get('package_list'))).result.length,
		groups: await locals.ckan.request(get('group_list')),
		organisations: await locals.ckan.request(get('organization_list')),
		tags: await locals.ckan.request(get('tag_list')),
		resources: { result: resources },
		licenses: await locals.ckan.request(get('license_list'))
	}
}
