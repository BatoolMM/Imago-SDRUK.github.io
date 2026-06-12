import type { IDatastoreService } from '$lib/server/application/services/datastore'
import { err, ok } from '$lib/server/entities/errors'
import { CkanDatastore } from '$lib/server/entities/models/datastore'
type MockMetadata = { resource_id: string; metadata: CkanDatastore }
let mock: MockMetadata[] = []

const getStructuralMetadata: IDatastoreService['getStructuralMetadata'] = async ({ id }) => {
	const result = mock.find((m) => m.resource_id === id)
	if (result) {
		return ok(result.metadata)
	}
	return err({ reason: 'Not Found', message: 'Metadata not found' })
}

const setStructuralMetadata: IDatastoreService['setStructuralMetadata'] = async ({ metadata }) => {
	const result: MockMetadata = {
		metadata: {
			...metadata,
			meta: { id: '', aliases: [], count: 0, db_size: 0, idx_size: 0, size: 0, table_type: '' },
			fields: metadata.fields ?? []
		},
		resource_id: metadata.resource_id
	}
	mock.push(result)
	return ok(result.metadata)
}

const updateStructuralMetadata: IDatastoreService['updateStructuralMetadata'] = async () => {
	return ok({
		meta: { id: '', aliases: [], count: 0, db_size: 0, idx_size: 0, size: 0, table_type: '' },
		fields: []
	})
}

const deleteStructuralMetadata: IDatastoreService['deleteStructuralMetadata'] = async ({ id }) => {
	const index = mock.findIndex((x) => x.resource_id === id)
	if (index > -1) {
		mock = [...mock.slice(0, index), ...mock.slice(index + 1)]
	}
	return ok(null)
}

export const infrastructureServiceDatastoreTest: IDatastoreService = {
	getStructuralMetadata,
	setStructuralMetadata,
	updateStructuralMetadata,
	deleteStructuralMetadata
}
