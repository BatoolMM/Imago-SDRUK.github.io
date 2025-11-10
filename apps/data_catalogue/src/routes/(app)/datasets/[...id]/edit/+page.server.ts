import { SERVER_ERRORS } from '$lib/globals/server.js'
import { create, get, patch, update } from '$lib/utils/ckan/ckan.js'
import {
	getFiles,
	getSignedDownloadUrl,
	getSignedUploadUrl,
	loadStorageClient
} from '$lib/utils/files/azure/index.js'
import { jstr } from '@arturoguzman/art-ui'
import { error } from '@sveltejs/kit'

export const load = async ({ params, locals }) => {
	const dataset = await locals.ckan.request(get('package_show', { id: params.id }))
	const tags = await locals.ckan.request(get('tag_list'))
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

const keys: FormField[] = [
	{
		name: 'name',
		type: 'string',
		required: true
	},
	{
		name: 'title',
		type: 'string',
		required: false
	},
	{
		name: 'private',
		type: 'boolean',
		required: false
	},
	{
		name: 'author',
		type: 'string',
		required: false
	},
	{
		name: 'author_email',
		type: 'string',
		required: false
	},
	{
		name: 'maintainer',
		type: 'string',
		required: false
	},
	{
		name: 'maintainer_email',
		type: 'string',
		required: false
	},

	{
		name: 'license_id',
		type: 'string',
		required: false
	},

	{
		name: 'notes',
		type: 'string',
		required: false
	},
	{
		name: 'url',
		type: 'string',
		required: false
	},
	{
		name: 'version',
		type: 'string',
		required: false
	},
	{
		name: 'state',
		type: 'string',
		required: false
	},
	{
		name: 'type',
		type: 'string',
		required: false
	},
	{
		name: 'resources',
		type: 'array',
		required: false
	},
	{
		name: 'tags',
		type: 'array',
		required: false
	},
	{
		name: 'extras',
		type: 'string',
		required: false
	},
	{
		name: 'plugin_data',
		type: 'string',
		required: false
	},
	{
		name: 'groups',
		type: 'string',
		required: false
	}
]

const parseForm = (form: FormData, keys: FormField[]) => {
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
	create_tag: async ({ request, locals, params }) => {
		const form = await request.formData()
		const name = String(form.get('display_name'))
		console.log(name)
		const tag = await locals.ckan.request(create('tag_create', { name, vocabulary_id: null }))
		console.log(jstr(tag))

		return {
			message: `Tag created`
		}
	},
	update: async ({ request, locals, params }) => {
		const form = await request.formData()
		const parsed = parseForm(form)
		const dataset = await locals.ckan.request(
			patch('package_patch', { id: params.id }, { ...parsed, id: params.id })
		)
		console.log(jstr(dataset))
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
		console.log(jstr(dataset))
		return {
			message: `Resource successfully updated`
		}
	}
}
