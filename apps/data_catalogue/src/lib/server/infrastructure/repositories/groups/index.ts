import type { IGroupsRepository } from '$lib/server/application/repositories/groups'
import { groupRepositoryInfrastructureDrizzle } from '$lib/server/infrastructure/repositories/groups/drizzle'
import { groupRepositoryInfrastructureTest } from '$lib/server/infrastructure/repositories/groups/test'

export const groupRepositoryInfrastructure: {
	drizzle: IGroupsRepository
	test: IGroupsRepository
} = {
	drizzle: groupRepositoryInfrastructureDrizzle,
	test: groupRepositoryInfrastructureTest
}
