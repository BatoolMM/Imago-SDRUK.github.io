import type { IDatastoreService } from '$lib/server/application/services/datastore'
import { infrastructureServiceDatastoreCkan } from '$lib/server/infrastructure/services/datastore/ckan'
import { infrastructureServiceDatastoreTest } from '$lib/server/infrastructure/services/datastore/test'

export const datastoreServiceInfrastructure: {
	ckan: IDatastoreService
	test: IDatastoreService
} = {
	ckan: infrastructureServiceDatastoreCkan,
	test: infrastructureServiceDatastoreTest
}
