import { env } from '$env/dynamic/private'
import { db } from '$lib/db/index.js'
import { users } from '$lib/db/schema/users.js'
import { validateInsert } from '$lib/db/validation/index.js'
import { authorise, ketoWrite, kratosRead } from '$lib/utils/auth'
import { getUserBasePermissions } from '$lib/utils/auth/permissions/index.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { json } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'

export const GET = async ({ locals, request }) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		object: '/api/v1/users',
		relation: 'GET'
	})
	const users = await kratosRead.listIdentities()
	return json({ users })
}

export const POST = async ({ locals, request, cookies }) => {
	const preauthorised = cookies.get('kratos-api') === env.ADMIN_TOKEN
	if (!preauthorised) {
		await authorise({
			session: locals.session,
			namespace: 'Endpoint',
			object: '/api/v1/users',
			relation: 'POST'
		})
	}
	const body = await request.json()
	const user_form = {
		id: body.id,
		status: 'preregister'
	}
	const user = validateInsert(users, user_form)
	if (!user.success) {
		error(400, { message: String(user.errors), id: 'err' })
	}

	await ketoWrite.patchRelationships({
		relationshipPatch: getUserBasePermissions({
			id: user.data.id
		}).map((relation) => ({ action: 'insert', relation_tuple: relation }))
	})
	await db.insert(users).values(user.data).catch(handleDBError('Error creating user'))
	return json({ message: 'ok' })
}
