import type { ITagsService } from '$lib/server/application/services/tags'
import { err, ok } from '$lib/server/entities/errors'
import type { Tag, Vocabulary } from '$lib/server/entities/models/datasets'
import { getId } from '@arturoguzman/art-ui'
const mock: Tag[] = []
const mock_vocabularies: Vocabulary[] = []
const getTags: ITagsService['getTags'] = async () => {
	return ok({
		total: mock.length,
		limit: mock.length,
		next: 0,
		items: mock
	})
}

const createVocabulary: ITagsService['createVocabulary'] = async ({ vocabulary }) => {
	const result: Vocabulary = { name: vocabulary.name, id: getId(), tags: [] }
	mock_vocabularies.push(result)
	return ok(result)
}
const getVocabulary: ITagsService['getVocabulary'] = async ({ vocabulary_id }) => {
	const result = mock_vocabularies.find((x) => x.id === vocabulary_id)
	if (result) {
		return ok(result)
	}
	return err({ reason: 'Not Found', message: `Vocabulary not found` })
}

const createTag: ITagsService['createTag'] = async ({ tag }) => {
	const result: Tag = {
		name: tag.name,
		id: getId(),
		display_name: tag.name,
		state: 'active',
		vocabulary_id: tag.vocabulary_id
	}
	mock.push(result)
	return ok(result)
}

const getTag: ITagsService['getTag'] = async ({ id }) => {
	const result = mock.find((x) => x.id === id)
	if (result) {
		return ok(result)
	}
	return err({ reason: 'Not Found', message: `Vocabulary not found` })
}
const getVocabularies: ITagsService['getVocabularies'] = async () => {
	return ok(mock_vocabularies)
}

export const infrastructureServiceTagsTest: ITagsService = {
	getTags,
	createVocabulary,
	getVocabulary,
	createTag,
	getTag,
	getVocabularies
}
