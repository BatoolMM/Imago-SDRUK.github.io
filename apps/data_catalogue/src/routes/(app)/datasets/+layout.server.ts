import { ketoCheck } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { error } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	let allow_create = false
	if (locals.session?.identity.id) {
		const permissions = await ketoCheck.checkPermission({
			namespace: 'Endpoint',
			object: '/api/v1/datasets',
			relation: 'POST',
			subjectId: locals.session?.identity.id
		})
		allow_create = permissions.allowed
	}
	const groups = await locals.ckan.request(
		get('group_list', {
			all_fields: true
		})
	)
	if (!groups.success || !Array.isArray(groups.result)) {
		error(400, { message: `There's been an issue retreiving the groups`, id: 'err' })
	}
	return {
		groups: groups,
		allow_create
	}
}
