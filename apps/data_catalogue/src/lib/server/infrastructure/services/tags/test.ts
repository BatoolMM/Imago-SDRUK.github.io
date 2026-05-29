import type { ITagsService } from '$lib/server/application/services/tags'
import { ok } from '$lib/server/entities/errors'
const getTags: ITagsService['getTags'] = async () => {
	return ok({
		total: 0,
		limit: 0,
		next: 0,
		items: []
	})
}

const createVocabulary: ITagsService['createVocabulary'] = async () => {
	return ok({ name: '', tags: [], id: '' })
}
const getVocabulary: ITagsService['getVocabulary'] = async ({ vocabulary_id }) => {
	return ok({
		name: '',
		tags: [],
		id: vocabulary_id
	})
}

const createTag: ITagsService['createTag'] = async () => {
	return ok({
		name: '',
		vocabulary_id: '',
		display_name: '',
		state: 'active',
		id: ''
	})
}

const getTag: ITagsService['getTag'] = async ({ id, vocabulary_id }) => {
	return ok({
		id,
		vocabulary_id,
		name: '',
		state: 'draft',
		display_name: ''
	})
}
const getVocabularies: ITagsService['getVocabularies'] = async () => {
	return ok([])
}

export const infrastructureServiceTagsTest: ITagsService = {
	getTags,
	createVocabulary,
	getVocabulary,
	createTag,
	getTag,
	getVocabularies
}
