import { redirect } from '@sveltejs/kit'
import type { PageServerLoadEvent } from './$types.js'
export const load = async ({ locals }: PageServerLoadEvent) => {
	return redirect(303, '/auth/login')
}
