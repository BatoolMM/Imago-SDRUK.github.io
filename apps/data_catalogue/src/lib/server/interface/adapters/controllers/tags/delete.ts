import { tagDeleteUseCase } from '$lib/server/application/use_cases/tags/delete'
import { err, ok } from '$lib/server/entities/errors'
import type { Configuration } from '$lib/server/entities/models/configuration'
import { getAuthorisationModule } from '$lib/server/modules/authorisation'
import { getTagsModule } from '$lib/server/modules/tags'

export const tagDeleteController = async ({
	tag_id,
	vocabulary_id,
	session,
	configuration
}: {
	tag_id: string
	vocabulary_id?: string
	session: App.Locals['session']
	configuration: Configuration
}) => {
	if (!session) {
		return err({ reason: 'Unauthenticated' })
	}
	const [tag_errors] = await tagDeleteUseCase({
		tag_id,
		vocabulary_id,
		authorisation_module: getAuthorisationModule(),
		configuration,
		session,
		tags_service: getTagsModule()
	})
	if (tag_errors !== null) {
		return err(tag_errors)
	}
	return ok(null)
}
