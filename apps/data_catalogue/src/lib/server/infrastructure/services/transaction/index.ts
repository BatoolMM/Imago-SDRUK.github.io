import type { ITransactionService } from '$lib/server/application/services/transaction'
import { transactionManagerServiceDrizzle } from '$lib/server/infrastructure/services/transaction/drizzle'
import { transactionManagerServiceTest } from '$lib/server/infrastructure/services/transaction/test'

export const transactionServiceInfrastructure: {
	drizzle: ITransactionService
	test: ITransactionService
} = {
	drizzle: transactionManagerServiceDrizzle,
	test: transactionManagerServiceTest
}
