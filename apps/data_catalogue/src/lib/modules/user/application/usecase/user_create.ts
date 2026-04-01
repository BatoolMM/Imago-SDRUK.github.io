import type { UserRequest } from '$lib/db/schema/users'
import { db } from '$lib/db'
import { users } from '$lib/db/schema'
import { handleKetoError, ketoWrite } from '$lib/utils/auth'
import { getUserBasePermissions } from '$lib/utils/auth/permissions'
import { handleDBError } from '$lib/utils/db'
import { log } from '$lib/utils/server/logger'

export const createUser = async ({ payload }: { payload: UserRequest }) => {
	const user = await db
		.insert(users)
		.values(payload)
		.returning()
		.catch(handleDBError(`Error creating user: ${payload.id}`))
	await ketoWrite
		.patchRelationships({
			relationshipPatch: getUserBasePermissions({
				id: user[0].id
			}).map((relation) => ({ action: 'insert', relation_tuple: relation }))
		})
		.catch(handleKetoError)
	log.info(`Create user ${user[0].id}`)
	return user
}
