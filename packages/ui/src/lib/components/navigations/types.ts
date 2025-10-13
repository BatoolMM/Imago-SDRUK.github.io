export type Route = { label: string; href: string }
export type Routes = (Route & { subpaths: Route[] })[]
