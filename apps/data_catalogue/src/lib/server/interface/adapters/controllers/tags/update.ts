import { getServerContext } from '$lib/server/application/context'
import { tagsMigrateUseCase } from '$lib/server/application/use_cases/tags/update'
import { err } from '$lib/server/entities/errors'
import type { Configuration } from '$lib/server/entities/models/configuration'
import { getDatasetModule } from '$lib/server/modules/datasets'
import { getTagsModule } from '$lib/server/modules/tags'

export const tagsMigrateController = async ({
	dataset_id,
	session,
	vocabulary_name = 'general',
	configuration
}: {
	dataset_id: string
	session: App.Locals['session']
	vocabulary_name?: string
	configuration: Configuration
}) => {
	if (!session) {
		return err({ reason: 'Unauthenticated' })
	}
	const tags = await tagsMigrateUseCase({
		dataset_id,
		dataset_service: getDatasetModule(),
		vocabulary_name,
		tags_service: getTagsModule(),
		...getServerContext({ session, configuration })
	})
	return tags
}
