import { SERVER_ERRORS } from '$lib/globals/server.js'
import { log } from '$lib/utils/server/logger.js'
import { authorise } from '$lib/utils/auth/index.js'
import { create, get, patch, update } from '$lib/utils/ckan/ckan.js'
import { jstr } from '@arturoguzman/art-ui'
import slugify from '@sindresorhus/slugify'
import { error } from '@sveltejs/kit'

export const load = async ({ params, locals }) => {
	await authorise({
		namespace: 'Dataset',
		object: params.id,
		relation: 'edit',
		session: locals.session
	})

	const dataset = await locals.ckan.request(get('package_show', { id: params.id }))
	const tags = await locals.ckan.request(get('tag_list', { all_fields: true }))
	if (Array.isArray(dataset.result)) {
		error(...SERVER_ERRORS[404])
	}
	// const client = loadStorageClient()
	return {
		dataset,
		tags
	}
}

type FormField = { name: string; type: 'string' | 'file' | 'boolean' | 'array'; required: boolean }

const parseForm = (form: FormData) => {
	const object: Record<PropertyKey, unknown> = {}
	form.forEach((value, key) => {
		// Reflect.has in favor of: object.hasOwnProperty(key)
		if (key in object === false) {
			object[key] = value
			return
		}
		if (!Array.isArray(object[key])) {
			object[key] = [object[key]]
		}
		if (Array.isArray(object[key])) {
			object[key].push(value)
		}
	})
	return object
}

export const actions = {
	//TODO: move to endpoint
	create_tag: async ({ request, locals, params }) => {
		const form = await request.formData()
		const name = String(form.get('display_name'))
		log.debug(name)
		const tag = await locals.ckan.request(create('tag_create', { name, vocabulary_id: null }))
		log.debug(jstr(tag))

		return {
			message: `Tag created`
		}
	},
	save_tags: async ({ request, locals, params }) => {
		const form = await request.formData()
		const tags = String(form.get('tags'))
		const _tags = JSON.parse(tags).map((tag) => ({
			...tag,
			name: slugify(tag.display_name),
			display_name: tag.display_name
		}))
		log.debug(_tags)
		const tag = await locals.ckan.request(
			patch(
				'package_patch',
				{ id: params.id },
				{
					tags: _tags,
					id: params.id
				}
			)
		)
		log.debug(jstr(tag))
		return {
			message: `Tags saved`
		}
	},
	update: async ({ request, locals, params }) => {
		const form = await request.formData()
		const parsed = parseForm(form)
		const dataset = await locals.ckan.request(
			patch('package_patch', { id: params.id }, { ...parsed, id: params.id })
		)
		log.debug(jstr(dataset))
		return {
			message: `Dataset successfully updated`
		}
	},

	update_resource: async ({ request, locals, params }) => {
		const form = await request.formData()
		const parsed = parseForm(form)
		const dataset = await locals.ckan.request(
			patch('resource_patch', { id: parsed.id }, { ...parsed, id: parsed.id })
		)
		log.debug(jstr(dataset))
		return {
			message: `Resource successfully updated`
		}
	}
}
