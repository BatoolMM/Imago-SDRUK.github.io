import type { IResourceRepository } from '$lib/server/application/repositories/resource'
import { ok } from '$lib/server/entities/errors'
import { DateTime } from 'luxon'

const createResource: IResourceRepository['createResource'] = async ({ data }) => {
	return ok({
		status: data.status ?? 'draft',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		created_by: data.created_by,
		id: data.id ?? '',
		title: data.title ?? null,
		description: data.description ?? null,
		updated_by: data.updated_by
	})
}

const getResource: IResourceRepository['getResource'] = async ({ id }) => {
	return ok({
		status: 'draft',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		created_by: '',
		id: id,
		title: '',
		description: '',
		updated_by: ''
	})
}

const getResources: IResourceRepository['getResources'] = async () => {
	return ok([])
}

const deleteResource: IResourceRepository['deleteResource'] = async () => {
	return ok(null)
}

const createResourceVersion: IResourceRepository['createResourceVersion'] = async ({ data }) => {
	return ok({
		id: data.id ?? '',
		version: data.version ?? '',
		changelog: data.changelog ?? null,
		url: data.url ?? null,
		downloads: data.downloads ?? 0,
		resource: data.resource ?? '',
		created_by: data.created_by ?? '',
		updated_by: data.updated_by ?? '',
		status: data.status ?? 'draft',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate()
	})
}

const deleteResourceVersion: IResourceRepository['deleteResourceVersion'] = async ({ id }) => {
	return ok(null)
}

const getResourceVersion: IResourceRepository['getResourceVersion'] = async ({
	resource,
	version
}) => {
	return ok({
		id: '',
		version: version ?? '',
		changelog: '',
		url: '',
		downloads: 0,
		resource: resource ?? '',
		created_by: '',
		updated_by: '',
		status: 'draft',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate()
	})
}
const getResourceVersions: IResourceRepository['getResourceVersions'] = async ({ id }) => {
	return ok([])
}
const updateResource: IResourceRepository['updateResource'] = async ({ data, id }) => {
	return ok({
		status: data.status ?? 'draft',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate(),
		created_by: data.created_by ?? '',
		id: id ?? '',
		title: data.title ?? '',
		description: data.description ?? null,
		updated_by: data.updated_by ?? ''
	})
}
const updateVersion: IResourceRepository['updateVersion'] = async ({ data, id }) => {
	return ok({
		id: id ?? '',
		version: data.version ?? '',
		changelog: data.changelog ?? null,
		url: data.url ?? null,
		downloads: data.downloads ?? 0,
		resource: data.resource ?? '',
		created_by: data.created_by ?? '',
		updated_by: data.updated_by ?? '',
		status: data.status ?? 'draft',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate()
	})
}
const updateVersionAddDownload: IResourceRepository['updateVersionAddDownload'] = async ({
	id
}) => {
	return ok({
		id: id ?? '',
		version: '',
		changelog: '',
		url: '',
		downloads: 1,
		resource: '',
		created_by: '',
		updated_by: '',
		status: 'draft',
		created_at: DateTime.now().toJSDate(),
		updated_at: DateTime.now().toJSDate()
	})
}

export const datasetRepositoryInfrastructureTest: IResourceRepository = {
	createResource,
	getResource,
	getResources,
	deleteResource,
	createResourceVersion,
	deleteResourceVersion,
	getResourceVersion,
	getResourceVersions,
	updateResource,
	updateVersion,
	updateVersionAddDownload
}
