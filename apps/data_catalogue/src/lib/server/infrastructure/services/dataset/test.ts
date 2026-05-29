import type { IDatasetService } from '$lib/server/application/services/dataset'
import { ok } from '$lib/server/entities/errors'

const createDataset: IDatasetService['createDataset'] = async () => {
	return ok({
		id: '',
		extras: [],
		groups: [],
		isopen: false,
		name: '',
		owner_org: '',
		metadata_created: '',
		creator_user_id: '',
		metadata_modified: '',
		private: false,
		state: '',
		title: '',
		type: '',
		resources: [],
		tags: []
	})
}

const getDataset: IDatasetService['getDataset'] = async () => {
	return ok({
		id: '',
		extras: [],
		groups: [],
		isopen: false,
		name: '',
		owner_org: '',
		metadata_created: '',
		creator_user_id: '',
		metadata_modified: '',
		private: false,
		state: '',
		title: '',
		type: '',
		resources: [],
		tags: []
	})
}

const getDatasets: IDatasetService['getDatasets'] = async () => {
	return ok({
		items: [
			{
				id: '',
				extras: [],
				groups: [],
				isopen: false,
				name: '',
				owner_org: '',
				metadata_created: '',
				creator_user_id: '',
				metadata_modified: '',
				private: false,
				state: '',
				title: '',
				type: '',
				resources: [],
				tags: []
			}
		],
		page_size: 1,
		next: 1,
		total: 1
	})
}

const getDatasetActivity: IDatasetService['getDatasetActivity'] = async () => {
	return ok([])
}

const deleteDataset: IDatasetService['deleteDataset'] = async () => {
	return ok(null)
}
const getDatasetsCount: IDatasetService['getDatasetsCount'] = async () => {
	return ok(0)
}
const updateDataset: IDatasetService['updateDataset'] = async () => {
	return ok({
		id: '',
		extras: [],
		groups: [],
		isopen: false,
		name: '',
		owner_org: '',
		metadata_created: '',
		creator_user_id: '',
		metadata_modified: '',
		private: false,
		state: '',
		title: '',
		type: '',
		resources: [],
		tags: []
	})
}

export const infrastructureServiceDatasetTest: IDatasetService = {
	getDataset,
	createDataset,
	getDatasets,
	getDatasetActivity,
	deleteDataset,
	getDatasetsCount,
	updateDataset
}
