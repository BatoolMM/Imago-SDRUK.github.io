import type { IQuestionsRepository } from '$lib/server/application/repositories/questions'
import { ok } from '$lib/server/entities/errors'
import { DateTime } from 'luxon'

const createQuestion: IQuestionsRepository['createQuestion'] = async ({ data }) => {
	return ok({
		...data,
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		id: '',
		question: data.question ?? null,
		sort: data.sort ?? null,
		description: data.description ?? null,
		label: data.label ?? null,
		created_by: '',
		updated_by: '',
		status: data.status ?? 'draft',
		conditionals: data.conditionals ?? [],
		deleted_at: null,
		group: data.group ?? null,
		options: data.options ?? [],
		required: data.required ?? false,
		type: data.type ?? 'string',
		visibility: data.visibility ?? false
	})
}

const updateQuestion: IQuestionsRepository['updateQuestion'] = async ({ id, data }) => {
	return ok({
		...data,
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		id,
		question: data.question ?? '',
		sort: data.sort ?? null,
		description: data.description ?? null,
		label: data.label ?? null,
		created_by: '',
		updated_by: '',
		status: data.status ?? 'draft',
		conditionals: data.conditionals ?? [],
		deleted_at: null,
		group: data.group ?? null,
		options: data.options ?? [],
		required: data.required ?? false,
		type: data.type ?? 'string',
		visibility: data.visibility ?? false
	})
}
const getQuestion: IQuestionsRepository['getQuestion'] = async ({ id }) => {
	return ok({
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		id,
		question: '',
		sort: null,
		description: null,
		label: null,
		created_by: '',
		updated_by: '',
		status: 'draft',
		conditionals: [],
		deleted_at: null,
		group: null,
		options: [],
		required: false,
		type: 'string',
		visibility: false
	})
}

const deleteQuestion: IQuestionsRepository['deleteQuestion'] = async () => {
	return ok(null)
}

const getQuestions: IQuestionsRepository['getQuestions'] = async () => {
	return ok([])
}
const updateQuestionSort: IQuestionsRepository['updateQuestionSort'] = async ({ id }) => {
	return ok({
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		id,
		question: '',
		sort: null,
		description: null,
		label: null,
		created_by: '',
		updated_by: '',
		status: 'draft',
		conditionals: [],
		deleted_at: null,
		group: null,
		options: [],
		required: false,
		type: 'string',
		visibility: false
	})
}

export const questionsRepositoryInfrastructureTest: IQuestionsRepository = {
	createQuestion,
	deleteQuestion,
	getQuestion,
	updateQuestion,
	getQuestions,
	updateQuestionSort
}
