import type { IDatasetService } from '$lib/server/application/services/dataset'

const createDataset: IDatasetService['createDataset'] = async () => {
	return {
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
		resources: []
	}
}

const getDataset: IDatasetService['getDataset'] = async () => {
	return {
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
		resources: []
	}
}

const getDatasets: IDatasetService['getDatasets'] = async () => {
	return {
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
				resources: []
			}
		],
		page_size: 1,
		next: 1,
		total: 1
	}
}

const getDatasetActivity: IDatasetService['getDatasetActivity'] = async () => {
	return []
}

export const infrastructureServiceDatasetTest: IDatasetService = {
	getDataset,
	createDataset,
	getDatasets,
	getDatasetActivity
}
