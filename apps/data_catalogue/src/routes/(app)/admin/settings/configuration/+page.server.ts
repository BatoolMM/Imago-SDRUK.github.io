import { errFmt, type ErrTypes } from '$lib/server/entities/errors'
import type { User } from '$lib/server/entities/models/users'
import { userGetController } from '$lib/server/interface/adapters/controllers/users/get'
import { error } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	const { errors, data } = await Promise.all(
		locals.configuration.superusers?.map((id) =>
			userGetController({ configuration: locals.configuration, session: locals.session, id })
		) ?? []
	).then((res) =>
		res.reduce(
			(
				acc: {
					errors: ErrTypes[]
					data: (User & { first_name: string; last_name: string; email: string; id: string })[]
				},
				[errors, data]
			) => {
				if (errors !== null) {
					acc.errors.push(errors)
					return acc
				}
				acc.data.push(data)
				return acc
			},
			{ errors: [], data: [] }
		)
	)
	if (errors.length > 0) {
		error(...errFmt(errors[0]))
	}
	return {
		superusers: data,
		configuration: locals.configuration
	}
}
