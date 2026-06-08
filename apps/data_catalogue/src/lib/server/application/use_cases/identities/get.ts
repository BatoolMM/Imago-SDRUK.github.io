import type { IIdentityService } from '$lib/server/application/services/identity'

export const identityGetFlowUseCase = async ({
	action,
	url,
	cookie,
	identity_service
}: {
	action: string
	url: URL
	cookie: string
	identity_service: IIdentityService
}) => {
	return await identity_service.getFlow({ action, url, cookie })
}

export const identityValidateSessionUseCase = async ({
	cookie,
	token,
	identity_service
}: {
	cookie: string | undefined
	token: string | null
	identity_service: IIdentityService
}) => {
	return await identity_service.validateSession({ cookie, token })
}
