export type DatasetsFilter = {
	title: string
	filters: { key: string; value: string }[]
	query: string
	limit: number
}
