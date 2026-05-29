import type { IDownloadsRepository } from '$lib/server/application/repositories/downloads'
import { ok } from '$lib/server/entities/errors'
import { DateTime } from 'luxon'

const registerDownload: IDownloadsRepository['registerDownload'] = async () => {
	return ok({
		created_at: DateTime.now().toJSDate(),
		resource: '',
		user: '',
		version: ''
	})
}

const getDownloads: IDownloadsRepository['getDownloads'] = async () => {
	return ok([
		{
			created_at: DateTime.now().toJSDate(),
			resource: '',
			user: '',
			version: ''
		}
	])
}

const getDownloadsAggregate: IDownloadsRepository['getDownloadsAggregate'] = async () => {
	return ok([])
}

const getDownloadsCount: IDownloadsRepository['getDownloadsCount'] = async () => {
	return ok(0)
}

export const downloadsRepositoryInfrastructureTest: IDownloadsRepository = {
	registerDownload,
	getDownloads,
	getDownloadsAggregate,
	getDownloadsCount
}
