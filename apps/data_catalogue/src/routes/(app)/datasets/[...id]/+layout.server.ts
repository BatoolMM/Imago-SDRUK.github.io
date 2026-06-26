import { errFmt } from '$lib/server/entities/errors.js'
import {
	datasetGetController,
	datasetGetUserPermissionsController
} from '$lib/server/interface/adapters/controllers/datasets/get.js'
import { redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	const [errs, dataset] = await datasetGetController({
		configuration: locals.configuration,
		id: params.id,
		session: locals.session
	})
	if (errs !== null) {
		if (errs.reason === 'Unauthenticated') {
			redirect(307, '/auth/login')
		}
		if (errs.reason === 'Unauthorised') {
			redirect(307, '/datasets')
		}
		error(...errFmt(errs))
	}
	if (dataset === null) {
		error(404, { message: `Not found`, id: 'not-found' })
	}
	const subroutes: { label: string; href: string }[] = []
	const [errors, permits] = await datasetGetUserPermissionsController({
		configuration: locals.configuration,
		session: locals.session,
		id: dataset.id
	})
	if (errors !== null) {
		return error(...errFmt(errors))
	}
	if (permits.includes('edit')) {
		subroutes.push({ label: 'Preview', href: `/datasets/${params.id}` })
		subroutes.push({ label: 'Edit', href: `/datasets/${params.id}/edit` })
	}
	if (permits.includes('delete')) {
		subroutes.push({ label: 'Delete', href: `/datasets/${params.id}` })
	}
	return {
		dataset,
		subroutes,
		permits
	}
}
