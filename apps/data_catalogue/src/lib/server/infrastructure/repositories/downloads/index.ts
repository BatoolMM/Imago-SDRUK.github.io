import type { IDownloadsRepository } from '$lib/server/application/repositories/downloads'
import { downloadsRepositoryInfrastructureDrizzle } from '$lib/server/infrastructure/repositories/downloads/drizzle'
import { downloadsRepositoryInfrastructureTest } from '$lib/server/infrastructure/repositories/downloads/test'

export const downloadsRepositoryInfrastructure: {
	test: IDownloadsRepository
	drizzle: IDownloadsRepository
} = {
	drizzle: downloadsRepositoryInfrastructureDrizzle,
	test: downloadsRepositoryInfrastructureTest
}
