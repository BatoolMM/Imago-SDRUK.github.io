import { handleDirectusError } from '$lib/utils/directus.js'
import { readItems } from '@directus/sdk'

export async function load({ locals, params }) {
	const events = await locals.directus
		.request(
			readItems('events', {
				fields: ['*', { media: [{ directus_files_id: ['*'] }] }],
				filter: { _and: [{ slug: { _eq: params.slug } }] }
			})
		)
		.catch(handleDirectusError)
	return {
		events: events[0]
	}
}
