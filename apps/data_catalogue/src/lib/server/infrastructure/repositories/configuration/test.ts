import type { IConfigurationRepository } from '$lib/server/application/repositories/configuration'
import { ok } from '$lib/server/entities/errors'

const initialiseConfiguration: IConfigurationRepository['initialiseConfiguration'] = async () => {
	return ok({
		id: '',
		admin_group: '',
		superusers: []
	})
}
const addSuperUser: IConfigurationRepository['addSuperUser'] = async () => {
	return ok({
		admin_group: '',
		id: '',
		superusers: []
	})
}

const removeSuperUser: IConfigurationRepository['removeSuperUser'] = async () => {
	return ok({
		admin_group: '',
		id: '',
		superusers: []
	})
}

const setAdminGroup: IConfigurationRepository['setAdminGroup'] = async () => {
	return ok({
		admin_group: '',
		id: '',
		superusers: []
	})
}

const getConfiguration: IConfigurationRepository['getConfiguration'] = async () => {
	return ok({
		admin_group: '',
		id: '',
		superusers: []
	})
}

export const configurationRepositoryInfrastructureTest: IConfigurationRepository = {
	addSuperUser,
	removeSuperUser,
	setAdminGroup,
	initialiseConfiguration,
	getConfiguration
}
