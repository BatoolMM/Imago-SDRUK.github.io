import type { IQuestionsRepository } from '$lib/server/application/repositories/questions'
import { db } from '$lib/db'
import { questions } from '$lib/server/entities/models/questions'
import { err, ok } from '$lib/server/entities/errors'
import { asc, eq } from 'drizzle-orm'

const createQuestion: IQuestionsRepository['createQuestion'] = async ({ data }) => {
	try {
		const question = await db.insert(questions).values(data).returning()
		return ok(question[0])
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const updateQuestion: IQuestionsRepository['updateQuestion'] = async ({ id, data }) => {
	try {
		const question = await db.update(questions).set(data).where(eq(questions.id, id)).returning()
		return ok(question[0])
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const updateQuestionSort: IQuestionsRepository['updateQuestionSort'] = async ({ id, sort }) => {
	try {
		const question = await db
			.update(questions)
			.set({ sort })
			.where(eq(questions.id, id))
			.returning()
		return ok(question[0])
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const getQuestion: IQuestionsRepository['getQuestion'] = async ({ id }) => {
	try {
		const question = await db.select().from(questions).where(eq(questions.id, id))
		return ok(question[0])
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const getQuestions: IQuestionsRepository['getQuestions'] = async ({ limit, offset }) => {
	try {
		const question = await db
			.select()
			.from(questions)
			.orderBy(asc(questions.sort))
			.limit(limit)
			.offset(offset)
		return ok(question)
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const deleteQuestion: IQuestionsRepository['deleteQuestion'] = async ({ id }) => {
	try {
		await db.delete(questions).where(eq(questions.id, id))
		return ok(null)
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

export const questionsRepositoryInfrastructureDrizzle: IQuestionsRepository = {
	createQuestion,
	deleteQuestion,
	getQuestion,
	updateQuestion,
	getQuestions,
	updateQuestionSort
}
