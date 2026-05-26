import type { PageServerLoadEvent } from './$types.js'
import { error, fail, redirect } from '@sveltejs/kit'
import { handleOryResponse } from '$lib/utils/auth/index.js'
import { env } from '$env/dynamic/private'
import { log } from '$lib/utils/server/logger.js'
import {
	userGetMeController,
	userGetTokenController
} from '$lib/server/interface/adapters/controllers/users/get.js'
const FLOW = 'settings'
export const load = async ({ url, request, cookies, fetch, locals }: PageServerLoadEvent) => {
	const [errors, user] = await userGetMeController({
		configuration: locals.configuration,
		id: locals.session?.identity.id,
		session: locals.session
	})
	if (errors !== null) {
		if (errors.reason === 'Not Found') {
			redirect(307, '/user/register')
		}
		error(400, { message: errors.reason, id: errors.reason })
	}

	const cookie = request.headers.get('cookie') || ''
	const flow_id = url.searchParams.get('flow')
	// // const return_to = url.searchParams.get('return_to')
	if (!flow_id) {
		const endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/${FLOW}/browser`
		redirect(307, endpoint)
	}
	const endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/${FLOW}/flows?id=${flow_id}`
	const res = await fetch(endpoint, {
		credentials: 'include',
		headers: { cookie }
	})
	const data = await handleOryResponse(res)
	if ('error' in data) {
		if (data.error.id === 'custom error') {
			redirect(307, '/')
		}
		if (data.error.id === 'security_csrf_violation') {
			cookies.getAll().forEach((cookie) => log.debug(cookie))
			log.debug(request.headers)
			redirect(307, '/')
		}
		const redirect_to = data.error?.details?.redirect_to
		if (redirect_to) {
			const endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/${FLOW}/browser`
			redirect(307, endpoint)
		}
		redirect(307, `/`)
	}
	return {
		form: data.ui
	}
}

export const actions = {
	get_token: async ({ cookies, locals }) => {
		const cookie = cookies.get('ory_kratos_session')
		if (!cookie) {
			return fail(400, { message: `You're not authorised to perform this action` })
		}
		const [errors, token] = await userGetTokenController({
			cookie,
			configuration: locals.configuration,
			session: locals.session
		})
		if (errors !== null) {
			console.log(errors)
			return fail(500, { message: errors.reason })
		}
		return {
			message: `Token created`,
			token: token.token
		}
	}
}
