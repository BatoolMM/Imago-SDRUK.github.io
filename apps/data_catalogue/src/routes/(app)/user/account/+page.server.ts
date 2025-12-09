import type { PageServerLoadEvent } from './$types.js'
import { error, redirect } from '@sveltejs/kit'
import { authorise, handleOryResponse } from '$lib/utils/auth/index.js'
import { env } from '$env/dynamic/private'
import { db } from '$lib/db/index.js'
import { users } from '$lib/db/schema/users.js'
import { eq } from 'drizzle-orm'
import { handleDBError } from '$lib/utils/db/index.js'
const FLOW = 'settings'
export const load = async ({ url, request, cookies, fetch, locals }: PageServerLoadEvent) => {
	await authorise({
		namespace: 'User',
		object: locals.session?.identity.id,
		session: locals.session,
		relation: 'members'
	})
	const cookie = request.headers.get('cookie') || ''
	const user = await db
		.select()
		.from(users)
		.where(eq(users.id, locals.session.identity.id))
		.catch(handleDBError)
	if (!Array.isArray(user)) {
		error(400, { message: 'Error retriving the user', id: '' })
	}
	if (user.length === 0) {
		redirect(307, '/user/register')
	}
	const flow_id = url.searchParams.get('flow')
	// const return_to = url.searchParams.get('return_to')
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
			cookies.getAll().forEach((cookie) => console.log(cookie))
			console.log(request.headers)
			redirect(307, '/')
		}
		const redirect_to = data.error?.details?.redirect_to
		if (redirect_to) {
			const endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/${FLOW}/browser`
			redirect(307, endpoint)
		}
		redirect(307, `/`)
	}
	url.searchParams.delete('flow_id')
	return {
		form: data.ui
	}
}
