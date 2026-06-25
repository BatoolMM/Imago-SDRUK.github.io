import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	if (!locals.session?.identity.id) {
		redirect(307, '/')
	}
	if (locals.session?.identity.id === 'anonymous') {
		redirect(307, '/')
	}
}
// https://svelte.dev/docs/kit/load#Layout-data
