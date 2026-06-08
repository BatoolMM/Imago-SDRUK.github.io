import {
	identityGetFlowUseCase,
	identityValidateSessionUseCase
} from '$lib/server/application/use_cases/identities/get'
import { err, ok } from '$lib/server/entities/errors'
import { getIdentityModule } from '$lib/server/modules/identity'
import { log } from '$lib/utils/server/logger'

export const identityGetFlowController = async ({
	action,
	url,
	cookie
}: {
	action: string
	url: URL
	cookie: string
}) => {
	log.debug({ caller: 'identityGetFlowController' })
	const identity_service = getIdentityModule()
	const [errors, result] = await identityGetFlowUseCase({
		action,
		url,
		cookie,
		identity_service
	})
	if (errors !== null) {
		log.error({ errors })
		return err(errors)
	}
	log.debug({ result })
	return ok(result)
}

export const identityValidateSessionController = async ({
	cookie,
	token
}: {
	cookie?: string
	token?: string | null
}) => {
	const identity_service = getIdentityModule()
	return await identityValidateSessionUseCase({
		cookie,
		token: token ?? null,
		identity_service
	})
}
