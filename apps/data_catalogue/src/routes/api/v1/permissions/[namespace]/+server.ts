import { SERVER_ERRORS } from '$lib/globals/server.js'
import { log } from '$lib/utils/server/logger.js'
import {
	authorise,
	handleKetoError,
	handleOryResponse,
	ketoCheck,
	ketoWrite
} from '$lib/utils/auth/index.js'
import { jstr } from '@arturoguzman/art-ui'
import type { Relationship } from '@ory/client-fetch'
import { error, json } from '@sveltejs/kit'

export const POST = async ({ locals, request }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/permissions',
		relation: 'POST'
	})
	const body = (await request.json()) as Relationship
	let converted = {}
	if (body.subject_id) {
		converted = {
			namespace: body.namespace,
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
	const exists = await ketoCheck.checkPermission(converted).catch(handleKetoError)
	if (!exists.allowed) {
		await ketoWrite.createRelationship({ createRelationshipBody: body }).catch(handleKetoError)
	}
	return json({ message: 'ok' })
}

export const DELETE = async ({ locals, request }) => {
	await authorise({
		namespace: 'Endpoint',
		session: locals.session,
		object: '/api/v1/permissions',
		relation: 'DELETE'
	})
	if (!locals.session) {
		error(...SERVER_ERRORS[401])
	}
	const body = (await request.json()) as Relationship
	let converted = {}
	if (body.subject_id) {
		converted = {
			namespace: body.namespace,
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
	await ketoWrite.deleteRelationships(converted).catch((err) => log.debug(jstr(err)))
	return json({ message: 'ok' })
}
