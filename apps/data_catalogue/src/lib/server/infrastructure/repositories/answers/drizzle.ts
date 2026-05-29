import { db } from '$lib/db'
import { answers } from '$lib/db/schema'
import type { IAnswersRepository } from '$lib/server/application/repositories/answers'
import { err, ok } from '$lib/server/entities/errors'
import { eq } from 'drizzle-orm'

const createAnswer: IAnswersRepository['createAnswer'] = async ({ data, tx }) => {
	try {
		const _db = tx ?? db
		const answer = await _db.insert(answers).values(data).returning()
		return ok(answer[0])
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const createAnswers: IAnswersRepository['createAnswers'] = async ({ data }) => {
	try {
		const answer = await db.insert(answers).values(data).returning()
		return ok(answer)
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const updateAnswer: IAnswersRepository['updateAnswer'] = async ({ id, data }) => {
	try {
		const answer = await db.update(answers).set(data).where(eq(answers.id, id)).returning()
		return ok(answer[0])
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}
const getAnswer: IAnswersRepository['getAnswer'] = async ({ id }) => {
	try {
		const answer = await db.select().from(answers).where(eq(answers.id, id))
		return ok(answer[0])
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const deleteAnswer: IAnswersRepository['deleteAnswer'] = async ({ id }) => {
	try {
		await db.delete(answers).where(eq(answers.id, id))
		return ok(null)
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

export const answersRepositoryInfrastructureDrizzle: IAnswersRepository = {
	createAnswer,
	createAnswers,
	deleteAnswer,
	getAnswer,
	updateAnswer
}
