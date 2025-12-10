import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { db } from '$lib/db'
import { users } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import { handleDBError } from '$lib/utils/db'
import { json } from '@sveltejs/kit'
import { authorise, ketoRead, ketoWrite, kratosWrite } from '$lib/utils/auth'

export const DELETE: RequestHandler = async ({ locals, params }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/users',
		relation: 'DELETE'
	})
	const groups = await ketoRead.getRelationships({ namespace: 'Group', subjectId: params.id })
	if (groups.relation_tuples?.some((relation) => relation.object === 'admin')) {
		error(400, { message: `You can't delete an admin!`, id: 'no-admin-delete' })
	}
	if (params.id === locals.session?.identity.id) {
		error(400, { message: `You can't delete yourself!`, id: 'no-self-delete' })
	}
	await db
		.delete(users)
		.where(eq(users.id, params.id))
		.catch(handleDBError('Error deleting the user'))
	const relationships = await ketoRead.getRelationships({
		namespace: 'Group',
		subjectId: params.id
	})
	await ketoWrite.patchRelationships({
		relationshipPatch: relationships.relation_tuples?.map((relationship) => ({
			action: 'delete',
			relation_tuple: relationship
		}))
	})
	await kratosWrite.deleteIdentity({ id: params.id })
	return json({ message: 'User deleted' })
}
// https://svelte.dev/docs/kit/routing#server
