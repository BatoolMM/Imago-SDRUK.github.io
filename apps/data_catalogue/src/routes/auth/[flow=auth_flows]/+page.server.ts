import type { PageServerLoadEvent } from './$types.js'
import { redirect } from '@sveltejs/kit'
import { handleOryResponse } from '$lib/utils/auth/index.js'
import { DateTime } from 'luxon'
import { env } from '$env/dynamic/private'

export const load = async ({
	request,
	cookies,
	url,
	params,
	fetch,
	locals
}: PageServerLoadEvent) => {
	const id = url.searchParams.get('id')
	const flow_id = url.searchParams.get('flow')
	const aal = url.searchParams.get('aal')
	const return_to = url.searchParams.get('return_to')
	let endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/${params.flow}/flows?id=${flow_id}`

	if (locals.session?.redirect_browser_to) {
		return redirect(303, locals.session.redirect_browser_to)
	}
	if (params.flow === 'logout') {
		endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/${params.flow}/browser`
		/**
		 * NOTE: if there is no session here ory will redirect straight to flow error
		 **/
		const res = await fetch(endpoint, {
			credentials: 'include'
		})
		//@ts-expect-error ok ok ok
		const data = (await handleOryResponse(res)) as {
			logout_url: string
			logout_token: string
		}
		if ('error' in data) {
			console.log('Redirecting due to error')
			redirect(307, '/')
		}
		redirect(307, data.logout_url)
	}
	if (!flow_id && params.flow !== 'error' && !aal) {
		console.log(`Getting a new flow for ${params.flow}`)
		const endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/${params.flow}/browser`
		redirect(303, endpoint)
	}

	if (params.flow === 'error') {
		endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/errors?id=${id}`
	}
	const cookie = request.headers.get('cookie') || ''
	const res = await fetch(endpoint, {
		credentials: 'include',
		headers: { cookie }
	})
	const data = await handleOryResponse(res)

	if ('error' in data) {
		console.log(`GOT ERR in DATA`, data.error)
		if (data.error.id === 'custom error') {
			redirect(307, '/')
		}
		if (data.error.id === 'session_inactive') {
			console.log('session_inactive')
			cookies.getAll().forEach((cookie) => {
				console.log('clear me')
				console.log(cookie)
				if (cookie.name.includes('csrf_token_')) {
					cookies.delete(cookie.name, { path: '/' })
				}
			})
			console.log('************redirecting to /auth/login')
			return redirect(303, '/auth/login')
		}
		if (data.error.id === 'security_csrf_violation') {
			console.log('security_csrf_violation')
			cookies.getAll().forEach((cookie) => {
				console.log('clear me')
				console.log(cookie)
				if (cookie.name.includes('csrf_token_')) {
					cookies.delete(cookie.name, { path: '/' })
				}
			})
			const _f = '/'
			console.log(`redirecting to ${_f}`)
			return redirect(307, _f)
		}
		if (data.error.id === 'security_identity_mismatch') {
			console.log('security_identity_mismatch')
			console.log('redirecting to /user/account')
			return redirect(307, '/user/account')
		}
		const redirect_to = data.error?.details?.redirect_to
		if (redirect_to) {
			const endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/${params.flow}/browser`
			return redirect(307, endpoint)
		}
		return redirect(307, `/`)
	}

	/**
	 * NOTE: its fixed to utc + 1, we need to get the timezone from the system
	 **/
	const expires_at = DateTime.fromISO(data.expires_at, { zone: 'utc+1' })

	if (expires_at.diffNow().milliseconds < 0) {
		url.searchParams.delete('flow_id')
		const endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/${params.flow}/browser`
		redirect(303, endpoint)
	}
	url.searchParams.delete('flow_id')
	return {
		form: data.ui
	}
}
