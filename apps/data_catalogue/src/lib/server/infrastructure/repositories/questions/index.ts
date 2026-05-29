import type { IQuestionsRepository } from '$lib/server/application/repositories/questions'
import { questionsRepositoryInfrastructureDrizzle } from '$lib/server/infrastructure/repositories/questions/drizzle'
import { questionsRepositoryInfrastructureTest } from '$lib/server/infrastructure/repositories/questions/test'

export const questionsRepositoryInfrastructure: {
	test: IQuestionsRepository
	drizzle: IQuestionsRepository
} = {
	test: questionsRepositoryInfrastructureTest,
	drizzle: questionsRepositoryInfrastructureDrizzle
}
