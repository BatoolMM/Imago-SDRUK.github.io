import { db } from '$lib/db/index.js'
import { questions } from '$lib/db/schema/questions.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { parseForm } from '$lib/utils/forms/index.js'
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
	create_question: async ({ request, locals, fetch }) => {
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

		const res = await fetch('/api/v1/questions', { method: 'POST', body: JSON.stringify(form) })
		const data = await res.json()
		return {
			message: `Question created`
		}
	},
	update_question: async ({ request, locals, fetch }) => {
		if (!locals.session) {
			redirect(307, '/')
		}
		const form = parseForm(await request.formData())

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
		const res = await fetch('/api/v1/questions', { method: 'PATCH', body: JSON.stringify(form) })
		const data = await res.json()
		console.log(data)
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
