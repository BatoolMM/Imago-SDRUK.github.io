import type { IResourceRepository } from '$lib/server/application/repositories/resource'
import { datasetRepositoryInfrastructureDrizzle } from '$lib/server/infrastructure/repositories/resources/drizzle'
import { datasetRepositoryInfrastructureTest } from '$lib/server/infrastructure/repositories/resources/test'

export const resourceRepositoryInfrastructure: {
	test: IResourceRepository
	drizzle: IResourceRepository
} = {
	test: datasetRepositoryInfrastructureTest,
	drizzle: datasetRepositoryInfrastructureDrizzle
}
