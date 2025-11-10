import { fail, redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { COOKIES } from '$lib/globals/server.js'

export const actions = {
	access: async ({ request, cookies }) => {
		const form = await request.formData()
		const token = form.get('token')
		if (!token) {
			return fail(400, { message: 'You need to provide a token.' })
		}
		if (typeof token !== 'string') {
			return fail(400, { message: 'You need to provide a token.' })
		}
		if (token !== env.ACESSS_INVITE_ONLY_TOKEN) {
			return fail(400, {
				message: `The token you've provided is invalid. Please check it and try again.`
			})
		}
		if (token === env.ACESSS_INVITE_ONLY_TOKEN) {
			cookies.set(COOKIES.access_token, token, { path: '/', maxAge: 1 * 60 * 60 })
			redirect(307, '/')
		}

		return fail(500, {
			message: `The token you've provided is invalid. Please check it and try again.`
		})
	}
}
