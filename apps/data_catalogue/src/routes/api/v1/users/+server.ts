import { env } from '$env/dynamic/private'
import { users } from '$lib/db/schema/users.js'
import { validateInsert } from '$lib/db/validation/index.js'
import { createUser } from '$lib/modules/user/application/usecase/user_create.js'
import { authorise, handleKetoError, ketoRead } from '$lib/utils/auth'
import { parseLink } from '$lib/utils/index.js'
import type { Identity } from '@ory/client-fetch'
import { json } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'

export const GET = async ({ locals, url }) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		object: '/api/v1/users',
		relation: 'GET'
	})
	const page_size = url.searchParams.get('page_size')
	const page_token = url.searchParams.get('page_token') ?? ''
	const res = await fetch(
		`${env.IDENTITY_SERVER_ADMIN}/admin/identities?page_size=${page_size}&page_token=${page_token}`
	)
	const link = parseLink(res.headers.get('link'))
	const data = (await res.json()) as Identity[]
	const items = await Promise.all(
		data.map((user) =>
			ketoRead
				.getRelationships({
					namespace: 'Group',
					relation: 'users',
					subjectId: user.id
				})
				.then((groups) => ({
					id: user.id,
					email: user.traits.email,
					first_name: user.traits.name.first,
					last_name: user.traits.name.last,
					groups: groups.relation_tuples?.map((group) => group.object)
				}))
				.catch(handleKetoError)
		)
	)
	return json({
		...link,
		items
	})
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
	const payload = validateInsert(users, user_form)
	if (!payload.success) {
		error(400, { message: String(payload.errors), id: 'err' })
	}
	await createUser({ payload: payload.data })
	return json({ message: 'ok' })
}
