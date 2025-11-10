import type { CkanDataset } from '$lib/types/ckan'
import { getContext, setContext } from 'svelte'

export const setDataset = (dataset: CkanDataset) => {
	console.log(`Setting context for dataset ${dataset.id}`)
	const _dataset = $state(dataset)
	setContext('dataset', _dataset)
}

export const getDataset = (): CkanDataset => {
	return getContext('dataset')
}
