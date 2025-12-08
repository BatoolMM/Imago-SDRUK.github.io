import { authorise, ketoWrite } from '$lib/utils/auth/index.js'
import { create, get, remove } from '$lib/utils/ckan/ckan.js'
import { jstr } from '@arturoguzman/art-ui'
import slugify from '@sindresorhus/slugify'
import { error, json } from '@sveltejs/kit'

export const DELETE = async ({ locals, request, params }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/groups',
		relation: 'DELETE'
	})

	const group = await locals.ckan.request(get('group_show', { id: params.id }))
	if (!group.success) {
		error(400, { message: 'Error deleting group', id: 'err' })
	}
	const del = await locals.ckan.request(remove('group_delete', { id: params.id }))
	if (del.success) {
		await ketoWrite.deleteRelationships({ namespace: 'Group', object: group.result.name })
		return json({ message: 'ok' })
	}
	error(400, { message: 'Error deleting group', id: 'err' })
}
