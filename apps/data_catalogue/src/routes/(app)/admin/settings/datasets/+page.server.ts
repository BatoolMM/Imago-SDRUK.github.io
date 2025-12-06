import { error, fail, redirect } from '@sveltejs/kit'
import { ketoCheck, ketoRead, ketoWrite, kratosRead } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { jstr } from '@arturoguzman/art-ui'
import { AUTH_GROUPS } from '$lib/globals/auth.js'
export const load = async ({ locals }) => {
	if (!locals.session) {
		return redirect(307, '/')
	}
	const relationships = await ketoRead.getRelationships({ namespace: 'Dataset' })
	const ckan_groups = await locals.ckan.request(get('group_list'))
	let groups = [...AUTH_GROUPS]
	if (ckan_groups.success) {
		groups = [...groups, ...ckan_groups.result]
	}
	const datasets = await locals.ckan.request(
		get('package_search', { include_private: true, include_drafts: true })
	)
	if (!datasets.success) {
		return error(500, { message: 'err', id: 'err' })
	}
	return {
		relationships,
		datasets,
		groups
	}
}

export const actions = {
	edit_dataset_relationship: async ({ locals, request }) => {
		if (!locals.session) {
			return fail(401, { message: 'Unauthorised' })
		}
		const form = await request.formData()
		const roles = JSON.parse(String(form.get('roles')))
		console.log(roles[0])
		const exists = await ketoRead.getRelationships(roles[0])
		console.log(exists)
		if (
			exists.relation_tuples?.filter((relation) => relation.subject_id === roles[0].subject_id)
				.length === 0
		) {
			console.log(roles[0])
			const create = await ketoWrite.createRelationship({ createRelationshipBody: roles[0] })
			console.log(create)
		}
		return {
			message: 'ok'
		}
	}
}
