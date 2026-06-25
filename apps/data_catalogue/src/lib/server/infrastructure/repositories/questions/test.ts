import type { IQuestionsRepository } from '$lib/server/application/repositories/questions'
import { err, ok } from '$lib/server/entities/errors'
import type { Question } from '$lib/server/entities/models/questions'
import { getId } from '@arturoguzman/art-ui'
import { DateTime } from 'luxon'

let mock: Question[] = []

const createQuestion: IQuestionsRepository['createQuestion'] = async ({ data }) => {
	const result = {
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		id: data.id ?? getId(),
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
	}
	mock.push(result)
	return ok(result)
}

const updateQuestion: IQuestionsRepository['updateQuestion'] = async ({ id, data }) => {
	const index = mock.findIndex((x) => x.id === id)
	if (index > -1) {
		const result = {
			created_at: mock[index].created_at,
			updated_at: DateTime.now().toJSDate(),
			id: mock[index].id,
			question: data.question ?? mock[index].question,
			sort: data.sort ?? mock[index].sort,
			description: data.description ?? mock[index].description,
			label: data.label ?? mock[index].label,
			created_by: data.created_by ?? mock[index].created_by,
			updated_by: data.updated_by ?? mock[index].updated_by,
			status: data.status ?? mock[index].status,
			conditionals: data.conditionals ?? mock[index].conditionals,
			deleted_at: null,
			group: data.group ?? mock[index].group,
			options: data.options ?? mock[index].options,
			required: data.required ?? mock[index].required,
			type: data.type ?? mock[index].type,
			visibility: data.visibility ?? mock[index].visibility
		}
		mock[index] = result
		return ok(result)
	}
	return err({ reason: 'Not Found', message: `Question not found` })
}
const getQuestion: IQuestionsRepository['getQuestion'] = async ({ id }) => {
	const question = mock.find((x) => x.id === id)
	if (question) {
		return ok(question)
	}
	return err({ reason: 'Not Found', message: `Question not found` })
}

const deleteQuestion: IQuestionsRepository['deleteQuestion'] = async ({ id }) => {
	const index = mock.findIndex((x) => x.id === id)
	if (index > -1) {
		mock = [...mock.slice(0, index), ...mock.slice(index + 1)]
	}
	return ok(null)
}

const getQuestions: IQuestionsRepository['getQuestions'] = async () => {
	return ok(mock)
}
const updateQuestionSort: IQuestionsRepository['updateQuestionSort'] = async ({ id, sort }) => {
	const index = mock.findIndex((x) => x.id === id)
	if (index > -1) {
		mock[index].sort = sort

		return ok(mock[index])
	}
	return err({ reason: 'Not Found', message: `Question not found` })
}

export const questionsRepositoryInfrastructureTest: IQuestionsRepository = {
	createQuestion,
	deleteQuestion,
	getQuestion,
	updateQuestion,
	getQuestions,
	updateQuestionSort
}
