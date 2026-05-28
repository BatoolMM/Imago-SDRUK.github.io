import type { IGroupsRepository } from '$lib/server/application/repositories/groups'
import { ok } from '$lib/server/entities/errors'
import { DateTime } from 'luxon'

const getGroup: IGroupsRepository['getGroup'] = async ({ id }) => {
	return ok({
		created_at: DateTime.now().toJSDate(),
		created_by: '',
		id: id,
		visibility: 'public',
		title: '',
		slug: '',
		description: '',
		datasets: [],
		autoenroll: false,
		status: 'active',
		updated_at: DateTime.now().toJSDate(),
		updated_by: ''
	})
}

const createGroup: IGroupsRepository['createGroup'] = async ({ data }) => {
	return ok({
		created_at: DateTime.now().toJSDate(),
		created_by: data.created_by,
		updated_at: DateTime.now().toJSDate(),
		updated_by: data.updated_by,
		id: '',
		visibility: 'public',
		title: data.title,
		slug: data.slug,
		description: data.description ?? null,
		datasets: data.datasets ?? null,
		autoenroll: data.autoenroll ?? false,
		status: data.status ?? 'draft'
	})
}

const updateGroup: IGroupsRepository['updateGroup'] = async ({ data, id }) => {
	return ok({
		created_at: DateTime.now().toJSDate(),
		created_by: data.created_by ?? '',
		updated_at: DateTime.now().toJSDate(),
		updated_by: data.updated_by ?? '',
		id,
		visibility: 'public',
		title: data.title ?? '',
		slug: data.slug ?? '',
		description: data.description ?? null,
		datasets: data.datasets ?? null,
		autoenroll: data.autoenroll ?? false,
		status: data.status ?? 'draft'
	})
}

const getGroups: IGroupsRepository['getGroups'] = async () => {
	return ok([])
}

const addDatasetToGroup: IGroupsRepository['addDatasetToGroup'] = async ({ id, dataset_id }) => {
	return ok({
		created_at: DateTime.now().toJSDate(),
		created_by: '',
		updated_at: DateTime.now().toJSDate(),
		updated_by: '',
		id,
		visibility: 'public',
		title: '',
		slug: '',
		description: null,
		datasets: [dataset_id],
		autoenroll: false,
		status: 'draft'
	})
}
const addUserToGroup: IGroupsRepository['addUserToGroup'] = async ({ data }) => {
	return ok({
		...data,
		created_at: DateTime.now().toJSDate(),
		created_by: '',
		updated_at: DateTime.now().toJSDate(),
		updated_by: ''
	})
}
const deleteGroup: IGroupsRepository['deleteGroup'] = async () => {
	return ok(null)
}
const getGroupUsers: IGroupsRepository['getGroupUsers'] = async () => {
	return ok([])
}
const getGroupsAutoenroll: IGroupsRepository['getGroupsAutoenroll'] = async () => {
	return ok([])
}
const getGroupsById: IGroupsRepository['getGroupsById'] = async () => {
	return ok([])
}
const removeDatasetFromGroup: IGroupsRepository['removeDatasetFromGroup'] = async () => {
	return ok(null)
}
const removeUserFromGroup: IGroupsRepository['removeUserFromGroup'] = async () => {
	return ok(null)
}

export const groupRepositoryInfrastructureTest: IGroupsRepository = {
	createGroup,
	getGroup,
	updateGroup,
	getGroups,
	addDatasetToGroup,
	addUserToGroup,
	deleteGroup,
	getGroupUsers,
	getGroupsAutoenroll,
	getGroupsById,
	removeDatasetFromGroup,
	removeUserFromGroup
}
