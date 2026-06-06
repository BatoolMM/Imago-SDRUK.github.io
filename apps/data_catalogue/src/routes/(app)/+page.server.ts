import {
	datasetsGetController,
	datasetsGetCountController
} from '$lib/server/interface/adapters/controllers/datasets/get.js'
import {
	tagsGetController,
	tagsGetVocabulariesController
} from '$lib/server/interface/adapters/controllers/tags/get.js'
import { error } from '@sveltejs/kit'
import { tagsGetCountController } from '$lib/server/interface/adapters/controllers/tags/get.js'
import { metadataGroupsGetController } from '$lib/server/interface/adapters/controllers/metadata_groups/get.js'
export const load = async ({ locals, url }) => {
	const [errs, datasets] = await datasetsGetController({
		configuration: locals.configuration,
		url,
		session: locals.session
	})

	if (errs !== null) {
		error(400, { message: 'Error getting the dataset', id: errs.reason })
	}
	const [voc_errors, vocabularies] = await tagsGetVocabulariesController()
	if (voc_errors !== null) {
		error(400, { message: voc_errors.reason, id: voc_errors.reason })
	}
	const voc_id = vocabularies.find((voc) => voc.name === 'general')
	const [tags_errors, tags] = await tagsGetController({
		configuration: locals.configuration,
		vocabulary_id: voc_id?.id,
		session: locals.session
	})
	if (tags_errors !== null) {
		error(400, { message: 'error getting tags', id: '' })
	}
	const reversed = tags.items.reverse()
	const [errors, groups] = await metadataGroupsGetController({
		configuration: locals.configuration,
		session: locals.session
	})
	if (errors) {
		error(400, { message: `There's been an issue retreiving the groups`, id: 'err' })
	}

	return {
		package_count: await datasetsGetCountController().then(([errors, count]) => {
			if (errors !== null) {
				error(400, { message: `There's been an issue getting the package count`, id: '' })
			}
			return count
		}),
		tag_count: await tagsGetCountController().then(([errors, count]) => {
			if (errors !== null) {
				error(400, { message: `There's been an issue getting the tags count`, id: '' })
			}
			return count
		}),
		tags: reversed,
		datasets,
		groups
	}
}
