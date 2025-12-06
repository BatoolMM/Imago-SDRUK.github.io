import { redirect } from '@sveltejs/kit'
import { ketoRead, ketoWrite, kratosRead } from '$lib/utils/auth/index.js'
import { AUTH_GROUPS } from '$lib/globals/auth.js'

export const load = async ({ locals }) => {
	if (!locals.session) {
		return redirect(307, '/')
	}
	console.log('dasfa')
	const relationships = await ketoRead.getRelationships({ namespace: 'Group' })
	const missing_groups = AUTH_GROUPS.filter((group) =>
		relationships.relation_tuples?.findIndex((tuple) => tuple.subject_id === group)
	)
	console.log(missing_groups)
	return {
		relationships
	}
}

export const actions = {
	create: async ({ locals }) => {
		if (!locals.session) {
			return redirect(307, '/')
		}
	},
	delete: async ({ locals, request }) => {
		if (!locals.session) {
			return redirect(307, '/')
		}
		const form = await request.formData()
		const relation = String(form.get('relation'))
		const res = ketoWrite.deleteRelationships(JSON.parse(relation))
		return {
			message: 'ok'
		}
	}
}
