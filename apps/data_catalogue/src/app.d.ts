// See https://svelte.dev/docs/kit/types#app.d.ts

import type { CkanClient } from '$lib/utils/ckan'

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			id: string
		}
		interface Locals {
			ckan: CkanClient
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
