export type Route = { label: string; href: string; target?: string }
export type Routes = (Route & { subpaths: Route[] })[]
