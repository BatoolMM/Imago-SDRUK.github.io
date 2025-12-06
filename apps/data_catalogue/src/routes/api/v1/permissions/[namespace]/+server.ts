import { SERVER_ERRORS } from '$lib/globals/server.js'
import { authorise, ketoCheck, ketoRead, ketoWrite } from '$lib/utils/auth/index.js'
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
	console.log(`AUTHORISED`)
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
	const exists = await ketoCheck.checkPermission(converted)

	// const exists = await ketoRead.getRelationships(body)
	// if ( exists.relation_tuples?.filter((relation) => relation.subject_id === body.subject_id).length ===
	// 	0
	// ) {
	if (!exists.allowed) {
		await ketoWrite.createRelationship({ createRelationshipBody: body })
	}
	return json({ message: 'ok' })
}

export const DELETE = async ({ locals, request }) => {
	// await authorise({
	// 	namespace: 'Endpoint',
	// 	session: locals.session,
	// 	object: '/api/v1/permissions',
	// 	relation: 'DELETE'
	// })
	if (!locals.session) {
		error(...SERVER_ERRORS[401])
	}

	//NOTE: change to check permission to access this endpoint
	// const permission = await ketoCheck.checkPermission({
	// 	namespace: 'Group',
	// 	object: 'admin',
	// 	relation: 'users',
	// 	subjectId: locals.session.identity.id
	// })
	// if (!permission.allowed) {
	// 	error(...SERVER_ERRORS[401])
	// }

	const body = (await request.json()) as Relationship
	await ketoWrite.deleteRelationships(body).catch((err) => console.log(jstr(err)))
	return json({ message: 'ok' })
}
