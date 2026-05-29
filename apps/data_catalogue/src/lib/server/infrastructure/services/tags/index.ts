import type { ITagsService } from '$lib/server/application/services/tags'
import { infrastructureServiceTagsCkan } from '$lib/server/infrastructure/services/tags/ckan'
import { infrastructureServiceTagsTest } from '$lib/server/infrastructure/services/tags/test'

export const tagsServiceInfrastructure: {
	ckan: ITagsService
	test: ITagsService
} = {
	ckan: infrastructureServiceTagsCkan,
	test: infrastructureServiceTagsTest
}
