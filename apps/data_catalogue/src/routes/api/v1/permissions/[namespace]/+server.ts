import { log } from '$lib/utils/server/logger.js'
import { authorise, ketoCheck, ketoWrite } from '$lib/utils/auth/index.js'
import { jstr } from '@arturoguzman/art-ui'
import type { Relationship } from '@ory/client-fetch'
import { json } from '@sveltejs/kit'

export const GET = async ({ locals, url, params }) => {
	// const active_groups = await ketoRead.getRelationships({ namespace: 'Group', pageSize: 1000 })

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
		const permission = await ketoCheck
			.checkPermission({
				namespace: namespace ?? undefined,
				object: object ?? undefined,
				relation: relation ?? undefined,
				subjectSetNamespace: subjectSetNamespace ?? undefined,
				subjectSetObject: subjectSetObject ?? undefined,
				subjectSetRelation: subjectSetRelation ?? undefined
			})
			.catch((err) => {
				log.debug(err)
				return {
					allowed: false
				}
			})
		return json(permission)
	}
	const permission = await ketoCheck
		.checkPermission({
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

export const POST = async ({ locals, request, params }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/permissions',
		relation: 'POST'
	})
	const body = (await request.json()) as Relationship
	log.debug(`creating relationship for ${jstr(body)}`)
	let converted = {}
	if (body.subject_id) {
		converted = {
			namespace: params.namespace ?? body.namespace,
			relation: body.relation,
			subjectId: body.subject_id,
			object: body.object
		}
	} else {
		converted = {
			namespace: body.namespace,
			relation: body.relation,
			subjectSetNamespace: body.subject_set?.namespace,
			subjectSetRelation: body.subject_set?.relation,
			subjectSetObject: body.subject_set?.object,
			object: body.object
		}
	}
	log.debug(jstr(converted))
	const exists = await ketoCheck.checkPermission(converted)
	log.debug(`exists: ${jstr(exists)}`)
	if (!exists.allowed) {
		await ketoWrite.createRelationship({ createRelationshipBody: body })
	}
	return json({ message: 'ok' })
}

export const DELETE = async ({ locals, request, params }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/permissions',
		relation: 'DELETE'
	})
	const body = (await request.json()) as Relationship
	await ketoWrite
		.deleteRelationships({ ...body, namespace: params.namespace ?? body.namespace })
		.catch((err) => log.debug(jstr(err)))
	return json({ message: 'ok' })
}
