import type { PageServerLoadEvent } from './$types.js'
import { fail, redirect } from '@sveltejs/kit'
import { handleDBError } from '$lib/utils/db/index.js'
import { db } from '$lib/db/index.js'
import { parseForm } from '$lib/utils/forms/index.js'
import { authorise } from '$lib/utils/auth/index.js'
import { questions } from '$lib/db/schema/questions.js'
import { error } from '@sveltejs/kit'
import { users } from '$lib/db/schema/users.js'
import { eq } from 'drizzle-orm'

export const load = async ({ locals }: PageServerLoadEvent) => {
	await authorise({
		session: locals.session,
		namespace: 'Endpoint',
		relation: 'GET',
		object: '/api/v1/questions'
	})
	const records = await db
		.select()
		.from(questions)
		.orderBy(questions.created_at)
		.catch(handleDBError('Error fetching questions'))
	return {
		questions: records
	}
}

export const actions = {
	create: async ({ request, locals, fetch }) => {
		if (!locals.session) {
			redirect(307, '/')
		}
		const form = parseForm(await request.formData())
		const body = Object.entries(form).map(([key, value]) => ({ question: key, answer: value }))
		const res = await fetch(`/api/v1/answers`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body)
		}).catch(() => error(500, { message: 'Error saving answers', id: 'err' }))
		if (!res.ok) {
			error(400, { message: 'Error saving your answers, please try again', id: 'err' })
		}
		await db.update(users).set({ status: 'active' }).where(eq(users.id, locals.session.identity.id))
		return redirect(307, '/')
	}
}
