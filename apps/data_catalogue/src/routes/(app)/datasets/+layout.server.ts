import { metadataGroupsGetController } from '$lib/server/interface/adapters/controllers/metadata_groups/get.js'
import { error } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	const [errors, groups] = await metadataGroupsGetController({
		configuration: locals.configuration,
		session: locals.session
	})
	if (errors) {
		error(400, { message: `There's been an issue retreiving the groups`, id: 'err' })
	}
	return {
		groups: groups
	}
}
