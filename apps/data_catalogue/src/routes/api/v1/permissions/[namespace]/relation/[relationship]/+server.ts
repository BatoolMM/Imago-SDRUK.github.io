import { log } from '$lib/utils/server/logger.js'
import { authorise, ketoRead } from '$lib/utils/auth/index.js'
import { json } from '@sveltejs/kit'

export const GET = async ({ locals, url, params }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/permissions',
		relation: 'POST'
	})
	const namespace = params.namespace
	const object = url.searchParams.get(`object`)
	const relation = url.searchParams.get(`relation`)
	const subjectSetNamespace = url.searchParams.get(`subject_set_namespace`)
	const subjectSetObject = url.searchParams.get(`subject_set_object`)
	const subjectSetRelation = url.searchParams.get(`subject_set_relation`)
	const subjectId = url.searchParams.get(`subject_id`)
	if (subjectSetNamespace) {
		const relationships = await ketoRead
			.getRelationships({
				namespace: params.namespace,
				object: object ?? undefined,
				relation: params.relationship,
				subjectSetNamespace: subjectSetNamespace ?? undefined,
				subjectSetObject: subjectSetObject ?? undefined,
				subjectSetRelation: subjectSetRelation ?? undefined,
				pageSize: 1000
			})
			.catch((err) => {
				log.debug(err)
				return {
					allowed: false
				}
			})
		return json(relationships)
	}
	const permission = await ketoRead
		.getRelationships({
			namespace: namespace ?? undefined,
			object: object ?? undefined,
			relation: relation ?? undefined,
			subjectId: subjectId ?? undefined
		})
		.catch((err) => {
			log.debug(err)
			return {
				allowed: false
			}
		})
	return json(permission)
}
