import { env } from '$env/dynamic/private'
import { resourceGetController } from '$lib/server/interface/adapters/controllers/resources/get.js'
import { error, redirect } from '@sveltejs/kit'
export const load = async ({ locals, params, parent, url }) => {
	// const {dataset} = await parent()
	const [errors, resource] = await resourceGetController({
		configuration: locals.configuration,
		session: locals.session,
		id: params.resource
	})
	if (errors !== null) {
		if (errors.reason === 'Unauthenticated') {
			const login_endpoint = `${env.IDENTITY_SERVER_PUBLIC}/self-service/login/browser?return_to=${url.pathname}`
			return redirect(307, login_endpoint)
		}
		return error(400, { message: errors.reason, id: errors.reason })
	}
	return { resource }
}
