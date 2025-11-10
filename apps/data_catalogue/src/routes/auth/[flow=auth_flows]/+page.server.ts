import { IDENTITY_SERVER } from '$env/static/private'
import type { PageServerLoadEvent } from './$types.js'
import { redirect } from '@sveltejs/kit'
import { handleOryResponse } from '$lib/utils/auth/index.js'
import { DateTime } from 'luxon'

export const load = async ({ cookies, url, params, fetch }: PageServerLoadEvent) => {
	console.log('triggered', params.flow)
	const id = url.searchParams.get('id')
	const flow_id = url.searchParams.get('flow')
	const return_to = url.searchParams.get('return_to')
	let endpoint = `${IDENTITY_SERVER}/self-service/${params.flow}/flows?id=${flow_id}`
	if (params.flow === 'logout') {
		console.log('logging out')
		endpoint = `${IDENTITY_SERVER}/self-service/${params.flow}/browser`
		/**
		 * NOTE: if there is no session here ory will redirect straight to flow error
		 **/
		const res = await fetch(endpoint)
		const data = (await handleOryResponse(res)) as {
			logout_url: string
			logout_token: string
		}
		if ('error' in data) {
			redirect(307, '/')
		}
		console.log(data, 'passed')
		redirect(307, data.logout_url)
	}
	if (!flow_id && params.flow !== 'error') {
		console.log('getting a new flow')
		const endpoint = `${IDENTITY_SERVER}/self-service/${params.flow}/browser`
		redirect(303, endpoint)
	}
	if (params.flow === 'error') {
		endpoint = `${IDENTITY_SERVER}/self-service/errors?id=${id}`
	}

	const res = await fetch(endpoint)
	const data = await handleOryResponse(res)

	if ('error' in data) {
		console.log(data.error)
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
			console.log('redirecting to /auth/login')
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
			console.log('redirecting to /')
			return redirect(307, '/')
		}
		const redirect_to = data.error?.details?.redirect_to
		if (redirect_to) {
			const endpoint = `${IDENTITY_SERVER}/self-service/${params.flow}/browser`
			redirect(307, endpoint)
		}
		redirect(307, `/`)
	}

	/**
	 * NOTE: its fixed to utc + 1, we need to get the timezone from the system
	 **/
	const expires_at = DateTime.fromISO(data.expires_at, { zone: 'utc+1' })

	if (expires_at.diffNow().milliseconds < 0) {
		url.searchParams.delete('flow_id')
		const endpoint = `${IDENTITY_SERVER}/self-service/${params.flow}/browser`
		redirect(303, endpoint)
	}
	url.searchParams.delete('flow_id')
	return {
		form: data.ui
	}
}
