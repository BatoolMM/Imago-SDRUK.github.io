import type { IDatasetService } from '$lib/server/application/services/dataset'
import { infrastructureServiceDatasetCkan } from '$lib/server/infrastructure/services/dataset/ckan'
import { infrastructureServiceDatasetTest } from '$lib/server/infrastructure/services/dataset/test'

export const datasetServiceInfrastructure: {
	ckan: IDatasetService
	test: IDatasetService
} = {
	ckan: infrastructureServiceDatasetCkan,
	test: infrastructureServiceDatasetTest
}
