import { ROUTES } from '$lib/globals/routes'
export const load = async ({ locals }) => {
	const session = locals.session?.active ?? false
	const routes = structuredClone(ROUTES)
	if (session) {
		const user = routes.find((route) => route.label === 'Login')
		if (user) {
			user.label = `Hello, ${locals.session?.identity.traits.name.first}`
			user.href = '/user/account'
			user.subpaths.push({ label: 'Account', href: '/user/account' })
			user.subpaths.push({ label: 'Logout', href: '/auth/logout' })
		}
	}
	return {
		routes,
		session
	}
}
