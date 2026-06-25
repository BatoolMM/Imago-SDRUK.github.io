import { redirect } from '@sveltejs/kit'

export const load = async ({ parent }) => {
	const { routes } = await parent()
	const settings = routes.find((x) => x.label === 'Settings')
	if (!settings) {
		redirect(307, '/')
	}
	if (settings.subpaths.length === 0) {
		redirect(307, '/')
	}
	const first = settings.subpaths[0]
	if (first.href) {
		redirect(307, first.href)
	}
}
