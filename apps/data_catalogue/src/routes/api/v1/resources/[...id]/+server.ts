import { remove } from '$lib/utils/ckan/ckan.js'
import {
	deleteBlob,
	getSignedDownloadUrl,
	loadStorageClient
} from '$lib/utils/files/azure/index.js'

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
	await locals.ckan.request(remove('resource_delete', { id: params.id }))
	const client = loadStorageClient()
	await deleteBlob({
		...client,
		filename: params.id
	})
	return new Response('', { status: 201, statusText: 'continue' })
}
