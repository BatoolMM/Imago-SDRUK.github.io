import {
	tagsGetController,
	tagsGetVocabulariesController
} from '$lib/server/interface/adapters/controllers/tags/get.js'
import { formGetStringOrUndefined, safeJSONParse } from '$lib/utils/forms/index.js'
import {
	datasetAddGroupController,
	datasetAddTagController,
	datasetRemoveGroupController,
	datasetRemoveTagController,
	datasetUpdateController
} from '$lib/server/interface/adapters/controllers/datasets/update.js'
import { datastoreUpdateController } from '$lib/server/interface/adapters/controllers/datastore/update.js'
import {
	resourceAddVersionController,
	resourceUpdateController
} from '$lib/server/interface/adapters/controllers/resources/update.js'
import { error, fail } from '@sveltejs/kit'
import { resourceCreateController } from '$lib/server/interface/adapters/controllers/resources/create.js'
import { resourceDeleteController } from '$lib/server/interface/adapters/controllers/resources/delete.js'
import { jstr } from '@arturoguzman/art-ui'
import { tagDeleteController } from '$lib/server/interface/adapters/controllers/tags/delete.js'

export const load = async ({ locals, parent }) => {
	const { dataset, permits } = await parent()
	if (!permits.includes('edit')) {
		error(401, { message: 'Unauthorised', id: 'Unauthorised' })
	}
	const [tags_err, tags] = await tagsGetController({
		configuration: locals.configuration,
		session: locals.session,
		vocabulary_id: 'general'
	})
	const [vocabularies_err, vocabularies] = await tagsGetVocabulariesController()
	if (vocabularies_err !== null) {
		return error(500, { message: vocabularies_err.reason, id: 'voc-err' })
	}

	if (tags_err !== null) {
		if (tags_err.reason !== 'Not Found') {
			error(400, { message: tags_err.reason, id: tags_err.reason })
		}
	}
	return {
		dataset,
		tags: tags?.items ?? [],
		vocabularies: vocabularies
	}
}

