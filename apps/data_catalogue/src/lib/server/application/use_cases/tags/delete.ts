import type { AppContext } from '$lib/server/application/context'
import type { TagsService } from '$lib/server/application/services/tags'
import { err, ok } from '$lib/server/entities/errors'

export const tagDeleteUseCase = async ({
	tag_id,
	vocabulary_id,
	tags_service,
	session,
	authorisation_module,
	configuration
}: {
	tag_id: string
	vocabulary_id?: string
	tags_service: TagsService
} & AppContext) => {
	const [errors, permission] = await authorisation_module.authorise({
		namespace: 'Action',
		object: 'dataset',
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
	if (!tag_id) {
		return err({ reason: 'Missing ID' })
	}
	const [tag_errors] = await tags_service.deleteTag({ tag_id, vocabulary_id })
	if (tag_errors !== null) {
		return err(tag_errors)
	}
	return ok(null)
}
