import type { IConfigurationRepository } from '$lib/server/application/repositories/configuration'
import { configurationRepositoryInfrastructureDrizzle } from '$lib/server/infrastructure/repositories/configuration/drizzle'
import { configurationRepositoryInfrastructureTest } from '$lib/server/infrastructure/repositories/configuration/test'

export const configurationRepositoryInfrastructure: {
	drizzle: IConfigurationRepository
	test: IConfigurationRepository
} = {
	drizzle: configurationRepositoryInfrastructureDrizzle,
	test: configurationRepositoryInfrastructureTest
}
