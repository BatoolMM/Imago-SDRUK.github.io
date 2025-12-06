import { SERVER_ERRORS } from '$lib/globals/server.js'
import { ketoCheck } from '$lib/utils/auth'
import { error } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	if (!locals.session) {
		error(...SERVER_ERRORS[401])
	}
	const permissions = await ketoCheck
		.checkPermission({
			namespace: 'Group',
			object: 'admin',
			relation: 'users',
			subjectId: locals.session?.identity.id
		})
		.catch((err) => {
			console.log(err)
			return {
				allowed: false
			}
		})
	if (!permissions.allowed) {
		error(...SERVER_ERRORS[401])
	}
	return {}
}
// https://svelte.dev/docs/kit/load#Layout-data
