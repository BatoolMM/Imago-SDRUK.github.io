import type { PageServerLoadEvent } from './$types.js'
import { log } from '$lib/utils/server/logger.js'
import { redirect } from '@sveltejs/kit'
import { identityGetFlowController } from '$lib/server/interface/adapters/controllers/identities/get.js'

export const load = async ({ request, cookies, url, params }: PageServerLoadEvent) => {
	const cookie = request.headers.get('cookie') || ''
	const [flow_error, flow] = await identityGetFlowController({
		cookie,
		action: params.flow,
		url
	})
	if (flow_error !== null) {
		log.error({ message: 'error getting flow', error: flow_error })
		cookies.getAll().forEach((cookie) => {
			log.debug('clear me')
			log.debug(cookie)
			if (cookie.name.includes('csrf_token_')) {
				cookies.delete(cookie.name, { path: '/' })
			}
		})
		redirect(307, '/')
	}
	if (flow.action === 'reset') {
		log.error({ message: 'resetting flow' })
		cookies.getAll().forEach((cookie) => {
			log.debug('clear me')
			log.debug(cookie)
			if (cookie.name.includes('csrf_token_')) {
				cookies.delete(cookie.name, { path: '/' })
			}
		})
		redirect(307, '/')
	}
	if (flow.action === 'redirect') {
		log.error({ message: 'redirecting' })
		redirect(307, flow.path)
	}
	return {
		...flow
	}
}
