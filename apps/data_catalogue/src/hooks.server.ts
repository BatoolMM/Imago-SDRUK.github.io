import * as Sentry from '@sentry/sveltekit'
import { env } from '$env/dynamic/private'
import { verifyOrySession } from '$lib/utils/auth'
import { createCkanClient } from '$lib/utils/ckan/ckan'
import { getId, jstr } from '@arturoguzman/art-ui'
import { error, redirect, type Handle, type HandleServerError } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { COOKIES } from '$lib/globals/server'
import { db } from '$lib/db'
import { users } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import type { IdentitySession } from '$lib/utils/auth/types'
import { log } from '$lib/utils/server/logger'

import { runMigration } from '$lib/db/migrate'
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
	if (env.NODE_ENV === 'production') {
		log.info('initialising with the following envs')
		log.info(env)
		await runMigration()
	}
}

const handleAccessMode: Handle = async ({ event, resolve }) => {
	event.locals.access = false
	const access_mode = env.ACCESS_MODE
	log.info(`access mode: ${access_mode}`)
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
		token: env.CKAN_TOKEN ? env.CKAN_TOKEN : undefined,
		fetch: event.fetch
	})
	const connection = await event.locals.ckan.ping()
	if (!connection.success) {
		log.debug(`CKAN is down`)
		error(503, {
			message: `Imago is currently down, please check back later!`,
			id: 'service-unavailable'
		})
	}
	const response = await resolve(event)
	if (!event.url.pathname.includes('/assets')) {
		log.debug(event.url.pathname)
	}
	return response
}

const handleAuthentication: Handle = async ({ event, resolve }) => {
	const auth_cookie = event.cookies.get('ory_kratos_session')
	/**
	 * NOTE: login in sets a cookie but must be bypassed if 2fa is enabled
	 **/
	if (auth_cookie && !event.url.pathname.startsWith('/auth/login')) {
		const res = await fetch(`${env.IDENTITY_SERVER_PUBLIC}/sessions/whoami`, {
			headers: {
				Accept: 'application/json',
				Cookie: `ory_kratos_session=${auth_cookie}`
			}
		})
		const session = (await res.json()) as IdentitySession
		// NOTE: check if there is a redirect request, if so, do not set the session
		if (session.redirect_browser_to) {
			redirect(303, session.redirect_browser_to)
			// return resolve(event)
		}
		/**
		 * NOTE: This will need refactoring to revalidate sessions
		 **/
		const valid_session = verifyOrySession(session)

		if (session.error || !valid_session) {
			log.debug(`session error`)
			if (event.url.pathname === '/') {
				redirect(307, '/auth/login')
			}
			if (session.error?.code === 401) {
				redirect(307, '/auth/login')
			}
		}
		if (
			session &&
			valid_session &&
			!session.identity.verifiable_addresses.some((va) => va.verified === true) &&
			event.url.pathname !== '/auth/verification'
		) {
			log.debug(`session is valid but account isnt verified`)
			redirect(307, '/auth/verification')
		}
		// NOTE: check if there is a redirect request, if so, do not set the session
		if (session.redirect_browser_to) {
			log.debug(`session includes a redirect browser to`)
			redirect(303, session.redirect_browser_to)
			// return resolve(event)
		}
		event.locals.session = session
	}
	return resolve(event)
}

const handleProfile: Handle = async ({ event, resolve }) => {
	if (event.locals.session && event.locals.session.identity) {
		const profile = await db
			.select()
			.from(users)
			.where(eq(users.id, event.locals.session.identity.id))
		if (
			profile.length === 1 &&
			profile[0].status === 'preregister' &&
			event.url.pathname !== `/user/register` &&
			!event.url.pathname.startsWith('/auth') &&
			!event.url.pathname.startsWith('/api')
		) {
			log.debug(`redirect user to /user/register as profile exists but status is preregister`)
			redirect(307, `/user/register`)
		}
	}
	return resolve(event)
}

export const hooksErrorHandler: HandleServerError = async ({ event, status, message, error }) => {
	console.log(error)
	if (status !== 404) {
		console.log(jstr(error))
	}
	log.info(error)
	return {
		id: getId(),
		message: status === 404 ? `This page does not exist!` : 'Whoops!'
		// errorId
	}
}

export const handle =
	process.env.NODE_ENV === 'production'
		? sequence(
				handleAccessMode,
				Sentry.sentryHandle(),
				handleAuthentication,
				handleProfile,
				handleCkan
			)
		: sequence(handleAccessMode, handleAuthentication, handleProfile, handleCkan)
export const handleError =
	process.env.NODE_ENV === 'production'
		? Sentry.handleErrorWithSentry(hooksErrorHandler)
		: hooksErrorHandler
