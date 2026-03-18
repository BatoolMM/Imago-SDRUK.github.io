import { create } from '$lib/utils/ckan/ckan.js'
import { csvwToDatastore, testCSVW } from '$lib/utils/datastore/index.js'
import { log } from '$lib/utils/server/logger.js'
import { jstr } from '@arturoguzman/art-ui'
import { json } from '@sveltejs/kit'

export const POST = async ({ params, locals }) => {
	// read json file

	// parse json file

	const tables = csvwToDatastore({ id: params.id, csvw: testCSVW, force: true })

	// upload parsed obj to datastore api
	console.log(jstr(tables))
	// const uploaded = await Promise.all(
	// 	tables.map((table) => {
	// 		return locals.ckan.request(create('datastore_create', table))
	// 	})
	// )
	// console.log(jstr(uploaded))
	// log.debug(jstr(uploaded))
	return json(tables)
}
