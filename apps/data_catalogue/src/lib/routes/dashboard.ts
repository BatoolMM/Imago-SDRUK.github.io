import type { Routes, Tab } from '@imago/ui'
type NavigationFeatures = 'dashboard'

export const dashboard_routes: Record<
	NavigationFeatures,
	({ id }: { id?: string }) => { group: string; route: Tab }
> = {
	dashboard: () => ({
		group: 'Dashboard',
		route: {
			label: 'Dashboard',
			href: `/admin/dashboard`
		}
	})
}

export const dashboard_routes_group: Routes = [
	{
		label: 'Dashboard',
		icon: { icon: 'building', set: 'tabler' },
		subpaths: [],
		href: '/admin/dashboard'
	}
]
