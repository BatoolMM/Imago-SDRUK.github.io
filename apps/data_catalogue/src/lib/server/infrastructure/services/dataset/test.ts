import type { IDatasetService } from '$lib/server/application/services/dataset'
import type { Dataset } from '$lib/server/entities/models/datasets'
import { err, ok } from '$lib/server/entities/errors'
import { getId } from '@arturoguzman/art-ui'

let datasets: Dataset[] = []

const createDataset: IDatasetService['createDataset'] = async ({ data }) => {
	const result = {
		id: data.id ?? '',
		extras: data.extras ?? [],
		groups:
			data.groups?.map((g) => ({
				...g,
				title: g.title ?? '',
				id: g.id ?? getId(),
				description: g.description ?? '',
				approval_status: '',
				created: '',
				display_name: '',
				image_display_url: '',
				image_url: '',
				is_organization: false,
				num_followers: 0,
				package_count: 0,
				state: '',
				type: ''
			})) ?? [],
		isopen: data.isopen ?? false,
		name: data.name ?? '',
		owner_org: data.owner_org ?? '',
		metadata_created: data.metadata_created ?? '',
		creator_user_id: data.creator_user_id ?? '',
		metadata_modified: data.metadata_modified ?? '',
		private: data.private ?? false,
		state: data.state ?? '',
		title: data.title ?? '',
		type: data.type ?? '',
		resources: [],
		tags:
			data.tags?.map((tag) => ({
				...tag,
				display_name: tag.name,
				id: getId(),
				state: 'active' as const
			})) ?? []
	}
	datasets.push(result)
	return ok(result)
}

const getDataset: IDatasetService['getDataset'] = async ({ id }) => {
	const dataset = datasets.find((d) => d.id === id)
	if (dataset) {
		return ok(dataset)
	}
	return err({ reason: 'Not Found', message: 'Dataset not found' })
}

const getDatasets: IDatasetService['getDatasets'] = async () => {
	return ok({
		items: datasets,
		page_size: 999,
		next: 1,
		total: datasets.length
	})
}

const getDatasetActivity: IDatasetService['getDatasetActivity'] = async () => {
	return ok([])
}

const deleteDataset: IDatasetService['deleteDataset'] = async ({ id }) => {
	const index = datasets.findIndex((x) => x.id === id)
	datasets = [...datasets.slice(0, index), ...datasets.slice(index + 1)]
	return ok(null)
}
const getDatasetsCount: IDatasetService['getDatasetsCount'] = async () => {
	return ok(datasets.length)
}
const updateDataset: IDatasetService['updateDataset'] = async ({ id, data }) => {
	const index = datasets.findIndex((x) => x.id === id)
	if (index > -1) {
		const snapshot: Dataset = {
			...datasets[index],
			...data,
			creator_user_id: data.creator_user_id ?? datasets[index].creator_user_id ?? '',
			tags:
				data.tags?.map((tag) => ({
					...tag,
					display_name: tag.name,
					id: getId(),
					state: 'active' as const
				})) ??
				datasets[index].tags ??
				[],
			groups:
				data.groups?.map((g) => ({
					...g,
					title: g.title ?? '',
					id: g.id ?? getId(),
					description: g.description ?? '',
					approval_status: '',
					created: '',
					display_name: '',
					image_display_url: '',
					image_url: '',
					is_organization: false,
					num_followers: 0,
					package_count: 0,
					state: '',
					type: ''
				})) ??
				datasets[index].groups ??
				[]
		}
		datasets[index] = snapshot
		return ok(snapshot)
	}

	return err({ reason: 'Not Found', message: 'Dataset not found' })
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
