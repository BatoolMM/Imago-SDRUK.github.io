import { db } from '$lib/db/index.js'
import { downloads } from '$lib/db/schema/downloads.js'
import { resource_versions, resources } from '$lib/db/schema/resources.js'
import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, ketoWrite } from '$lib/utils/auth/index.js'
import { remove } from '$lib/utils/ckan/ckan.js'
import { handleDBError } from '$lib/utils/db/index.js'
import {
	deleteBlob,
	getSignedDownloadUrl,
	loadStorageClient
} from '$lib/utils/files/azure/index.js'
import { error } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { and, desc, eq, sql } from 'drizzle-orm'

export const GET = async ({ params, locals, url }) => {
	await authorise({
		namespace: 'Endpoint',
		relation: 'GET',
		session: locals.session,
		object: '/api/v1/resources',
		action: () => redirect(307, '/auth/login')
	})
	const resource_id = params.id
	const version = url.searchParams.get('version')
	const resource_version = await db
		.select()
		.from(resource_versions)
		.where(
			version
				? and(eq(resource_versions.resource, resource_id), eq(resource_versions.version, version))
				: eq(resource_versions.resource, resource_id)
		)
		.orderBy(desc(resource_versions.created_by))
		.limit(1)
		.catch(handleDBError('No version exists for this resource'))
	if (resource_version.length === 0) {
		error(...SERVER_ERRORS[404])
	}
	const client = loadStorageClient()
	const signed_url = getSignedDownloadUrl({ ...client, filename: resource_version[0].id })
	await db
		.update(resource_versions)
		.set({ downloads: sql`${resource_versions.downloads} + 1` })
		.returning()
		.where(eq(resource_versions.id, resource_version[0].id))
	await db.insert(downloads).values({
		resource: resource_id,
		user: String(locals.session?.identity.id),
		version: resource_version[0].id
	})
	return fetch(signed_url)
	/**
	 * NOTE: this will open the resource on the same tab
	 **/
	// return redirect(303, signed_url)
}

export const DELETE = async ({ params, locals }) => {
	await authorise({
		namespace: 'Endpoint',
		relation: 'DELETE',
		session: locals.session,
		object: '/api/v1/resources'
	})
	await locals.ckan.request(remove('resource_delete', { id: params.id }))
	const client = loadStorageClient()
	await deleteBlob({
		...client,
		filename: params.id
	})
	await db.delete(resources).where(eq(resources.id, params.id))
	await ketoWrite.deleteRelationships({ namespace: 'Resource', object: params.id })
	return new Response('', { status: 201, statusText: 'continue' })
}
