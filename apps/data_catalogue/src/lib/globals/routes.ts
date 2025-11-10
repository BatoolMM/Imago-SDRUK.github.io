import type { Routes } from '@imago/ui'

export const ROUTES: Routes = [
	{
		label: 'Home',
		href: '/',
		subpaths: [
			{
				label: 'Imago',
				href: 'http://127.0.0.1:5173'
			},
			{
				label: 'Data catalogue',
				href: '/'
			}
		]
	},
	{
		label: 'Datasets',
		href: '/datasets',
		subpaths: []
	}
	// {
	// 	label: 'Topics',
	// 	href: '/topics',
	// 	subpaths: [
	// 		{
	// 			label: 'SRF',
	// 			href: '/topics/srf'
	// 		}
	// 	]
	// },
	// { label: 'Login',
	// 	href: '/auth/login',
	// 	subpaths: []
	// }
]
