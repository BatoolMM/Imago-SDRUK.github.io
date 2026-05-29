import type { IAuthenticationService } from '$lib/server/application/services/authentication'
import { infrastructureServiceAuthenticationKratos } from '$lib/server/infrastructure/services/authentication/kratos'
import { infrastructureServiceAuthenticationTest } from '$lib/server/infrastructure/services/authentication/test'

export const authenticationServiceInfrastructure: {
	kratos: IAuthenticationService
	test: IAuthenticationService
} = {
	kratos: infrastructureServiceAuthenticationKratos,
	test: infrastructureServiceAuthenticationTest
}
