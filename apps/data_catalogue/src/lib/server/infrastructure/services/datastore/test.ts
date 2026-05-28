import type { IDatastoreService } from '$lib/server/application/services/datastore'
import { ok } from '$lib/server/entities/errors'

const getStructuralMetadata: IDatastoreService['getStructuralMetadata'] = async () => {
	return ok({
		meta: { id: '', aliases: [], count: 0, db_size: 0, idx_size: 0, size: 0, table_type: '' },
		fields: []
	})
}

const setStructuralMetadata: IDatastoreService['setStructuralMetadata'] = async () => {
	return ok({
		meta: { id: '', aliases: [], count: 0, db_size: 0, idx_size: 0, size: 0, table_type: '' },
		fields: []
	})
}

const updateStructuralMetadata: IDatastoreService['updateStructuralMetadata'] = async () => {
	return ok({
		meta: { id: '', aliases: [], count: 0, db_size: 0, idx_size: 0, size: 0, table_type: '' },
		fields: []
	})
}

const deleteStructuralMetadata: IDatastoreService['deleteStructuralMetadata'] = async () => {
	return ok(null)
}

export const infrastructureServiceDatastoreTest: IDatastoreService = {
	getStructuralMetadata,
	setStructuralMetadata,
	updateStructuralMetadata,
	deleteStructuralMetadata
}
