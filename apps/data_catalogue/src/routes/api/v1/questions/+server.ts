import { db } from '$lib/db/index.js'
import { questions } from '$lib/db/schema/questions.js'
import { validateInsert } from '$lib/db/validation/index.js'
import { authorise } from '$lib/utils/auth/index.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { error } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals }) => {
	await authorise({
		namespace: 'Endpoint',
		object: '/api/v1/questions',
		relation: 'POST',
		session: locals.session
	})
	const body = await request.json()
	const question = validateInsert(questions, body)
	if (!question.success) {
		error(400, { message: String(question.errors), id: 'err' })
	}
	await db
		.insert(questions)
		.values(question.data)
		.returning()
		.catch(handleDBError('Error saving question'))
	return json({ message: 'ok' })
}
