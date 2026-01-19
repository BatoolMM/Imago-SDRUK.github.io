type Route = { label: string; href: string }

export const ROUTES: (Route & { subpaths: Route[] })[] = [
	{
		label: 'Data',
		href: 'https://data.imago.ac.uk',
		subpaths: []
	},
	{
		label: 'News',
		href: '/news',
		subpaths: [
			{
				label: 'Careers',
				href: '/careers'
			},
			{ label: 'Events', href: '/events' }
		]
	},
	{
		label: 'Research',
		href: '/research',
		subpaths: [
			{ label: 'Book of Imagery', href: 'https://boi.imago.ac.uk/' }

			// {
			// 	label: 'Resources',
			// 	href: '/research/resources'
			// },
			// { label: 'Publications', href: '/research/publications' }
		]
	},
	{
		label: 'About',
		href: '/about',
		subpaths: [
			// { label: 'Partners', href: '/about/partners' }
			{ label: 'Team', href: '/about' }
		]
	}
]
