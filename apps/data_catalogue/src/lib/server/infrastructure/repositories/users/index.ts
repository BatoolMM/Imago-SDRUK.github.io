import type { IUsersRepository } from '$lib/server/application/repositories/users'
import { userRepositoryInfrastructureDrizzle } from '$lib/server/infrastructure/repositories/users/drizzle'
import { userRepositoryInfrastructureTest } from '$lib/server/infrastructure/repositories/users/test'

export const userRepositoryInfrastructure: {
	drizzle: IUsersRepository
	test: IUsersRepository
} = {
	drizzle: userRepositoryInfrastructureDrizzle,
	test: userRepositoryInfrastructureTest
}
