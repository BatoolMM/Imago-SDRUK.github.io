import { IDENTITY_SERVER } from '$env/static/private'
import type { PageServerLoadEvent } from './$types.js'
import { redirect } from '@sveltejs/kit'
import { handleOryResponse } from '$lib/utils/auth/index.js'

export const load = async ({ request, cookies, url, params, fetch }: PageServerLoadEvent) => {
	const id = url.searchParams.get('id')
	const flow_id = url.searchParams.get('flow')
	const return_to = url.searchParams.get('return_to')
	let endpoint = `${IDENTITY_SERVER}/self-service/${params.flow}/flows?id=${flow_id}`
	if (params.flow === 'logout') {
		endpoint = `${IDENTITY_SERVER}/self-service/${params.flow}/browser`
		const res = await fetch(endpoint)
		const data = await handleOryResponse(res)
		if ('logout_url' in data) {
			redirect(307, data.logout_url)
		}
		redirect(307, '/')
	}
	if (!flow_id && params.flow !== 'error' && params.flow !== 'recovery') {
		const endpoint = `${IDENTITY_SERVER}/self-service/${params.flow}/browser`
		redirect(303, endpoint)
	}
	if (params.flow === 'error') {
		endpoint = `${IDENTITY_SERVER}/self-service/errors?id=${id}`
	}
	const res = await fetch(endpoint)

	const data = await handleOryResponse(res)
	if ('error' in data) {
		if (data.error.id === 'custom error') {
			redirect(307, '/')
		}
		if (data.error.id === 'security_csrf_violation') {
			console.log('clearrrrr me')
			cookies.getAll().forEach((cookie) => console.log(cookie))
			console.log(request.headers)
			redirect(307, '/')
		}
		const redirect_to = data.error?.details?.redirect_to
		if (redirect_to) {
			const endpoint = `${IDENTITY_SERVER}/self-service/${params.flow}/browser`
			redirect(307, endpoint)
		}
		redirect(307, `/`)
	}
	url.searchParams.delete('flow_id')
	return {
		form: data.ui
	}
}
