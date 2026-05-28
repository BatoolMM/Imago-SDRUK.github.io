import type { IAnswersRepository } from '$lib/server/application/repositories/answers'
import { answersRepositoryInfrastructureDrizzle } from '$lib/server/infrastructure/repositories/answers/drizzle'
import { answersRepositoryInfrastructureTest } from '$lib/server/infrastructure/repositories/answers/test'

export const answersRepositoryInfrastructure: {
	test: IAnswersRepository
	drizzle: IAnswersRepository
} = {
	test: answersRepositoryInfrastructureTest,
	drizzle: answersRepositoryInfrastructureDrizzle
}
