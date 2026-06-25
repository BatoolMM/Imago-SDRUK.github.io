import { env } from '$env/dynamic/public'

import type { Tab } from '@imago/ui'
type NavigationFeatures = 'imago' | 'data_catalogue'

export const general_routes: Record<
	NavigationFeatures,
	({ id }: { id?: string }) => { group: string; route: Tab }
> = {
	imago: () => ({
		group: 'Home',
		route: {
			label: 'Imago',
			href: env.PUBLIC_IMAGO_URL ?? 'http://127.0.0.1:5173'
		}
	}),
	data_catalogue: () => ({
		group: 'Home',
		route: {
			label: 'Data catalogue',
			href: env.PUBLIC_IMAGO_DATA_CATALOGUE_URL ?? 'http://127.0.0.1:5174'
		}
	})
}

export const general_routes_groups = [
	{
		label: 'Home',
		href: '/',
		subpaths: []
	},
	{
		label: 'Datasets',
		href: '/datasets',
		subpaths: []
	}
]
