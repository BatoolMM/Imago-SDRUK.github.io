import { getServerContext } from '$lib/server/application/context'
import {
	dowloadsGetAggregatesUseCase,
	downloadsGetByDatasetUseCase
} from '$lib/server/application/use_cases/downloads/get'
import { resourceGetUseCase } from '$lib/server/application/use_cases/resources/get'
import { err, ok, type ErrTypes } from '$lib/server/entities/errors'
import { type Configuration } from '$lib/server/entities/models/configuration'
import { getDatasetModule } from '$lib/server/modules/datasets'
import { getDatastoreModule } from '$lib/server/modules/datastore'
import { getDownloadsModule } from '$lib/server/modules/downloads'
import { getResourceRepositoryModule } from '$lib/server/modules/resources'
import { getResourceServiceModule } from '$lib/server/modules/resources_service'
import { DateTime } from 'luxon'

export const donwloadsGetByDatasetController = async ({
	id,
	session,
	configuration
}: {
	id: string
	session: App.Locals['session']
	configuration: Configuration
}) => {
	if (!session) {
		return err({ reason: 'Unauthenticated' })
	}
	if (!id) {
		return err({ reason: 'Missing ID' })
	}
	return await downloadsGetByDatasetUseCase({
		id,
		downloads_repository: getDownloadsModule(),
		dataset_service: getDatasetModule(),
		...getServerContext({ session, configuration })
	})
}

export const downloadsGetAggregatesController = async ({
	from,
	to,
	session,
	configuration
}: {
	from?: string | null
	to?: string | null
	session: App.Locals['session']
	configuration: Configuration
}) => {
	if (!session) {
		return err({ reason: 'Unauthenticated' })
	}
	const downloads = await dowloadsGetAggregatesUseCase({
		from: from ?? DateTime.now().minus({ month: 1 }).toISODate() ?? '',
		to: to ?? DateTime.now().toISODate(),
		downloads_repository: getDownloadsModule(),
		...getServerContext({ session, configuration })
	})
	if (downloads[0] !== null) {
		return err(downloads[0])
	}
	const datastore_service = getDatastoreModule()
	const resource_respository = getResourceRepositoryModule()
	const resource_service = getResourceServiceModule()
	const enriched = await Promise.all(
		downloads[1].map((download) =>
			resourceGetUseCase({
				id: download.resource_id,
				datastore_service,
				resource_respository,
				resource_service,
				...getServerContext({ session, configuration })
			}).then(([errors, resource]) => {
				if (errors !== null) {
					return err(errors)
				}
				return ok({ ...resource.resource, downloads: download.count })
			})
		)
	)

	const { errors, data } = enriched.reduce(reduceAggregates, { errors: [], data: [] } as {
		errors: ErrTypes[]
		data: Record<PropertyKey, unknown>[]
	})
	if (errors.length > 0) {
		return err(errors[0])
	}
	data.sort((a, b) => b.downloads - a.downloads)
	return ok(data)
}

const reduceAggregates = <T>(
	acc: { errors: ErrTypes[]; data: T[] },
	el: [ErrTypes, null] | [null, T]
) => {
	if (el[0] !== null) {
		acc.errors.push(el[0])
		return acc
	}
	acc.data.push(el[1])
	return acc
}
