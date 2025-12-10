import { METADATA_KEYS } from '$lib/globals/datasets.js'
import { log } from '$lib/utils/server/logger.js'
import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, ketoWrite } from '$lib/utils/auth/index.js'
import { getDatasetBasePermissions } from '$lib/utils/auth/permissions/index.js'
import { create } from '$lib/utils/ckan/ckan.js'
import slugify from '@sindresorhus/slugify'
import { json } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'

export const POST = async ({ locals, request }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/datasets',
		relation: 'POST'
	})
	const form = (await request.json()) as { title?: string; group?: string }
	if (!form.title || !form.group) {
		error(400, { message: `Please provide the requested data`, id: 'bad-request' })
	}
	const name = slugify(form.title)
	const owner_org = 'imago'
	const dataset = await locals.ckan.request(
		create('package_create', {
			name,
			title: form.title,
			groups: [JSON.parse(form.group)],
			owner_org,
			private: true,
			state: 'draft',
			extras: METADATA_KEYS
		})
	)

	if (!dataset.success) {
		if ('error' in dataset) {
			if ('message' in dataset.error) {
				error(400, { message: dataset.error.message, id: 'error' })
			}
			log.debug(dataset)
			error(...SERVER_ERRORS[500])
		}
		return error(400, { message: dataset.message, id: 'error' })
	}

	await ketoWrite.patchRelationships({
		relationshipPatch: getDatasetBasePermissions({
			object: dataset.result.name,
			owner: locals.session?.identity.id
		}).map((relation) => ({ action: 'insert', relation_tuple: relation }))
	})
	return json({ message: 'ok', data: { url: `/datasets/${dataset.result.name}/edit` } })
}
