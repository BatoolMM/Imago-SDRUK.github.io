import { authorise, handleKetoError, ketoRead } from '$lib/utils/auth/index.js'
import { json } from '@sveltejs/kit'

export const GET = async ({ params, locals }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/users',
		relation: 'GET'
	})
	const records = await ketoRead
		.getRelationships({
			namespace: 'Group',
			relation: 'users',
			subjectId: params.id
		})
		.catch(handleKetoError)
	return json(records)
}
