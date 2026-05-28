import { db } from '$lib/db'
import { downloads } from '$lib/db/schema'
import type { IDownloadsRepository } from '$lib/server/application/repositories/downloads'
import { err, ok } from '$lib/server/entities/errors'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

const getDownloads: IDownloadsRepository['getDownloads'] = async ({ id }) => {
	try {
		const download = await db.select().from(downloads).where(eq(downloads.resource, id))
		return ok(download)
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const getDownloadsCount: IDownloadsRepository['getDownloadsCount'] = async ({ id }) => {
	try {
		const download = await db
			.select({ value: count() })
			.from(downloads)
			.where(eq(downloads.resource, id))
		return ok(download[0].value)
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const registerDownload: IDownloadsRepository['registerDownload'] = async ({ data }) => {
	try {
		const download = await db.insert(downloads).values(data).returning()
		return ok(download[0])
	} catch (_err) {
		return err({ reason: 'Unexpected', error: _err })
	}
}

const getDownloadsAggregate: IDownloadsRepository['getDownloadsAggregate'] = async ({
	from,
	to
}) => {
	try {
		const download = await db
			.select({
				resource_id: downloads.resource,
				count: sql<number>`cast(count(${downloads.resource}) as int)`
			})
			.from(downloads)
			.groupBy(downloads.resource)
			.where(and(gte(downloads.created_at, from), lte(downloads.created_at, to)))
		return ok(download)
	} catch (_err) {
		console.log(_err)
		return err({ reason: 'Unexpected', error: _err })
	}
}

export const downloadsRepositoryInfrastructureDrizzle: IDownloadsRepository = {
	getDownloads,
	getDownloadsCount,
	registerDownload,
	getDownloadsAggregate
}
