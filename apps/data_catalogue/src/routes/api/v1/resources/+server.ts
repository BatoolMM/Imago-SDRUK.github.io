import { env } from '$env/dynamic/private'
import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, ketoWrite } from '$lib/utils/auth/index.js'
import { getResourceBasePermissions } from '$lib/utils/auth/permissions/index.js'
import { create } from '$lib/utils/ckan/ckan.js'
import {
	cleanResourceURL,
	getSignedUploadUrl,
	loadStorageClient,
	resourceIdFromURL
} from '$lib/utils/files/azure/index.js'
import { error, json } from '@sveltejs/kit'

const POST_ACTIONS = ['signed_url', 'create']

export const POST = async ({ request, url, params, locals }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		relation: 'POST',
		object: '/api/v1/resources'
	})
	if (!locals.session) {
		error(...SERVER_ERRORS[401])
	}
	const action = url.searchParams.get('action')
	if (!action || !POST_ACTIONS.includes(action)) {
		return error(...SERVER_ERRORS[403])
	}
	const adapter = request.headers.get('adapter') ?? 'azure'
	if (adapter === 'azure') {
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
			const resource_id = resourceIdFromURL({ url: data.url })
			const clean_url = cleanResourceURL({ url: data.url })
			if (resource_id.valid === false || clean_url.valid === false) {
				error(...SERVER_ERRORS[400])
			}
			const resource = await locals.ckan.request(
				create('resource_create', {
					id: resource_id.id,
					url: `${env.ORIGIN ?? 'http://127.0.0.1:5174'}/api/v1/resources/${resource_id.id}`,
					name: data.name,
					package_id: data.id,
					description: data.description,
					format: data.type,
					mimetype: data.mimetype,
					size: data.size
				})
			)
			if (!resource.success) {
				error(...SERVER_ERRORS[500])
			}
			await ketoWrite.patchRelationships({
				//@ts-expect-error ok ok ok
				relationshipPatch: getResourceBasePermissions({
					object: resource_id.id,
					dataset_id: data.id
				}).map((relation) => ({ action: 'insert', relation_tuple: relation }))
			})
			return json(resource.result)
		}
	}
	return json({ message: 'ok' })
}
