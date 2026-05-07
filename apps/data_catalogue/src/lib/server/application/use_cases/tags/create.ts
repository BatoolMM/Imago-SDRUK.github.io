import type { AppContext } from '$lib/server/application/context'
import type { TagsService } from '$lib/server/application/services/tags'
import { err, ok } from '$lib/server/entities/errors'
import { getAuthorisationModule } from '$lib/server/modules/authorisation'

export const tagCreateUseCase = async ({
	tag,
	vocabulary_name = 'general',
	tags_service,
	session,
	configuration
}: {
	vocabulary_name?: string
	tag: string
	tags_service: TagsService
} & AppContext) => {
	const [errors, permission] = await getAuthorisationModule().authorise({
		namespace: 'Action',
		object: 'datasets',
		permits: 'create',
		actor: session.identity.id,
		configuration
	})
	if (errors) {
		return err(errors)
	}
	if (!permission.allowed) {
		return err({ reason: 'Unauthorised' })
	}
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
	return await tags_service
		.createTag({
			tag: {
				name: tag,
				vocabulary_id: vocabulary.id
			}
		})
		.then((res) => ok(res))
		.catch((_err) => err({ reason: 'Unexpected', error: _err }))
}
