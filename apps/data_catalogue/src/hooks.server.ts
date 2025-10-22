// import { directus } from '$lib/directus'
// import { verifyCookie } from '$lib/utils/cookies'
// import { env } from '$env/dynamic/private'
// import { ERRORS } from '$lib/globals/errors'
// import { directusSDK, directusSDKWithToken } from '$lib/utils/directus'
// import { ping } from '$lib/utils/network'
import { env } from '$env/dynamic/private'
import { verifyOrySession } from '$lib/utils/auth'
import { createCkanClient } from '$lib/utils/ckan/ckan'
import { getId, jstr, log } from '@arturoguzman/art-ui'
// import { error } from '@sveltejs/kit'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

// export const crawlers = [
// 	'Googlebot',
// 	'Googlebot-Image',
// 	'Googlebot-News',
// 	'Storebot-Google',
// 	'Google-InspectionTool',
// 	'GoogleOther'
// ]

const handleCkan: Handle = async ({ event, resolve }) => {
	// event.locals.startTimer = Date.now()
	// const backend_status = await ping(env.BACKEND_URL)
	// if (backend_status === -1) {
	// 	error(503, ERRORS.no_backend)
	// }
	// event.locals.directus =
	// 	env.NODE_ENV === 'development'
	// 		? directusSDKWithToken(env.BACKEND_TOKEN, event.fetch)
	// 		: directusSDK(event.fetch)
	event.locals.ckan = createCkanClient({ url: env.CKAN_URL })
	const response = await resolve(event)
	if (!event.url.pathname.includes('/assets')) {
		log({ response: response, event: event, status: response.status })
	}
	return response
}

const handleAuthentication: Handle = async ({ event, resolve }) => {
	const auth_cookie = event.cookies.get('ory_kratos_session')
	if (auth_cookie) {
		const res = await fetch(`${env.IDENTITY_SERVER}/sessions/whoami`, {
			headers: {
				Accept: 'application/json',
				Cookie: `ory_kratos_session=${auth_cookie}`
			}
		})
		const session = await res.json()
		/**
		 * NOTE: This will need refactoring to revalidate sessions
		 **/
		const valid_session = verifyOrySession(session)
		if (session.error || !valid_session) {
			if (event.url.pathname === '/') {
				redirect(307, '/auth/login')
			}
		}
		event.locals.session = session
	}
	return resolve(event)
}

export const handle: Handle = sequence(handleAuthentication, handleCkan)

export const handleError = async ({ event, status, message, error }) => {
	console.log(error)
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
