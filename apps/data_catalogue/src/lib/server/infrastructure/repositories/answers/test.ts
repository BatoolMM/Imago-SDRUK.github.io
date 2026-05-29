import type { IAnswersRepository } from '$lib/server/application/repositories/answers'
import type { Answer } from '$lib/server/entities/models/questions'
import { ok } from '$lib/server/entities/errors'
import { DateTime } from 'luxon'

const createAnswer: IAnswersRepository['createAnswer'] = async ({ data }) => {
	const answer: Answer = {
		...data,
		id: '',
		number: data.number ?? null,
		free_text: data.free_text ?? null,
		bool: data.bool ?? false,
		time: data.time ?? null,
		answer: data.answer ?? null,
		question_reference: data.question_reference ?? null,
		status: 'published',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		deleted_at: null,
		created_by: data.created_by ?? null,
		updated_by: data.updated_by ?? null
	}
	return ok(answer)
}

const createAnswers: IAnswersRepository['createAnswers'] = async ({ data }) => {
	const answers: Answer[] = data.map((data) => ({
		...data,
		id: '',
		number: data.number ?? null,
		free_text: data.free_text ?? null,
		bool: data.bool ?? false,
		time: data.time ?? null,
		answer: data.answer ?? null,
		question_reference: data.question_reference ?? null,
		status: 'published',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		deleted_at: null,
		created_by: data.created_by ?? null,
		updated_by: data.updated_by ?? null
	}))

	return ok(answers)
}

const updateAnswer: IAnswersRepository['updateAnswer'] = async ({ id, data }) => {
	const answer: Answer = {
		...data,
		id: id,
		number: data.number ?? null,
		free_text: data.free_text ?? null,
		bool: data.bool ?? false,
		time: data.time ?? null,
		answer: data.answer ?? null,
		question_reference: data.question_reference ?? null,
		status: 'published',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		deleted_at: null,
		created_by: data.created_by ?? null,
		updated_by: data.updated_by ?? null,
		question: ''
	}
	return ok(answer)
}
const getAnswer: IAnswersRepository['getAnswer'] = async ({ id }) => {
	const answer: Answer = {
		id: id,
		number: null,
		free_text: null,
		bool: false,
		time: null,
		answer: null,
		question_reference: null,
		status: 'published',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		deleted_at: null,
		created_by: null,
		updated_by: null,
		question: ''
	}
	return ok(answer)
}

const deleteAnswer: IAnswersRepository['deleteAnswer'] = async () => {
	return ok(null)
}

export const answersRepositoryInfrastructureTest: IAnswersRepository = {
	createAnswer,
	deleteAnswer,
	getAnswer,
	updateAnswer,
	createAnswers
}
