import * as Sentry from '@sentry/sveltekit'
import { env } from '$env/dynamic/private'
import { verifyOrySession } from '$lib/utils/auth'
import { createCkanClient } from '$lib/utils/ckan/ckan'
import { getId, jstr, log } from '@arturoguzman/art-ui'
// import { error } from '@sveltejs/kit'
import { error, redirect, type Handle, type HandleServerError } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { COOKIES } from '$lib/globals/server'

// export const crawlers = [
// 	'Googlebot',
// 	'Googlebot-Image',
// 	'Googlebot-News',
// 	'Storebot-Google',
// 	'Google-InspectionTool',
// 	'GoogleOther'
// ]

export const init = async () => {
	if (process.env.BUILD) {
		console.log('building - skip')
		return
	}
	if (!env.ACCESS_MODE) {
		error(500, {
			id: 'server-error',
			message: `Sorry, you need to specify an access mode before deploying this website.`
		})
	}
}

const handleAccessMode: Handle = async ({ event, resolve }) => {
	event.locals.access = false
	const access_mode = env.ACCESS_MODE
	if (access_mode === 'invite_only') {
		const cookie = event.cookies.get(COOKIES.access_token)
		if (cookie === env.ACESSS_INVITE_ONLY_TOKEN) {
			event.locals.access = true
		}
	}
	if (access_mode === 'authentication') {
		event.locals.access = true
	}
	if (access_mode === 'development') {
		event.locals.access = true
	}
	if (access_mode === 'build') {
		event.locals.access = true
	}
	if (!event.locals.access && event.url.pathname !== '/access') {
		return new Response(null, {
			status: 307,
			headers: { location: '/access' }
		})
	}
	if (event.locals.access && event.url.pathname === '/access') {
		return new Response(null, {
			status: 307,
			headers: { location: '/' }
		})
	}
	return resolve(event)
}

const handleCkan: Handle = async ({ event, resolve }) => {
	event.locals.ckan = createCkanClient({
		url: env.CKAN_URL,
		token: env.CKAN_TOKEN ? env.CKAN_TOKEN : undefined
	})
	const connection = await event.locals.ckan.ping()
	if (!connection.success) {
		error(503, {
			message: `Imago is currently down, please check back later!`,
			id: 'service-unavailable'
		})
	}
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

export const hooksErrorHandler: HandleServerError = async ({ event, status, message, error }) => {
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

export const handle =
	process.env.NODE_ENV === 'production'
		? sequence(handleAccessMode, Sentry.sentryHandle(), handleAuthentication, handleCkan)
		: sequence(handleAccessMode, handleAuthentication, handleCkan)
export const handleError =
	process.env.NODE_ENV === 'production'
		? Sentry.handleErrorWithSentry(hooksErrorHandler)
		: hooksErrorHandler
