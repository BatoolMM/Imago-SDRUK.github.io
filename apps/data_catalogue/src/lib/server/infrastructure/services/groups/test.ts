import type { IGroupsService } from '$lib/server/application/services/groups'
import { err, ok } from '$lib/server/entities/errors'
import type { CkanGroup } from '$lib/types/ckan'
import { getId } from '@arturoguzman/art-ui'

let mock: CkanGroup[] = []

const createGroup: IGroupsService['createGroup'] = async ({ data }) => {
	const result = {
		id: data.id ?? getId(),
		state: data.id ?? '',
		approval_status: data.id ?? '',
		created: data.id ?? '',
		description: data.description ?? '',
		display_name: data.id ?? '',
		image_display_url: data.id ?? '',
		image_url: data.id ?? '',
		is_organization: false,
		name: data.name ?? '',
		num_followers: 0,
		package_count: 0,
		title: data.title ?? '',
		type: data.id ?? ''
	}
	mock.push(result)
	return ok(result)
}

const getGroup: IGroupsService['getGroup'] = async ({ id }) => {
	const result = mock.find((x) => x.id === id)
	if (result) {
		return ok(result)
	}
	return err({ reason: 'Not Found', message: `Group not found` })
}

const getGroups: IGroupsService['getGroups'] = async () => {
	return ok(mock)
}

const updateGroup: IGroupsService['updateGroup'] = async ({ id, data }) => {
	const index = mock.findIndex((x) => x.id === id)
	if (index > -1) {
		const result = {
			...mock[index],
			description: data.description ?? mock[index].title,
			title: data.title ?? mock[index].description
		}
		return ok(result)
	}
	return err({ reason: 'Not Found', message: `Group not found` })
}
const deleteGroup: IGroupsService['deleteGroup'] = async ({ id }) => {
	const index = mock.findIndex((x) => x.id === id)
	if (index > -1) {
		mock = [...mock.slice(0, index), ...mock.slice(index + 1)]
	}
	return ok(null)
}

export const infrastructureServiceGroupsTest: IGroupsService = {
	createGroup,
	getGroup,
	getGroups,
	updateGroup,
	deleteGroup
}
