import { db } from '$lib/db/index.js'
import { questions } from '$lib/db/schema/questions.js'
import { validateUpdate } from '$lib/db/validation/index.js'
import { authorise } from '$lib/utils/auth/index.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { error } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const PATCH = async ({ request, locals, params }) => {
	await authorise({
		namespace: 'Endpoint',
		object: '/api/v1/questions',
		relation: 'PATCH',
		session: locals.session
	})
	const body = await request.json()
	//TODO: enrich record with updated_by, updated_at
	const question = validateUpdate(questions, {
		...body,
		updated_by: locals.session?.identity.id,
		group: 'registration'
	})
	if (!question.success) {
		error(400, { message: String(question.errors), id: 'err' })
	}
	await db
		.update(questions)
		.set(question.data)
		.where(eq(questions.id, params.id))
		.returning()
		.catch(handleDBError('Error updating question'))
	return json({ message: 'ok' })
}
