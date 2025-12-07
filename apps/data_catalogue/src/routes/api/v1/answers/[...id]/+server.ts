import { db } from '$lib/db/index.js'
import { answers } from '$lib/db/schema/questions.js'
import { authorise } from '$lib/utils/auth/index.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

// const POST_ACTIONS = ['signed_url', 'create']

export const GET = async ({ request, url, params, locals }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/answers',
		relation: 'read'
	})
	const records = await db
		.select()
		.from(answers)
		.where(eq(answers.id, params.id))
		.catch(handleDBError('Error fetching the records'))
	return json(records)
}

export const POST = async ({ request, url, params, locals }) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		object: '/api/v1/answers',
		relation: 'create'
	})
	return json({ message: 'ok' })
}
export const PATCH = async ({ request, url, params, locals }) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		object: '/api/v1/answers',
		relation: 'update'
	})
	return json({ message: 'ok' })
}

export const DELETE = async ({ request, url, params, locals }) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		object: '/api/v1/answers',
		relation: 'delete'
	})
	return json({ message: 'ok' })
}
