import type { PageServerLoadEvent } from './$types.js'
import { fail, redirect } from '@sveltejs/kit'
import { users } from '$lib/db/schema/users.js'
import { handleDBError } from '$lib/utils/db/index.js'
import { eq } from 'drizzle-orm'
import { db } from '$lib/db/index.js'
import { validateInsert } from '$lib/db/validation/index.js'
import { parseForm } from '$lib/utils/forms/index.js'
import { checkPermission, ketoRead, ketoWrite } from '$lib/utils/auth/index.js'
import { answers, questions } from '$lib/db/schema/questions.js'
import { validateAnswersForm } from '$lib/db/validation/questions.js'

export const load = async ({ locals }: PageServerLoadEvent) => {
	// NOTE: list permissions
	// if permissions are non existent then allow user to 'register'
	if (!locals.session) {
		redirect(307, '/auth/login')
	}
	const user = await db
		.select()
		.from(users)
		.where(eq(users.id, locals.session?.identity.id))
		.limit(1)
		.catch(handleDBError('Error fetching user'))
	if (user.length > 0) {
		redirect(307, '/user/account')
	}
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
	create: async ({ request, locals }) => {
		if (!locals.session) {
			redirect(307, '/')
		}
		const form = parseForm(await request.formData())
		const validated_answers = await Promise.all(
			validateAnswersForm({
				answers: form.answer,
				user_id: locals.session.identity.id
			})
		)
		if (
			validated_answers.filter((answer) => {
				if (answer.answer.success === false) {
					return true
				}
				return false
			}).length > 0
		) {
			const errors = validated_answers
				.filter((answer) => !answer.answer.success)
				.map((answer) => !answer.answer.success && { ...answer.answer.errors })
			return fail(401, { errors })
		}
		const existing_user = await db
			.select()
			.from(users)
			.where(eq(users.id, locals.session.identity.id))
		if (existing_user.length > 0) {
			await db
				.insert(answers)
				.values(
					validated_answers
						.map((answer) => (answer.answer.success ? answer.answer.data : null))
						.filter((answer) => answer !== null)
				)
				.catch(handleDBError('Error saving the answers'))
			return redirect(307, '/user/account')
		}
		const user_form = {
			id: locals.session.identity.id,
			email: locals.session.identity.traits.email,
			name: `${locals.session.identity.traits.name.first} ${locals.session.identity.traits.name.last}`,
			status: 'active'
		}
		const user = validateInsert(users, user_form)
		if (!user.success) {
			return fail(400, { errors: user.errors })
		}

		const permissions = await createUserPermissions(locals.session.identity.id)
		if (permissions.success) {
			await db.insert(users).values(user.data)
			await db
				.insert(answers)
				.values(
					validated_answers
						.map((answer) => (answer.answer.success ? answer.answer.data : null))
						.filter((answer) => answer !== null)
				)
				.catch(handleDBError('Error saving the answers'))
			return redirect(307, '/user/account')
		}
		return fail(500, { message: 'falied' })
	}
}

async function createUserPermissions(user_id: string) {
	const user_relationship = {
		namespace: 'User',
		object: user_id,
		relation: 'members',
		subject_id: user_id
	}

	const group_relationship = {
		namespace: 'Group',
		object: 'public',
		relation: 'users',
		subject_id: user_id
	}
	//TODO: handle each permissions error
	try {
		await ketoWrite.createRelationship({ createRelationshipBody: group_relationship })
		await ketoWrite.createRelationship({
			createRelationshipBody: user_relationship
		})
		console.log(`User ${user_id} created successfully and added to public group`)
		return {
			success: true
		}
	} catch (error) {
		console.error(`Failed to create user ${user_id}:`, error)
		return {
			success: false,
			error: error
		}
	}
}
