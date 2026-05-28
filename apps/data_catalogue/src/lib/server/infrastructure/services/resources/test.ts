import type { IResourceService } from '$lib/server/application/services/resource'
import { ok } from '$lib/server/entities/errors'

const getResource: IResourceService['getResource'] = async ({ id }) => {
	return ok({
		id,
		state: null,
		created: null,
		description: '',
		format: '',
		metadata_modified: '',
		name: '',
		package_id: '',
		position: 0,
		url_type: null,
		cache_last_updated: null,
		cache_url: null
	})
}
const getResources: IResourceService['getResources'] = async () => {
	return ok([])
}
const createResource: IResourceService['createResource'] = async () => {
	return ok({
		id: '',
		state: null,
		created: null,
		description: '',
		format: '',
		metadata_modified: '',
		name: '',
		package_id: '',
		position: 0,
		url_type: null,
		cache_last_updated: null,
		cache_url: null
	})
}
const deleteResource: IResourceService['deleteResource'] = async () => {
	return ok(null)
}

export const resourceServiceInfrastructureTest: IResourceService = {
	createResource,
	deleteResource,
	getResource,
	getResources
}
