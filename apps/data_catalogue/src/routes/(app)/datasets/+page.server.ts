import { get } from '$lib/utils/ckan/ckan.js'
import { jstr } from '@arturoguzman/art-ui'
import type { PageServerLoadEvent } from './$types.js'
import { error } from '@sveltejs/kit'
export const load = async ({ locals, url }: PageServerLoadEvent) => {
	// get query parameters
	const search = url.searchParams.get('search')
	const offset = url.searchParams.get('offset') ? Number(url.searchParams.get('offset')) : 0
	const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 10
	if (offset === 0) {
		url.searchParams.delete('offset')
	}

	// identify if search is enabled as this will hit the solr endpoint
	if (search) {
		const fq = ['tags', 'organization', 'groups', 'res_format', 'licenses']
			.map((key) => ({
				key,
				value: url.searchParams.getAll(key)
			}))
			.filter(({ value }) => value !== null)
			.reduce((str: string | null = null, { key, value }) => {
				const split = value
				let built = ''
				if (split.length === 0) return str
				if (split.length === 1) {
					built = `${key}:${split[0]}`
				} else {
					// built = value
					// 	.map((val, index) => {
					// 		if (index === 0) {
					// 			return `${key}:${val}`
					// 		}
					// 		return `&fg=${key}:${val}`
					// 	})
					// 	.join(' ')
					built = `${key}:(${value.join(' AND ')})`
				}
				if (!str) {
					str = ''
				} else {
					// str += '&fg='
					str += ' '
				}
				str += built
				console.log(str)
				return str
			}, null)
		console.log(fq)
		const data = await locals.ckan.request(
			get('package_search', {
				q: search,
				start: offset <= 0 ? 0 : offset,
				rows: limit,
				fq
			})
		)

		if (data.success === false) {
			console.log(jstr(data))
			error(400, { message: `There's been an issue processing this request`, id: 'search-error' })
		}
		const resources = [
			...new Set(data.result.results.flatMap(({ resources }) => resources).map((r) => r.format))
		]
		return {
			data,
			datasets: data.result.results,
			datasets_count: data.result.count,
			groups: await locals.ckan.request(get('group_list')),
			// NOTE: replace this when testing with imago instance
			// organisations: await locals.ckan.request(get('organization_list', { all_fields: true })),
			tags: await locals.ckan.request(get('tag_list')),
			resources: { result: resources },
			licenses: await locals.ckan.request(get('license_list'))
		}
	}

	/**
	 * NOTE: current_package_list_with_resources returns a dictionary with all the datasets, so feature parity cant be implemented with ckan and solr
	 * Internally, ckan actually divides these endpoints as dataset and search, have to evaluate how the dataset works and how it is fetching data from the db
	 **/

	const data = await locals.ckan.request(
		get('current_package_list_with_resources', {
			offset: offset <= 0 ? 0 : offset,
			limit
		})
	)

	if (data.success === false) {
		console.log(jstr(data))
		error(400, { message: `There's been an issue processing this request`, id: 'search-error' })
	}

	const resources = [
		...new Set(data.result.flatMap(({ resources }) => resources).map((r) => r.format))
	]

	return {
		data,
		datasets: data.result,
		datasets_count: (await locals.ckan.request(get('package_list'))).result.length,
		groups: await locals.ckan.request(get('group_list')),
		// NOTE: replace this when testing with imago instance
		// organisations: await locals.ckan.request(get('organization_list', { all_fields: true })),
		organisations: await locals.ckan.request(get('organization_list')),
		tags: await locals.ckan.request(get('tag_list')),
		resources: { result: resources },
		licenses: await locals.ckan.request(get('license_list'))
	}
}
