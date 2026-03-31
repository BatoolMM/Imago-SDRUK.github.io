import type { CSVW } from '$lib/types/csvw.js'
import { authorise } from '$lib/utils/auth/index.js'
import { create, get, remove } from '$lib/utils/ckan/ckan.js'
import { csvwToDatastore } from '$lib/utils/datastore/index.js'
import { log } from '$lib/utils/server/logger.js'
import { error, json } from '@sveltejs/kit'
import { unknown } from 'arktype/internal/keywords/ts.ts'

const parseFile = async (file: File) => {
	try {
		const text = await file.text()
		const parsed = JSON.parse(text)
		return {
			data: parsed
		}
	} catch (err) {
		log.error({ message: `There's been an error trying to parse a file as JSON`, error: err })
		return {
			error: err
		}
	}
}

export const POST = async ({ request, locals, params, fetch }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		relation: 'POST',
		object: '/api/v1/datastore'
	})
	const content_type = request.headers.get('Content-Type')?.split(';')[0]
	if (!content_type) {
		error(405, { message: 'Content Type not allowed', id: 'method-not-allowed' })
	}
	if (content_type !== 'multipart/form-data') {
		error(405, { message: 'Content Type not allowed', id: 'method-not-allowed' })
	}
	const form = await request
		.formData()
		.catch(() => error(400, { message: 'Missing form', id: 'missing-form' }))
	const file = form.get('file')
	const resource_id = params.id
	const override = form.get('override')
	if (!resource_id) {
		error(400, { message: 'Missing resource id', id: 'missing-resource-id' })
	}
	if (typeof resource_id !== 'string') {
		error(400, { message: 'Id is invalid', id: 'invalid-id' })
	}
	if (!file) {
		error(400, { message: 'Missing file', id: 'missing-file' })
	}
	if (typeof file === 'string') {
		error(400, { message: 'Invalid file', id: 'invalid-file' })
	}
	const parsed = (await parseFile(file)) as { error: unknown } | { data: CSVW }
	if ('error' in parsed) {
		error(400, { message: 'Invalid file', id: 'invalid-file' })
	}
	if ('@context' in parsed.data !== true) {
		error(400, { message: 'Invalid file', id: 'invalid-file' })
	}
	if ('@type' in parsed.data !== true) {
		error(400, { message: 'Invalid file', id: 'invalid-file' })
	}
	if ('tables' in parsed.data !== true) {
		error(400, { message: 'Invalid file', id: 'invalid-file' })
	}

	const resource = await locals.ckan.request(get('resource_show', { id: resource_id }))
	if ('error' in resource) {
		error(400, { message: String(resource.error.message), id: 'err' })
	}

	if (override === 'on') {
		await fetch(`/api/v1/resources/${params.id}/datastore`, { method: 'DELETE' })
	}
	const record = csvwToDatastore({
		id: resource_id,
		csvw: parsed.data,
		force: true
	})
	const uploaded = await Promise.all(
		record.map((table, index) => {
			return locals.ckan.request(create('datastore_create', table))
		})
	)
	return json({ data: uploaded, message: `Structural metadata updated` })
}

export const DELETE = async ({ locals, params }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		relation: 'DELETE',
		object: '/api/v1/datastore'
	})
	const resource = await locals.ckan.request(remove('datastore_delete', { resource_id: params.id }))
	if ('error' in resource) {
		error(400, { message: String(resource.error.message), id: 'err' })
	}
	log.debug({ message: `Structural metadata deleted for ${params.id}` })
	return json({ message: `Structural metadata deleted` })
}
