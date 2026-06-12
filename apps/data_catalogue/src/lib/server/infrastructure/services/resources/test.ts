import type { IResourceService } from '$lib/server/application/services/resource'
import { err, ok } from '$lib/server/entities/errors'
import type { ResourceServiceDto } from '$lib/server/entities/models/resources'
import { getId } from '@arturoguzman/art-ui'

let mock: ResourceServiceDto[] = []

const getResource: IResourceService['getResource'] = async ({ id }) => {
	const result = mock.find((x) => x.id === id)
	if (result) {
		return ok(result)
	}
	return err({ reason: 'Not Found', message: `Resource not found` })
}
const getResources: IResourceService['getResources'] = async () => {
	return ok(mock)
}
const createResource: IResourceService['createResource'] = async ({ data }) => {
	const result: ResourceServiceDto = {
		...data,
		id: data.id ?? getId(),
		state: data.state ?? null,
		created: data.created ?? null,
		description: data.description ?? '',
		format: data.format ?? '',
		metadata_modified: data.metadata_modified ?? '',
		name: data.name ?? '',
		package_id: data.package_id ?? '',
		position: data.position ?? 0,
		url_type: data.url_type ?? null,
		cache_last_updated: null,
		cache_url: null
	}
	mock.push(result)
	return ok(result)
}
const deleteResource: IResourceService['deleteResource'] = async ({ id }) => {
	const index = mock.findIndex((x) => x.id === id)
	if (index > -1) {
		mock = [...mock.slice(0, index), ...mock.slice(index + 1)]
	}
	return ok(null)
}

export const resourceServiceInfrastructureTest: IResourceService = {
	createResource,
	deleteResource,
	getResource,
	getResources
}
