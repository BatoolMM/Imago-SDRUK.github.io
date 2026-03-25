import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, ketoWrite } from '$lib/utils/auth/index.js'
import { getGroupBasePermissions } from '$lib/utils/auth/permissions/index.js'
import { create } from '$lib/utils/ckan/ckan.js'
import { log } from '$lib/utils/server/logger.js'
import slugify from '@sindresorhus/slugify'
import { json } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'

export const POST = async ({ locals, request }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/groups',
		relation: 'POST'
	})
	const body = await request.json()
	const data = {
		...body,
		name: slugify(body.display_name),
		title: body.display_name,
		type: 'group',
		state: 'active',
		approval_status: 'approved'
	}
	const group = await locals.ckan.request(create('group_create', data))
	if (!group.success) {
		if ('error' in group) {
			if ('message' in group.error) {
				error(400, { message: String(group.error.message), id: 'error' })
			}
			log.debug(group)
			error(...SERVER_ERRORS[500])
		}
		return error(400, { message: group.message, id: 'error' })
	}
	await ketoWrite.patchRelationships({
		relationshipPatch: getGroupBasePermissions({
			object: group.result.name,
			owner: locals.session?.identity.id
		}).map((relation) => ({ action: 'insert', relation_tuple: relation }))
	})

	return json({ message: 'ok' })
}
