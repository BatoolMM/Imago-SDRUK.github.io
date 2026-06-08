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
	const [voc_errors, vocabularies] = await tagsGetVocabulariesController()
	if (voc_errors !== null) {
		error(400, {
			message: `There's been an issue retrieving the vocabularies`,
			id: voc_errors.reason
		})
	}
	const voc_id = vocabularies.find((voc) => voc.name === 'general')
	return {
		datasets: await datasetsGetController({
			configuration: locals.configuration,
			url,
			session: locals.session
		}).then(([errors, data]) => {
			if (errors !== null) {
				error(400, { message: `There's been an issue retrieving the datasets`, id: errors.reason })
			}
			return data
		}),
		tags: await tagsGetController({
			configuration: locals.configuration,
			vocabulary_id: voc_id?.id,
			session: locals.session
		}).then(([errors, data]) => {
			if (errors !== null) {
				error(400, { message: `There's been an issue retrieving the tags`, id: errors.reason })
			}
			const reversed = data.items.reverse()
			return reversed
		}),
		package_count: await datasetsGetCountController().then(([errors, count]) => {
			if (errors !== null) {
				error(400, {
					message: `There's been an issue retrieving the package count`,
					id: errors.reason
				})
			}
			return count
		}),
		tag_count: await tagsGetCountController().then(([errors, count]) => {
			if (errors !== null) {
				error(400, {
					message: `There's been an issue retrieving the tags count`,
					id: errors.reason
				})
			}
			return count
		}),
		groups: await metadataGroupsGetController({
			configuration: locals.configuration,
			session: locals.session
		}).then(([errors, data]) => {
			if (errors !== null) {
				error(400, { message: `There's been an issue retrieving the groups`, id: errors.reason })
			}
			return data
		})
	}
}
