import type { CkanDataset } from '$lib/types/ckan'
import { getContext, setContext } from 'svelte'

export const setDataset = (dataset: CkanDataset) => {
	const _dataset = $state({
		dataset: dataset
	})
	setContext('dataset', _dataset)
}

export const getDataset = (): { dataset: CkanDataset } => {
	return getContext('dataset')
}
