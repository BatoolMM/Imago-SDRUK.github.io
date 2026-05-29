import type { ITransactionService } from '$lib/server/application/services/transaction'

const startTransaction: ITransactionService['startTransaction'] = async ({ clb }) => {
	//@ts-expect-error this is expected
	return clb({ rollback: () => {} })
}

export const transactionManagerServiceTest: ITransactionService = {
	startTransaction
}
