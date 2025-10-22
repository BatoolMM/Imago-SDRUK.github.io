import type { IdentityError, IdentityResponse, IdentitySession } from '$lib/utils/auth/types'
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
