import type { AppContext } from '$lib/server/application/context'
import type { IDatasetService } from '$lib/server/application/services/dataset'
import type { ITagsService } from '$lib/server/application/services/tags'
import { err, ok, type ErrTypes } from '$lib/server/entities/errors'
import type { Tag } from '$lib/server/entities/models/datasets'

export const tagsMigrateUseCase = async ({
	dataset_id,
	vocabulary_name = 'general',
	tags_service,
	session,
	authorisation_module,
	dataset_service,
	configuration
}: {
	dataset_service: IDatasetService
	dataset_id: string
	vocabulary_name?: string
	tags_service: ITagsService
} & AppContext) => {
	const [errors, permission] = await authorisation_module.authorise({
		namespace: 'Dataset',
		object: dataset_id,
		permits: 'edit',
		actor: session.identity.id,
		configuration
	})
	if (errors) {
		return err(errors)
	}
	if (!permission.allowed) {
		return err({ reason: 'Unauthorised' })
	}
	const [dataset_errors, dataset] = await dataset_service.getDataset({ id: dataset_id })
	if (dataset_errors !== null) {
		return err(dataset_errors)
	}
	if (!dataset) {
		return err({ reason: 'Not Found', message: `This dataset couldn't be found` })
	}
	const existing_tags = dataset.tags.filter((tag) => tag.vocabulary_id === null)
	const [vocabulary_errors, vocabularies] = await tags_service.getVocabularies()
	if (vocabulary_errors !== null) {
		return err(vocabulary_errors)
	}
	let vocabulary = vocabularies?.find((v) => v.name === vocabulary_name)

	if (!vocabulary) {
		const [errs, voc] = await tags_service.createVocabulary({
			vocabulary: {
				name: vocabulary_name
			}
		})
		if (errs !== null) {
			return err(errs)
		}
		if (voc === null) {
			return err({ reason: 'Unexpected', error: voc })
		}
		const [errs_nv, res] = await tags_service.getVocabulary({ vocabulary_id: voc.id })

		if (errs_nv !== null) {
			return err(errs_nv)
		}
		if (res === null) {
			return err({ reason: 'Not Found', message: `Voc err` })
		}
		vocabulary = res
	}
	const [voc_tags_errors, current_vocabulary_tags] = await tags_service.getTags({
		vocabulary_id: vocabulary.id,
		limit: 250,
		offset: 0
	})
	if (voc_tags_errors !== null) {
		return err(voc_tags_errors)
	}
	const filter_non_existing = existing_tags.reduce(
		(acc, el) => {
			const voc_existing = current_vocabulary_tags.items.find(
				(cvt) => typeof cvt !== 'string' && cvt.name === el.name
			)
			if (voc_existing && typeof voc_existing !== 'string') {
				acc.existing.push(voc_existing)
				return acc
			}
			acc.to_create.push({ name: el.name, vocabulary_id: vocabulary.id })

			return acc
		},
		{
			to_create: [],
			existing: []
		} as { to_create: { name: string; vocabulary_id: string }[]; existing: Tag[] }
	)
	const new_tags = await Promise.all(
		filter_non_existing.to_create.map((tag) => tags_service.createTag({ tag }))
	)
	const { new_filtered, new_errors } = new_tags.reduce(
		(acc, [errors, data]) => {
			if (errors !== null) {
				acc.new_errors.push(errors)
			}
			if (data === null) {
				acc.new_errors.push({ reason: 'Unexpected', error: data })
				return acc
			}
			acc.new_filtered.push(data)
			return acc
		},
		{
			new_filtered: [],
			new_errors: []
		} as { new_filtered: Tag[]; new_errors: ErrTypes[] }
	)
	if (new_errors.length > 0) {
		return err(new_errors[0])
	}
	const combined = [...new_filtered, ...filter_non_existing.existing]
	const [updated_dataset_errors, updated_dataset] = await dataset_service.updateDataset({
		id: dataset_id,
		data: {
			id: dataset_id,
			tags: combined.map(({ name, vocabulary_id }) => ({ name, vocabulary_id }))
		}
	})
	if (updated_dataset_errors !== null) {
		return err(updated_dataset_errors)
	}
	return ok(updated_dataset)
}
