import { db } from '$lib/db/index.js'
import { answers, questions } from '$lib/db/schema/questions.js'
import { users } from '$lib/db/schema/users.js'
import { authorise } from '$lib/utils/auth/index.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const GET = async ({ params, locals }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/users',
		relation: 'GET'
	})
	const records = await db
		.select({
			user_id: users.id,
			id: answers.id,
			free_text: answers.free_text,
			number: answers.number,
			bool: answers.bool,
			time: answers.time,
			answer: answers.answer,
			question_reference: answers.question_reference,
			question_id: answers.question,
			created_by: answers.created_by,
			updated_by: answers.updated_by,
			created_at: answers.created_at,
			updated_at: answers.updated_at,
			question: {
				id: questions.id,
				title: questions.question,
				description: questions.description
			}
		})
		.from(users)
		.where(eq(users.id, params.id))
		.leftJoin(answers, eq(users.id, answers.created_by))
		.leftJoin(questions, eq(answers.question, questions.id))
		.catch(handleDBError('Error fetching the records'))
	return json(records)
}
