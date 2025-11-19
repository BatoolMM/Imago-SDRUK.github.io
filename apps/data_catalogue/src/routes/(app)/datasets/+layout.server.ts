import { get } from '$lib/utils/ckan/ckan.js'
import { error } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	const groups = await locals.ckan.request(
		get('group_list', {
			all_fields: true
		})
	)
	if (!groups.success || !Array.isArray(groups.result)) {
		error(400, { message: `There's been an issue retreiving the groups`, id: 'err' })
	}
	return {
		groups: groups
	}
}
