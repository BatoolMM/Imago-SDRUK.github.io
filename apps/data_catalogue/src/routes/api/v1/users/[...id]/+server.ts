import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { db } from '$lib/db'
import { users } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import { handleDBError } from '$lib/utils/db'
import { json } from '@sveltejs/kit'
import {
	authorise,
	handleKetoError,
	ketoRead,
	ketoWrite,
	kratosRead,
	kratosWrite
} from '$lib/utils/auth'

export const GET = async ({ locals, params }) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		object: '/api/v1/users',
		relation: 'GET'
	})
	const user = await kratosRead.getIdentity({ id: params.id })
	const user_metadata = await db
		.select()
		.from(users)
		.where(eq(users.id, params.id))
		.catch(handleDBError('Error fetching the user'))
	if (user_metadata.length === 0) {
		return json(null)
	}
	const groups = await ketoRead
		.getRelationships({
			namespace: 'Group',
			relation: 'users',
			subjectId: params.id
		})
		.catch(handleKetoError)
	return json({
		first_name: user.traits.name.first,
		last_name: user.traits.name.last,
		email: user.traits.email,
		id: user.id,
		groups: groups.relation_tuples?.map((group) => group.object),
		preferences: user_metadata[0]?.preferences,
		created_at: user_metadata[0].created_at,
		updated_at: user_metadata[0].updated_at,
		deleted_at: user_metadata[0].deleted_at
	})
}

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
