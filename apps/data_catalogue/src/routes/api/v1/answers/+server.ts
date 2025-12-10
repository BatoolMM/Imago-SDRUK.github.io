import { db } from '$lib/db/index.js'
import { answers, type Answer } from '$lib/db/schema/questions.js'
import type { ArkFormErrors } from '$lib/db/validation/index.js'
import { validateAnswer } from '$lib/db/validation/questions.js'
import { authorise, ketoWrite } from '$lib/utils/auth/index.js'
import { getAnswerBasePermissions } from '$lib/utils/auth/permissions/index.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { log } from '$lib/utils/server/logger.js'
import { error } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

export const GET = async ({ request, url, params, locals }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/answers',
		relation: 'GET'
	})
	const records = await db.select().from(answers).catch(handleDBError('Error fetching the records'))
	return json(records)
}

export const POST = async ({ request, locals }) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		object: '/api/v1/answers',
		relation: 'POST'
	})
	const records = (await request.json()) as
		| { question: string; answer: string }
		| { question: string; answer: string }[]
	let validated: (ArkFormErrors | { success: true; data: Answer })[]

	if (Array.isArray(records)) {
		validated = await Promise.all(
			records.map((answer) => validateAnswer({ answer, user_id: locals.session?.identity.id }))
		)
	} else {
		validated = await Promise.all(
			[records].map((answer) => validateAnswer({ answer, user_id: locals.session?.identity.id }))
		)
	}
	const results = await db
		.insert(answers)
		.values(
			validated
				.map((answer) => (answer.success ? answer.data : null))
				.filter((answer) => answer !== null)
		)
		.returning()
		.catch(handleDBError('Error saving the answers'))
	await Promise.all(
		results.map((result) =>
			ketoWrite
				.patchRelationships({
					relationshipPatch: getAnswerBasePermissions({
						user_id: result.created_by,
						answer_id: result.id
					}).map((relation) => ({ action: 'insert', relation_tuple: relation }))
				})
				.catch((err) => {
					log.debug(err)
					error(500, { message: 'Error saving answer permissions', id: 'err' })
				})
		)
	)

	return json(results)
}
export const PATCH = async ({ request, url, params, locals }) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		object: '/api/v1/answers',
		relation: 'PATCH'
	})
	return json({ message: 'ok' })
}

export const DELETE = async ({ request, url, params, locals }) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		object: '/api/v1/answers',
		relation: 'DELETE'
	})
	return json({ message: 'ok' })
}
