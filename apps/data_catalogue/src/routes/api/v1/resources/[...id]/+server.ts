import { remove } from '$lib/utils/ckan/ckan.js'
import {
	deleteBlob,
	getSignedDownloadUrl,
	loadStorageClient
} from '$lib/utils/files/azure/index.js'
import { jstr } from '@arturoguzman/art-ui'

export const GET = async ({ params }) => {
	const id = params.id
	const client = loadStorageClient()
	const signed_url = getSignedDownloadUrl({ ...client, filename: id })
	return fetch(signed_url)
	/**
	 * NOTE: this will open the resource on the same tab
	 **/
	// return redirect(303, signed_url)
}

export const DELETE = async ({ params, locals }) => {
	const delete_ckan = await locals.ckan.request(remove('resource_delete', { id: params.id }))
	console.log(jstr(delete_ckan))
	const client = loadStorageClient()
	const delete_azure = await deleteBlob({
		...client,
		filename: params.id
	})
	console.log(jstr(delete_azure))
	return new Response('', { status: 201, statusText: 'continue' })
}

// import { Server } from '@tus/server'
// import { AzureStore } from '@tus/azure-store'
// import { FileStore } from '@tus/file-store'
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
// const server = new Server({
// 	path: '/api/v1/resources',
// 	datastore: store.azure,
// 	onIncomingRequest: async () => {
// 		console.log('incoming...')
// 	},
// 	onUploadCreate: async (_, upload) => {
// 		console.log('upload create...')
// 		return upload
// 	}
// })
//
// export const GET = async ({ request, params }) => {
// 	console.log(`GET id: ${params.id}`)
// 	const stuff = await server.handleWeb(request)
// 	console.log(`Passed GET id: ${params.id}`)
// 	console.log(stuff)
// 	return new Response(stuff.body, {
// 		status: stuff.status,
// 		headers: stuff.headers,
// 		statusText: stuff.statusText
// 	})
// }
// export const POST = server.handleWeb
// export const PATCH = async ({ request, params }) => {
// 	console.log(`PATCH id: ${params.id}`)
// 	const stuff = await server.handleWeb(request)
// 	console.log(`Passed PATCH id: ${params.id}`)
// 	console.log(stuff)
// 	return new Response(stuff.body, {
// 		status: stuff.status,
// 		headers: stuff.headers,
// 		statusText: stuff.statusText
// 	})
// }
// export const DELETE = server.handleWeb
// export const OPTIONS = server.handleWeb
// export const HEAD = async ({ request, params }) => {
// 	console.log(`HEAD id: ${params.id}`)
// 	const stuff = await server.handleWeb(request)
// 	console.log(`Passed HEAD id: ${params.id}`)
// 	console.log(stuff)
// 	return new Response(stuff.body, {
// 		status: stuff.status,
// 		headers: stuff.headers,
// 		statusText: stuff.statusText
// 	})
// }
