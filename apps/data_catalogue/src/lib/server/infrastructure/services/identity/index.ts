import type { IIdentityService } from '$lib/server/application/services/identity'
import { infrastructureServiceAuthenticationTest } from '$lib/server/infrastructure/services/authentication/test'
import { infrastructureServiceIdentityKratos } from '$lib/server/infrastructure/services/identity/kratos'

export const identityServiceInfrastructure: {
	kratos: IIdentityService
	test: IIdentityService
} = {
	kratos: infrastructureServiceIdentityKratos,
	test: infrastructureServiceAuthenticationTest
}
