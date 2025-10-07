// import { get } from '$lib/utils/ckan/ckan.js'
// import { jstr } from '@arturoguzman/art-ui'

export const load = async ({ locals }) => {
	// const data = await locals.ckan.request(get('package_list'))
	// if (Array.isArray(data.result)) {
	// 	for (const result of data.result) {
	// 		// console.log(result)
	// 		const test = await locals.ckan.request(get('package_show', { id: result }))
	// 		console.log(jstr(test))
	// 	}
	// }
	// const data_2 = await locals.ckan.request(get('user_list'))
	// const data_3 = await locals.ckan.request(get('config_option_list'))
	// const data_3 = await locals.ckan.request(create())
	// console.log(jstr(data))
	// console.log(jstr(data_2))
	// console.log(jstr(data_3))
	return { message: 'ok', result: [] }
}
