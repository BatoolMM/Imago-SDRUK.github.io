import { env } from '$env/dynamic/private'
import { SERVER_ERRORS } from '$lib/globals/server'
import type { IdentityError, IdentityResponse, IdentitySession } from '$lib/utils/auth/types'
import { jstr } from '@arturoguzman/art-ui'
import {
	RelationshipApi,
	Configuration,
	IdentityApi,
	PermissionApi,
	type CheckPermissionRequest
} from '@ory/client-fetch'
import { error } from '@sveltejs/kit'
import { DateTime } from 'luxon'

export const handleOryResponse = async (response: Response) => {
	const contentType = response.headers.get('content-type')
	if (contentType && contentType.indexOf('application/json') !== -1) {
		return response.json() as Promise<IdentityResponse>
	}
	return response.text().then((text) => ({
		error: {
			id: 'custom error',
			code: response.status,
			status: 'error',
			reason: 'unknown error',
			message: text
		}
	})) as Promise<IdentityError>
}

export const verifyOrySession = (session: IdentitySession) => {
	if (!session.active) {
		return false
	}
	const diff = DateTime.fromISO(session.expires_at).diffNow().milliseconds
	if (diff <= 0) {
		console.log('session has expired')
		return false
	}
	return true
}

export const kratosRead = new IdentityApi(new Configuration({ basePath: 'http://127.0.0.1:4433' }))

export const ketoWrite = new RelationshipApi(
	new Configuration({
		basePath: env.PERMISSION_SERVER_WRITE
	})
)

export const ketoRead = new RelationshipApi(
	new Configuration({
		basePath: env.PERMISSION_SERVER_READ
	})
)

export const ketoCheck = new PermissionApi(
	new Configuration({
		basePath: env.PERMISSION_SERVER_READ
	})
)

export const checkPermission = async ({
	namespace,
	object,
	relation,
	subject_id
}: {
	namespace: unknown
	object: unknown
	relation: unknown
	subject_id: unknown
}): Promise<boolean> => {
	const url = new URL(`http://127.0.0.1:4466/relation-tuples/check`)
	if (!namespace) return false
	if (!object) return false
	if (!relation) return false
	if (!subject_id) return false
	url.searchParams.append('namespace', String(namespace))
	url.searchParams.append('object', String(object))
	url.searchParams.append('relation', String(relation))
	url.searchParams.append('subject_id', String(subject_id))
	console.log(url.toString())
	const res = await fetch(url.toString(), {
		method: 'GET'
	})
	const data = (await res.json()) as
		| { allowed: boolean }
		| { code: number; status: string; message: string }
	if ('allowed' in data) {
		return data.allowed
	}
	return false
}

export const authorise = async ({
	session,
	namespace,
	object,
	relation,
	subjectSetNamespace,
	subjectSetObject,
	subjectSetRelation,
	action
}: { session?: IdentitySession; action?: () => Promise<void> } & CheckPermissionRequest) => {
	if (!session) {
		if (action) {
			action()
		}
		error(...SERVER_ERRORS[401])
	}
	// console.log(
	// 	`EVALUATING: ${jstr({
	// 		session,
	// 		namespace,
	// 		object,
	// 		relation,
	// 		subjectSetNamespace,
	// 		subjectSetObject,
	// 		subjectSetRelation
	// 	})}`
	// )
	if (subjectSetNamespace) {
		const permission = await ketoCheck
			.checkPermission({
				namespace,
				object,
				relation,
				subjectSetNamespace,
				subjectSetObject,
				subjectSetRelation
			})
			.catch((err) => {
				console.log(err)
				return {
					allowed: false
				}
			})
		if (!permission.allowed) {
			if (action) {
				action()
			}
			console.log(permission)
			error(...SERVER_ERRORS[401])
		}
	}
	const permission = await ketoCheck
		.checkPermission({
			namespace,
			object,
			relation,
			subjectId: session.identity.id
		})
		.catch((err) => {
			console.log(err)
			return {
				allowed: false
			}
		})
	if (!permission.allowed) {
		if (action) {
			action()
		}
		console.log(permission)
		error(...SERVER_ERRORS[401])
	}
}
