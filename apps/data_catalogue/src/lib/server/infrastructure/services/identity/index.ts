import type { IIdentityService } from '$lib/server/application/services/identity'
import { infrastructureServiceIdentityKratos } from '$lib/server/infrastructure/services/identity/kratos'
import { infrastructureServiceIdentityTest } from '$lib/server/infrastructure/services/identity/test'

export const identityServiceInfrastructure: {
	kratos: IIdentityService
	test: IIdentityService
} = {
	kratos: infrastructureServiceIdentityKratos,
	test: infrastructureServiceIdentityTest
}
