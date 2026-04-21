import { get, remove } from '$lib/utils/ckan/ckan.js'
import type { PageServerLoadEvent } from './$types.js'
import { error, fail, redirect } from '@sveltejs/kit'
import licenses from '$lib/utils/ckan/licenses.json'

import { ketoCheck, ketoRead, ketoWrite } from '$lib/utils/auth/index.js'
import { formGetStringOrUndefined, safeJSONParse } from '$lib/utils/forms/index.js'
import { getSolrSearchParams } from '$lib/utils/ckan/datasets/index.js'
export const load = async ({ locals, url }: PageServerLoadEvent) => {
	/**
	 * NOTE: solr endpoint only as private and drafts are not available through ckan endpoints
	 **/
	// get query parameters
	const search = url.searchParams.get('search') ?? undefined
	const offset = url.searchParams.get('offset') ? Number(url.searchParams.get('offset')) : 0
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 10
	if (offset === 0) {
		url.searchParams.delete('offset')
	}

	const fq = getSolrSearchParams(url)
	const data = await locals.ckan.request(
		get('package_search', {
			q: search,
			start: offset <= 0 ? 0 : offset,
			rows: limit,
			fq,
			include_private: false,
			include_drafts: true
		})
	)
	if (data.success === false) {
		error(400, { message: `There's been an issue processing this request`, id: 'search-error' })
	}
	const resources = [
		...new Set(data.result.results.flatMap(({ resources }) => resources).map((r) => r.format))
	].filter((format) => format !== '')

	return {
		data,
		//NOTE: filter by results that the user is allowed to see
		datasets: data.result.results,
		datasets_count: data.result.count,
		organisations: await locals.ckan.request(
			get(
				'organization_list'
				// NOTE: get the names instead of the ids only, this takes a long time to fetch, replace this when testing with imago instance
				// { all_fields: true }
			)
		),
		package_count: (await locals.ckan.request(get('package_list'))).result.length,
		tags: await locals.ckan.request(get('tag_list')),
		resources: { result: resources },
		licenses: { result: licenses }
	}
	// }

	// const data = await locals.ckan.request(
	// 	get('current_package_list_with_resources', {
	// 		offset: offset <= 0 ? 0 : offset,
	// 		limit
	// 	})
	// )
	//
	// if (data.success === false) {
	// 	log.debug(jstr(data))
	// 	error(400, { message: `There's been an issue processing this request`, id: 'search-error' })
	// }
	//
	// const resources = [
	// 	...new Set(data.result.flatMap(({ resources }) => resources).map((r) => r.format))
	// ]
	//
	// return {
	// 	data,
	// 	datasets: data.result,
	// 	datasets_count: (await locals.ckan.request(get('package_list'))).result.length,
	// 	groups: await locals.ckan.request(get('group_list')),
	// 	// NOTE: replace this when testing with imago instance
	// 	// organisations: await locals.ckan.request(get('organization_list', { all_fields: true })),
	// 	organisations: await locals.ckan.request(get('organization_list')),
	// 	tags: await locals.ckan.request(get('tag_list')),
	// 	resources: { result: resources },
	// 	licenses: await locals.ckan.request(get('license_list'))
	// }
}

export const actions = {
	create: async ({ request, fetch }) => {
		const form = await request.formData()
		const group = formGetStringOrUndefined({ form, field: 'group' })
		const file = form.get('file')
		let payload = {
			title: formGetStringOrUndefined({ form, field: 'title' }),
			groups: group ? [JSON.parse(group)] : undefined
		}
		if (file && file instanceof File && file.size > 0) {
			if (file.type !== 'application/json') {
				return fail(400, { message: 'File must be a json file' })
			}
			if (file.size > 2000000) {
				return fail(400, { message: 'File must be less than 2MB' })
			}
			const file_text = await file.text()
			const text_parse = await safeJSONParse(file_text)
			if (!text_parse) {
				return fail(400, { message: 'File must be a valid json file' })
			}
			if (typeof text_parse !== 'object' && text_parse !== null) {
				return fail(400, { message: 'File must be a valid json file' })
			}
			if (Object.keys(text_parse).length === 0) {
				return fail(400, { message: 'File must contain data' })
			}
			payload = text_parse
		}
		const res = await fetch(`/api/v1/datasets`, {
			method: 'POST',
			body: JSON.stringify(payload)
		})
		const data = await res.json()
		if (res.ok) {
			redirect(307, data.data.url)
		}
		return fail(res.status, data)
	},

	delete: async ({ locals, request }) => {
		const form = await request.formData()
		const id = String(form.get('id'))
		const permission = await ketoCheck.checkPermission({
			namespace: 'Dataset',
			object: id,
			relation: 'delete',
			subjectId: locals.session?.identity.id
		})
		if (!permission.allowed) {
			return fail(401, { message: `Unauthorised` })
		}
		await locals.ckan.request(remove('package_delete', { id }))
		const relationships = await ketoRead.getRelationships({ namespace: 'Dataset', object: id })
		await ketoWrite.patchRelationships({
			relationshipPatch: relationships.relation_tuples?.map((relation) => ({
				action: 'delete',
				relation_tuple: relation
			}))
		})
		return redirect(307, `/datasets`)
	}
}
