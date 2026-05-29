import type { IStorageService } from '$lib/server/application/services/storage'
import { azureIStorageServiceInfrastructure } from '$lib/server/infrastructure/services/storage/azure'
import { testIStorageServiceInfrastructure } from '$lib/server/infrastructure/services/storage/test'

export const storageServiceInfrastructure: {
	azure: IStorageService
	test: IStorageService
} = {
	azure: azureIStorageServiceInfrastructure,
	test: testIStorageServiceInfrastructure
}
