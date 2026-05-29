import type { IResourceService } from '$lib/server/application/services/resource'
import { resourceServiceInfrastructureCkan } from '$lib/server/infrastructure/services/resources/ckan'
import { resourceServiceInfrastructureTest } from '$lib/server/infrastructure/services/resources/test'

export const resourceServiceInfrastructure: {
	test: IResourceService
	ckan: IResourceService
} = {
	test: resourceServiceInfrastructureTest,
	ckan: resourceServiceInfrastructureCkan
}
