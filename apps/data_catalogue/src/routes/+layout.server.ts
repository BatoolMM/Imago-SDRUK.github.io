import { ADMIN_ROUTES, ROUTES } from '$lib/globals/routes'
import { COOKIES } from '$lib/globals/server.js'
import { ketoRead } from '$lib/utils/auth/index.js'
export const load = async ({ locals, cookies }) => {
	const expire = cookies.get(COOKIES.expire)
	const session = locals.session?.active ?? false
	const routes = structuredClone(ROUTES)
	if (session) {
		const group = await ketoRead
			.getRelationships({
				namespace: 'Group',
				object: 'admin',
				subjectId: locals.session?.identity.id
			})
			.catch((error) => {
				console.log(error)
				return {
					allowed: false
				}
			})
		if (
			group.relation_tuples?.find((relation) => relation.subject_id === locals.session?.identity.id)
		) {
			routes.push(ADMIN_ROUTES)
		}
		routes.push({
			label: `Hello, ${locals.session?.identity.traits.name.first}`,
			href: '/user/account',
			subpaths: [
				{ label: 'Account', href: '/user/account' },
				{ label: 'Logout', href: '/auth/logout' }
			]
		})
	} else {
		routes.push({ label: 'Login', href: '/auth/login', subpaths: [] })
	}

	return {
		routes,
		session,
		expire
	}
}
