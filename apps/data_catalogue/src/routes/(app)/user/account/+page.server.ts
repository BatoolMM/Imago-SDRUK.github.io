import type { PageServerLoadEvent } from './$types.js'
import { redirect } from '@sveltejs/kit'
import { handleOryResponse } from '$lib/utils/auth/index.js'
import { env } from '$env/dynamic/private'
const FLOW = 'settings'
export const load = async ({ url, request, cookies, fetch }: PageServerLoadEvent) => {
	console.log('triggered settings')
	const flow_id = url.searchParams.get('flow')
	const return_to = url.searchParams.get('return_to')
	if (!flow_id) {
		const endpoint = `${env.IDENTITY_SERVER}/self-service/${FLOW}/browser`
		redirect(307, endpoint)
	}
	const endpoint = `${env.IDENTITY_SERVER}/self-service/${FLOW}/flows?id=${flow_id}`
	const res = await fetch(endpoint)
	const data = await handleOryResponse(res)
	if ('error' in data) {
		if (data.error.id === 'custom error') {
			redirect(307, '/')
		}
		if (data.error.id === 'security_csrf_violation') {
			cookies.getAll().forEach((cookie) => console.log(cookie))
			console.log(request.headers)
			redirect(307, '/')
		}
		const redirect_to = data.error?.details?.redirect_to
		if (redirect_to) {
			const endpoint = `${env.IDENTITY_SERVER}/self-service/${FLOW}/browser`
			redirect(307, endpoint)
		}
		redirect(307, `/`)
	}
	url.searchParams.delete('flow_id')
	return {
		form: data.ui
	}
}
