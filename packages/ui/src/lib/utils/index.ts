import { page } from '$app/state'

export const getFields = <T extends object, K extends keyof T & string>(
	obj: T,
	keys: K[]
): Pick<T, K> => {
	return Object.fromEntries(keys.map((key) => [key, obj?.[key]])) as Pick<T, K>
}

export function formatBytes(bytes: number, decimals = 2) {
	if (!+bytes) return '0 Bytes'

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const handleSearchParams = ({
	add,
	remove
}: {
	add?: { key: string; value: unknown; set?: boolean }[]
	remove?: string[] | { key: string; value: unknown }[]
}) => {
	const params = new URLSearchParams(page.url.searchParams.toString())
	add?.forEach(({ key, value, set }) => {
		if (params.has(key) && !set) {
			params.append(key, String(value))
		} else {
			params.set(key, String(value))
		}
	})
	remove?.forEach((key) => {
		if (typeof key === 'string') {
			params.delete(key)
		} else {
			const to_restore = params.getAll(key.key).filter((value) => value !== key.value)
			params.delete(key.key)
			to_restore.forEach((value) => params.append(key.key, value))
		}
	})
	if (params.size > 0) {
		return `?${params.toString()}`
	}
	return page.url.pathname
}
