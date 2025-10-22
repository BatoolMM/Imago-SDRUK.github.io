// See https://svelte.dev/docs/kit/types#app.d.ts

import type { IdentitySession } from '$lib/utils/auth/types'
import type { CkanClient } from '$lib/utils/ckan'

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			id: string
		}
		interface Locals {
			ckan: CkanClient
			session?: IdentitySession
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
