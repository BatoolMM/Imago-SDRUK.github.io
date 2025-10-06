// import { directus } from '$lib/directus'
// import { verifyCookie } from '$lib/utils/cookies'
import { env } from '$env/dynamic/private'
import { CKAN_TOKEN, CKAN_URL } from '$env/static/private'
import { createCkanClient } from '$lib/utils/ckan/ckan'
import { jstr } from '$lib/utils/data'
import { directusSDK, directusSDKWithToken } from '$lib/utils/directus'
import { ping } from '$lib/utils/network'
import { getId, log } from '@arturoguzman/art-ui'
import { error } from '@sveltejs/kit'
import { type Handle } from '@sveltejs/kit'

// export const crawlers = [
// 	'Googlebot',
// 	'Googlebot-Image',
// 	'Googlebot-News',
// 	'Storebot-Google',
// 	'Google-InspectionTool',
// 	'GoogleOther'
// ]

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.startTimer = Date.now()
	event.locals.ckan = createCkanClient({ url: CKAN_URL, token: CKAN_TOKEN })
	const backend_status = await ping(env.BACKEND_URL)
	if (backend_status === -1) {
		error(503, { id: 'unavailable', message: `Backend is not accessible at the moment.` })
	}
	event.locals.directus =
		env.NODE_ENV === 'development'
			? directusSDKWithToken(env.BACKEND_TOKEN, event.fetch)
			: directusSDK(event.fetch)
	const response = await resolve(event)
	if (!event.url.pathname.includes('/assets')) {
		log({ response: response, event: event, status: response.status })
	}
	return response
}

export const handleError = async ({ event, status, message, error }) => {
	if (status !== 404) {
		console.log(jstr(error))
	}
	log({ status: status, event: event, content: message })
	return {
		id: getId(),
		message: status === 404 ? `This page does not exist!` : 'Whoops!'
		// errorId
	}
}
