import { downloadsGetAggregatesController } from '$lib/server/interface/adapters/controllers/downloads/get'
import { error } from '@sveltejs/kit'

export const load = async ({ locals, url }) => {
	const from = url.searchParams.get('from')
	const to = url.searchParams.get('to')
	const [errors, downloads] = await downloadsGetAggregatesController({
		configuration: locals.configuration,
		session: locals.session,
		from,
		to
	})
	if (errors !== null) {
		return error(500, { message: errors.reason, id: errors.reason })
	}
	return {
		downloads
	}
}
