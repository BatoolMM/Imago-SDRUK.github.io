import { db } from '$lib/db/index.js'
import { questions } from '$lib/db/schema/questions.js'
import { validateInsert, validateUpdate } from '$lib/db/validation/index.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { parseForm } from '$lib/utils/forms/index.js'
import { jstr } from '@arturoguzman/art-ui'
import { fail } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const load = async ({ locals }) => {
	const records = await db.select().from(questions)
	return {
		questions: records
	}
}

export const actions = {
	create_question: async ({ request, locals }) => {
		if (!locals.session) {
			redirect(307, '/')
		}
		const form = {
			...parseForm(await request.formData()),
			created_by: locals.session.identity.id,
			updated_by: locals.session.identity.id,
			group: 'registration'
		}
		if ('required' in form && form.required === 'on') {
			form.required = true
		}
		if ('visibility' in form && form.visibility === 'on') {
			form.visibility = true
		} else {
			form['visibility'] = false
		}
		if ('options' in form && typeof form.options === 'string') {
			form.options = JSON.parse(form.options)
		}

		if (
			'conditionals' in form &&
			typeof form.conditionals === 'string' &&
			form.conditionals === '[]'
		) {
			form.conditionals = []
		}

		const question = validateInsert(questions, form)
		if (!question.success || !question.data) {
			return fail(400, { errors: question.errors })
		}
		console.log(question.data)
		// const question = await createUserPermissions(locals.session.identity.id)
		await db.insert(questions).values(question.data).returning().catch(handleDBError)
		return {
			message: `Question created`
		}
		// return redirect(307, '/user/account')
		// return fail(500, { message: 'falied' })
	},
	update_question: async ({ request, locals }) => {
		if (!locals.session) {
			redirect(307, '/')
		}
		const form = {
			...parseForm(await request.formData()),
			created_by: locals.session.identity.id,
			updated_by: locals.session.identity.id,
			group: 'registration'
		}
		if ('required' in form && form.required === 'on') {
			form.required = true
		}
		if ('visibility' in form && form.visibility === 'on') {
			form.visibility = true
		} else {
			form['visibility'] = false
		}
		if ('options' in form && typeof form.options === 'string') {
			form.options = JSON.parse(form.options)
		}
		if (
			'conditionals' in form &&
			typeof form.conditionals === 'string' &&
			form.conditionals === '[]'
		) {
			form.conditionals = []
		}
		console.log('top')
		console.log(form)
		console.log('bottom')
		const question = validateUpdate(questions, form)
		if (!question.success || !question.data || !question.data.id) {
			return fail(400, { errors: question.errors })
		}
		console.log(jstr(question.data))

		// return {
		// 	message: 'ok'
		// }
		// const question = await createUserPermissions(locals.session.identity.id)
		await db
			.update(questions)
			.set(question.data)
			.where(eq(questions.id, question.data.id))
			.returning()
			.catch(handleDBError)
		return {
			message: `Question updated`
		}
	},
	delete_question: async ({ request, locals }) => {
		if (!locals.session) {
			redirect(307, '/')
		}
		const form = parseForm(await request.formData())
		if ('id' in form) {
			await db.delete(questions).where(eq(questions.id, form.id)).catch(handleDBError)
			return {
				message: `Question deleted`
			}
		}
		return fail(400, { message: `There's been an issue deleting this question` })
	}
}
