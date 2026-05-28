import type { IGroupsService } from '$lib/server/application/services/groups'
import { ok } from '$lib/server/entities/errors'
const createGroup: IGroupsService['createGroup'] = async () => {
	return ok({
		id: '',
		state: '',
		approval_status: '',
		created: '',
		description: '',
		display_name: '',
		image_display_url: '',
		image_url: '',
		is_organization: false,
		name: '',
		num_followers: 0,
		package_count: 0,
		title: '',
		type: ''
	})
}

const getGroup: IGroupsService['getGroup'] = async () => {
	return ok({
		id: '',
		state: '',
		approval_status: '',
		created: '',
		description: '',
		display_name: '',
		image_display_url: '',
		image_url: '',
		is_organization: false,
		name: '',
		num_followers: 0,
		package_count: 0,
		title: '',
		type: ''
	})
}

const getGroups: IGroupsService['getGroups'] = async () => {
	return ok([])
}

const updateGroup: IGroupsService['updateGroup'] = async () => {
	return ok({
		id: '',
		state: '',
		approval_status: '',
		created: '',
		description: '',
		display_name: '',
		image_display_url: '',
		image_url: '',
		is_organization: false,
		name: '',
		num_followers: 0,
		package_count: 0,
		title: '',
		type: ''
	})
}
const deleteGroup: IGroupsService['deleteGroup'] = async () => {
	return ok(null)
}

export const infrastructureServiceGroupsTest: IGroupsService = {
	createGroup,
	getGroup,
	getGroups,
	updateGroup,
	deleteGroup
}
