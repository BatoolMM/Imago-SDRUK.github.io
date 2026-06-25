import { form, getRequestEvent } from '$app/server'
import { groupToggleAutoenrollController } from '$lib/server/interface/adapters/controllers/groups/update'
import { error } from '@sveltejs/kit'
import { type } from 'arktype'

export const toggleAutoEnroll = form(
	type({ 'autoenroll?': 'boolean', id: 'string' }),
	async ({ autoenroll, id }) => {
		const { locals } = getRequestEvent()

		const [errors, group] = await groupToggleAutoenrollController({
			configuration: locals.configuration,
			id,
			autoenroll: autoenroll ? true : false,
			session: locals.session
		})
		if (errors !== null) {
			return error(500, { message: errors.message ?? errors.reason, id: errors.reason })
		}
		console.log(group)
		return {
			message: `Group autoenroll set to ${group.autoenroll}`
		}
	}
)
