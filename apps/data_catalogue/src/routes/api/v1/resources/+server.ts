import { env } from '$env/dynamic/private'
import { SERVER_ERRORS } from '$lib/globals/server.js'
import { create } from '$lib/utils/ckan/ckan.js'
import {
	cleanResourceURL,
	getSignedUploadUrl,
	loadStorageClient,
	resourceIdFromURL
} from '$lib/utils/files/azure/index.js'
import { error, json } from '@sveltejs/kit'

export const GET = async ({ request }) => {
	const action = request.headers.get('action')
	if (action === 'download') {
		// return presigned url of asset, validate user request is authenticated
		return json({ message: 'ok' })
	} // return list of resources, validate user request is authenticated
	return json({ message: 'ok' })
}

const POST_ACTIONS = ['signed_url', 'create']
export const POST = async ({ request, url, params, locals }) => {
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
			return json(resource.result)
		}
	}
	return json({ message: 'ok' })
}

// {
//     "cache_last_updated": null,
//     "cache_url": null,
//     "created": "2025-11-06T19:19:27.761062",
//     "datastore_active": false,
//     "description": null,
//     "format": "",
//     "hash": "",
//     "id": "fb867ecf-77a3-4f54-9ae3-cfe9ae671d9b",
//     "last_modified": null,
//     "metadata_modified": "2025-11-06T19:19:27.754204",
//     "mimetype": null,
//     "mimetype_inner": null,
//     "name": null,
//     "package_id": "5f62cb59-73a8-4520-8aa0-5c14cdf8e759",
//     "position": 11,
//     "resource_type": null,
//     "size": null,
//     "state": "active",
//     "url": "https://stimagoappdevuksouth001.blob.core.windows.net/imago-app-dev-001/LJy16uZh_7bm5uVkt80bz",
//     "url_type": null
//   }

// import { Server } from '@tus/server'
// import { AzureStore } from '@tus/azure-store'
// import { FileStore } from '@tus/file-store'
//
// import { env } from '$env/dynamic/private'
//
// const store = {
// 	local: new FileStore({ directory: './files' }),
// 	azure: new AzureStore({
// 		account: env.STORAGE_AZURE_ACCOUNT_NAME,
// 		accountKey: env.STORAGE_AZURE_ACCOUNT_KEY,
// 		containerName: env.STORAGE_AZURE_CONTAINER
// 	})
// }
//
// const server = new Server({
// 	path: '/api/v1/resources',
// 	datastore: store.azure,
// 	onIncomingRequest: async () => {
// 		console.log('incoming...')
// 	},
// 	onUploadCreate: async (req, upload) => {
// 		console.log('upload create...')
// 		return upload
// 	}
// })
//
// export const GET = async ({ request }) => {
// 	const stuff = await server.handleWeb(request)
// 	return new Response(stuff.body, {
// 		status: stuff.status,
// 		headers: stuff.headers,
// 		statusText: stuff.statusText
// 	})
// }
// export const POST = async ({ request }) => {
// 	const stuff = await server.handleWeb(request)
// 	return new Response(stuff.body, {
// 		status: stuff.status,
// 		headers: stuff.headers,
// 		statusText: stuff.statusText
// 	})
// }
// export const PATCH = async ({ request }) => {
// 	const stuff = await server.handleWeb(request)
// 	return new Response(stuff.body)
// }
// export const DELETE = server.handleWeb
// export const OPTIONS = server.handleWeb
// export const HEAD = async ({ request }) => {
// 	const stuff = await server.handleWeb(request)
// 	return new Response(stuff.body)
// }
