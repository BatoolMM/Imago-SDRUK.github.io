import { authorise, ketoWrite } from '$lib/utils/auth/index.js'
import { remove } from '$lib/utils/ckan/ckan.js'
import {
	deleteBlob,
	getSignedDownloadUrl,
	loadStorageClient
} from '$lib/utils/files/azure/index.js'
import { redirect } from '@sveltejs/kit'

export const GET = async ({ params, locals }) => {
	await authorise({
		namespace: 'Endpoint',
		relation: 'GET',
		session: locals.session,
		object: '/api/v1/resources',
		action: () => redirect(307, '/auth/login')
	})
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
	await ketoWrite.deleteRelationships({ namespace: 'Resource', object: params.id })
	return new Response('', { status: 201, statusText: 'continue' })
}
