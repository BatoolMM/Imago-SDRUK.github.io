import type { IconsSets } from '$lib/icons'

export type Route = {
	label: string
	icon?: IconsSets
	href?: string
	target?: string
	onclick?: () => void
}
export type Routes = (Route & { subpaths: Route[] })[]
export type Tab = {
	label: string
	icon?: IconsSets
	href?: string
	params?: { [k: string]: string | number | null }
}
export type NavigationGroup = { name: string | null; icon?: IconsSets; routes?: Tab[] }
export type NavigationGroups = NavigationGroup[]
