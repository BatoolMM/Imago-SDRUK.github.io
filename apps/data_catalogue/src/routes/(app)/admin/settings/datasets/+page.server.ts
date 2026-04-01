import { error, fail, redirect } from '@sveltejs/kit'
import { ketoRead, ketoWrite } from '$lib/utils/auth/index.js'
import { get } from '$lib/utils/ckan/ckan.js'
import { AUTH_GROUPS } from '$lib/globals/auth.js'
import { log } from '$lib/utils/server/logger.js'
import { db } from '$lib/db/index.js'
import { resource_versions, resources } from '$lib/db/schema/resources.js'
import { eq } from 'drizzle-orm'
import { formGetStringOrUndefined } from '$lib/utils/forms/index.js'
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
		get('package_search', { include_private: true, include_drafts: true, include_deleted: true })
	)
	if (!datasets.success) {
		return error(500, { message: 'err', id: 'err' })
	}
	const resources_data = await Promise.all(
		datasets.result.results
			.flatMap((dataset) => dataset.resources)
			.map((resource) =>
				db
					.select()
					.from(resources)
					.leftJoin(resource_versions, eq(resource_versions.resource, resources.id))
					.where(eq(resources.id, resource.id))
					.then((res) => ({ ...resource, downloads: res[0].resource_versions?.downloads }))
			)
	)
	return {
		relationships,
		datasets,
		groups,
		resources: resources_data
	}
}

export const actions = {
	add_group: async ({ request, fetch }) => {
		const form = await request.formData()
		const relationship = {
			namespace: 'Dataset',
			object: formGetStringOrUndefined({ form, field: 'object' }),
			relation: formGetStringOrUndefined({ form, field: 'relation' }),
			subject_set: {
				namespace: 'Group',
				object: formGetStringOrUndefined({ form, field: 'subject_set_object' }),
				relation: 'users'
			}
		}
		const res = await fetch(`/api/v1/permissions/Dataset`, {
			method: 'POST',
			body: JSON.stringify(relationship)
		})

		if (res.ok) {
			return {
				message: `Added group ${relationship.subject_set.object} as ${relationship.relation} to dataset ${relationship.object}`
			}
		}
		const error = await res.json()
		return fail(res.status, { message: error.message })
	},
	remove_group: async ({ request, fetch }) => {
		const form = await request.formData()
		const relationship = {
			namespace: 'Dataset',
			object: formGetStringOrUndefined({ form, field: 'object' }),
			relation: formGetStringOrUndefined({ form, field: 'relation' }),
			subject_set: {
				namespace: 'Group',
				object: formGetStringOrUndefined({ form, field: 'subject_set_object' }),
				relation: 'users'
			}
		}
		const res = await fetch(`/api/v1/permissions/Dataset`, {
			method: 'DELETE',
			body: JSON.stringify(relationship)
		})

		if (res.ok) {
			return {
				message: `Removed group ${relationship.subject_set.object} as ${relationship.relation} to dataset ${relationship.object}`
			}
		}
		const error = await res.json()
		return fail(res.status, { message: error.message })
		// return fail(res.status, { message: res.statusText })
	},
	edit_dataset_relationship: async ({ locals, request }) => {
		if (!locals.session) {
			return fail(401, { message: 'Unauthorised' })
		}
		const form = await request.formData()
		const roles = JSON.parse(String(form.get('roles')))
		log.debug(roles[0])
		const exists = await ketoRead.getRelationships(roles[0])
		log.debug(exists)
		if (
			exists.relation_tuples?.filter((relation) => relation.subject_id === roles[0].subject_id)
				.length === 0
		) {
			log.debug(roles[0])
			const create = await ketoWrite.createRelationship({ createRelationshipBody: roles[0] })
			log.debug(create)
		}
		return {
			message: 'ok'
		}
	}
}
