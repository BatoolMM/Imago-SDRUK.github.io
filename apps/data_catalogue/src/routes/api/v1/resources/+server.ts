import { env } from '$env/dynamic/private'
import { db } from '$lib/db/index.js'
import { resource_versions, resources } from '$lib/db/schema/resources.js'
import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, ketoWrite } from '$lib/utils/auth/index.js'
import { getResourceBasePermissions } from '$lib/utils/auth/permissions/index.js'
import { create } from '$lib/utils/ckan/ckan.js'
import { handleDBError } from '$lib/utils/db/index.js'
import {
	cleanResourceURL,
	getSignedUploadUrl,
	loadStorageClient,
	resourceIdFromURL
} from '$lib/utils/files/azure/index.js'
import { error, json } from '@sveltejs/kit'
import { v7 } from 'uuid'

const POST_ACTIONS = ['signed_url', 'create']

export const POST = async ({ request, url, locals }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		relation: 'POST',
		object: '/api/v1/resources'
	})
	const action = url.searchParams.get('action')
	if (!action || !POST_ACTIONS.includes(action)) {
		return error(...SERVER_ERRORS[403])
	}
	if (action === 'signed_url') {
		const client = loadStorageClient()
		return json({
			message: 'ok',
			url: await getSignedUploadUrl({ ...client, filename: crypto.randomUUID() })
		})
	}
	if (action === 'create') {
		const data = (await request.json()) as {
			url: string
			name: string
			id: string
			description: string
			type: string
			mimetype: string
			size: number
		}
		const resource_id = v7()
		const resource_version_id = resourceIdFromURL({ url: data.url })
		const clean_url = cleanResourceURL({ url: data.url })
		if (resource_version_id.valid === false || clean_url.valid === false) {
			error(...SERVER_ERRORS[400])
		}
		const ckan_resource = await locals.ckan.request(
			create('resource_create', {
				id: resource_id,
				url: `${env.ORIGIN ?? 'http://127.0.0.1:5174'}/api/v1/resources/${resource_id}`,
				name: data.name,
				package_id: data.id,
				description: data.description,
				format: data.type,
				mimetype: data.mimetype,
				size: data.size
			})
		)
		if (!ckan_resource.success) {
			error(...SERVER_ERRORS[500])
		}
		const resource = await db
			.insert(resources)
			.values({
				created_by: String(locals.session?.identity.id),
				updated_by: String(locals.session?.identity.id),
				title: data.name,
				id: resource_id,
				description: data.description
			})
			.returning()
			.catch(handleDBError('Error creating the resource'))
		await db
			.insert(resource_versions)
			.values({
				created_by: String(locals.session?.identity.id),
				updated_by: String(locals.session?.identity.id),
				resource: resource[0].id,
				version: '0.0.1',
				changelog: data.description,
				status: 'published',
				url: clean_url.url.toString(),
				id: resource_version_id.id
			})
			.catch(handleDBError('Error creating the resource version'))
		await ketoWrite.patchRelationships({
			relationshipPatch: getResourceBasePermissions({
				object: resource_id,
				dataset_id: data.id
			}).map((relation) => ({ action: 'insert', relation_tuple: relation }))
		})
		return json(ckan_resource.result)
	}
	return json({ message: 'ok' })
}
