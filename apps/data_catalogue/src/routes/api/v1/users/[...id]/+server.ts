import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { db } from '$lib/db'
import { users } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import { handleDBError } from '$lib/utils/db'
import { json } from '@sveltejs/kit'
import { authorise, ketoRead, ketoWrite } from '$lib/utils/auth'

export const DELETE: RequestHandler = async ({ locals, request }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/users',
		relation: 'DELETE'
	})
	const { id } = await request.json()
	await db.delete(users).where(eq(users.id, id)).catch(handleDBError('Error deleting the user'))
	const relationships = await ketoRead.getRelationships({ namespace: 'Group', subjectId: id })
	await ketoWrite.patchRelationships({
		relationshipPatch: relationships.relation_tuples?.map((relationship) => ({
			action: 'delete',
			relation_tuple: relationship
		}))
	})
	return json({ message: 'ok' })
}
// https://svelte.dev/docs/kit/routing#server
