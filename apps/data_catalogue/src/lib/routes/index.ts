import type { Routes, Tab } from '@imago/ui'
import { err, ok } from '$lib/server/entities/errors'
import { permissionsCheckController } from '$lib/server/interface/adapters/controllers/permissions/get'

export const getNavigation = async ({
	routes,
	configuration,
	session,
	groups
}: {
	groups: Routes
	routes: Record<string, ({ id }: { id?: string }) => { group: string; route: Tab }>
	id?: string
	configuration: App.Locals['configuration']
	session: App.Locals['session']
}) => {
	const _routes = Object.keys(routes)
	const [errors, allowed] = await permissionsCheckController({
		permissions: _routes.map((r) => ({ namespace: 'Application', object: r, permits: 'read' })),
		configuration,
		session
	})
	if (errors !== null) {
		return err(errors)
	}
	const filtered = allowed.results
		.map((allow, index) => (allow.allowed ? _routes[index] : null))
		.filter((x) => x !== null)

	const tabs: Routes = filtered.reduce((acc, feature) => {
		const tab = routes[feature]
		const route = tab({})
		const index = acc.findIndex((group) => group.label === route.group)
		if (index === -1) {
			const group = groups.find((group) => group.label === route.group)
			if (group) {
				acc.push({ ...group, subpaths: [route.route] })
			}
			return acc
		}
		acc[index].subpaths?.push(route.route)
		return acc
	}, [] as Routes)
	return ok(tabs)
}
