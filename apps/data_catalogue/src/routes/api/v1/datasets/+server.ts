import { generateExtrasFromPayload, METADATA_KEYS } from '$lib/globals/datasets.js'
import { log } from '$lib/utils/server/logger.js'
import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, ketoWrite } from '$lib/utils/auth/index.js'
import { getDatasetBasePermissions } from '$lib/utils/auth/permissions/index.js'
import { create, get } from '$lib/utils/ckan/ckan.js'
import slugify from '@sindresorhus/slugify'
import { json } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import type { CkanDataset, CkanDatasetRequest } from '$lib/types/ckan/index.js'
import { jstr } from '@arturoguzman/art-ui'

export const POST = async ({ locals, request }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/datasets',
		relation: 'POST'
	})
	const data = (await request.json()) as Partial<CkanDatasetRequest>
	const title = data.title
	const groups = data.groups
	if (title === undefined || title === null) {
		error(400, { message: `You need to provide a title`, id: 'bad-request' })
	}

	if (groups === undefined || groups.length === 0) {
		error(400, { message: `You need to provide at least one group`, id: 'bad-request' })
	}
	const existing_groups = await locals.ckan.request(get('group_list'))
	if (existing_groups.success === false) {
		if ('error' in existing_groups) {
			if ('message' in existing_groups.error) {
				error(400, { message: existing_groups.error.message, id: 'error' })
			}
			log.debug(existing_groups)
			error(...SERVER_ERRORS[500])
		}
		return error(400, { message: existing_groups.message, id: 'error' })
	}
	const parsed_groups = groups.reduce(
		(acc, el, i) => {
			const { name } = el
			if (name && existing_groups.result.includes(name)) {
				acc.groups.push({ name })
				return acc
			}
			acc.errors.push(
				`Group ${i + 1} is invalid. Available groups: ${existing_groups.result.join(', ')}`
			)
			return acc
		},
		{ groups: [], errors: [] } as { groups: { name: string }[]; errors: string[] }
	)
	if (parsed_groups.errors.length > 0) {
		error(400, { message: parsed_groups.errors[0], id: 'dataset-create-error' })
	}
	const name = slugify(title)
	const dataset = await locals.ckan.request(
		create('package_create', {
			name,
			title,
			groups: parsed_groups.groups,
			owner_org: 'imago',
			private: true,
			state: 'draft',
			author: data.author,
			author_email: data.author_email,
			license_id: data.license_id,
			maintainer: data.maintainer,
			maintainer_email: data.maintainer_email,
			notes: data.notes,
			type: data.type,
			url: data.url,
			version: data.version,
			extras: generateExtrasFromPayload(data)
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

	await Promise.all(
		groups.map((group, index) =>
			ketoWrite.patchRelationships({
				relationshipPatch: getDatasetBasePermissions({
					object: dataset.result.name,
					owner: index === 0 ? locals.session?.identity.id : undefined,
					group: group.name
				}).map((relation) => ({ action: 'insert', relation_tuple: relation }))
			})
		)
	)

	return json({ message: 'ok', data: { url: `/datasets/${dataset.result.name}/edit` } })
}