// type FormField = { name: string; type: 'string' | 'file' | 'boolean' | 'array'; required: boolean }

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
	add_tag: async ({ locals, request }) => {
		const form = await request.formData()
		const tag = formGetStringOrUndefined({ form, field: 'tag' })
		const dataset_id = formGetStringOrUndefined({ form, field: 'dataset_id' })
		const vocabulary_id = formGetStringOrUndefined({ form, field: 'vocabulary_id' })
		const [errors] = await datasetAddTagController({
			configuration: locals.configuration,
			session: locals.session,
			id: dataset_id,
			vocabulary_id: vocabulary_id,
			tag: String(tag)
		})
		if (errors !== null) {
			return fail(400, { message: `Error adding the tag ${tag}` })
		}
		return { message: `Tag ${tag} added` }
	},
	remove_tag: async ({ locals, request }) => {
		const form = await request.formData()
		const tag = formGetStringOrUndefined({ form, field: 'tag' })
		const dataset_id = formGetStringOrUndefined({ form, field: 'dataset_id' })
		const vocabulary_id = 'general'
		const [errors] = await datasetRemoveTagController({
			configuration: locals.configuration,
			session: locals.session,
			id: dataset_id,
			tag_id: tag,
			vocabulary_id
		})
		if (errors !== null) {
			return fail(400, { message: errors.reason })
		}
		return { message: `Tag ${tag} removed` }
	},

	delete_tag: async ({ locals, request }) => {
		const form = await request.formData()
		const tag_id = formGetStringOrUndefined({ form, field: 'tag_id' })
		const vocabulary_id = formGetStringOrUndefined({ form, field: 'vocabulary_id' })
		const [errors] = await tagDeleteController({
			configuration: locals.configuration,
			session: locals.session,
			tag_id,
			vocabulary_id
		})
		if (errors !== null) {
			console.log(errors)
			return fail(400, { message: `Error deleting the tag` })
		}
		return { message: `Tag ${tag_id} deleted` }
	},

	update: async ({ request, locals }) => {
		const form = await request.formData()
		const data = safeJSONParse(formGetStringOrUndefined({ form, field: 'dataset' }))
		const dataset_id = formGetStringOrUndefined({ form, field: 'dataset_id' })
		const [errors, result] = await datasetUpdateController({
			configuration: locals.configuration,
			data,
			id: dataset_id,
			session: locals.session
		})
		if (errors !== null) {
			return fail(400, { message: errors.message, id: errors.reason })
		}
		return {
			message: `Dataset successfully updated`
		}
	},

	update_resource: async ({ request, locals }) => {
		const form = await request.formData()
		const parsed = parseForm(form)
		const dataset_id = formGetStringOrUndefined({ form, field: 'dataset_id' })
		await resourceUpdateController({
			configuration: locals.configuration,
			id: dataset_id,
			session: locals.session,
			data: parsed
		})
		return {
			message: `Resource successfully updated`
		}
	},

	update_datastore: async ({ request, locals }) => {
		const form = await request.formData()
		const id = formGetStringOrUndefined({ form, field: 'id' })
		const metadata = parseForm(form)
		await datastoreUpdateController({
			configuration: locals.configuration,
			session: locals.session,
			metadata,
			resource_id: id
		})
		return {
			message: `Datastore updated`
		}
	},
	upload_file: async ({ request, locals }) => {
		const form = await request.formData()
		const parsed = parseForm(form) as {
			name: string
			description: string
			type: string
			package_id: string
		}
		const [errors, resource] = await resourceCreateController({
			session: locals.session,
			configuration: locals.configuration,
			data: parsed
		})
		if (errors !== null) {
			return fail(500, { message: errors.message ?? errors.reason })
		}
		return {
			message: 'ok'
		}
	},

	delete_resource: async ({ request, locals }) => {
		const form = await request.formData()
		const resource_id = formGetStringOrUndefined({ form, field: 'resource_id' })
		const [errors, resource] = await resourceDeleteController({
			session: locals.session,
			configuration: locals.configuration,
			data: { resource_id: resource_id }
		})
		if (errors !== null) {
			console.log(errors)
			return fail(500, { message: errors.message ?? errors.reason })
		}
		console.log(resource)
		return {
			message: 'ok'
		}
	},
	add_version: async ({ request, locals }) => {
		const form = await request.formData()
		const resource_id = formGetStringOrUndefined({ form, field: 'resource_id' })
		const version = formGetStringOrUndefined({ form, field: 'version' })
		const changelog = formGetStringOrUndefined({ form, field: 'changelog' })
		const [errors, url] = await resourceAddVersionController({
			session: locals.session,
			configuration: locals.configuration,
			data: {
				resource: resource_id,
				version: version,
				changelog: changelog
			}
		})
		if (errors !== null) {
			console.log(errors)
			return fail(500, { message: errors.message ?? errors.reason })
		}
		console.log(url)
		return {
			message: 'ok',
			url
		}
	},
	add_group: async ({ request, locals }) => {
		const form = await request.formData()
		const group_id = formGetStringOrUndefined({ form, field: 'group_id' })
		const dataset_id = formGetStringOrUndefined({ form, field: 'dataset_id' })
		const [errors] = await datasetAddGroupController({
			configuration: locals.configuration,
			session: locals.session,
			dataset_id: dataset_id,
			group_id
		})
		if (errors !== null) {
			console.log(jstr(errors))
			return fail(500, { message: errors.reason, id: errors.reason })
		}
		return {
			message: `Dataset group added`
		}
	},
	remove_group: async ({ request, locals }) => {
		const form = await request.formData()
		const group_id = formGetStringOrUndefined({ form, field: 'group_id' })
		const dataset_id = formGetStringOrUndefined({ form, field: 'dataset_id' })
		const [errors] = await datasetRemoveGroupController({
			configuration: locals.configuration,
			session: locals.session,
			dataset_id: dataset_id,
			group_id
		})
		if (errors !== null) {
			console.log(jstr(errors))
			return fail(500, { message: errors.reason, id: errors.reason })
		}
		return {
			message: `Dataset group removed`
		}
	}
}
